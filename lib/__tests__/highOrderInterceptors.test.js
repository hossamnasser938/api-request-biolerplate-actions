"use strict";

var _highOrderInterceptors = require("../package/highOrderInterceptors");

var _apiRequestsConfigs = require("../package/apiRequestsConfigs");

var _getErrorHandler = _interopRequireWildcard(require("../package/getErrorHandler"));

var _jestMock = _interopRequireDefault(require("jest-mock"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const BASE_URL = "https://example.com/";
const apiRequestConfig1 = {
  requestEndpoint: "url1",
  baseActionType: "ACTION_1"
};
const apiRequestConfig2 = {
  requestEndpoint: "url2",
  baseActionType: "ACTION_2",
  noSuccess: true,
  noError: true
};
const apiRequestConfig3 = {
  requestEndpoint: "url3",
  baseActionType: "ACTION_3",
  noStart: true,
  noStop: true
};
const apiRequestConfig4 = {
  requestEndpoint: "url4",
  baseActionType: "ACTION_4",
  errorMessage: "failed"
};
const apiRequestConfig5 = {
  requestEndpoint: "url5",
  baseActionType: "ACTION_5",
  noError: true
};
const apiRequestConfigs = [apiRequestConfig1, apiRequestConfig2, apiRequestConfig3, apiRequestConfig4, apiRequestConfig5];
(0, _apiRequestsConfigs.pushConfigs)(apiRequestConfigs);
let dispatch; // ___ test requestOnFullfilledInterceptor ___//

describe("test requestOnFullfilledInterceptor", () => {
  let requestOnFullfilledInterceptor;
  beforeEach(() => {
    dispatch = _jestMock.default.fn();
    requestOnFullfilledInterceptor = (0, _highOrderInterceptors.highOrderRequestOnFullfilledInterceptor)(dispatch, BASE_URL);
  });
  test("test requestOnFullfilledInterceptor when actionConfig set to its default", () => {
    const axiosRequestConfig = {
      url: "url1" // other irrelevant attributes ...

    };
    requestOnFullfilledInterceptor(axiosRequestConfig);
    expect(dispatch).toHaveBeenCalledWith({
      type: "START_ACTION_1"
    });
  });
  test("test requestOnFullfilledInterceptor when url has parameters", () => {
    const axiosRequestConfig = {
      url: "url2?param=value",
      baseURL: BASE_URL // other irrelevant attributes ...

    };
    requestOnFullfilledInterceptor(axiosRequestConfig);
    expect(dispatch).toHaveBeenCalledWith({
      type: "START_ACTION_2"
    });
  });
  test("test requestOnFullfilledInterceptor when actionConfig has noStart set to true", () => {
    const axiosConfigObjext = {
      url: "url3",
      baseURL: BASE_URL // other irrelevant attributes ...

    };
    requestOnFullfilledInterceptor(axiosConfigObjext);
    expect(dispatch).not.toHaveBeenCalled();
  });
}); // ########################################### //
// ___ test requestOnRejectedInterceptor ___//

describe("test requestOnRejectedInterceptor", () => {
  let requestOnRejectedInterceptor;
  const jsdomAlert = window.alert; // to avoid changing the environment

  beforeEach(() => {
    window.alert = () => {}; // provide an implementation to window.alert since jsdom does not


    dispatch = _jestMock.default.fn();
    requestOnRejectedInterceptor = (0, _highOrderInterceptors.highOrderRequestOnRejectedInterceptor)(dispatch, BASE_URL);
  });
  afterEach(() => {
    window.alert = jsdomAlert; // to avoid changing the environment
  });
  test("test that requestOnRejectedInterceptor rejects", () => {
    return expect(requestOnRejectedInterceptor(new Error("err"))).rejects.toThrow("err");
  });
}); // ########################################### //
// ___ test responseOnFullfilledInterceptor ___//

describe("test responseOnFullfilledInterceptor", () => {
  let responseOnFullfilledInterceptor;
  beforeEach(() => {
    dispatch = _jestMock.default.fn();
    responseOnFullfilledInterceptor = (0, _highOrderInterceptors.highOrderResponseOnFullfilledInterceptor)(dispatch, BASE_URL);
  });
  test("test responseOnFullfilledInterceptor when actionConfig set to its default and url attribute returns preceded by BASE_URL", () => {
    const axiosResponse = {
      config: {
        url: BASE_URL + "url1",
        baseURL: BASE_URL // other irrelevant attributes ...

      } // other irrelevant attributes ...

    };
    responseOnFullfilledInterceptor(axiosResponse);
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: "STOP_ACTION_1"
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "SUCCESS_ACTION_1",
      payload: axiosResponse
    });
  });
  test("test responseOnFullfilledInterceptor when actionConfig has noSuccess set to true", () => {
    const axiosResponse = {
      config: {
        url: BASE_URL + "url2",
        baseURL: BASE_URL // other irrelevant attributes ...

      } // other irrelevant attributes ...

    };
    responseOnFullfilledInterceptor(axiosResponse);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "STOP_ACTION_2"
    });
  });
  test("test responseOnFullfilledInterceptor when actionConfig has noStop set to true", () => {
    const axiosResponse = {
      config: {
        url: BASE_URL + "url3",
        baseURL: BASE_URL // other irrelevant attributes ...

      } // other irrelevant attributes ...

    };
    responseOnFullfilledInterceptor(axiosResponse);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "SUCCESS_ACTION_3",
      payload: axiosResponse
    });
  });
}); // ########################################### //
// ___ test responseOnFullfilledInterceptor ___//

