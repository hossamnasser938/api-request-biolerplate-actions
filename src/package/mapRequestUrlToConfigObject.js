//@flow
import type { ApiRequestConfigObject } from "./types";

export default (
  requestUrl: string,
  apiRequestsConfigs: Array<ApiRequestConfigObject>
): ApiRequestConfigObject => {
  const configObject = apiRequestsConfigs.find(
    config => config.requestUrl === requestUrl.split("?")[0]
  );

  if (configObject) {
    return configObject;
  } else {
    throw new Error("strange request url: " + requestUrl);
  }
};
