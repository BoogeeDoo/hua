/**
 * XadillaX created at 2016-03-04 12:08:08 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

var _ = require("lodash");

var dict = require("../dict/tangshi");

var HuaTangshi = function(options) {
    this.options = options;
    this.index = [];
};

HuaTangshi.prototype._splitShi = function(shi) {
    shi = shi.replace(/[，。！？［］；《》]/g, "$")
            .replace(/（.*）/g, "")
            .replace(/【.*】/g, "");
    shi = shi.split("$").map(function(s) {
        return s.trim();
    });
    return _.compact(shi);
};

HuaTangshi.prototype._pick = function(sentences) {
    var sentence = _.sample(sentences) || "";

    switch(sentence.length) {
        case 3: {
            var random = _.random(0, 1000);
            if(random < 500) return sentence.substr(0, 2);
            else return sentence.substr(1, 2);
            break;
        }

        case 5: {
            var random = _.random(0, 10000);
            if(random < 3000) return sentence.substr(0, 2);
            else if(random < 6000) return sentence.substr(2, 2);
            else if(random < 9000) return sentence.substr(3, 2);
            else return sentence.substr(1, 2);
            break;
        }

        case 7: {
            var random = _.random(0, 10000);
            if(random < 2000) return sentence.substr(0, 2);
            else if(random < 4000) return sentence.substr(2, 2);
            else if(random < 6000) return sentence.substr(4, 2);
            else if(random < 8000) return sentence.substr(5, 2);
            else if(random < 9000) return sentence.substr(1, 2);
            else return sentence.substr(3, 2);
            break;
        }

        default: {
            if(sentence.length < 2) {
                var Hua = require("./hua");
                var hua = new Hua({});
                return hua.generateOne();
            }

            var random = _.random(0, sentence.length - 2);
            return sentence.substr(random, 2);
        }
    }
};

HuaTangshi.prototype.generate = function() {
    var count = this.options.count || 10;
    var result = [];
    for(var i = 0; i < count; i++) {
        result.push(this.generateOne());
    }
    return result;
};

HuaTangshi.prototype.generateOne = function() {
    var json = _.sample(dict);
    var shi = this._splitShi(json.content);
    var result = new String(this._pick(shi)); // jshint ignore: line
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

module.exports = HuaTangshi;
