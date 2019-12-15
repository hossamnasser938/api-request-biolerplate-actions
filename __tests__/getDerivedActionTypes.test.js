import getDerivedActionTypes from "../src/getDerivedActionTypes";

test("test getDerivedActionTypes", () => {
  const apiRequestConfig1: ApiRequestConfigObject = {
    requestEndpoint: "url1",
    baseActionType: "ACTION_1"
  };

  const apiRequestConfig2: ApiRequestConfigObject = {
    requestEndpoint: "url2",
    baseActionType: "ACTION_2",
    noStart: true
  };

  const apiRequestConfig3: ApiRequestConfigObject = {
    requestEndpoint: "url3",
    baseActionType: "ACTION_3",
    noStop: true
  };

  const apiRequestConfig4: ApiRequestConfigObject = {
    requestEndpoint: "url4",
    baseActionType: "ACTION_4",
    noError: true
  };

  expect(getDerivedActionTypes([apiRequestConfig1])).toEqual([
    "START_ACTION_1",
    "STOP_ACTION_1",
    "ERROR_ACTION_1"
  ]);

  expect(
    getDerivedActionTypes([
      apiRequestConfig1,
      apiRequestConfig2,
      apiRequestConfig3,
      apiRequestConfig4
    ])
  ).toEqual([
    "START_ACTION_1",
    "STOP_ACTION_1",
    "ERROR_ACTION_1",
    "STOP_ACTION_2",
    "ERROR_ACTION_2",
    "START_ACTION_3",
    "ERROR_ACTION_3",
    "START_ACTION_4",
    "STOP_ACTION_4"
  ]);

  expect(getDerivedActionTypes([])).toEqual([]);
});
