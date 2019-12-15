"use strict";

var _apiRequestsConfigs = _interopRequireWildcard(require("../package/apiRequestsConfigs"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

beforeAll(_apiRequestsConfigs.clearConfigs);
afterAll(_apiRequestsConfigs.clearConfigs);
test("test pushing to apiRequestsConfigs", () => {
  expect(_apiRequestsConfigs.default).toEqual([]);
  const apiRequestConfig1 = {
    requestEndpoint: "url1",
    baseActionType: "ACTION_1"
  };
  const apiRequestConfig2 = {
    requestEndpoint: "url2",
    baseActionType: "ACTION_2"
  };
  const apiRequestConfig3 = {
    requestEndpoint: "url3",
    baseActionType: "ACTION_3"
  };
  (0, _apiRequestsConfigs.pushConfigs)([apiRequestConfig1, apiRequestConfig2]);
  expect(_apiRequestsConfigs.default).toEqual([apiRequestConfig1, apiRequestConfig2]);
  (0, _apiRequestsConfigs.pushConfigs)([apiRequestConfig3]);
  expect(_apiRequestsConfigs.default).toEqual([apiRequestConfig1, apiRequestConfig2, apiRequestConfig3]);
  (0, _apiRequestsConfigs.clearConfigs)();
  expect(_apiRequestsConfigs.default).toEqual([]);
});