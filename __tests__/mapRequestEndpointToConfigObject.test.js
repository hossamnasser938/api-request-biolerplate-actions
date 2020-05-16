// @flow
import type { ApiRequestConfigObject } from "../src/types";
import mapRequestEndpointToConfigObject from "../src/mapRequestEndpointToConfigObject";

const BASE_URL = "http://www.example.com/";

test("test mapRequestEndpointToConfigObject", () => {
  const apiRequestConfig1: ApiRequestConfigObject = {
    requestEndPoint: "url1",
    requestMethod: "GET",
    baseActionType: "ACTION_1"
  };

  const apiRequestConfig2: ApiRequestConfigObject = {
    requestEndPoint: "url2",
    baseActionType: "ACTION_2"
  };

  const apiRequestConfig3: ApiRequestConfigObject = {
    requestEndPoint: "url3",
    baseActionType: "ACTION_3"
  };

  const apiRequestConfig4: ApiRequestConfigObject = {
    requestEndPoint: /^url4\/[\d]+$/,
    baseActionType: "ACTION_4"
  };

  const BaseActionsConfigurations = [
    apiRequestConfig1,
    apiRequestConfig2,
    apiRequestConfig3,
    apiRequestConfig4
  ];

  expect(
    mapRequestEndpointToConfigObject(
      { url: "url1", method: "GET" },
      BaseActionsConfigurations,
      BASE_URL
    )
  ).toBe(apiRequestConfig1);

  expect(
    mapRequestEndpointToConfigObject(
      { url: "url1", method: "POST" },
      BaseActionsConfigurations,
      BASE_URL
    )
  ).toBeUndefined();

  expect(
    mapRequestEndpointToConfigObject(
      { url: "url2" },
      BaseActionsConfigurations,
      BASE_URL
    )
  ).toBe(apiRequestConfig2);

  expect(
    mapRequestEndpointToConfigObject(
      { url: "url3?param=value" },
      BaseActionsConfigurations,
      BASE_URL
    )
  ).toBe(apiRequestConfig3);

  expect(
    mapRequestEndpointToConfigObject(
      { url: "url4/4444" },
      BaseActionsConfigurations,
      BASE_URL
    )
  ).toBe(apiRequestConfig4);

  expect(
    mapRequestEndpointToConfigObject(
      { url: "url4/4444?param=value" },
      BaseActionsConfigurations,
      BASE_URL
    )
  ).toBe(apiRequestConfig4);

  expect(
    mapRequestEndpointToConfigObject(
      { url: "strange_url" },
      BaseActionsConfigurations,
      BASE_URL
    )
  ).toBeUndefined();

  expect(
    mapRequestEndpointToConfigObject(
      { url: "url4" },
      BaseActionsConfigurations,
      BASE_URL
    )
  ).toBeUndefined();

  expect(
    mapRequestEndpointToConfigObject(
      { url: "url4/url5/44" },
      BaseActionsConfigurations,
      BASE_URL
    )
  ).toBeUndefined();
});
