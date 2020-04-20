const { sequelize, Sequelize } = require("../../config/sequelize");
const Unit = require("./Unit");
const Property = require("./Property");

const UnitProperty = sequelize.define("UnitProperty", {
  name: Sequelize.STRING,
});

Unit.belongsToMany(Property, { through: UnitProperty });
Property.belongsToMany(Unit, { through: UnitProperty });

module.exports = UnitProperty;
