// @flow
import type { ApiRequestConfigObject } from "../src/types";
import mapRequestEndpointToConfigObject from "../src/mapRequestEndpointToConfigObject";

test("test mapRequestEndpointToConfigObject", () => {
  const apiRequestConfig1: ApiRequestConfigObject = {
    requestEndpoint: "url1",
    baseActionType: "ACTION_1"
  };

  const apiRequestConfig2: ApiRequestConfigObject = {
    requestEndpoint: "url2",
    baseActionType: "ACTION_2"
  };

  const apiRequestConfig3: ApiRequestConfigObject = {
    requestEndpoint: "url3",
    baseActionType: "ACTION_3"
  };

  const apiRequestConfig4: ApiRequestConfigObject = {
    requestEndpoint: /^url4\/[\d]+$/,
    baseActionType: "ACTION_4"
  };

  const BaseActionsConfigurations = [
    apiRequestConfig1,
    apiRequestConfig2,
    apiRequestConfig3,
    apiRequestConfig4
  ];

  expect(
    mapRequestEndpointToConfigObject("url1", BaseActionsConfigurations)
  ).toBe(apiRequestConfig1);

  expect(
    mapRequestEndpointToConfigObject("url2", BaseActionsConfigurations)
  ).toBe(apiRequestConfig2);

  expect(
    mapRequestEndpointToConfigObject(
      "url3?param=value",
      BaseActionsConfigurations
    )
  ).toBe(apiRequestConfig3);

  expect(
    mapRequestEndpointToConfigObject("url4/4444", BaseActionsConfigurations)
  ).toBe(apiRequestConfig4);

  expect(
    mapRequestEndpointToConfigObject(
      "url4/4444?param=value",
      BaseActionsConfigurations
    )
  ).toBe(apiRequestConfig4);

  expect(
    mapRequestEndpointToConfigObject("strange_url", BaseActionsConfigurations)
  ).toBeUndefined();

  expect(
    mapRequestEndpointToConfigObject("url4", BaseActionsConfigurations)
  ).toBeUndefined();

  expect(
    mapRequestEndpointToConfigObject("url4/url5/44", BaseActionsConfigurations)
  ).toBeUndefined();
});
