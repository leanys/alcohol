(function () {
    'use strict';
  
    angular
      .module('core')
      .controller('FavoriteController', FavoriteController);
  
    FavoriteController.$inject = [];
  
    function FavoriteController() {
      var vm = this;
      vm.records = [
        {name:'Bamboo', src:'https://images.pexels.com/photos/1418358/pexels-photo-1418358.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'},
        {name:'Bellini', src:'https://images.pexels.com/photos/109275/pexels-photo-109275.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'},
        {name:'Painkiller', src:'https://images.pexels.com/photos/128242/pexels-photo-128242.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'},
        {name:'Vesper', src:'https://images.pexels.com/photos/1170599/pexels-photo-1170599.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'}
      ]
  
      function stateChangeSuccess() {
        // Collapsing the menu after navigation
        vm.isCollapsed = false;
      }
    }
  }());
  