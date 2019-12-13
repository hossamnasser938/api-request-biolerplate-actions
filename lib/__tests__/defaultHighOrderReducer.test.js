"use strict";

var _defaultHighOrderReducer = require("../package/defaultHighOrderReducer");

test("test defaultHighOrderReducer", () => {
  // ___ test ordinary reducer ___ //
  const reducer = (state = {}, {
    type,
    payload
  }) => {
    switch (type) {
      case "SUCCESS_BASE_ACTION":
        return {
          success: payload
        };

      case "SUCCESS_BASE_ACTION_1":
        return {
          success: payload
        };

      default:
        return state;
    }
  };

  expect(reducer({}, {
    type: "SUCCESS_BASE_ACTION",
    payload: {
      message: "done"
    }
  })).toEqual({
    success: {
      message: "done"
    }
  });
  expect(reducer({}, {
    type: "START_BASE_ACTION_1"
  })).toEqual({});
  expect(reducer({}, {
    type: "STOP_BASE_ACTION_1"
  })).toEqual({});
  expect(reducer({}, {
    type: "ERROR_BASE_ACTION_1",
    payload: {
      message: "error"
    }
  })).toEqual({});
  expect(reducer({}, {
    type: "SUCCESS_BASE_ACTION_1",
    payload: {
      message: "done"
    }
  })).toEqual({
    success: {
      message: "done"
    }
  });
  expect(reducer({}, {
    type: "START_BASE_ACTION"
  })).toEqual({});
  expect(reducer({}, {
    type: "STOP_BASE_ACTION"
  })).toEqual({});
  expect(reducer({}, {
    type: "ERROR_BASE_ACTION",
    payload: {
      message: "error"
    }
  })).toEqual({}); // ___ test reducer after being passed to defaultHighOrderReducer ___ //

  const defaultReducer = (0, _defaultHighOrderReducer.defaultHighOrderReducer)({}, ["BASE_ACTION", "BASE_ACTION_1"], reducer);
  expect(reducer({}, {
    type: "SUCCESS_BASE_ACTION",
    payload: {
      message: "done"
    }
  })).toEqual({
    success: {
      message: "done"
    }
  });
  expect(defaultReducer({}, {
    type: "START_BASE_ACTION"
  })).toEqual({
    BASE_ACTIONLoading: true
  });
  expect(defaultReducer({}, {
    type: "STOP_BASE_ACTION"
  })).toEqual({
    BASE_ACTIONLoading: false
  });
  expect(defaultReducer({}, {
    type: "ERROR_BASE_ACTION",
    payload: {
      message: "error"
    }
  })).toEqual({
    BASE_ACTIONError: {
      message: "error"
    }
  });
  expect(reducer({}, {
    type: "SUCCESS_BASE_ACTION_1",
    payload: {
      message: "done"
    }
  })).toEqual({
    success: {
      message: "done"
    }
  });
  expect(defaultReducer({}, {
    type: "START_BASE_ACTION_1"
  })).toEqual({
    BASE_ACTION_1Loading: true
  });
  expect(defaultReducer({}, {
    type: "STOP_BASE_ACTION_1"
  })).toEqual({
    BASE_ACTION_1Loading: false
  });
  expect(defaultReducer({}, {
    type: "ERROR_BASE_ACTION_1",
    payload: {
      message: "error"
    }
  })).toEqual({
    BASE_ACTION_1Error: {
      message: "error"
    }
  });
});