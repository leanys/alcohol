'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk');

var drinkSchema = new Schema({
userId: String,
drinkInfo: {
  name: String,
  recipe: String,
  ingredients: String,
  abv: String,
  img: String
},
favorite : Boolean,
bac : Boolean,
time : String
});

var d = mongoose.model('Drinks', drinkSchema);
module.exports = d;