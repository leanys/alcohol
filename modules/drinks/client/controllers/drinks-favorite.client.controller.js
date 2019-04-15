(function () {
  'use strict';

  angular
    .module('core')
    .controller('FavoriteController', FavoriteController);

    FavoriteController.$inject = ['DrinksService','Authentication'];

  function FavoriteController(DrinksService,Authentication) {
    var vm = this;
    vm.authentication = Authentication;
    vm.records = [];
    vm.drinks = DrinksService.getFavDrinks(vm.authentication.user.email);
   
    vm.drinks.then(function(result) {
      var len = result.length;
      for(var i = 0; i < len; i++)
      {
          vm.records[i] = {name: result[i].drinkInfo.name, src: result[i].drinkInfo.img,
              recipe: result[i].drinkInfo.recipe, ingredients: result[i].drinkInfo.ingredients};
      }
    });
   
 
  }
}());