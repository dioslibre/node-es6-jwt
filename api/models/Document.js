const { sequelize, Sequelize } = require("../../config/sequelize");

const Document = sequelize.define("Document", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  data: {
    type: Sequelize.BLOB,
    allowNull: false,
  },
  preview: {
    type: Sequelize.BLOB(),
    allowNull: false,
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

const DocumentType = require("./DocumentType");

Document.belongsTo(DocumentType);

module.exports = Document;
