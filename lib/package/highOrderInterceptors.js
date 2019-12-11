"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.highOrderResponseOnRejectedInterceptor = exports.highOrderResponseOnFullfilledInterceptor = exports.highOrderRequestOnRejectedInterceptor = exports.highOrderRequestOnFullfilledInterceptor = void 0;

var _mapRequestUrlToConfigObject = _interopRequireDefault(require("./mapRequestUrlToConfigObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const highOrderRequestOnFullfilledInterceptor = (dispatch, BASE_URL, BaseActionsConfigurations) => {
  const requestOnFullfilledInterceptor = config => {
    const requestUrlConfigObject = (0, _mapRequestUrlToConfigObject.default)(config.url, BaseActionsConfigurations);

    if (!requestUrlConfigObject.noStart) {
      dispatch({
        type: "START_" + requestUrlConfigObject.baseActionType
      });
    }

    return config;
  };

  return requestOnFullfilledInterceptor;
};

exports.highOrderRequestOnFullfilledInterceptor = highOrderRequestOnFullfilledInterceptor;

const highOrderRequestOnRejectedInterceptor = (dispatch, BASE_URL, BaseActionsConfigurations) => {
  const requestOnRejectedInterceptor = error => {
    alert("requestOnRejectedInterceptor");
    return Promise.reject(error);
  };

  return requestOnRejectedInterceptor;
};

exports.highOrderRequestOnRejectedInterceptor = highOrderRequestOnRejectedInterceptor;

const highOrderResponseOnFullfilledInterceptor = (dispatch, BASE_URL, BaseActionsConfigurations) => {
  const responseOnFullfilledInterceptor = response => {
    const requestUrlConfigObject = (0, _mapRequestUrlToConfigObject.default)(response.config.url.split(BASE_URL)[1], BaseActionsConfigurations);

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

exports.highOrderResponseOnFullfilledInterceptor = highOrderResponseOnFullfilledInterceptor;

const highOrderResponseOnRejectedInterceptor = (dispatch, BASE_URL, BaseActionsConfigurations) => {
  const responseOnRejectedInterceptor = error => {
    const requestUrlConfigObject = (0, _mapRequestUrlToConfigObject.default)(error.config.url.split(BASE_URL)[1], BaseActionsConfigurations);

    if (!requestUrlConfigObject.noStop) {
      dispatch({
        type: "STOP_" + requestUrlConfigObject.baseActionType
      });
    }

    if (!requestUrlConfigObject.noError) {
      dispatch({
        type: "ERROR_" + requestUrlConfigObject.baseActionType,
        payload: requestUrlConfigObject.errorMessage ? {
          message: requestUrlConfigObject.errorMessage
        } : error
      });
    } else {
      return Promise.reject(error);
    }
  };

  return responseOnRejectedInterceptor;
};

exports.highOrderResponseOnRejectedInterceptor = highOrderResponseOnRejectedInterceptor;