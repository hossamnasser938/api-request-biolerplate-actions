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

export let BASE_URL;

export const config = (
  dispatch: Dispatch,
  baseUrl: string,
  errorHandler?: ErrorHandler
): void => {
  BASE_URL = baseUrl;

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
