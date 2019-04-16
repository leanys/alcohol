(function () {
  'use strict';

  angular
    .module('core')
    .controller('FavoriteController', FavoriteController);

    FavoriteController.$inject = ['DrinksService','Authentication', '$uibModal'];

  function FavoriteController(DrinksService,Authentication, $uibModal) {
    var vm = this;
    vm.authentication = Authentication;
    vm.records = [];
    vm.drinks = DrinksService.getFavDrinks(vm.authentication.user.email);
    vm.openModal= openModal;
   
    vm.drinks.then(function(result) {
      var len = result.length;
      for(var i = 0; i < len; i++)
      {
          vm.records[i] = {name: result[i].drinkInfo.name, src: result[i].drinkInfo.img,
              recipe: result[i].drinkInfo.recipe, ingredients: result[i].drinkInfo.ingredients};
      }
    });
   
    
    function openModal(namex, recipe, ingredients,src) {
      var modalInstance = $uibModal.open({
        animation: true,
        backdrop: 'true',
        templateUrl: 'modules/drinks/client/views/drinks.modal.client.view.html',
        controller: 'dmodalController',
        controllerAs: 'vm',
        resolve: {
          test: function () {
              var leany=[namex, recipe, ingredients, src];
              return leany;
            }
      },
      });
  };

  }
}());