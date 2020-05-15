//@flow
import type { ApiRequestConfigObject, RequestEndPoint } from "./types";
import { AxiosRequestConfig } from "axios";
import { BASE_URL } from "./config";

export default (
  axiosRequestConfig: AxiosRequestConfig,
  apiRequestsConfigs: Array<ApiRequestConfigObject>
): ApiRequestConfigObject => {
  const requestEndpoint = axiosRequestConfig.url.includes(BASE_URL)
    ? axiosRequestConfig.url.split(BASE_URL)[1]
    : axiosRequestConfig.url;

  const configObject = apiRequestsConfigs.find(
    config =>
      !!requestEndpoint.split("?")[0].match(config.requestEndpoint) &&
      (config.requestMethod
        ? config.requestMethod === axiosRequestConfig.method
        : true)
  );

  return configObject;
};
