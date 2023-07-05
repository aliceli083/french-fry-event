/**
 * Model Associations
 *
 * This module defines the associations between the different models.
 * It exports the model associations for the application.
 */

// Import Sequelize dependencies
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Import models
const User = require('./User');
const Diet = require('./Diet');
const Allergy = require('./Allergy');
const Dish = require('./Dish');
const UserDiet = require('./UserDiet');
const UserAllergy = require('./UserAllergy');
const Event = require('./Event');
const Guest = require('./Guest');
const Menu = require('./Menu');

// Define associations

//User - Event associations (host_user_id)
User.hasMany(Event, {
  foreignKey: 'host_user_id',
});
Event.belongsTo(User, {
  foreignKey: 'host_user_id'
});

//User - Guest association
User.hasMany(Guest, {
foreignKey: 'user_id',
});
Guest.belongsTo(User, {
foreignKey: 'user_id',
});

//Event - Guest association
Event.hasMany(Guest, {
    foreignKey: 'event_id',
});
Guest.belongsTo(Event, {
    foreignKey: 'event_id',
});

//Event - Menu association
Event.hasMany(Menu, {
  foreignKey: 'event_id',
});
Menu.belongsTo(Event, {
  foreignKey: 'event_id',
});

// Menu - Dish association
//User - Guest association
Dish.hasMany(Menu, {
  foreignKey: 'dish_id',
  });
  Menu.belongsTo(Dish, {
  foreignKey: 'dish_id',
  });
  

// User - Allergy association
User.belongsToMany(Allergy, {
    through: {
        model: UserAllergy,
        unique: false
    },
   as: 'u_allergy'
});

Allergy.belongsToMany(User, {
    through: {
        model: UserAllergy,
        unique: false
    },
   as: 'u_allergy'
});

// // User - Diet association
User.belongsToMany(Diet, {
  through: {
    model: UserDiet,
    unique: false
  },
  as: 'u_diet'
});
Diet.belongsToMany(User, {
    through: {
        model: UserDiet,
        unique: false
      },
      as: 'u_diet'
});

// Export model associations
module.exports = {
  User,
  Diet,
  Allergy,
  Dish,
  UserDiet,
  UserAllergy,
  Event,
  Guest,
  Menu
};
