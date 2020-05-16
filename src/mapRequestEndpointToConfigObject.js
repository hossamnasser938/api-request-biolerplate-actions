//@flow
import type { ApiRequestConfigObject, requestEndPoint } from "./types";
import { AxiosRequestConfig } from "axios";
import { removeSlashIfExists } from "./helperFunctions";

export default (
  axiosRequestConfig: AxiosRequestConfig,
  apiRequestsConfigs: Array<ApiRequestConfigObject>,
  BASE_URL
): ApiRequestConfigObject => {
  const requestEndPoint = axiosRequestConfig.url.includes(BASE_URL)
    ? axiosRequestConfig.url.split(BASE_URL)[1]
    : axiosRequestConfig.url;

  const noParameterRequestEndPoint = requestEndPoint.split("?")[0];

  const noSlashRequestEndpoint = removeSlashIfExists(
    noParameterRequestEndPoint
  );

  const configObject = apiRequestsConfigs.find(config => {
    let doesMatch;

    if (typeof config.requestEndPoint === "string") {
      const noSlashConfigEndpoint = removeSlashIfExists(config.requestEndPoint);

      doesMatch = noSlashConfigEndpoint === noSlashRequestEndpoint;
    } else if (config.requestEndPoint instanceof RegExp) {
      doesMatch = config.requestEndPoint.test(noSlashRequestEndpoint);
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
