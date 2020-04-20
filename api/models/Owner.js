const { sequelize, Sequelize } = require("../../config/sequelize");

const Owner = sequelize.define("Owner", {
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
      msg: "Owner name already exists",
    },
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Owner;
