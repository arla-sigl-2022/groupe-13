const express = require("express");
const cors = require("cors");
const { RDB, DDB } = require("./database");
const { extractPageOptions } = require("./utils");
const bodyParser = require('body-parser');
const log4js = require('log4js');

const loggerConfig = {
  appenders: {
    stdout: {
      type: "console",
      layout: {
        type: "coloured",
      },
    },
    logstash: {
      type: "log4js-logstash",
      host: "localhost",
      port: 5000,
    },
  },
  categories: {
    default: {
      appenders: ['stdout', 'logstash'],
      level: 'trace'
    }
  },
};

log4js.configure(loggerConfig);

const app = express();
const port = 3030;

// We use cors and allow all origins (default)
app.use(cors());
// We want to recover all request's body as JSON
app.use(bodyParser.json());

const ressourceLogger = log4js.getLogger("ressource");
app.get("/v1/resource", async (req, res) => {
  try {
    const { page, limit } = extractPageOptions(req.query);
    const resourceList = await RDB.getResourcePage(page, limit);
    ressourceLogger.info("Ressource catalog sent");
    res.send({ resources: resourceList });
  } catch (e) {
    const errorMessage = "Can't get ressource catalog";
    ressourceLogger.error(errorMessage);
    res.send({ error: errorMessage });
  }
});

const contractorLogger = log4js.getLogger("contractor");
app.get("/v1/contractor", async (req, res) => {
  try {
    const contractorList = await RDB.getContractors();
    contractorLogger.info(`Contractor list sent`);
    res.send({ contractors: contractorList });
  } catch (e) {
    const errorMessage = `Can't get contractor list: ${e.message}`;
    contractorLogger.error(errorMessage);
    res.send({ error: errorMessage });
  }
});

app.post("/v1/contractor/comment", async (req, res) => {
  try {
    const { contractor } = req.body;
    if (contractor) {
      const { page, limit } = extractPageOptions(req.query);
      const commentPage = await DDB.getContractorCommentPage(contractor, page, limit);
      contractorLogger.info(`Comments sent for ${contractor}`);
      res.send({comments: commentPage});
    } else {
      res.status = 400;
      const errorMesage = "no contractor provided";
      contractorLogger.error(errorMesage)
      res.send({ error: errorMesage });
    }
  } catch (e) {
    const errorMessage = `Can't get comments for contractor: ${e.message}`;
    contractorLogger.error(errorMessage);
    res.send({ error: errorMessage });
  }
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
