import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

export type ErrorHandler = string => void;

// redux stuff
export type Action = any;
export type State = any;
export type Dispatch = (action: Action) => any;
export type Reducer = (state: State, action: Action) => State;

export type RequestEndPoint = string | RegExp;

export type ApiRequestConfigObject = {|
  requestEndpoint: RequestEndPoint,
  baseActionType: string,
  errorMessage?: string,
  noStart?: boolean,
  noStop?: boolean,
  noSuccess?: boolean,
  noError?: boolean
|};

// axios stuff
export type RequestOnFullfilledInterceptor = (
  config: AxiosRequestConfig
) => AxiosRequestConfig;

export type RequestOnRejectedInterceptor = (
  error: AxiosError
) => Promise<AxiosError>;

export type ResponseOnFullfilledInterceptor = (
  response: AxiosResponse
) => AxiosResponse;

export type ResponseOnRejectedInterceptor = (
  error: AxiosError
) => ?Promise<AxiosError>;
