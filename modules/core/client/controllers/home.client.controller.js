(function () {
  'use strict';

  angular
    .module('core')
    .controller('HomeController', HomeController);
  
  HomeController.$inject = ['$scope', '$state', 'Authentication'];

  function HomeController($scope, $state, Authentication) {
    var vm = this;
    vm.authentication = Authentication;

    $scope.searchFunc = function()
    {
      var drinkArray = [];
      var recipe = '';
      var drinkIngredients = '';
      var image = '';
      var lett = 'A';

      var req = new XMLHttpRequest();
      req.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ 'a');
      req.onload = function()
      {
          if (req.status >= 200 && req.status < 400) 
          {
          var resp = JSON.parse(req.responseText);
          console.log(resp);
          drinkArray = displayDrinks(resp);
          $state.go('browse', { 'drinkArray':drinkArray, 'letter':lett});
         
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
        drinkArray = [];
        if(data.drinks.length === null)
        {
          return drinkArray;
        }
        for (var i = 0; i < data.drinks.length; i++) 
        {
            if (data.drinks[i].strIngredient1 != "" && data.drinks[i].strIngredient1 != null && data.drinks[i].strIngredient1 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient1 + ", ";
            }
            
            if (data.drinks[i].strIngredient2 != "" && data.drinks[i].strIngredient2 != null && data.drinks[i].strIngredient2 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient2 + ", ";
            }

            if (data.drinks[i].strIngredient3 != "" && data.drinks[i].strIngredient3 != null && data.drinks[i].strIngredient3 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient3 + ", ";
            }

            if (data.drinks[i].strIngredient4 != "" && data.drinks[i].strIngredient4 != null && data.drinks[i].strIngredient4 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient4 + ", ";
            }

            if (data.drinks[i].strIngredient5 != "" && data.drinks[i].strIngredient5 != null && data.drinks[i].strIngredient5 != " ") 
            {
                drinkIngredients += data.drinks[i].strIngredient5 + ", ";
            }

            if (data.drinks[i].strIngredient6 != "" && data.drinks[i].strIngredient6 != null && data.drinks[i].strIngredient6 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient6 + ", ";
            }

            if (data.drinks[i].strIngredient7 != "" && data.drinks[i].strIngredient7 != null && data.drinks[i].strIngredient7 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient7 + ", ";
            }

            if (data.drinks[i].strIngredient8 != "" && data.drinks[i].strIngredient8 != null && data.drinks[i].strIngredient8 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient8 + ", ";
            }

            if (data.drinks[i].strIngredient9 != "" && data.drinks[i].strIngredient9 != null && data.drinks[i].strIngredient9 != " ") 
            {
                drinkIngredients += data.drinks[i].strIngredient9 + ", ";
            }

            if (data.drinks[i].strIngredient10 != "" && data.drinks[i].strIngredient10 != null && data.drinks[i].strIngredient10 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient10 + ", ";
            }
            if (data.drinks[i].strIngredient11 != "" && data.drinks[i].strIngredient11 != null && data.drinks[i].strIngredient11 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient11 + ", ";
            }

            if (data.drinks[i].strIngredient12 != "" && data.drinks[i].strIngredient12 != null && data.drinks[i].strIngredient12 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient12 + ", ";
            }

            if (data.drinks[i].strIngredient13 != "" && data.drinks[i].strIngredient13 != null && data.drinks[i].strIngredient13 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient13 + ", ";
            }             
           
            if (data.drinks[i].strInstructions != "") 
            {
              recipe = data.drinks[i].strInstructions + ".";
            }

            if(data.drinks[i].strDrink != "")
            {
              name = data.drinks[i].strDrink;
            }

            if(data.drinks[i].strDrinkThumb != "")
            {
              image = data.drinks[i].strDrinkThumb;
            }
            
            drinkIngredients = drinkIngredients.substring(0, drinkIngredients.length - 2);
            drinkArray[i] = {ingredients: drinkIngredients, rec:recipe, img:image, name:name};
            drinkIngredients = '';
        }
          return drinkArray;
      
      }

    }

    $scope.dayFunc = function()
    {
      console.log("day Function");      
      var drinkArray = [];
      var recipe = '';
      var drinkIngredients = '';
      var image = '';
      var nmae = '';

      var req = new XMLHttpRequest();
      req.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/random.php');
      req.onload = function()
      {
          if (req.status >= 200 && req.status < 400) 
          {
          var resp = JSON.parse(req.responseText);
          console.log(resp);
          drinkArray = displayDrinks(resp);
          $state.go('day', { 'drinkArray':drinkArray});
         
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
        drinkArray = [];
        if(data.drinks.length === null)
        {
          return drinkArray;
        }
        for (var i = 0; i < data.drinks.length; i++) 
        {
            if (data.drinks[i].strIngredient1 != "" && data.drinks[i].strIngredient1 != null && data.drinks[i].strIngredient1 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient1 + ", ";
            }
            
            if (data.drinks[i].strIngredient2 != "" && data.drinks[i].strIngredient2 != null && data.drinks[i].strIngredient2 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient2 + ", ";
            }

            if (data.drinks[i].strIngredient3 != "" && data.drinks[i].strIngredient3 != null && data.drinks[i].strIngredient3 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient3 + ", ";
            }

            if (data.drinks[i].strIngredient4 != "" && data.drinks[i].strIngredient4 != null && data.drinks[i].strIngredient4 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient4 + ", ";
            }

            if (data.drinks[i].strIngredient5 != "" && data.drinks[i].strIngredient5 != null && data.drinks[i].strIngredient5 != " ") 
            {
                drinkIngredients += data.drinks[i].strIngredient5 + ", ";
            }

            if (data.drinks[i].strIngredient6 != "" && data.drinks[i].strIngredient6 != null && data.drinks[i].strIngredient6 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient6 + ", ";
            }

            if (data.drinks[i].strIngredient7 != "" && data.drinks[i].strIngredient7 != null && data.drinks[i].strIngredient7 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient7 + ", ";
            }

            if (data.drinks[i].strIngredient8 != "" && data.drinks[i].strIngredient8 != null && data.drinks[i].strIngredient8 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient8 + ", ";
            }

            if (data.drinks[i].strIngredient9 != "" && data.drinks[i].strIngredient9 != null && data.drinks[i].strIngredient9 != " ") 
            {
                drinkIngredients += data.drinks[i].strIngredient9 + ", ";
            }

            if (data.drinks[i].strIngredient10 != "" && data.drinks[i].strIngredient10 != null && data.drinks[i].strIngredient10 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient10 + ", ";
            }
            if (data.drinks[i].strIngredient11 != "" && data.drinks[i].strIngredient11 != null && data.drinks[i].strIngredient11 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient11 + ", ";
            }

            if (data.drinks[i].strIngredient12 != "" && data.drinks[i].strIngredient12 != null && data.drinks[i].strIngredient12 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient12 + ", ";
            }

            if (data.drinks[i].strIngredient13 != "" && data.drinks[i].strIngredient13 != null && data.drinks[i].strIngredient13 != " ")
            {
                drinkIngredients += data.drinks[i].strIngredient13 + ", ";
            }             
           
            if (data.drinks[i].strInstructions != "") 
            {
              recipe = data.drinks[i].strInstructions + ".";
            }

            if(data.drinks[i].strDrink != "")
            {
              name = data.drinks[i].strDrink;
            }

            if(data.drinks[i].strDrinkThumb != "")
            {
              image = data.drinks[i].strDrinkThumb;
            }
            
            drinkIngredients = drinkIngredients.substring(0, drinkIngredients.length - 2);
            drinkArray[i] = {ingredients: drinkIngredients, rec:recipe, img:image, name:name};
            drinkIngredients = '';
        }
          return drinkArray;
      
      }

    }
  }
}());
