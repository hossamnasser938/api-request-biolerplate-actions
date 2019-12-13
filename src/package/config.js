// @flow
import type { Action, Dispatch, ErrorHandler } from "./types";
import { setErrorHandler } from "./getErrorHandler";
import axios from "axios";
import {
  highOrderRequestOnFullfilledInterceptor,
  highOrderRequestOnRejectedInterceptor,
  highOrderResponseOnFullfilledInterceptor,
  highOrderResponseOnRejectedInterceptor
} from "./highOrderInterceptors";

export const config = (
  dispatch: Dispatch,
  BASE_URL: string,
  errorHandler?: ErrorHandler
): void => {
  if (errorHandler) {
    setErrorHandler(errorHandler);
  }

  axios.interceptors.request.use(
    highOrderRequestOnFullfilledInterceptor(dispatch, BASE_URL),
    highOrderRequestOnRejectedInterceptor(dispatch, BASE_URL)
  );

  axios.interceptors.response.use(
    highOrderResponseOnFullfilledInterceptor(dispatch, BASE_URL),
    highOrderResponseOnRejectedInterceptor(dispatch, BASE_URL)
  );
};
