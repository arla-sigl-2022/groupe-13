const express = require("express");
const cors = require("cors");
const { RDB, DDB } = require("./database");
const { extractPageOptions } = require("./utils");
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const bodyParser = require('body-parser');


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
// We want to recover all request's body as JSON
app.use(bodyParser.json());

app.get("/v1/resource", async (req, res) => {
  const { page, limit } = extractPageOptions(req.query);
  const resourceList = await RDB.getResourcePage(page, limit);
  res.send({ resources: resourceList });
});

app.get("/v1/contractor", async (req, res) => {
  const contractorList = await RDB.getContractors();
  res.send({ contractors: contractorList });
})

app.post("/v1/contractor/comment", async (req, res) => {
  const { contractor } = req.body;
  console.log('req.body is ', req.body);
  if (contractor) {
    const { page, limit } = extractPageOptions(req.query);
    const commentPage = await DDB.getContractorCommentPage(contractor, page, limit);
    res.send({comments: commentPage});
  } else {
    res.status = 400;
    res.send({error: 'no contractor provided'});
  }
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
