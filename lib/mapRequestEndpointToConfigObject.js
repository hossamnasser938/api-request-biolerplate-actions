"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (requestEndpoint, apiRequestsConfigs) => {
  const configObject = apiRequestsConfigs.find(config => config.requestEndpoint === requestEndpoint.split("?")[0]);

  if (configObject) {
    return configObject;
  } else {
    throw new Error("strange request endpoint: " + requestEndpoint);
  }
};

exports.default = _default;