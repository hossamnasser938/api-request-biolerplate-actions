"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (requestEndpoint, apiRequestsConfigs) => {
  const configObject = apiRequestsConfigs.find(config => !!requestEndpoint.split("?")[0].match(config.requestEndpoint));
  return configObject;
};

exports.default = _default;