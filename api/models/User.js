const bcrypt = require("bcrypt");
const { v1 } = require("uuid");
const { sequelize, Sequelize } = require("../../config/sequelize");

const User = sequelize.define("User", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Username already exists",
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  canRead: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  canEdit: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  canDelete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  refresh_token: {
    type: Sequelize.UUID,
    allowNull: false,
    unique: {
      args: true,
      msg: "Odds are really against you",
    },
    defaultValue: v1(),
  },
  deleted: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

User.beforeCreate((user) => {
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  user.refresh_token = v1();
});

User.prototype.comparePassword = function (somePassword) {
  return bcrypt.compareSync(somePassword, this.password);
};

module.exports = User;
