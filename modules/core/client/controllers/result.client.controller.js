(function () {
    'use strict';
  angular
  .module('core')
  .controller('resultController', resultController);
  
  resultController.$inject = ["$scope","$stateParams"];
  
  function resultController($scope,$stateParams) {
   
    console.log("this is the result controller");
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