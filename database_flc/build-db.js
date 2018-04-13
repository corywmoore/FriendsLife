'use strict';

let models = require('./models');
let sequelize = require('sequelize');

models.sequelize.sync({ force: true });
