const { sequelize, Sequelize } = require("../../config/sequelize");

const DocumentType = sequelize.define("DocumentType", {
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
      msg: "DocumentType name already exists",
    },
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = DocumentType;
