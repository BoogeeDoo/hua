/**
 * XadillaX created at 2016-03-04 12:17:16 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

var Tangshi = require("../").HuaSource;

var tangshi = new Tangshi({ source: "tangshi" });
var result = tangshi.generateOne();

console.log(result, "--", result._meta.author, "《" + result._meta.title + "》");
