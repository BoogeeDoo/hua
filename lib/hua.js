/**
 * XadillaX created at 2016-02-22 10:52:06 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

var debug = require("debug")("hua");
var isChinese = require("is-chinese");
var randomName = require("chinese-random-name");
var wuxing = "金木水火土";

var Hua = function(options) {
    this.options = options;

    if(options.prefix) {
        options.prefix = options.prefix[0];
        if(!isChinese(options.prefix)) delete options.prefix;
    }

    if(options.suffix) {
        options.suffix = options.suffix[0];
        if(!isChinese(options.suffix)) delete options.suffix;
    }

    if(options["five-elements"]) {
        if(options.prefix && options.suffix) {
            delete options["file-elements"];
        } else if(options.prefix) {
            options["five-elements"] = options["five-elements"].substr(1, 1);
            if(-1 === wuxing.indexOf(options["five-elements"])) {
                delete options["five-elements"];
            }
        } else if(options.suffix) {
            options["five-elements"] = options["five-elements"].substr(0, 1);
            if(-1 === wuxing.indexOf(options["five-elements"])) {
                delete options["five-elements"];
            }
        } else {
            options["five-elements"] = options["five-elements"].substr(0, 2).split("");
            for(var i = 0; i < options["five-elements"].length; i++) {
                if(-1 === wuxing.indexOf(options["five-elements"][i])) {
                    options["five-elements"][i] = wuxing[Math.floor(Math.random() * 5)];
                }
            }

            while(options["five-elements"].length < 2) {
                options["five-elements"].push(wuxing[Math.floor(Math.random() * 5)]);
            }

            options["five-elements"] = options["five-elements"].join("");
        }
    }
};

Hua.prototype.generate = function(count) {
    if(!count) count = this.options.count || 10;

    var result = [];
    for(var i = 0; i < count; i++) {
        result.push(this.generateOne());
    }
    return result;
};

Hua.prototype.generateOne = function() {
    if(this.options.prefix && this.options.suffix) {
        return this.options.prefix + this.options.suffix;
    }

    if(this.options.prefix) {
        debug(this.options["five-elements"]);
        return this.options.prefix + randomName.names.get1(this.options["five-elements"]);
    }

    if(this.options.suffix) {
        debug(this.options["five-elements"]);
        return randomName.names.get1(this.options["five-elements"]) + this.options.suffix;
    }

    return randomName.names.get2(this.options["five-elements"]);
};

module.exports = Hua;
