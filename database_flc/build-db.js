'use strict';

let models = require('./models');
let sequelize = require('sequelize');
let { categories } = require('./data/categories');
let { classes } = require('./data/classes');
let { activities } = require('./data/activities');
let { days } = require('./data/days');

models.sequelize.sync({ force: true }).then(() => {
  return models.categories
    .bulkCreate(categories)
    .then(() => {
      return models.classes.bulkCreate(classes);
    })
    .then(() => {
      return models.activities.bulkCreate(activities);
    })
    .then(() => {
      return models.days.bulkCreate(days);
    });
});
