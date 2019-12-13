import getErrorHandler, {
  setErrorHandler,
  resetErrorHandler
} from "../package/getErrorHandler";

beforeAll(resetErrorHandler);
afterAll(resetErrorHandler);

test("test setting errorHandler", () => {
  expect(getErrorHandler()).toBeUndefined();

  setErrorHandler(errorMessage => {});

  expect(getErrorHandler()).toBeDefined();
});
