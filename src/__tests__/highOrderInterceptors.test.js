import {
  highOrderRequestOnFullfilledInterceptor,
  highOrderRequestOnRejectedInterceptor,
  highOrderResponseOnFullfilledInterceptor,
  highOrderResponseOnRejectedInterceptor
} from "../package/highOrderInterceptors";
import JestMock from "jest-mock";

const BASE_URL = "https://example.com/";
const action1Config = {
  requestUrl: "url1",
  baseActionType: "ACTION_1"
};

const action2Config = {
  requestUrl: "url2",
  baseActionType: "ACTION_2",
  noSuccess: true,
  noError: true
};

const action3Config = {
  requestUrl: "url3",
  baseActionType: "ACTION_3",
  noStart: true,
  noStop: true
};

const action4Config = {
  requestUrl: "url4",
  baseActionType: "ACTION_4",
  errorMessage: "failed"
};

const BaseActionsConfigurations = [
  action1Config,
  action2Config,
  action3Config,
  action4Config
];

let dispatch;

// ___ test requestOnFullfilledInterceptor ___//
describe("test requestOnFullfilledInterceptor", () => {
  let requestOnFullfilledInterceptor;

  beforeEach(() => {
    dispatch = JestMock.fn();

    requestOnFullfilledInterceptor = highOrderRequestOnFullfilledInterceptor(
      dispatch,
      BASE_URL,
      BaseActionsConfigurations
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
  let requestOnRejectedInterceptor;
  const jsdomAlert = window.alert; // to avoid changing the environment

  beforeEach(() => {
    window.alert = () => {}; // provide an implementation to window.alert since jsdom does not

    dispatch = JestMock.fn();

    requestOnRejectedInterceptor = highOrderRequestOnRejectedInterceptor(
      dispatch,
      BASE_URL,
      BaseActionsConfigurations
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
  let responseOnFullfilledInterceptor;

  beforeEach(() => {
    dispatch = JestMock.fn();

    responseOnFullfilledInterceptor = highOrderResponseOnFullfilledInterceptor(
      dispatch,
      BASE_URL,
      BaseActionsConfigurations
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
  let responseOnRejectedInterceptor;

  beforeEach(() => {
    dispatch = JestMock.fn();

    responseOnRejectedInterceptor = highOrderResponseOnRejectedInterceptor(
      dispatch,
      BASE_URL,
      BaseActionsConfigurations
    );
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

  test("test responseOnRejectedInterceptor when actionConfig has errorMessage set to 'failed'", () => {
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
