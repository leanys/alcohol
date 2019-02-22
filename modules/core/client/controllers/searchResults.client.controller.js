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
              
        for(var i = 0; i < len; i++)
        {
            vm.records[i] = {name: drinkArray[i].name, src: drinkArray[i].img};
        }
    }
  }());