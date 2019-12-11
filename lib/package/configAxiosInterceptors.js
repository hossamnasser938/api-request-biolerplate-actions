"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configAxiosInterceptors = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _highOrderInterceptors = require("./highOrderInterceptors");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const configAxiosInterceptors = (dispatch, BASE_URL, BaseActionsConfigurations) => {
  _axios.default.interceptors.request.use((0, _highOrderInterceptors.highOrderRequestOnFullfilledInterceptor)(dispatch, BASE_URL, BaseActionsConfigurations), (0, _highOrderInterceptors.highOrderRequestOnRejectedInterceptor)(dispatch, BASE_URL, BaseActionsConfigurations));

  _axios.default.interceptors.response.use((0, _highOrderInterceptors.highOrderResponseOnFullfilledInterceptor)(dispatch, BASE_URL, BaseActionsConfigurations), (0, _highOrderInterceptors.highOrderResponseOnRejectedInterceptor)(dispatch, BASE_URL, BaseActionsConfigurations));
};

exports.configAxiosInterceptors = configAxiosInterceptors;