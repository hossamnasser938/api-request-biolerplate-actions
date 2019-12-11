"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = baseActionTypes => {
  const derivedActionTypes = baseActionTypes.reduce((acc, cBaseActionType) => {
    const cDefaultActionTypes = ["START_" + cBaseActionType, "STOP_" + cBaseActionType, "ERROR_" + cBaseActionType];
    return acc.concat(cBaseActionType ? cDefaultActionTypes : []);
  }, []);
  return derivedActionTypes;
};

exports.default = _default;