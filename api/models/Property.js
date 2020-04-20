const { sequelize, Sequelize } = require("../../config/sequelize");
const Document = require("./Document");
const Assignment = require("./Assignment");
const Conservation = require("./Conservation");
const Consistance = require("./Consistance");
const Owner = require("./Owner");

const Property = sequelize.define("Property", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  regime: Sequelize.ENUM(["Titre foncier", "Réquisition", "Non immatriculé"]),
  reference: Sequelize.STRING,
  titre: Sequelize.STRING,
  requisition: Sequelize.STRING,
  area: Sequelize.FLOAT,
  locative: Sequelize.FLOAT,
  venale: Sequelize.FLOAT,
  address: Sequelize.STRING,
  note: Sequelize.STRING,
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

Document.belongsTo(Property);

Property.belongsTo(Assignment);
Property.belongsTo(Conservation);
Property.belongsTo(Consistance);
Property.belongsTo(Owner);

module.exports = Property;
