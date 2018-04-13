'use strict';
module.exports = (sequelize, DataTypes) => {
  var users = sequelize.define('users', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    expiry_date: DataTypes.DATE
  }, {});
  users.associate = function(models) {
    // associations can be defined here
  };
  return users;
};