/**
 * Sallen450 created at 2016-04-03 16:14:18
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

var _ = require("lodash");

var EXIST_SOURCE = [ "songci", "shijing", "chuci", "tangshi" ];

var HuaSource = function(options) {
    this.options = options;
    this.index = [];

    if(!options.source) {
        options.source = "tangshi";
    }

    this.dict = (typeof options.source === "string") ?
        require(
            EXIST_SOURCE.indexOf(options.source) >= 0 ?
                ('../dict/' + options.source) :
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
    return _.compact(txt);
};

HuaSource.prototype._pick = function(sentences) {
    var sentence = _.sample(sentences) || "";

    switch(sentence.length) {
        case 2: {
            return sentence;
        }

        case 3: {
            var random = _.random(0, 1000);
            if (random < 500) return sentence.substr(0, 2);
            else return sentence.substr(1, 2);
            break;
        }

        case 4: {
            var random = _.random(0, 1000);
            if (random < 400) return sentence.substr(0, 2);
            else if (random < 800) return sentence.substr(2, 2);
            else return sentence.substr(1, 2);
            break;
        }

        case 5: {
            var random = _.random(0, 10000);
            if (random < 3000) return sentence.substr(0, 2);
            else if (random < 6000) return sentence.substr(2, 2);
            else if (random < 9000) return sentence.substr(3, 2);
            else return sentence.substr(1, 2);
            break;
        }

        case 6: {
            var random = _.random(0, 10000);
            if (random < 2500) return sentence.substr(0, 2);
            else if (random < 5000) return sentence.substr(2, 2);
            else if (random < 7500) return sentence.substr(4, 2);
            else if (random < 8750) return sentence.substr(1, 2);
            else return sentence.substr(3, 2);
            break;
        }

        case 7: {
            var random = _.random(0, 10000);
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

            var random = _.random(0, sentence.length - 2);
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
    var json = _.sample(this.dict);
    var candidates = this._split(json.content);

    var result = null;
    while(result === null) result = this._pick(candidates); // jshint ignore: line

    result = new String(result);
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
