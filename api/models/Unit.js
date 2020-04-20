const { sequelize, Sequelize } = require("../../config/sequelize");

const Unit = sequelize.define("Unit", {
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
      msg: "Unit name already exists",
    },
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Unit;
