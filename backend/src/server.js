const express = require("express");
const cors = require("cors");
const { RDB } = require("./database");
const { extractPageOptions } = require("./utils");
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const app = express();
const port = 3030;

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://garlaxy-groupe-13.eu.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://api.groupe13.arla-sigl.fr",
  issuer: "https://garlaxy-groupe-13.eu.auth0.com/",
  algorithms: ["RS256"],
});

// Adding secured routing for all routes
// Note: we can use jwtCheck only for some routes
//  by adding jwtCheck as second parameter of any routes like
//  app.get(/my/secured/route, jwtCheck, (req, res) => {...});
app.use(jwtCheck);
// We use cors and allow all origins (default)
app.use(cors());

app.get("/v1/resource", async (req, res) => {
  const { page, limit } = extractPageOptions(req.query);
  const resourceList = await RDB.getResourcePage(page, limit);
  res.send({ resources: resourceList });
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
