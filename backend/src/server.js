const express = require("express");
const { DB } = require("./database");
const { extractPageOptions } = require("./utils");
const app = express();
const port = 3030;

app.get("/v1/resource", (req, res) => {
  const { page, limit } = extractPageOptions(req.query);
  const resourceList = DB.getResourcePage(page, limit);
  res.send({resources: resourceList});
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
