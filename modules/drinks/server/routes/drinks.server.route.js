'use strict';

/**
 * Module dependencies
 */
var drinkPolicy = require('../policies/drinks.server.policy'),
  d = require('../controllers/drinks.server.controller');


module.exports = function (app) {
    // Booking collection routes
  app.route('/api/drinks')
    .get(d.list)
    .post(d.createDrink);

  app.route('/api/drinks/favorite/:fuser')
  .get(d.favDrinkByUser)

  app.route('/api/drinks/bac/:buser')
  .get(d.bacDrinkByUser)
  
  app.route('/api/drinks/:id')
    .get(d.read)
    .put(d.update)
    .delete(d.delete);

  app.param('id', d.drinkByID);
  app.param('fuser', d.drinkByUserF);
  app.param('buser', d.drinkByUserB);
  
};

