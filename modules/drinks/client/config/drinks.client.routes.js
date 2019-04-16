(function () {
    'use strict';
  
    angular
      .module('drinks.routes')
      .config(routeConfig);
  
    routeConfig.$inject = ['$stateProvider'];
  
    function routeConfig($stateProvider) {
      $stateProvider
        .state('drinks', {
          abstract: true,
          url: '/drinks',
          template: '<ui-view/>'
        })
        // .state('drinks.list', {
        //   url: '',
        //   templateUrl: '/modules/articles/client/views/list-articles.client.view.html',
        //   controller: 'ArticlesListController',
        //   controllerAs: 'vm'
        // })
        .state('drinks.view', {
          url: 'favoriteDrinks',
          templateUrl: '/modules/drinks/client/views/drinks-favorite.client.view.html',
          controller: 'FavoriteController',
          controllerAs: 'vm',
        })
        .state('dmodal', {
          url: '/dmodal',
          templateUrl: '/modules/drinks/client/views/drinks.modal.client.view.html',
          controller: 'dmodalController',
          controllerAs: 'vm',
          data: {
            pageTitle: 'Modal'
          }
        })
    }
  }());
  