describe("test responseOnRejectedInterceptor", () => {
  let responseOnRejectedInterceptor;
  beforeEach(() => {
    dispatch = _jestMock.default.fn();
    responseOnRejectedInterceptor = (0, _highOrderInterceptors.highOrderResponseOnRejectedInterceptor)(dispatch, BASE_URL);
    (0, _getErrorHandler.resetErrorHandler)();
  });
  afterEach(() => {
    (0, _getErrorHandler.resetErrorHandler)();
  });
  test("test responseOnRejectedInterceptor when actionConfig set to its default and url attribute returns preceded by BASE_URL", () => {
    const axiosError = {
      config: {
        url: BASE_URL + "url1",
        baseURL: BASE_URL // other irrelevant attributes ...

      } // other irrelevant attributes ...

    };
    expect(responseOnRejectedInterceptor(axiosError)).toBeUndefined();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: "STOP_ACTION_1"
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "ERROR_ACTION_1",
      payload: axiosError
    });
  });
  test("test responseOnRejectedInterceptor when actionConfig has noError set to true, no errorMessage", async () => {
    const axiosError = {
      config: {
        url: BASE_URL + "url2",
        baseURL: BASE_URL // other irrelevant attributes ...

      } // other irrelevant attributes ...

    };
    await expect(responseOnRejectedInterceptor(axiosError)).rejects.toBe(axiosError);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "STOP_ACTION_2"
    });
  });
  test("test responseOnRejectedInterceptor when actionConfig has noStop set to true", () => {
    const axiosError = {
      config: {
        url: BASE_URL + "url3",
        baseURL: BASE_URL // other irrelevant attributes ...

      } // other irrelevant attributes ...

    };
    expect(responseOnRejectedInterceptor(axiosError)).toBeUndefined();
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "ERROR_ACTION_3",
      payload: axiosError
    });
  });
  test("test responseOnRejectedInterceptor when actionConfig has errorMessage set to 'failed' and there exist errorHandler", () => {
    const errorHandler = _jestMock.default.fn();

    (0, _getErrorHandler.setErrorHandler)(errorHandler);
    const axiosError = {
      config: {
        url: BASE_URL + "url4",
        baseURL: BASE_URL // other irrelevant attributes ...

      } // other irrelevant attributes ...

    };
    expect(responseOnRejectedInterceptor(axiosError)).toBeUndefined();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: "STOP_ACTION_4"
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "ERROR_ACTION_4",
      payload: {
        message: "failed"
      }
    });
    expect(errorHandler).toHaveBeenCalledTimes(1);
    expect(errorHandler).toHaveBeenCalledWith("failed");
  });
  test("test responseOnRejectedInterceptor when actionConfig has errorMessage set to 'failed' and there does not exist errorHandler", () => {
    const axiosError = {
      config: {
        url: BASE_URL + "url4",
        baseURL: BASE_URL // other irrelevant attributes ...

      } // other irrelevant attributes ...

    };
    expect(responseOnRejectedInterceptor(axiosError)).toBeUndefined();
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({
      type: "STOP_ACTION_4"
    });
    expect(dispatch).toHaveBeenCalledWith({
      type: "ERROR_ACTION_4",
      payload: {
        message: "failed"
      }
    });
  });
  test("test that responseOnRejectedInterceptor rejects when actionConfig has no errorMessage and noError is set to true", async () => {
    const axiosError = {
      config: {
        url: BASE_URL + "url5",
        baseURL: BASE_URL // other irrelevant attributes ...

      } // other irrelevant attributes ...

    };
    await expect(responseOnRejectedInterceptor(axiosError)).rejects.toBe(axiosError);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "STOP_ACTION_5"
    });
  });
});