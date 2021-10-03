const express = require("express");
const cors = require("cors");
const { DB } = require("./database");
const { extractPageOptions } = require("./utils");
const app = express();
const port = 3030;

// We use cors and allow all origins (default)
app.use(cors())

app.get("/v1/resource", (req, res) => {
  const { page, limit } = extractPageOptions(req.query);
  const resourceList = DB.getResourcePage(page, limit);
  res.send({ resources: resourceList });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
