const process = require("process");
const {Pool } = require("pg");
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
    `)
    return rows;
  },
};

module.exports = {
  RDB,
};
