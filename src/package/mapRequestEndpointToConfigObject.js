//@flow
import type { ApiRequestConfigObject } from "./types";

export default (
  requestEndpoint: string,
  apiRequestsConfigs: Array<ApiRequestConfigObject>
): ApiRequestConfigObject => {
  const configObject = apiRequestsConfigs.find(
    config => config.requestEndpoint === requestEndpoint.split("?")[0]
  );

  if (configObject) {
    return configObject;
  } else {
    throw new Error("strange request endpoint: " + requestEndpoint);
  }
};
