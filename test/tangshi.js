/**
 * XadillaX created at 2016-03-04 12:17:16 With ♥
 *
 * Copyright (c) 2016 Souche.com, all rights
 * reserved.
 */
"use strict";

var Tangshi = require("../").Tangshi;

var tangshi = new Tangshi();
tangshi.init(function() {
    tangshi.generateOne(function(err, name, meta) {
        console.log(name, "--", meta.author, "《" + meta.title + "》");
    });
});
