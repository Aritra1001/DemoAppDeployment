const { Sequelize } = require('sequelize');

console.log('--- DATABASE CONFIG CHECK ---');
console.log('DB_HOST:', process.env.DB_HOST ? `Present (${process.env.DB_HOST})` : 'MISSING / UNDEFINED');
console.log('DB_NAME:', process.env.DB_NAME ? 'Present' : 'MISSING / UNDEFINED');
console.log('DB_USER:', process.env.DB_USER ? 'Present' : 'MISSING / UNDEFINED');
console.log('-----------------------------');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mssql',
    logging: false, // Set to console.log to see executed queries
    dialectOptions: {
      // This is important for Azure deployment
      ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false
    }
  }
);

module.exports = sequelize;
