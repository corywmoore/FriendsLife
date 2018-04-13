'use strict';
module.exports = (sequelize, DataTypes) => {
  var activities = sequelize.define(
    'activities',
    {
      picture: DataTypes.BLOB,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      active: DataTypes.BOOLEAN
    },
    {}
  );
  activities.associate = function(models) {
    activities.belongsTo(models.categories, {
      foreignkey: 'category_id'
    });

    activities.hasMany(models.friends_interest, {
      foreignkey: 'activity_preference_1'
    });
    activities.hasMany(models.friends_interest, {
      foreignkey: 'activity_preference_2'
    });
    activities.hasMany(models.friends_interest, {
      foreignkey: 'activity_preference_3'
    });
  };
  return activities;
};
