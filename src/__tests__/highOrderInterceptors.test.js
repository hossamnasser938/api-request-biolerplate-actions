// @flow
import type {
  ApiRequestConfigObject,
  Dispatch,
  RequestOnFullfilledInterceptor,
  RequestOnRejectedInterceptor,
  ResponseOnFullfilledInterceptor,
  ResponseOnRejectedInterceptor
} from "../package/types";
import {
  highOrderRequestOnFullfilledInterceptor,
  highOrderRequestOnRejectedInterceptor,
  highOrderResponseOnFullfilledInterceptor,
  highOrderResponseOnRejectedInterceptor
} from "../package/highOrderInterceptors";
import { pushConfigs } from "../package/apiRequestsConfigs";
import getErrorHandler, {
  setErrorHandler,
  resetErrorHandler
} from "../package/getErrorHandler";
import JestMock from "jest-mock";

const BASE_URL: string = "https://example.com/";

const apiRequestConfig1: ApiRequestConfigObject = {
  requestEndpoint: "url1",
  baseActionType: "ACTION_1"
};

const apiRequestConfig2: ApiRequestConfigObject = {
  requestEndpoint: "url2",
  baseActionType: "ACTION_2",
  noSuccess: true,
  noError: true
};

const apiRequestConfig3: ApiRequestConfigObject = {
  requestEndpoint: "url3",
  baseActionType: "ACTION_3",
  noStart: true,
  noStop: true
};

const apiRequestConfig4: ApiRequestConfigObject = {
  requestEndpoint: "url4",
  baseActionType: "ACTION_4",
  errorMessage: "failed"
};

const apiRequestConfigs = [
  apiRequestConfig1,
  apiRequestConfig2,
  apiRequestConfig3,
  apiRequestConfig4
];

pushConfigs(apiRequestConfigs);

let dispatch: Dispatch;

// ___ test requestOnFullfilledInterceptor ___//
describe("test requestOnFullfilledInterceptor", () => {
  let requestOnFullfilledInterceptor: RequestOnFullfilledInterceptor;

  beforeEach(() => {
    dispatch = JestMock.fn();

    requestOnFullfilledInterceptor = highOrderRequestOnFullfilledInterceptor(
      dispatch,
      BASE_URL
    );
  });

  test("test requestOnFullfilledInterceptor when actionConfig set to its default", () => {
    const axiosRequestConfig = {
      url: "url1"
      // other irrelevant attributes ...
    };

    requestOnFullfilledInterceptor(axiosRequestConfig);

    expect(dispatch).toHaveBeenCalledWith({ type: "START_ACTION_1" });
  });

  test("test requestOnFullfilledInterceptor when url has parameters", () => {
    const axiosRequestConfig = {
      url: "url2?param=value",
      baseURL: BASE_URL
      // other irrelevant attributes ...
    };

    requestOnFullfilledInterceptor(axiosRequestConfig);

    expect(dispatch).toHaveBeenCalledWith({ type: "START_ACTION_2" });
  });

  test("test requestOnFullfilledInterceptor when actionConfig has noStart set to true", () => {
    const axiosConfigObjext = {
      url: "url3",
      baseURL: BASE_URL
      // other irrelevant attributes ...
    };

    requestOnFullfilledInterceptor(axiosConfigObjext);

    expect(dispatch).not.toHaveBeenCalled();
  });
});
// ########################################### //

// ___ test requestOnRejectedInterceptor ___//
describe("test requestOnRejectedInterceptor", () => {
  let requestOnRejectedInterceptor: RequestOnRejectedInterceptor;
  const jsdomAlert = window.alert; // to avoid changing the environment

  beforeEach(() => {
    window.alert = () => {}; // provide an implementation to window.alert since jsdom does not

    dispatch = JestMock.fn();

    requestOnRejectedInterceptor = highOrderRequestOnRejectedInterceptor(
      dispatch,
      BASE_URL
    );
  });

  afterEach(() => {
    window.alert = jsdomAlert; // to avoid changing the environment
  });

  test("test that requestOnRejectedInterceptor rejects", () => {
    return expect(
      requestOnRejectedInterceptor(new Error("err"))
    ).rejects.toThrow("err");
  });
});
// ########################################### //

