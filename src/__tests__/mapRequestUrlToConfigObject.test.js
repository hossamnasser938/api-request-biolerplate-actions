// @flow
import type { ActionConfigurationObject } from "../package/types";
import mapRequestUrlToConfigObject from "../package/mapRequestUrlToConfigObject";

test("test mapRequestUrlToConfigObject", () => {
  const action1Config: ActionConfigurationObject = {
    requestUrl: "url1",
    baseActionType: "ACTION_1"
  };

  const action2Config: ActionConfigurationObject = {
    requestUrl: "url2",
    baseActionType: "ACTION_2"
  };

  const action3Config: ActionConfigurationObject = {
    requestUrl: "url3",
    baseActionType: "ACTION_3"
  };

  const BaseActionsConfigurations = [
    action1Config,
    action2Config,
    action3Config
  ];

  expect(mapRequestUrlToConfigObject("url1", BaseActionsConfigurations)).toBe(
    action1Config
  );

  expect(mapRequestUrlToConfigObject("url2", BaseActionsConfigurations)).toBe(
    action2Config
  );

  expect(
    mapRequestUrlToConfigObject("url3?param=value", BaseActionsConfigurations)
  ).toBe(action3Config);

  expect(() =>
    mapRequestUrlToConfigObject("action3", BaseActionsConfigurations)
  ).toThrow("strange request url: action3");
});
