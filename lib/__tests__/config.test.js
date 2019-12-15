"use strict";

var _config = require("../package/config");

var _axios = _interopRequireDefault(require("axios"));

var _getErrorHandler = _interopRequireWildcard(require("../package/getErrorHandler"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

beforeAll(_getErrorHandler.resetErrorHandler);
afterAll(_getErrorHandler.resetErrorHandler);
test("test config", () => {
  expect(_axios.default.interceptors.request.handlers[0]).toBeUndefined();
  expect(_axios.default.interceptors.response.handlers[0]).toBeUndefined();
  expect((0, _getErrorHandler.default)()).toBeUndefined();
  (0, _config.config)(() => {}, "", [], message => {});
  expect((0, _getErrorHandler.default)()).toBeDefined();
  expect(_axios.default.interceptors.request.handlers[0]).toBeDefined();
  expect(_axios.default.interceptors.request.handlers[0].fulfilled).toBeDefined();
  expect(_axios.default.interceptors.request.handlers[0].rejected).toBeDefined();
  expect(_axios.default.interceptors.response.handlers[0]).toBeDefined();
  expect(_axios.default.interceptors.response.handlers[0].fulfilled).toBeDefined();
  expect(_axios.default.interceptors.response.handlers[0].rejected).toBeDefined();
});