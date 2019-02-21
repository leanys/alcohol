(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', '$window','Authentication', 'menuService','headerService'];

  function HeaderController($scope, $state, $window, Authentication, menuService, headerService) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }

    $scope.searchFunc = function()
    {
      headerService.searchVar = $scope.searchVal;
      console.log(headerService.searchVar);
      
            
      var recipe = '';
      var drinkIngredients = '';
      var image = '';

      var req = new XMLHttpRequest();
      req.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ $scope.searchVal);
      req.onload = function()
      {
          if (req.status >= 200 && req.status < 400) 
          {
          var resp = JSON.parse(req.responseText);
          var info = displayDrinks(resp);
          drinkIngredients = info[0];
          recipe = info[1];
          image = info[2];
          headerService.searchVar = [drinkIngredients, recipe, image];
          console.log(headerService.searchVar);
          $state.go('searchResult', { 'drinkIngredients':drinkIngredients, 'recipe': recipe, 'image':image });
         
          } 
          else 
          {
          console.log("Connected but with an error!");
          console.log(req.status);
          }
          
      };

      req.onerror = function() 
      {
          console.log("Failed to connect!");
      };

      req.send();     
  
      function displayDrinks(data) 
      {
          for (var i = 0; i < data.drinks.length; i++) 
          {
              // console.log(data.drinks[i]);
              if (data.drinks[i].strIngredient1 != "") 
              {
                  drinkIngredients += data.drinks[i].strIngredient1 + ", ";
              }
              
              if (data.drinks[i].strIngredient2 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient2;
              }
  
              if (data.drinks[i].strIngredient3 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient3;
              }
  
              if (data.drinks[i].strIngredient4 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient4;
              }
  
              if (data.drinks[i].strIngredient5 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient5;
              }
  
              if (data.drinks[i].strIngredient6 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient6;
              }
  
              if (data.drinks[i].strIngredient7 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient7;
              }
  
              if (data.drinks[i].strIngredient8 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient8;
              }
  
              if (data.drinks[i].strIngredient9 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient9;
              }
  
              if (data.drinks[i].strIngredient10 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient10;
              }
  
              if (data.drinks[i].strIngredient11 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient11;
              }
  
              if (data.drinks[i].strIngredient12 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient12;
              }
  
              if (data.drinks[i].strIngredient13 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient13;
              }             
              
              if (data.drinks[i].strInstructions != "") 
              {
              recipe = data.drinks[i].strInstructions + ".";
              }
              image = 'apple';
              return [drinkIngredients, recipe, image];

          }
      
      }

    }
    
  }
}());
