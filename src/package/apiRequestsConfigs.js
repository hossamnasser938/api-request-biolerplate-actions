import type { ActionConfigurationObject } from "./types";

const configs = [];

export const pushConfigs = (extraConfigs: Array<ActionConfigurationObject>) => {
  configs.push(...extraConfigs);
};

export default configs;
