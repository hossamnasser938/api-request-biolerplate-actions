import { configAxiosInterceptors } from "../package/configAxiosInterceptors";
import axios from "axios";

test("test configAxiosInterceptors", () => {
  expect(axios.interceptors.request.handlers[0]).toBeUndefined();
  expect(axios.interceptors.response.handlers[0]).toBeUndefined();

  configAxiosInterceptors(() => {}, "", []);

  expect(axios.interceptors.request.handlers[0]).toBeDefined();
  expect(axios.interceptors.request.handlers[0].fulfilled).toBeDefined();
  expect(axios.interceptors.request.handlers[0].rejected).toBeDefined();
  expect(axios.interceptors.response.handlers[0]).toBeDefined();
  expect(axios.interceptors.response.handlers[0].fulfilled).toBeDefined();
  expect(axios.interceptors.response.handlers[0].rejected).toBeDefined();
});
