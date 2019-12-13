// @flow
import type { DerivedActionTypes, ApiRequestConfigObject } from "./types";

import mapRequestUrlToConfigObject from "./mapRequestUrlToConfigObject";

export default (
  apiRequestsConfigsSubset: Array<ApiRequestConfigObject>
): DerivedActionTypes => {
  const derivedActionTypes = apiRequestsConfigsSubset.reduce(
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
