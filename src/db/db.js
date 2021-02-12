const {Pool} = require('pg');

module.exports = new Pool({
  max: 10000,
  connectionString: process.env.DATABASE_URL
});