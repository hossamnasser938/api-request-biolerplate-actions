import type { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

// redux stuff
export type Action = any;
export type State = any;
export type Dispatch = (action: Action) => any;
export type Reducer = (state: State, action: Action) => State;

export type BaseActionTypes = Array<string>;
export type DerivedActionTypes = array<string>;

export type ApiRequestConfigObject = {|
  requestUrl: string,
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
