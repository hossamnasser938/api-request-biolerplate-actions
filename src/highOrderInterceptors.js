import mapRequestUrlToConfigObject from "./mapRequestUrlToConfigObject";

export const highOrderRequestOnFullfilledInterceptor = (
  dispatch,
  BASE_URL,
  BaseActionsConfigurations
) => {
  const requestOnFullfilledInterceptor = config => {
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
  dispatch,
  BASE_URL,
  BaseActionsConfigurations
) => {
  const requestOnRejectedInterceptor = error => {
    alert("requestOnRejectedInterceptor");

    return Promise.reject(error);
  };

  return requestOnRejectedInterceptor;
};

export const highOrderResponseOnFullfilledInterceptor = (
  dispatch,
  BASE_URL,
  BaseActionsConfigurations
) => {
  const responseOnFullfilledInterceptor = response => {
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
  dispatch,
  BASE_URL,
  BaseActionsConfigurations
) => {
  const responseOnRejectedInterceptor = error => {
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
        payload: { message: requestUrlConfigObject.errorMessage }
      });
    } else {
      return Promise.reject(error);
    }
  };

  return responseOnRejectedInterceptor;
};
