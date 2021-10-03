// Try to cast to the query option to a number;
// throws an error otherwise
function asNumber(query, optionName) {
  const queryOption = query[optionName];
  const invalidFormatError = new Error(
    `${optionName} needs to be a valid number`
  );

  if (!queryOption) {
    throw new Error(`missing query option: ${optionName}`);
  }

  if (typeof queryOption === "string") {
    const n = +queryOption;
    if (isNaN(n)) throw invalidFormatError;
    return n;
  } else {
    throw invalidFormatError;
  }
}

// Extracts `page` and `limit` from the request's
// URL query options
function extractPageOptions(query) {
  const page = asNumber(query, "page");
  const limit = asNumber(query, "limit");

  if (page <= 0) {
    throw new Error("page needs to be a postive integer");
  }
  if (limit <= 0) {
    throw new Error("limit needs to be a positive integer");
  }

  return { page, limit };
}

module.exports = {
    extractPageOptions
}