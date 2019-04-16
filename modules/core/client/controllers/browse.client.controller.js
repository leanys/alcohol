(function () {
    'use strict';
    angular
        .module('core')
        .controller('browseController', browseController);

    browseController.$inject = ["$scope", "$stateParams",'$state', '$uibModal', 'DrinksService', 'Authentication'];

    function browseController($scope, $stateParams, $state, $uibModal, DrinksService, Authentication) {
        window.scrollTo(0,0);
        console.log("this is the browse controller");
        var vm = this;
        vm.records = [];
        var len = $stateParams['drinkArray'].length;
        var drinkArray = $stateParams['drinkArray'];
        var letter = $stateParams.letter;
        vm.openModal=openModal;
        vm.authentication = Authentication;

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


        function calcAlc(ingr){
            var hardLiquor = 0;
            var beer = 0;
            var champagne = 0;
            var temp = "";
            var sendToBAC = 0;
            for(var i=0; i<ingr.length+1; i++){
              if (ingr[i] == " " || ingr[i] == ","||i == ingr.length) {
                var t = temp.toLowerCase();
                //console.log(t);
                //these are all 40 abv or 80 proof
                if(t =="bacardi" ||t=="cointreau" || t=="whiskey" ||t=="daniels"||t=="gin" || t=="tequila"||t=="brandy" ||t=="vodka"||t=="mezcal"||t=="everclear"||t=="bourbon" ||t=="amaretto"||t=="rum" || 
                t=="sec"|| t=="liqueur" || t=="absolut" || t=="kahlua"|| t=="sambuca" ||t=="marnier" ||t=="cognac"|| t=="jägermeister" || t=="goldschlager"||t=="alcohol"){
                  ++hardLiquor;
                  // console.log(t);
                  // console.log(hardLiquor);
                  temp = "";
                  t = ""
                  ++i;
                  if(ingr[i] == " " || ingr[i] == ","){++i;}
                }
                else if(t=="lager"||t=="beer"||t=="guinness"||t=="ale"){
                  ++beer;
                  temp = "";
                  t = ""
                  ++i;
                  if(ingr[i] == " " || ingr[i] == ","){++i;}
                }
                else if(t=="vermouth"|| t=="champagne"||t=="wine"||t=="port"|| t=="schnapps"|| t=="advocaat"||t=="prosecco"){
                  ++champagne;
                  temp = "";
                  t = ""
                  ++i;
                  if(ingr[i] == " " || ingr[i] == ","){++i;}
                }
                else{ 
                  temp = "";
                  t = "";
                  ++i;
                  if(ingr[i] == " " || ingr[i] == ","){++i;}
                }
              }
             
              temp += ingr[i];
      
            }
            hardLiquor= hardLiquor * 1.5 *.4; // SEND THIS TO BAC amount of liquor multiplied by .4(the proof of alcohol)
            beer = beer * 4 * .045;
            champagne = champagne * 2.5 * .15;
            sendToBAC = champagne + beer + hardLiquor; 
            return sendToBAC;
          }


        vm.createDrink = function (name,recipe,ingredients,favorite,bac,img) {
            var date = Date.now();
            var currDate = new Date(parseInt(date, 10));
            var abv = calcAlc(ingredients);
            console.log(abv)
            
            var drink = new DrinksService({
              userId: vm.authentication.user.email,
              drinkInfo: {
                name: name,
                recipe: recipe,
                ingredients: ingredients,
                abv: abv,
                img: img
              },
              favorite : favorite,
              bac : bac,
              time : currDate
            });
            drink.$save(function (response) {
              console.log("sent");
            }, function (errorResponse) {
              $scope.error = errorResponse.data.message;
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