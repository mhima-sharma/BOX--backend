const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

console.log("✅ Loaded DB config:");
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD ? '********' : '(missing)');
console.log("DB_NAME:", process.env.DB_NAME);

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  // Remove SSL first to test, can re-add later if needed
  // ssl: {
  //   minVersion: 'TLSv1.2',
  //   rejectUnauthorized: false
  // }
});

// Test connection immediately
pool.getConnection((err, connection) => {
  if (err) {
    console.error("❌ DB connection failed:", err);
  } else {
    console.log("✅ DB connected successfully");
    connection.release();
  }
});

module.exports = pool.promise();