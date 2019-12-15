"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.resetErrorHandler = exports.setErrorHandler = void 0;
let errorHandler;

const setErrorHandler = errHandler => {
  errorHandler = errHandler;
};

exports.setErrorHandler = setErrorHandler;

const resetErrorHandler = () => {
  // just for unit testing
  errorHandler = undefined;
};

exports.resetErrorHandler = resetErrorHandler;

var _default = () => errorHandler;

exports.default = _default;