"use strict";

var _mapRequestUrlToConfigObject = _interopRequireDefault(require("../package/mapRequestUrlToConfigObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("test mapRequestUrlToConfigObject", () => {
  const action1Config = {
    requestUrl: "url1",
    baseActionType: "ACTION_1"
  };
  const action2Config = {
    requestUrl: "url2",
    baseActionType: "ACTION_2"
  };
  const action3Config = {
    requestUrl: "url3",
    baseActionType: "ACTION_3"
  };
  const BaseActionsConfigurations = [action1Config, action2Config, action3Config];
  expect((0, _mapRequestUrlToConfigObject.default)("url1", BaseActionsConfigurations)).toBe(action1Config);
  expect((0, _mapRequestUrlToConfigObject.default)("url2", BaseActionsConfigurations)).toBe(action2Config);
  expect((0, _mapRequestUrlToConfigObject.default)("url3?param=value", BaseActionsConfigurations)).toBe(action3Config);
  expect(() => (0, _mapRequestUrlToConfigObject.default)("action3", BaseActionsConfigurations)).toThrow("strange request url: action3");
});