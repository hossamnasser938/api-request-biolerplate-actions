import type { ApiRequestConfigObject } from "../src/types";
import configs, { pushConfigs, clearConfigs } from "../src/apiRequestsConfigs";

beforeAll(clearConfigs);
afterAll(clearConfigs);

test("test pushing to apiRequestsConfigs", () => {
  expect(configs).toEqual([]);

  const apiRequestConfig1: ApiRequestConfigObject = {
    requestEndPoint: "url1",
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

  pushConfigs([apiRequestConfig1, apiRequestConfig2]);

  expect(configs).toEqual([apiRequestConfig1, apiRequestConfig2]);

  pushConfigs([apiRequestConfig3]);

  expect(configs).toEqual([
    apiRequestConfig1,
    apiRequestConfig2,
    apiRequestConfig3
  ]);

  clearConfigs();

  expect(configs).toEqual([]);
});
