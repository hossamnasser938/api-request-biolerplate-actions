import type { ApiRequestConfigObject } from "./types";

const configs = [];

export const pushConfigs = (extraConfigs: Array<ApiRequestConfigObject>) => {
  configs.push(...extraConfigs);
};

export const clearConfigs = () => {
  // just for unit testing
  configs.splice(0, configs.length);
};

export default configs;
