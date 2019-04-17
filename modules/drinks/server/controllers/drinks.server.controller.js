'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  Drinks = mongoose.model('Drinks'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));



//Create a new event based on req.body and save it to the database
exports.createDrink = function (req, res) {
  var drink = new Drinks(req.body);
  drink.save(function(err) {
    if (err) {
      console.log(err);
      res.status(400).send('Could not create!');
    }
    else
      res.json('Creation Successful');
  });
}

exports.update = function (req, res) {
  var drink = req.drink;
  drink.userId = req.body.userId;
  drink.drinkInfo = {
    name: req.body.drinkInfo.name,
    recipe: req.body.drinkInfo.recipe,
    ingredients: req.body.drinkInfo.ingredients,
    abv: req.body.drinkInfo.abv,
    img: req.body.drinkInfo.img
  };
  drink.favorite = req.body.favorite;
  drink.bac = req.body. bac;
  drink.time = req.body.time;

  drink.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(drink);
    }
  });
};

exports.delete = function (req, res) {
  var drink = req.drink;
  drink.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(drink);
    }
  });
};

exports.read = function (req, res) {
  res.send(req.drink);
};

exports.list = function (req, res) {
  Drinks.find({}).sort({}).exec(function (err, drinks) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(drinks);
    }
  });
};

exports.favDrinkByUser = function (req, res) {
  res.send(req.drinks);
}

exports.bacDrinkByUser = function (req, res) {
  res.send(req.drinks);
}
 //Middleware
 exports.drinkByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

    Drinks.findById(id).exec(function (err, drink) {
      if (err) {
        return next(err);
      } else if (!drink) {
        return next(new Error('Failed to load user ' + id));
      }
      req.drink = drink;
      next();
    });
};

exports.drinkByUserF = function(req, res, next, fuser) {
  Drinks.find({"userId":fuser,"favorite":"true"}).exec(function(err, drinks) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.drinks = drinks;
      next();
    }
  });
};

exports.drinkByUserB = function(req, res, next, buser) {
  Drinks.find({"userId":buser,"bac":"true"}).exec(function(err, drinks) {
    if(err) {
      res.status(400).send(err);
    } else {
      req.drinks = drinks;
      next();
    }
  });
};

