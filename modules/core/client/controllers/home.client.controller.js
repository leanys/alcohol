(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);
  
  HeaderController.$inject = ['$scope', '$state', 'Authentication'];

  function HomeController($scope, $state, Authentication) {
    var vm = this;
    vm.authentication = Authentication;
  }
}());
