"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _sort = _interopRequireDefault(require("./utilties/sort"));

var app = (0, _express["default"])();
var hostname = "localhost";
var port = 8017;
app.get("/", function (req, res) {
  res.end("<h1>Hello world</h1>");
});
app.listen(port, hostname, function () {
  console.log("server run at ".concat(hostname, ":").concat(port));
});