// @flow
import type {
  Dispatch,
  RequestOnFullfilledInterceptor,
  RequestOnRejectedInterceptor,
  ResponseOnFullfilledInterceptor,
  ResponseOnRejectedInterceptor
} from "./types";
import apiRequestsConfigs from "./apiRequestsConfigs";
import mapRequestEndpointToConfigObject from "./mapRequestEndpointToConfigObject.js";
import getErrorHandler from "./getErrorHandler";

export const highOrderRequestOnFullfilledInterceptor = (
  dispatch: Dispatch,
  BASE_URL: string
): RequestOnFullfilledInterceptor => {
  const requestOnFullfilledInterceptor: RequestOnFullfilledInterceptor = config => {
    const requestUrlConfigObject = mapRequestEndpointToConfigObject(
      config.url,
      apiRequestsConfigs
    );

    if (!requestUrlConfigObject) {
      return config;
    }

    if (!requestUrlConfigObject.noStart) {
      dispatch({
        type: "START_" + requestUrlConfigObject.baseActionType
      });
    }

    return config;
  };

  return requestOnFullfilledInterceptor;
};

export const highOrderRequestOnRejectedInterceptor = (
  dispatch: Dispatch,
  BASE_URL: string
): RequestOnRejectedInterceptor => {
  const requestOnRejectedInterceptor: RequestOnRejectedInterceptor = error => {
    alert("requestOnRejectedInterceptor");

    return Promise.reject(error);
  };

  return requestOnRejectedInterceptor;
};

export const highOrderResponseOnFullfilledInterceptor = (
  dispatch: Dispatch,
  BASE_URL: string
): ResponseOnFullfilledInterceptor => {
  const responseOnFullfilledInterceptor: ResponseOnFullfilledInterceptor = response => {
    const requestUrlConfigObject = mapRequestEndpointToConfigObject(
      response.config.url.includes(BASE_URL)
        ? response.config.url.split(BASE_URL)[1]
        : response.config.url,
      apiRequestsConfigs
    );

    if (!requestUrlConfigObject) {
      return response;
    }

    if (!requestUrlConfigObject.noStop) {
      dispatch({
        type: "STOP_" + requestUrlConfigObject.baseActionType
      });
    }

    if (!requestUrlConfigObject.noSuccess) {
      dispatch({
        type: "SUCCESS_" + requestUrlConfigObject.baseActionType,
        payload: response
      });
    }

    return response;
  };

  return responseOnFullfilledInterceptor;
};

export const highOrderResponseOnRejectedInterceptor = (
  dispatch: Dispatch,
  BASE_URL: string
): ResponseOnRejectedInterceptor => {
  const responseOnRejectedInterceptor: ResponseOnRejectedInterceptor = error => {
    const requestUrlConfigObject = mapRequestEndpointToConfigObject(
      error.config.url.includes(BASE_URL)
        ? error.config.url.split(BASE_URL)[1]
        : error.config.url,
      apiRequestsConfigs
    );

    if (!requestUrlConfigObject) {
      return Promise.reject(error);
    }

    if (!requestUrlConfigObject.noStop) {
      dispatch({
        type: "STOP_" + requestUrlConfigObject.baseActionType
      });
    }

    const errorHandler = getErrorHandler();

    if (errorHandler && requestUrlConfigObject.errorMessage) {
      errorHandler(requestUrlConfigObject.errorMessage);
    }

    if (!requestUrlConfigObject.noError) {
      dispatch({
        type: "ERROR_" + requestUrlConfigObject.baseActionType,
        payload: requestUrlConfigObject.errorMessage
          ? { message: requestUrlConfigObject.errorMessage }
          : error
      });
    }

    if (
      (!errorHandler || !requestUrlConfigObject.errorMessage) &&
      requestUrlConfigObject.noError
    ) {
      return Promise.reject(error);
    }
  };

  return responseOnRejectedInterceptor;
};
