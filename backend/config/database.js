const { Sequelize } = require('sequelize');

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
