// @flow
import type {
  Dispatch,
  ActionConfigurationObject,
  RequestOnFullfilledInterceptor,
  RequestOnRejectedInterceptor,
  ResponseOnFullfilledInterceptor,
  ResponseOnRejectedInterceptor
} from "./types";
import mapRequestUrlToConfigObject from "./mapRequestUrlToConfigObject";

export const highOrderRequestOnFullfilledInterceptor = (
  dispatch: Dispatch,
  BASE_URL: string,
  BaseActionsConfigurations: Array<ActionConfigurationObject>
): RequestOnFullfilledInterceptor => {
  const requestOnFullfilledInterceptor: RequestOnFullfilledInterceptor = config => {
    const requestUrlConfigObject = mapRequestUrlToConfigObject(
      config.url,
      BaseActionsConfigurations
    );

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
  BASE_URL: string,
  BaseActionsConfigurations: Array<ActionConfigurationObject>
): RequestOnRejectedInterceptor => {
  const requestOnRejectedInterceptor: RequestOnRejectedInterceptor = error => {
    alert("requestOnRejectedInterceptor");

    return Promise.reject(error);
  };

  return requestOnRejectedInterceptor;
};

export const highOrderResponseOnFullfilledInterceptor = (
  dispatch: Dispatch,
  BASE_URL: string,
  BaseActionsConfigurations: Array<ActionConfigurationObject>
): ResponseOnFullfilledInterceptor => {
  const responseOnFullfilledInterceptor: ResponseOnFullfilledInterceptor = response => {
    const requestUrlConfigObject = mapRequestUrlToConfigObject(
      response.config.url.split(BASE_URL)[1],
      BaseActionsConfigurations
    );

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
  BASE_URL: string,
  BaseActionsConfigurations: Array<ActionConfigurationObject>
): ResponseOnRejectedInterceptor => {
  const responseOnRejectedInterceptor: ResponseOnRejectedInterceptor = error => {
    const requestUrlConfigObject = mapRequestUrlToConfigObject(
      error.config.url.split(BASE_URL)[1],
      BaseActionsConfigurations
    );

    if (!requestUrlConfigObject.noStop) {
      dispatch({
        type: "STOP_" + requestUrlConfigObject.baseActionType
      });
    }

    if (!requestUrlConfigObject.noError) {
      dispatch({
        type: "ERROR_" + requestUrlConfigObject.baseActionType,
        payload: requestUrlConfigObject.errorMessage
          ? { message: requestUrlConfigObject.errorMessage }
          : error
      });
    } else {
      return Promise.reject(error);
    }
  };

  return responseOnRejectedInterceptor;
};
