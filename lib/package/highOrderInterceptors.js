"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.highOrderResponseOnRejectedInterceptor = exports.highOrderResponseOnFullfilledInterceptor = exports.highOrderRequestOnRejectedInterceptor = exports.highOrderRequestOnFullfilledInterceptor = void 0;

var _apiRequestsConfigs = _interopRequireDefault(require("./apiRequestsConfigs"));

var _mapRequestEndpointToConfigObject = _interopRequireDefault(require("./mapRequestEndpointToConfigObject.js"));

var _getErrorHandler = _interopRequireDefault(require("./getErrorHandler"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const highOrderRequestOnFullfilledInterceptor = (dispatch, BASE_URL) => {
  const requestOnFullfilledInterceptor = config => {
    const requestUrlConfigObject = (0, _mapRequestEndpointToConfigObject.default)(config.url, _apiRequestsConfigs.default);

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

const highOrderRequestOnRejectedInterceptor = (dispatch, BASE_URL) => {
  const requestOnRejectedInterceptor = error => {
    alert("requestOnRejectedInterceptor");
    return Promise.reject(error);
  };

  return requestOnRejectedInterceptor;
};

exports.highOrderRequestOnRejectedInterceptor = highOrderRequestOnRejectedInterceptor;

const highOrderResponseOnFullfilledInterceptor = (dispatch, BASE_URL) => {
  const responseOnFullfilledInterceptor = response => {
    const requestUrlConfigObject = (0, _mapRequestEndpointToConfigObject.default)(response.config.url.split(BASE_URL)[1], _apiRequestsConfigs.default);

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

const highOrderResponseOnRejectedInterceptor = (dispatch, BASE_URL) => {
  const responseOnRejectedInterceptor = error => {
    const requestUrlConfigObject = (0, _mapRequestEndpointToConfigObject.default)(error.config.url.split(BASE_URL)[1], _apiRequestsConfigs.default);

    if (!requestUrlConfigObject.noStop) {
      dispatch({
        type: "STOP_" + requestUrlConfigObject.baseActionType
      });
    }

    const errorHandler = (0, _getErrorHandler.default)();

    if (errorHandler && requestUrlConfigObject.errorMessage) {
      errorHandler(requestUrlConfigObject.errorMessage);
    }

    if (!requestUrlConfigObject.noError) {
      dispatch({
        type: "ERROR_" + requestUrlConfigObject.baseActionType,
        payload: requestUrlConfigObject.errorMessage ? {
          message: requestUrlConfigObject.errorMessage
        } : error
      });
    }

    if ((!errorHandler || !requestUrlConfigObject.errorMessage) && requestUrlConfigObject.noError) {
      return Promise.reject(error);
    }
  };

  return responseOnRejectedInterceptor;
};

exports.highOrderResponseOnRejectedInterceptor = highOrderResponseOnRejectedInterceptor;