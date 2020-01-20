//@flow
import type { ApiRequestConfigObject, RequestEndPoint } from "./types";

export default (
  requestEndpoint: RequestEndPoint,
  apiRequestsConfigs: Array<ApiRequestConfigObject>
): ApiRequestConfigObject => {
  const configObject = apiRequestsConfigs.find(
    config => !!requestEndpoint.split("?")[0].match(config.requestEndpoint)
  );

  return configObject;
};
