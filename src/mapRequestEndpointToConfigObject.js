//@flow
import type { ApiRequestConfigObject, requestEndpoint } from "./types";
import { AxiosRequestConfig } from "axios";
import { removeSlashIfExists } from "./helperFunctions";

export default (
  axiosRequestConfig: AxiosRequestConfig,
  apiRequestsConfigs: Array<ApiRequestConfigObject>,
  BASE_URL
): ApiRequestConfigObject => {
  const requestEndpoint = axiosRequestConfig.url.includes(BASE_URL)
    ? axiosRequestConfig.url.split(BASE_URL)[1]
    : axiosRequestConfig.url;

  const noParameterRequestEndPoint = requestEndpoint.split("?")[0];

  const noSlashRequestEndpoint = removeSlashIfExists(
    noParameterRequestEndPoint
  );

  const configObject = apiRequestsConfigs.find(config => {
    let doesMatch;

    if (typeof config.requestEndpoint === "string") {
      const noSlashConfigEndpoint = removeSlashIfExists(config.requestEndpoint);

      doesMatch = noSlashConfigEndpoint === noSlashRequestEndpoint;
    } else if (config.requestEndpoint instanceof RegExp) {
      doesMatch = config.requestEndpoint.test(noSlashRequestEndpoint);
    }

    return (
      doesMatch &&
      (config.requestMethod
        ? config.requestMethod === axiosRequestConfig.method
        : true)
    );
  });

  return configObject;
};
