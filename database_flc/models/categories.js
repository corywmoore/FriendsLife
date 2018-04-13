'use strict';
module.exports = (sequelize, DataTypes) => {
  var categories = sequelize.define(
    'categories',
    {
      name: DataTypes.STRING,
      picture: DataTypes.BLOB
    },
    {}
  );
  categories.associate = function(models) {
    categories.hasMany(models.classes, {
      foreignkey: 'category_id'
    });
  };
  return categories;
};
