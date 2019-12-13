// @flow
import type { ApiRequestConfigObject } from "../package/types";
import mapRequestUrlToConfigObject from "../package/mapRequestUrlToConfigObject";

test("test mapRequestUrlToConfigObject", () => {
  const apiRequestConfig1: ApiRequestConfigObject = {
    requestUrl: "url1",
    baseActionType: "ACTION_1"
  };

  const apiRequestConfig2: ApiRequestConfigObject = {
    requestUrl: "url2",
    baseActionType: "ACTION_2"
  };

  const apiRequestConfig3: ApiRequestConfigObject = {
    requestUrl: "url3",
    baseActionType: "ACTION_3"
  };

  const BaseActionsConfigurations = [
    apiRequestConfig1,
    apiRequestConfig2,
    apiRequestConfig3
  ];

  expect(mapRequestUrlToConfigObject("url1", BaseActionsConfigurations)).toBe(
    apiRequestConfig1
  );

  expect(mapRequestUrlToConfigObject("url2", BaseActionsConfigurations)).toBe(
    apiRequestConfig2
  );

  expect(
    mapRequestUrlToConfigObject("url3?param=value", BaseActionsConfigurations)
  ).toBe(apiRequestConfig3);

  expect(() =>
    mapRequestUrlToConfigObject("action3", BaseActionsConfigurations)
  ).toThrow("strange request url: action3");
});
