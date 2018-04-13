'use strict';
module.exports = (sequelize, DataTypes) => {
  var class_days = sequelize.define(
    'class_days',
    {
      max_people: DataTypes.INTEGER
    },
    {}
  );
  class_days.associate = function(models) {
    // associations can be defined here
  };
  return class_days;
};
