(function () {
    'use strict';
  
    angular
      .module('core')
      .factory('DrinksService', DrinksService);
  
      DrinksService.$inject = ['$resource', '$log'];
  
    function DrinksService($resource, $log) {
      var Drink = $resource('/api/drinks/:id', {
        id: '@_id'
      }, {
        get:{
         method: 'GET',
         isArray: true
        },
        update: {
          method: 'PUT'
        },
        getFav: {
          method: 'GET',
          url: '/api/drinks/favorite/:fuser',
          isArray: true
        },
        getBac: {
          method: 'GET',
          url: '/api/drinks/bac/:buser',
          isArray: true
        },
        
      });
  
      angular.extend(Drink, {
        createOrUpdate: function () {
          var drink = this;
          return createOrUpdate(drink);
        },
        getFavDrinks: function (fuser) {
          return this.getFav({
            fuser: fuser 
          }).$promise;
        },
        getBacDrinks: function (buser) {
          return this.getBac({
            buser: buser 
          }).$promise;
        },
      });
  
      return Drink;
  
      function createOrUpdate(drink) {
        if (drink._id) {
          return drink.$update(onSuccess, onError);
        } else {
          return drink.$save(onSuccess, onError);
        }
  
        // Handle successful response
        function onSuccess(drink) {
          // Any required internal processing from inside the service, goes here.
        }
  
        // Handle error response
        function onError(errorResponse) {
          var error = errorResponse.data;
          // Handle error internally
          handleError(error);
        }
      }
  
      function handleError(error) {
        // Log error
        $log.error(error);
      }
    }
  }());
  