"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultHighOrderReducer = void 0;

var _getDerivedActionTypes = _interopRequireDefault(require("./getDerivedActionTypes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaultHighOrderReducer = (initialState, baseActionTypes, reducer) => {
  const derivedActionTypes = (0, _getDerivedActionTypes.default)(baseActionTypes);
  return (state = initialState, {
    type,
    payload
  }) => {
    if (derivedActionTypes.includes(type)) {
      if (type.startsWith("START_")) {
        const attribute = type.split("START_")[1] + "Loading";
        return { ...state,
          [attribute]: true
        };
      } else if (type.startsWith("STOP_")) {
        const attribute = type.split("STOP_")[1] + "Loading";
        return { ...state,
          [attribute]: false
        };
      } else if (type.startsWith("ERROR_")) {
        const attribute = type.split("ERROR_")[1] + "Error";
        return { ...state,
          [attribute]: payload
        };
      } else {
        throw Error("strange default action type: " + type);
      }
    } else {
      return reducer(state, {
        type,
        payload
      });
    }
  };
};

exports.defaultHighOrderReducer = defaultHighOrderReducer;