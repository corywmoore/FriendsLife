'use strict';
module.exports = (sequelize, DataTypes) => {
  var friend = sequelize.define(
    'friend',
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      nick_name: DataTypes.STRING
    },
    {}
  );
  friend.associate = function(models) {
    friend.belongsToMany(models.classes, {
      through: 'friends_interest'
    });

    friend.belongsToMany(models.days, {
      through: 'friend_days'
    });
  };
  return friend;
};
