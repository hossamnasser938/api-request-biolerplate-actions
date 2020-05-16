import { removeSlashIfExists } from "../src/helperFunctions";

describe("test removeSlashIfExists function", () => {
  test("should remove slash", () => {
    expect(removeSlashIfExists("/some-end-point")).toBe("some-end-point");
  });

  test("should do nothing", () => {
    expect(removeSlashIfExists("some-end-point")).toBe("some-end-point");
  });
});
