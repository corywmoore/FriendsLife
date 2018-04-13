'use strict';
module.exports = (sequelize, DataTypes) => {
  var friends = sequelize.define(
    'friends',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      nick_name: DataTypes.STRING
    },
    {}
  );
  friends.associate = function(models) {
    friends.belongsToMany(models.categories, {
      through: 'friends_interest'
    });

    friends.belongsToMany(models.days, {
      through: 'friend_days'
    });
  };
  return friends;
};
