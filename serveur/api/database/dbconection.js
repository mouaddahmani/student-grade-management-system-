const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATA_BASE_NAME,
});

module.exports = pool.promise();
