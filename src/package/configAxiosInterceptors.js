// @flow
import type { Action, Dispatch } from "./types";
import axios from "axios";
import {
  highOrderRequestOnFullfilledInterceptor,
  highOrderRequestOnRejectedInterceptor,
  highOrderResponseOnFullfilledInterceptor,
  highOrderResponseOnRejectedInterceptor
} from "./highOrderInterceptors";

export const configAxiosInterceptors = (
  dispatch: Dispatch,
  BASE_URL: string
): void => {
  axios.interceptors.request.use(
    highOrderRequestOnFullfilledInterceptor(dispatch, BASE_URL),
    highOrderRequestOnRejectedInterceptor(dispatch, BASE_URL)
  );

  axios.interceptors.response.use(
    highOrderResponseOnFullfilledInterceptor(dispatch, BASE_URL),
    highOrderResponseOnRejectedInterceptor(dispatch, BASE_URL)
  );
};
