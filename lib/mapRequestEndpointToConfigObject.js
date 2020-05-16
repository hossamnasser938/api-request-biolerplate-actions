"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = require("axios");

var _config = require("./config");

var _default = (axiosRequestConfig, apiRequestsConfigs) => {
  const requestEndPoint = axiosRequestConfig.url.includes(_config.BASE_URL)
    ? axiosRequestConfig.url.split(_config.BASE_URL)[1]
    : axiosRequestConfig.url;
  const configObject = apiRequestsConfigs.find(
    config =>
      !!requestEndPoint.split("?")[0].match(config.requestEndPoint) &&
      (config.requestMethod
        ? config.requestMethod === axiosRequestConfig.method
        : true)
  );
  return configObject;
};

exports.default = _default;
