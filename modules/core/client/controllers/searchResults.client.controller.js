(function () {
    'use strict';
  
    angular
      .module('core')
      .controller('SearchResultsController', SearchResultsController);
    
      SearchResultsController.$inject = ['$scope', '$state','$stateParams', '$uibModal', 'Authentication','headerService'];
  
    function SearchResultsController($scope, $state, $stateParams, $uibModal, Authentication, headerService) {
        
        var vm = this;
        vm.records = [];
        var len = $stateParams['drinkArray'].length;
        var drinkArray = $stateParams['drinkArray'];
        vm.openModal = openModal;
              
        for(var i = 0; i < len; i++)
        {
            vm.records[i] = {name: drinkArray[i].name, src: drinkArray[i].img, 
                recipe: drinkArray[i].rec, ingredients: drinkArray[i].ingredients};
        }
        
        function openModal(namex, recipe, ingredients,src) {
            var modalInstance = $uibModal.open({
              animation: true,
              backdrop: 'true',
              templateUrl: 'modules/core/client/views/modal.client.view.html',
              controller: 'modalController',
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