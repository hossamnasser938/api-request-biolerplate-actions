"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.config = void 0;

var _getErrorHandler = require("./getErrorHandler");

var _axios = _interopRequireDefault(require("axios"));

var _highOrderInterceptors = require("./highOrderInterceptors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const config = (dispatch, BASE_URL, errorHandler) => {
  if (errorHandler) {
    (0, _getErrorHandler.setErrorHandler)(errorHandler);
  }

  _axios.default.interceptors.request.use((0, _highOrderInterceptors.highOrderRequestOnFullfilledInterceptor)(dispatch, BASE_URL), (0, _highOrderInterceptors.highOrderRequestOnRejectedInterceptor)(dispatch, BASE_URL));

  _axios.default.interceptors.response.use((0, _highOrderInterceptors.highOrderResponseOnFullfilledInterceptor)(dispatch, BASE_URL), (0, _highOrderInterceptors.highOrderResponseOnRejectedInterceptor)(dispatch, BASE_URL));
};

exports.config = config;