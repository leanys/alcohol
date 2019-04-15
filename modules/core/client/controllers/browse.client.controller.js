(function () {
    'use strict';
    angular
        .module('core')
        .controller('browseController', browseController);

    browseController.$inject = ["$scope", "$stateParams",'$state', '$uibModal'];

    function browseController($scope, $stateParams, $state, $uibModal) {
        window.scrollTo(0,0);
        console.log("this is the browse controller");
        var vm = this;
        vm.records = [];
        var len = $stateParams['drinkArray'].length;
        var drinkArray = $stateParams['drinkArray'];
        var letter = $stateParams.letter;
        vm.openModal=openModal;
        var j =0;
        console.log(letter);
        for (var i = 0; i < len; i++) {
            if (drinkArray[i].name[0] == letter) {
                console.log(drinkArray[i].name);
                
                    vm.records[j] = {
                        name: drinkArray[i].name, src: drinkArray[i].img,
                        recipe: drinkArray[i].rec, ingredients: drinkArray[i].ingredients
                    };
                    j++;
                
            };

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
        


    $scope.searchFunc = function(val)
    {
        console.log(val);
      var drinkArray = [];
      var recipe = '';
      var drinkIngredients = '';
      var image = '';

      var req = new XMLHttpRequest();
      req.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ val);
      req.onload = function()
      {
          if (req.status >= 200 && req.status < 400) 
          {
          var resp = JSON.parse(req.responseText);
          console.log(resp);
          drinkArray = displayDrinks(resp);
          $state.go($state.current, { 'drinkArray':drinkArray, 'letter':val}, {reload: true});
         
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
          for (var i = 0; i < data.drinks.length; i++) 
          {
              if (data.drinks[i].strIngredient1 != "") 
              {
                  drinkIngredients += data.drinks[i].strIngredient1 + ", ";
              }
              
              if (data.drinks[i].strIngredient2 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient2 + ", ";
              }
  
              if (data.drinks[i].strIngredient3 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient3 + ", ";
              }
  
              if (data.drinks[i].strIngredient4 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient4 + ", ";
              }
  
              if (data.drinks[i].strIngredient5 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient5 + ", ";
              }
  
              if (data.drinks[i].strIngredient6 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient6 + ", ";
              }
  
              if (data.drinks[i].strIngredient7 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient7 + ", ";
              }
  
              if (data.drinks[i].strIngredient8 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient8 + ", ";
              }
  
              if (data.drinks[i].strIngredient9 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient9 + ", ";
              }
  
              if (data.drinks[i].strIngredient10 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient10 + ", ";
              }
  
              if (data.drinks[i].strIngredient11 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient11 + ", ";
              }
  
              if (data.drinks[i].strIngredient12 != "")
              {
                  drinkIngredients += data.drinks[i].strIngredient12 + ", ";
              }
  
              if (data.drinks[i].strIngredient13 != "")
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