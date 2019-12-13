import type { ActionConfigurationObject } from "../package/types";
import configs, {
  pushConfigs,
  clearConfigs
} from "../package/apiRequestsConfigs";

beforeAll(clearConfigs);
afterAll(clearConfigs);

test("test pushing to apiRequestsConfigs", () => {
  expect(configs).toEqual([]);

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

  pushConfigs([action1Config, action2Config]);

  expect(configs).toEqual([action1Config, action2Config]);

  pushConfigs([action3Config]);

  expect(configs).toEqual([action1Config, action2Config, action3Config]);

  clearConfigs();

  expect(configs).toEqual([]);
});
