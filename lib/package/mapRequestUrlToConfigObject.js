"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = (requestUrl, BaseActionsConfigurations) => {
  const configObject = BaseActionsConfigurations.find(config => config.requestUrl === requestUrl.split("?")[0]);

  if (configObject) {
    return configObject;
  } else {
    throw new Error("strange request url: " + requestUrl);
  }
};

exports.default = _default;