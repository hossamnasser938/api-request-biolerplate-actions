//@flow
import type { ApiRequestConfigObject } from "./types";

export default (
  requestEndpoint: string,
  apiRequestsConfigs: Array<ApiRequestConfigObject>
): ApiRequestConfigObject => {
  const configObject = apiRequestsConfigs.find(
    config => config.requestEndpoint === requestEndpoint.split("?")[0]
  );

  return configObject;
};
