"use strict";

var _mapRequestEndpointToConfigObject = _interopRequireDefault(require("../package/mapRequestEndpointToConfigObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("test mapRequestEndpointToConfigObject", () => {
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
  const BaseActionsConfigurations = [apiRequestConfig1, apiRequestConfig2, apiRequestConfig3];
  expect((0, _mapRequestEndpointToConfigObject.default)("url1", BaseActionsConfigurations)).toBe(apiRequestConfig1);
  expect((0, _mapRequestEndpointToConfigObject.default)("url2", BaseActionsConfigurations)).toBe(apiRequestConfig2);
  expect((0, _mapRequestEndpointToConfigObject.default)("url3?param=value", BaseActionsConfigurations)).toBe(apiRequestConfig3);
  expect(() => (0, _mapRequestEndpointToConfigObject.default)("action3", BaseActionsConfigurations)).toThrow("strange request endpoint: action3");
});