import { config } from "../package/config";
import axios from "axios";

test("test config", () => {
  expect(axios.interceptors.request.handlers[0]).toBeUndefined();
  expect(axios.interceptors.response.handlers[0]).toBeUndefined();

  config(() => {}, "", []);

  expect(axios.interceptors.request.handlers[0]).toBeDefined();
  expect(axios.interceptors.request.handlers[0].fulfilled).toBeDefined();
  expect(axios.interceptors.request.handlers[0].rejected).toBeDefined();
  expect(axios.interceptors.response.handlers[0]).toBeDefined();
  expect(axios.interceptors.response.handlers[0].fulfilled).toBeDefined();
  expect(axios.interceptors.response.handlers[0].rejected).toBeDefined();
});
