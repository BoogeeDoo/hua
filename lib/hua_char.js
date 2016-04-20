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

var HuaChar = function(options) {
    options = options || {};
    this.options = options;

    if(options.prefix) {
        options.prefix = options.prefix[0];
        if(!isChinese(options.prefix)) delete options.prefix;
    }

    if(options.suffix) {
        options.suffix = options.suffix[0];
        if(!isChinese(options.suffix)) delete options.suffix;
    }

    if(options.fiveElements) {
        if(options.prefix && options.suffix) {
            delete options.fiveElements;
        } else if(options.prefix) {
            options.fiveElements = (options.fiveElements.length === 1 ?
                options.fiveElements :
                options.fiveElements.substr(1, 1));
            if(-1 === wuxing.indexOf(options.fiveElements)) {
                delete options.fiveElements;
            }
        } else if(options.suffix) {
            options.fiveElements = options.fiveElements.substr(0, 1);
            if(-1 === wuxing.indexOf(options.fiveElements)) {
                delete options.fiveElements;
            }
        } else {
            options.fiveElements = options.fiveElements.substr(0, 2).split("");
            for(var i = 0; i < options.fiveElements.length; i++) {
                if(-1 === wuxing.indexOf(options.fiveElements[i])) {
                    options.fiveElements[i] = wuxing[Math.floor(Math.random() * 5)];
                }
            }

            while(options.fiveElements.length < 2) {
                options.fiveElements.push(wuxing[Math.floor(Math.random() * 5)]);
            }

            options.fiveElements = options.fiveElements.join("");
        }
    }
};

HuaChar.prototype.generate = function(count) {
    if(!count) count = this.options.count || 10;

    var result = [];
    for(var i = 0; i < count; i++) {
        result.push(this.generateOne());
    }
    return result;
};

HuaChar.prototype.generateOne = function() {
    if(this.options.prefix && this.options.suffix) {
        return this.options.prefix + this.options.suffix;
    }

    if(this.options.prefix) {
        debug(this.options.fiveElements);
        return this.options.prefix + randomName.names.get1(this.options.fiveElements);
    }

    if(this.options.suffix) {
        debug(this.options.fiveElements);
        return randomName.names.get1(this.options.fiveElements) + this.options.suffix;
    }

    return randomName.names.get2(this.options.fiveElements);
};

module.exports = HuaChar;
