// @flow
import type { ApiRequestConfigObject } from "./types";

export default (
  apiRequestsConfigsSubset: Array<ApiRequestConfigObject>
): Array<string> => {
  const derivedActionTypes: Array<string> = apiRequestsConfigsSubset.reduce(
    (acc, apiRequestConfig) => {
      const defaultActionTypes = [];

      if (!apiRequestConfig.noStart) {
        defaultActionTypes.push("START_" + apiRequestConfig.baseActionType);
      }

      if (!apiRequestConfig.noStop) {
        defaultActionTypes.push("STOP_" + apiRequestConfig.baseActionType);
      }

      if (!apiRequestConfig.noError) {
        defaultActionTypes.push("ERROR_" + apiRequestConfig.baseActionType);
      }

      return acc.concat(defaultActionTypes);
    },
    []
  );

  return derivedActionTypes;
};
