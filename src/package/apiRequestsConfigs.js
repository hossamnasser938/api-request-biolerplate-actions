import type { ActionConfigurationObject } from "./types";

const configs = [];

export const pushConfigs = (extraConfigs: Array<ActionConfigurationObject>) => {
  configs.push(...extraConfigs);
};

export const clearConfigs = () => {
  // just for unit testing
  configs.splice(0, configs.length);
};

export default configs;
