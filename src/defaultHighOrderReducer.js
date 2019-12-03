const getDerivedActionTypes = baseActionTypes => {
  const derivedActionTypes = baseActionTypes.reduce((acc, cBaseActionType) => {
    const cDefaultActionTypes = [
      "START_" + cBaseActionType,
      "STOP_" + cBaseActionType,
      "ERROR_" + cBaseActionType
    ];

    return acc.concat(cDefaultActionTypes);
  }, []);

  return derivedActionTypes;
};

export const defaultHighOrderReducer = (
  initialState,
  baseActionTypes,
  reducer
) => {
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
