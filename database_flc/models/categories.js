'use strict';
module.exports = (sequelize, DataTypes) => {
  var categories = sequelize.define(
    'categories',
    {
      name: DataTypes.STRING,
      picture: DataTypes.BLOB,
      active: DataTypes.STRING
    },
    {}
  );
  categories.associate = function(models) {
    categories.hasMany(models.activities, {
      foreignkey: 'category_id'
    });

    categories.belongsToMany(models.friend, { through: 'friends_interest' });
    categories.hasMany(models.classes, {
      foreignkey: 'category_id'
    });
  };
  return categories;
};
