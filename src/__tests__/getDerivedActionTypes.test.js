import getDerivedActionTypes from "../getDerivedActionTypes";

test("test getDerivedActionTypes", () => {
  expect(getDerivedActionTypes(["BASE_ACTION"])).toEqual([
    "START_BASE_ACTION",
    "STOP_BASE_ACTION",
    "ERROR_BASE_ACTION"
  ]);
  expect(getDerivedActionTypes(["BASE_ACTION_1", "BASE_ACTION_2"])).toEqual([
    "START_BASE_ACTION_1",
    "STOP_BASE_ACTION_1",
    "ERROR_BASE_ACTION_1",
    "START_BASE_ACTION_2",
    "STOP_BASE_ACTION_2",
    "ERROR_BASE_ACTION_2"
  ]);
  expect(getDerivedActionTypes([""])).toEqual([]);
  expect(getDerivedActionTypes([])).toEqual([]);
});
