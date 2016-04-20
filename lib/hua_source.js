/**
 * Sallen450 created at 2016-04-03 16:14:18
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

var compact = require("lodash.compact");
var _random = require("lodash.random");
var sample = require("lodash.sample");

var EXIST_SOURCE = [ "songci", "shijing", "chuci", "tangshi" ];

// fix the bug that load dynamic module under browserify
//   -- preload
if(typeof window !== "undefined" &&
        typeof window.document !== "undefined" &&
        typeof window.location !== "undefined") {
    require("../dict/songci");
    require("../dict/shijing");
    require("../dict/chuci");
    require("../dict/tangshi");
}

var HuaSource = function(options) {
    options = options || {};
    this.options = options;
    this.index = [];

    if(!options.source) {
        options.source = "tangshi";
    }

    this.dict = (typeof options.source === "string") ?
        require(
            EXIST_SOURCE.indexOf(options.source) >= 0 ?
                ("../dict/" + options.source) :
                options.source) :
        options.source;
};

HuaSource.EXIST_SOURCE = EXIST_SOURCE;

HuaSource.prototype._split = function(txt) {
    txt = txt.replace(/[，。！？［］；《》、：“”]/g, "$")
            .replace(/（.*）/g, "")
            .replace(/【.*】/g, "");
    txt = txt.split("$").map(function(s) {
        return s.trim();
    });
    return compact(txt);
};

HuaSource.prototype._pick = function(sentences) {
    var sentence = sample(sentences) || "";

    switch(sentence.length) {
        case 2: {
            return sentence;
        }

        case 3: {
            var random = _random(0, 1000);
            if (random < 500) return sentence.substr(0, 2);
            else return sentence.substr(1, 2);
            break;
        }

        case 4: {
            var random = _random(0, 1000);
            if (random < 400) return sentence.substr(0, 2);
            else if (random < 800) return sentence.substr(2, 2);
            else return sentence.substr(1, 2);
            break;
        }

        case 5: {
            var random = _random(0, 10000);
            if (random < 3000) return sentence.substr(0, 2);
            else if (random < 6000) return sentence.substr(2, 2);
            else if (random < 9000) return sentence.substr(3, 2);
            else return sentence.substr(1, 2);
            break;
        }

        case 6: {
            var random = _random(0, 10000);
            if (random < 2500) return sentence.substr(0, 2);
            else if (random < 5000) return sentence.substr(2, 2);
            else if (random < 7500) return sentence.substr(4, 2);
            else if (random < 8750) return sentence.substr(1, 2);
            else return sentence.substr(3, 2);
            break;
        }

        case 7: {
            var random = _random(0, 10000);
            if (random < 2000) return sentence.substr(0, 2);
            else if (random < 4000) return sentence.substr(2, 2);
            else if (random < 6000) return sentence.substr(4, 2);
            else if (random < 8000) return sentence.substr(5, 2);
            else if (random < 9000) return sentence.substr(1, 2);
            else return sentence.substr(3, 2);
            break;
        }

        default: {
            if(sentence.length < 2) {
                return null;
            }

            var random = _random(0, sentence.length - 2);
            return sentence.substr(random, 2);
        }
    }
};

HuaSource.prototype.generate = function() {
    var count = this.options.count || 10;
    var result = [];
    for(var i = 0; i < count; i++) {
        result.push(this.generateOne());
    }
    return result;
};

HuaSource.prototype.generateOne = function() {
    var json = sample(this.dict);
    var candidates = this._split(json.content);

    var result = null;
    while(result === null) result = this._pick(candidates);

    result = new String(result); // jshint ignore: line
    json.author = json.author || "未知";
    Object.defineProperty(result, "_meta", {
        enumerable: false,
        configurable: false,
        writable: false,
        value: json
    });

    result.inspect = function() {
        return this.toString();
    };

    return result;
};

module.exports = HuaSource;
