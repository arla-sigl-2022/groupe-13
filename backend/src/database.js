const process = require("process");
const { Pool } = require("pg");
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");

// Loads the env variables for localhost
dotenv.config();

var RDB = {
  // Create a pool of connection;
  // to control number of concurrent connections.
  // We leave default values for now.
  pool: new Pool({
    host: process.env.RDB_HOST,
    port: +process.env.RDB_PORT, 
    database: process.env.RDB_DATABASE,
    user: process.env.RDB_USER,
    password: process.env.RDB_PASSWORD,
  }),

  queryMany: async function (sql) {
    // Get the next connection available in the pool
    const client = await this.pool.connect();
    const result = await client.query(sql);
    // release the connection
    client.release();
    return result.rows;
  },

  getContractors: async function () {
    const rows = await this.queryMany(`
      SELECT * FROM contractor;
    `)
    return rows;
  },

  /**
   * Reads a page of resources, based on the resources array above.
   *
   * @param {*} page from which page (e.g. 1)
   * @param {*} limit how many element max per page (e.g. 5)
   * @returns a subset of the resources array
   */
  getResourcePage: async function (page, limit) {
    const rows = await this.queryMany(`
        SELECT * FROM ressource_catalog
        LIMIT ${limit} OFFSET ${page};
    `);
    return rows;
  },
};

var DDB = {
  config: {
    host: process.env.DDB_HOST,
    port: process.env.DDB_PORT,
    user: process.env.DDB_USER,
    password: process.env.DDB_PASSWORD,
    authSource: process.env.DDB_AUTH_SOURCE,
  },
  getMongoClient: function () {
    const uri = `mongodb://${this.config.user}:${this.config.password}@${this.config.host}:${this.config.port}?authSource=${this.config.authSource}`;
    return new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  },

  findPage: async function (
    collectionName,
    findQuery,
    skip,
    limit,
    sort = { _id: 1 }
  ) {
    let results;
    const client = this.getMongoClient();
    try {
      await client.connect();
      const database = client.db("garlaxy");
      const col = await database
        .collection(collectionName)
        .find(findQuery)
        .sort(sort)
        .skip(skip)
        .limit(limit);
      results = await col.toArray();
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
      return results;
    }
  },

  getContractorCommentPage: async function (contractor, page, limit) {
    const skip = (page - 1) * limit;
    const comments = await this.findPage(
      "comments",
      { contractor: contractor },
      skip,
      limit,
      { order_date: -1 }
    );
    return comments;
  },
};

module.exports = {
  RDB,
  DDB,
};
