"use strict";

var _getDerivedActionTypes = _interopRequireDefault(require("../package/getDerivedActionTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test("test getDerivedActionTypes", () => {
  expect((0, _getDerivedActionTypes.default)(["BASE_ACTION"])).toEqual(["START_BASE_ACTION", "STOP_BASE_ACTION", "ERROR_BASE_ACTION"]);
  expect((0, _getDerivedActionTypes.default)(["BASE_ACTION_1", "BASE_ACTION_2"])).toEqual(["START_BASE_ACTION_1", "STOP_BASE_ACTION_1", "ERROR_BASE_ACTION_1", "START_BASE_ACTION_2", "STOP_BASE_ACTION_2", "ERROR_BASE_ACTION_2"]);
  expect((0, _getDerivedActionTypes.default)([""])).toEqual([]);
  expect((0, _getDerivedActionTypes.default)([])).toEqual([]);
});