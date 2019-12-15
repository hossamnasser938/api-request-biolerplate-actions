"use strict";

var _getDerivedActionTypes = _interopRequireDefault(require("../package/getDerivedActionTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("test getDerivedActionTypes", () => {
  const apiRequestConfig1 = {
    requestEndpoint: "url1",
    baseActionType: "ACTION_1"
  };
  const apiRequestConfig2 = {
    requestEndpoint: "url2",
    baseActionType: "ACTION_2",
    noStart: true
  };
  const apiRequestConfig3 = {
    requestEndpoint: "url3",
    baseActionType: "ACTION_3",
    noStop: true
  };
  const apiRequestConfig4 = {
    requestEndpoint: "url4",
    baseActionType: "ACTION_4",
    noError: true
  };
  expect((0, _getDerivedActionTypes.default)([apiRequestConfig1])).toEqual(["START_ACTION_1", "STOP_ACTION_1", "ERROR_ACTION_1"]);
  expect((0, _getDerivedActionTypes.default)([apiRequestConfig1, apiRequestConfig2, apiRequestConfig3, apiRequestConfig4])).toEqual(["START_ACTION_1", "STOP_ACTION_1", "ERROR_ACTION_1", "STOP_ACTION_2", "ERROR_ACTION_2", "START_ACTION_3", "ERROR_ACTION_3", "START_ACTION_4", "STOP_ACTION_4"]);
  expect((0, _getDerivedActionTypes.default)([])).toEqual([]);
});