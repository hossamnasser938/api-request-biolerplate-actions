// @flow
import type { ErrorHandler } from "./types";

let errorHandler: ErrorHandler;

export const setErrorHandler = (errHandler: ErrorHandler) => {
  errorHandler = errHandler;
};

export const resetErrorHandler = () => {
  // just for unit testing
  errorHandler = undefined;
};

export default () => errorHandler;
