'use strict';
module.exports = (sequelize, DataTypes) => {
  var days = sequelize.define(
    'days',
    {
      day: DataTypes.STRING,
      slot: DataTypes.STRING
    },
    {}
  );
  days.associate = function(models) {
    days.belongsToMany(models.classes, {
      through: 'class_days'
    });
    days.belongsToMany(models.friend, {
      through: 'friend_days'
    });
  };
  return days;
};
