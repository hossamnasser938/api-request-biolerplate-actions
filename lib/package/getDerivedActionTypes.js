"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = apiRequestsConfigsSubset => {
  const derivedActionTypes = apiRequestsConfigsSubset.reduce((acc, apiRequestConfig) => {
    const defaultActionTypes = [];

    if (!apiRequestConfig.noStart) {
      defaultActionTypes.push("START_" + apiRequestConfig.baseActionType);
    }

    if (!apiRequestConfig.noStop) {
      defaultActionTypes.push("STOP_" + apiRequestConfig.baseActionType);
    }

    if (!apiRequestConfig.noError) {
      defaultActionTypes.push("ERROR_" + apiRequestConfig.baseActionType);
    }

    return acc.concat(defaultActionTypes);
  }, []);
  return derivedActionTypes;
};

exports.default = _default;