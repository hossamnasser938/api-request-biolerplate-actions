"use strict";

var _configAxiosInterceptors = require("../package/configAxiosInterceptors");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("test configAxiosInterceptors", () => {
  expect(_axios.default.interceptors.request.handlers[0]).toBeUndefined();
  expect(_axios.default.interceptors.response.handlers[0]).toBeUndefined();
  (0, _configAxiosInterceptors.configAxiosInterceptors)(() => {}, "", []);
  expect(_axios.default.interceptors.request.handlers[0]).toBeDefined();
  expect(_axios.default.interceptors.request.handlers[0].fulfilled).toBeDefined();
  expect(_axios.default.interceptors.request.handlers[0].rejected).toBeDefined();
  expect(_axios.default.interceptors.response.handlers[0]).toBeDefined();
  expect(_axios.default.interceptors.response.handlers[0].fulfilled).toBeDefined();
  expect(_axios.default.interceptors.response.handlers[0].rejected).toBeDefined();
});