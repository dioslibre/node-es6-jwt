const { sequelize, Sequelize } = require("../../config/sequelize");

const Consistance = sequelize.define("Consistance", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Consistance name already exists",
    },
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Consistance;
