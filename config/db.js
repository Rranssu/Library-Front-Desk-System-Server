const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Can't Reach Database... Turn On MySQL Web Server perhaps?:", err);
  } else {
    console.log("Yippiee Connected to the Database " + process.env.DB_NAME + "Try Doing Something to Test!");
  }
});

module.exports = db;
