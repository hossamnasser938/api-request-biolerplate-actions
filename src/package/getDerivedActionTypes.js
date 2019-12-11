// @flow
import type { BaseActionTypes, DerivedActionTypes } from "./types";

export default (baseActionTypes: BaseActionTypes): DerivedActionTypes => {
  const derivedActionTypes = baseActionTypes.reduce((acc, cBaseActionType) => {
    const cDefaultActionTypes = [
      "START_" + cBaseActionType,
      "STOP_" + cBaseActionType,
      "ERROR_" + cBaseActionType
    ];

    return acc.concat(cBaseActionType ? cDefaultActionTypes : []);
  }, []);

  return derivedActionTypes;
};
