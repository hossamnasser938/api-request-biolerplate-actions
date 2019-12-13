import type { ApiRequestConfigObject } from "../package/types";
import configs, {
  pushConfigs,
  clearConfigs
} from "../package/apiRequestsConfigs";

beforeAll(clearConfigs);
afterAll(clearConfigs);

test("test pushing to apiRequestsConfigs", () => {
  expect(configs).toEqual([]);

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
