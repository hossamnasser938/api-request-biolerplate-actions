"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.clearConfigs = exports.pushConfigs = void 0;
const configs = [];

const pushConfigs = extraConfigs => {
  configs.push(...extraConfigs);
};

exports.pushConfigs = pushConfigs;

const clearConfigs = () => {
  // just for unit testing
  configs.splice(0, configs.length);
};

exports.clearConfigs = clearConfigs;
var _default = configs;
exports.default = _default;