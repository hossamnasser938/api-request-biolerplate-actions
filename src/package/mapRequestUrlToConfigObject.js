//@flow
import type { ActionConfigurationObject } from "./types";

export default (
  requestUrl: string,
  BaseActionsConfigurations: Array<ActionConfigurationObject>
): ActionConfigurationObject => {
  const configObject = BaseActionsConfigurations.find(
    config => config.requestUrl === requestUrl.split("?")[0]
  );

  if (configObject) {
    return configObject;
  } else {
    throw new Error("strange request url: " + requestUrl);
  }
};
