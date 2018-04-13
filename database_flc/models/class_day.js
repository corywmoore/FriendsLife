'use strict';
module.exports = (sequelize, DataTypes) => {
  var class_day = sequelize.define('class_day', {
    max_people: DataTypes.INTEGER
  }, {});
  class_day.associate = function(models) {
    // associations can be defined here
  };
  return class_day;
};