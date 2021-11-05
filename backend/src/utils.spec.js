const { extractPageOptions } = require("./utils");

describe("extractPageOptions", () => {
  it("should correctly extract page and limit options when present", () => {
    const validQuery = { page: "1", limit: "10" };
    const { page, limit } = extractPageOptions(validQuery);
    expect(page).toEqual(1);
    expect(limit).toEqual(10);
  });
  it("should throw an error when page is missing", () => {
    const onlyLimit = {
      limit: "10",
    };
    expect(() => extractPageOptions(onlyLimit)).toThrowError(
      new Error("missing query option: page")
    );
  });

  it("should throw an error when limit is missing", () => {
    const onlyPage = {
      page: "10",
    };
    expect(() => extractPageOptions(onlyPage)).toThrowError(
      new Error("missing query option: limit")
    );
  });
  it("should throw an error when page is not a number", () => {
    const invalidPageNaN = {
      page: "page1",
      limit: "10",
    };
    expect(() => extractPageOptions(invalidPageNaN)).toThrowError(
      new Error("page needs to be a valid number")
    );
  });
});
