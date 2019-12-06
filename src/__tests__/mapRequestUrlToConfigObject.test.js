import mapRequestUrlToConfigObject from "../mapRequestUrlToConfigObject";

test("test mapRequestUrlToConfigObject", () => {
  const action1Config = {
    requestUrl: "url1",
    baseActionType: "ACTION_1"
  };

  const action2Config = {
    requestUrl: "url2",
    baseActionType: "ACTION_2"
  };

  const BaseActionsConfigurations = [action1Config, action2Config];

  expect(mapRequestUrlToConfigObject("url1", BaseActionsConfigurations)).toBe(
    action1Config
  );
  expect(mapRequestUrlToConfigObject("url2", BaseActionsConfigurations)).toBe(
    action2Config
  );

  expect(() =>
    mapRequestUrlToConfigObject("action3", BaseActionsConfigurations)
  ).toThrow("strange request url: action3");
});
