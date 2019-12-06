export default (requestUrl, BaseActionsConfigurations) => {
  const configObject = BaseActionsConfigurations.find(
    config => config.requestUrl === requestUrl
  );

  if (configObject) {
    return configObject;
  } else {
    throw new Error("strange request url: " + requestUrl);
  }
};