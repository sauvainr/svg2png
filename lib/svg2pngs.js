"use strict";

var path = require("path");
var execFile = require("child_process").execFile;

var phantomjsCmd = require("phantomjs").path;
var converterFileName = path.resolve(__dirname, "./converter.js");

module.exports = function svgToPngs(sourceFileName, destFileName, number, duration, scale, cb) {
    if (typeof scale === "function") {
        cb = scale;
        scale = 1.0;
    }

    var args = [converterFileName, sourceFileName, destFileName, scale, number, duration];
    execFile(phantomjsCmd, args, function (err, stdout, stderr) {
        if (err) {
            cb(err);
        } else if (stdout.length > 0) { // PhantomJS always outputs to stdout.
            cb(new Error(stdout.toString().trim()));
        } else if (stderr.length > 0) { // But hey something else might get to stderr.
            cb(new Error(stderr.toString().trim()));
        } else {
            cb(null);
        }
    });
};