// ___ test responseOnFullfilledInterceptor ___//
describe("test responseOnFullfilledInterceptor", () => {
  let responseOnFullfilledInterceptor: ResponseOnFullfilledInterceptor;

  beforeEach(() => {
    dispatch = JestMock.fn();

    responseOnFullfilledInterceptor = highOrderResponseOnFullfilledInterceptor(
      dispatch,
      BASE_URL
    );
  });

  test("test responseOnFullfilledInterceptor when actionConfig set to its default and url attribute returns preceded by BASE_URL", () => {
    const axiosResponse = {
      config: {
        url: BASE_URL + "url1",
        baseURL: BASE_URL
        // other irrelevant attributes ...
      }
      // other irrelevant attributes ...
    };

    responseOnFullfilledInterceptor(axiosResponse);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({ type: "STOP_ACTION_1" });
    expect(dispatch).toHaveBeenCalledWith({
      type: "SUCCESS_ACTION_1",
      payload: axiosResponse
    });
  });

  test("test responseOnFullfilledInterceptor when actionConfig has noSuccess set to true", () => {
    const axiosResponse = {
      config: {
        url: BASE_URL + "url2",
        baseURL: BASE_URL
        // other irrelevant attributes ...
      }
      // other irrelevant attributes ...
    };

    responseOnFullfilledInterceptor(axiosResponse);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: "STOP_ACTION_2" });
  });

  test("test responseOnFullfilledInterceptor when actionConfig has noStop set to true", () => {
    const axiosResponse = {
      config: {
        url: BASE_URL + "url3",
        baseURL: BASE_URL
        // other irrelevant attributes ...
      }
      // other irrelevant attributes ...
    };

    responseOnFullfilledInterceptor(axiosResponse);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "SUCCESS_ACTION_3",
      payload: axiosResponse
    });
  });
});
// ########################################### //

// ___ test responseOnFullfilledInterceptor ___//
describe("test responseOnRejectedInterceptor", () => {
  let responseOnRejectedInterceptor: ResponseOnRejectedInterceptor;

  beforeEach(() => {
    dispatch = JestMock.fn();

    responseOnRejectedInterceptor = highOrderResponseOnRejectedInterceptor(
      dispatch,
      BASE_URL
    );

    resetErrorHandler();
  });

  afterEach(() => {
    resetErrorHandler();
  });

  test("test responseOnRejectedInterceptor when actionConfig set to its default and url attribute returns preceded by BASE_URL", () => {
    const axiosError = {
      config: {
        url: BASE_URL + "url1",
        baseURL: BASE_URL
        // other irrelevant attributes ...
      }
      // other irrelevant attributes ...
    };

    responseOnRejectedInterceptor(axiosError);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({ type: "STOP_ACTION_1" });
    expect(dispatch).toHaveBeenCalledWith({
      type: "ERROR_ACTION_1",
      payload: axiosError
    });
  });

  test("test responseOnRejectedInterceptor when actionConfig has noError set to true", () => {
    const axiosError = {
      config: {
        url: BASE_URL + "url2",
        baseURL: BASE_URL
        // other irrelevant attributes ...
      }
      // other irrelevant attributes ...
    };

    responseOnRejectedInterceptor(axiosError);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({ type: "STOP_ACTION_2" });
  });

  test("test responseOnRejectedInterceptor when actionConfig has noStop set to true", () => {
    const axiosError = {
      config: {
        url: BASE_URL + "url3",
        baseURL: BASE_URL
        // other irrelevant attributes ...
      }
      // other irrelevant attributes ...
    };

    responseOnRejectedInterceptor(axiosError);

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: "ERROR_ACTION_3",
      payload: axiosError
    });
  });

  test("test responseOnRejectedInterceptor when actionConfig has errorMessage set to 'failed' and there exist errorHandler", () => {
    const errorHandler = JestMock.fn();
    setErrorHandler(errorHandler);

    const axiosError = {
      config: {
        url: BASE_URL + "url4",
        baseURL: BASE_URL
        // other irrelevant attributes ...
      }
      // other irrelevant attributes ...
    };

    responseOnRejectedInterceptor(axiosError);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({ type: "STOP_ACTION_4" });
    expect(dispatch).toHaveBeenCalledWith({
      type: "ERROR_ACTION_4",
      payload: { message: "failed" }
    });
    expect(errorHandler).toHaveBeenCalledTimes(1);
    expect(errorHandler).toHaveBeenCalledWith("failed");
  });

  test("test responseOnRejectedInterceptor when actionConfig has errorMessage set to 'failed' and there does not exist errorHandler", () => {
    const axiosError = {
      config: {
        url: BASE_URL + "url4",
        baseURL: BASE_URL
        // other irrelevant attributes ...
      }
      // other irrelevant attributes ...
    };

    responseOnRejectedInterceptor(axiosError);

    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith({ type: "STOP_ACTION_4" });
    expect(dispatch).toHaveBeenCalledWith({
      type: "ERROR_ACTION_4",
      payload: { message: "failed" }
    });
  });
});
