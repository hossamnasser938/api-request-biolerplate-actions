"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = require("axios");

var _helperFunctions = require("./helperFunctions");

var _default = (axiosRequestConfig, apiRequestsConfigs, BASE_URL) => {
  const requestEndPoint = axiosRequestConfig.url.includes(BASE_URL) ? axiosRequestConfig.url.split(BASE_URL)[1] : axiosRequestConfig.url;
  const noParameterRequestEndPoint = requestEndPoint.split("?")[0];
  const noSlashRequestEndpoint = (0, _helperFunctions.removeSlashIfExists)(noParameterRequestEndPoint);
  const configObject = apiRequestsConfigs.find(config => {
    let doesMatch;

    if (typeof config.requestEndPoint === "string") {
      const noSlashConfigEndpoint = (0, _helperFunctions.removeSlashIfExists)(config.requestEndPoint);
      doesMatch = noSlashConfigEndpoint === noSlashRequestEndpoint;
    } else if (config.requestEndPoint instanceof RegExp) {
      doesMatch = config.requestEndPoint.test(noSlashRequestEndpoint);
    }

    return doesMatch && (config.requestMethod ? config.requestMethod === axiosRequestConfig.method : true);
  });
  return configObject;
};

exports.default = _default;