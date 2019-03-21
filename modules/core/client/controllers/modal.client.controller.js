(function () {
    'use strict';
angular
.module('core')
.controller('modalController', modalController);

modalController.$inject = ['$scope', '$state','$stateParams', '$uibModal', '$uibModalInstance', 'Authentication','headerService','test'];

  function modalController($scope, $state, $stateParams, $uibModal,$uibModalInstance , Authentication, headerService, test) {
    var vm = this;
    vm.close = close;
    $scope.test = test;
    
    console.log(test[1]);

    function close(){
      
      $uibModalInstance.dismiss('cancel');
      
    }
  }

}());