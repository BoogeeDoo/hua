/**
 * XadillaX created at 2016-03-04 12:08:08 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

var _ = require("lodash");
var cheerio = require("cheerio");
var Scarlet = require("scarlet-task");
var spidex = require("spidex");

var INDEX_URL = "http://www.shiku.org/xlib/gd/ts300/index.htm";
var BASE_URL = "http://www.shiku.org/xlib/gd/ts300/";

var _emptyFunc = function(){};

var HuaTangshi = function(options) {
    this.options = options;
    this.index = [];
};

HuaTangshi.prototype.init = function(callback) {
    callback = callback || _emptyFunc;
    var self = this;
    spidex.get(INDEX_URL, {
        charset: "gb2312"
    }, function(html, status) {
        if(status !== 200) {
            return callback(new Error("Failed to fetch tangshi index. " + status));
        }

        var $ = cheerio.load(html);
        var result = [];
        $("td[width=\"50%\"] > a").each(function() {
            var text = $(this).text().replace(":", "：").split("：");
            var author = text[0];
            var title = text[1];
            result.push({
                author: author.trim(),
                title: title.trim(),
                url: BASE_URL + $(this).attr("href")
            });
        });

        self.index = result;
        return callback(undefined, result);
    }).on("error", callback);
};

HuaTangshi.prototype._splitShi = function(shi) {
    shi = shi.replace(/[，。！？［］]/g, "$").replace(/（.*）/g, "");
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

            var random = _.random(0, sentence.length - 1);
            return sentence.substr(random, 2);
        }
    }
};

HuaTangshi.prototype.generate = function(callback) {
    var count = this.options.count || 10;
    var scarlet = new Scarlet(10);
    var self = this;
    var result = [];
    var proc = function(TO) {
        self.generateOne(function(err, name, meta) {
            if(err) {
                var Hua = require("./hua");
                var hua = new Hua({});
                result.push({
                    name: hua.generateOne(),
                    meta: {
                        author: "?",
                        title: "?",
                        url: "?"
                    }
                });
                return scarlet.taskDone(TO);
            }

            result.push({
                name: name,
                meta: meta
            });
            return scarlet.taskDone(TO);
        });
    };

    for(var i = 0; i < count; i++) {
        scarlet.push(null, proc);
    }

    if(!count) return callback(undefined, result);
    scarlet.afterFinish(count, function() {
        callback(undefined, result);
    }, false);
};

HuaTangshi.prototype.generateOne = function(callback) {
    callback = callback || _emptyFunc;
    var elem = _.sample(this.index);
    var self = this;
    spidex.get(elem.url, {
        charset: "gb2312"
    }, function(html, status) {
        if(status !== 200) {
            return callback(new Error("Failed to fetch tangshi [" + elem.author + "] " +
                    elem.title + ". " + status));
        }

        var $ = cheerio.load(html);
        var shi = self._splitShi($("td[valign=top] > p[align=center]").text());
        var result = self._pick(shi);
        return callback(undefined, result, elem);
    }).on("error", callback);
};

module.exports = HuaTangshi;
