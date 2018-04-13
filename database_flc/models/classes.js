'use strict';
module.exports = (sequelize, DataTypes) => {
  var classes = sequelize.define(
    'classes',
    {
      name: DataTypes.STRING,
      picture: DataTypes.BLOB
    },
    {}
  );
  classes.associate = function(models) {
    classes.belongsToMany(models.days, {
      through: 'class_days'
    });
  };
  return classes;
};
