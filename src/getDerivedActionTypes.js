export default baseActionTypes => {
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