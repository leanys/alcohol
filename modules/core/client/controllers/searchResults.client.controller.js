(function () {
    'use strict';
  
    angular
      .module('core')
      .controller('SearchResultsController', SearchResultsController);
    
      SearchResultsController.$inject = ['$scope', '$state','$stateParams', 'Authentication','headerService'];
  
    function SearchResultsController($scope, $state, $stateParams, Authentication,headerService) {
        
        var vm = this;
        vm.records = [];
        var len = $stateParams['drinkArray'].length;
        var drinkArray = $stateParams['drinkArray'];
        vm.display = display;
              
        for(var i = 0; i < len; i++)
        {
            vm.records[i] = {name: drinkArray[i].name, src: drinkArray[i].img, 
                recipe: drinkArray[i].rec, ingredients: drinkArray[i].ingredients};
        }
        
        function display(){
            console.log("okie dokie");
        }
    }
  }());