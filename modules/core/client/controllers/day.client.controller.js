(function () {
  'use strict';
angular
.module('core')
.controller('dayController', dayController);

dayController.$inject = ["$scope","$stateParams"];

function dayController($scope, $stateParams) {
 
  console.log("this is day controller");
  var vm = this;
  vm.records = [];
  var len = $stateParams['drinkArray'].length;
  var drinkArray = $stateParams['drinkArray'];
  console.log(drinkArray[0].name);

    for(var i = 0; i < len; i++)
    {
        vm.records[i] = {name: drinkArray[i].name, src: drinkArray[i].img, 
            recipe: drinkArray[i].rec, ingredients: drinkArray[i].ingredients};
    }
}
}());