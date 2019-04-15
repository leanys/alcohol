(function () {
    'use strict';
  
    angular
      .module('drinks')
      .run(menuConfig);
  
    menuConfig.$inject = ['menuService'];
  
    function menuConfig(menuService) {
      menuService.addMenuItem('topbar', {
        title: 'Drinks',
        state: 'drinks',
        type: 'dropdown',
        roles: ['*']
      });
  
      // Add the dropdown list item
      menuService.addSubMenuItem('topbar', 'drinks', {
        title: 'List Drinks',
        state: 'drinks.list',
        roles: ['*']
      });
    }
  }());
  