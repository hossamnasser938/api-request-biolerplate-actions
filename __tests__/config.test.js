import { config } from "../src/package/config";
import axios from "axios";
import getErrorHandler, {
  resetErrorHandler
} from "../src/package/getErrorHandler";

beforeAll(resetErrorHandler);
afterAll(resetErrorHandler);

test("test config", () => {
  expect(axios.interceptors.request.handlers[0]).toBeUndefined();
  expect(axios.interceptors.response.handlers[0]).toBeUndefined();
  expect(getErrorHandler()).toBeUndefined();

  config(() => {}, "", [], message => {});

  expect(getErrorHandler()).toBeDefined();

  expect(axios.interceptors.request.handlers[0]).toBeDefined();
  expect(axios.interceptors.request.handlers[0].fulfilled).toBeDefined();
  expect(axios.interceptors.request.handlers[0].rejected).toBeDefined();
  expect(axios.interceptors.response.handlers[0]).toBeDefined();
  expect(axios.interceptors.response.handlers[0].fulfilled).toBeDefined();
  expect(axios.interceptors.response.handlers[0].rejected).toBeDefined();
});
