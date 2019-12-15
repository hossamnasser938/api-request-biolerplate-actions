"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _config = require(".config");

Object.keys(_config).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _config[key];
    }
  });
});

var _highOrderReducer = require(".highOrderReducer");

Object.keys(_highOrderReducer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _highOrderReducer[key];
    }
  });
});