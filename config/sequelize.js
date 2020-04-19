const Sequelize = require("sequelize");
const config = require("./env");

// Set up the config
const sequelize = new Sequelize(
  config.postgres.database,
  config.postgres.username,
  config.postgres.password,
  {
    host: config.postgres.host,
    port: config.postgres.port,
    dialect: "postgres",
    logging: false, // Disable logging
  }
);

sequelize.authenticate();

module.exports = { sequelize, Sequelize };
