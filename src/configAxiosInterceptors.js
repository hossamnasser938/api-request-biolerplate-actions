import axios from "axios";
import {
  highOrderRequestOnFullfilledInterceptor,
  highOrderRequestOnRejectedInterceptor,
  highOrderResponseOnFullfilledInterceptor,
  highOrderResponseOnRejectedInterceptor
} from "./highOrderInterceptors";

export const configAxiosInterceptors = (
  dispatch,
  BASE_URL,
  BaseActionsConfigurations
) => {
  axios.interceptors.request.use(
    highOrderRequestOnFullfilledInterceptor(
      dispatch,
      BASE_URL,
      BaseActionsConfigurations
    ),
    highOrderRequestOnRejectedInterceptor(
      dispatch,
      BASE_URL,
      BaseActionsConfigurations
    )
  );

  axios.interceptors.response.use(
    highOrderResponseOnFullfilledInterceptor(
      dispatch,
      BASE_URL,
      BaseActionsConfigurations
    ),
    highOrderResponseOnRejectedInterceptor(
      dispatch,
      BASE_URL,
      BaseActionsConfigurations
    )
  );
};
