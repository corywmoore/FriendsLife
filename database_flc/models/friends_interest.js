'use strict';
module.exports = (sequelize, DataTypes) => {
  var friends_interest = sequelize.define('friends_interest', {
    skill_level: DataTypes.STRING
  }, {});
  friends_interest.associate = function(models) {
    // associations can be defined here
  };
  return friends_interest;
};