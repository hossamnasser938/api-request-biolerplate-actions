// @flow
import type { State, Reducer, ActionConfigurationObject } from "./types";
import getDerivedActionTypes from "./getDerivedActionTypes";
import { pushConfigs } from "./apiRequestsConfigs";

export const defaultHighOrderReducer = (
  initialState: State,
  apiRequestsConfigsSubset: Array<ActionConfigurationObject>,
  reducer: Reducer
): Reducer => {
  pushConfigs(apiRequestsConfigsSubset);

  const baseActionTypes = apiRequestsConfigsSubset.map(
    item => item.baseActionType
  );

  const derivedActionTypes = getDerivedActionTypes(baseActionTypes);

  return (state = initialState, { type, payload }) => {
    if (derivedActionTypes.includes(type)) {
      if (type.startsWith("START_")) {
        const attribute = type.split("START_")[1] + "Loading";

        return {
          ...state,
          [attribute]: true
        };
      } else if (type.startsWith("STOP_")) {
        const attribute = type.split("STOP_")[1] + "Loading";

        return {
          ...state,
          [attribute]: false
        };
      } else if (type.startsWith("ERROR_")) {
        const attribute = type.split("ERROR_")[1] + "Error";

        return {
          ...state,
          [attribute]: payload
        };
      } else {
        throw Error("strange default action type: " + type);
      }
    } else {
      return reducer(state, { type, payload });
    }
  };
};
