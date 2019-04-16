(function () {
  'use strict';

  angular
    .module('core')
    .controller('quiController', quiController);

  quiController.$inject = ['$state'];

  function quiController($state) {
    var vm = this;
    var drinkArray = [];
    var recipe = '';
    var drinkIngredients = '';
    var image = '';
    vm.next = 0;
    vm.answerArray = answerArray;
    vm.log = 0;
    vm.ansArray = [-1, -1, -1, -1];
    vm.some_object = {
      "1": {
        "questionText": "What kind of outing are you going to?", "answers": [
          "Brunch",
          "Night Out",
          "Vacation"]
      },
      "2": {
        "questionText": "What kind of taste are you in the mood for?", "answers": [
          "Sweet",
          "Savory"]
      },
      "3": {
        "questionText": "What kind of texture are you looking for?", "answers": [
          "Creamy",
          "Carbonated",
          "Frozen",
          "Surprise me!"]
      },
      "4": {
        "questionText": "What are you in the spirit for?", "answers": [
          " Something classic",
          "Something risky"]
      },

    };

    function answerArray(qnum, qans) {
      console.log(qnum, qans);
      ++vm.next;
      vm.ansArray[qnum] = qans;
      if (vm.next == 4) {

        console.log(vm.ansArray);
        if (angular.equals(vm.ansArray, [1, 1, 1, 1])) {
          //grab drink
          var name = "15825";
          vm.d = apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 1, 1, 2])) {
          //grab drink
          var name = "15825";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 1, 2, 1])) {
          //grab drink
          var name = "12162";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 1, 2, 2])) {
          //grab drink
          var name = "11870";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 1, 3, 1])) {
          //grab drink
          var name = "11064";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 1, 3, 2])) {
          //grab drink
          var name = "16995";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 1, 4, 1])) {
          //grab drink
          var name = "17205";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 1, 4, 2])) {
          //grab drink
          var name = "17197";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 2, 1, 1])) {
          //grab drink
          var name = "11113";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 2, 1, 2])) {
          //grab drink
          var name = "11113";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 2, 2, 1])) {
          //grab drink
          var name = "13389";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 2, 2, 2])) {
          //grab drink
          var name = "11242";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 2, 3, 1])) {
          //grab drink
          var name = "11113";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 2, 3, 2])) {
          //grab drink
          var name = "11112";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 2, 4, 1])) {
          //grab drink
          var name = "17233";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [1, 2, 4, 2])) {
          //grab drink
          var name = "12107";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 1, 1, 1])) {
          //grab drink
          var name = "13328";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 1, 1, 2])) {
          //grab drink
          var name = "11243";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 1, 2, 1])) {
          //grab drink
          var name = "17204";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 1, 2, 2])) {
          //grab drink
          var name = "17141";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 1, 3, 1])) {
          //grab drink
          var name = "16202";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 1, 3, 2])) {
          //grab drink
          var name = "13936";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 1, 4, 1])) {
          //grab drink
          var name = "17196";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 1, 4, 2])) {
          //grab drink
          var name = "17225";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 2, 1, 1])) {
          //grab drink
          var name = "14181";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 2, 1, 2])) {
          //grab drink
          var name = "12798";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 2, 2, 1])) {
          //grab drink
          var name = "12460";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 2, 2, 2])) {
          //grab drink
          var name = "17832";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 2, 3, 1])) {
          //grab drink
          var name = "11145";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 2, 3, 2])) {
          //grab drink
          var name = "12756";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 2, 4, 1])) {
          //grab drink
          var name = "11147";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [2, 2, 4, 2])) {
          //grab drink
          var name = "11320";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 1, 1, 1])) {
          //grab drink
          var name = "16158";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 1, 1, 2])) {
          //grab drink
          var name = "13625";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 1, 2, 1])) {
          //grab drink
          var name = "11000";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 1, 2, 2])) {
          //grab drink
          var name = "17209";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 1, 3, 1])) {
          //grab drink
          var name = "12316";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 1, 3, 2])) {
          //grab drink
          var name = "11390";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 1, 4, 1])) {
          //grab drink
          var name = "13621";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 1, 4, 2])) {
          //grab drink
          var name = "13395";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 2, 1, 1])) {
          //grab drink
          var name = "12528";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 2, 1, 2])) {
          //grab drink
          var name = "14602";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 2, 2, 1])) {
          //grab drink
          var name = "14752";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 2, 2, 2])) {
          //grab drink
          var name = "17065";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 2, 3, 1])) {
          //grab drink
          var name = "11936";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 2, 3, 2])) {
          //grab drink
          var name = "14095";
          apireq(name);
        }
        else if (angular.equals(vm.ansArray, [3, 2, 4, 1])) {
          //grab drink
          var name = "11728";
          apireq(name);
        }
        else{
          //grab drink
          var name = "17219";
          apireq(name);
        }
      }

    }
    function apireq(name) {
      var req = new XMLHttpRequest();
      req.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + name);
      req.onload = function () {
        if (req.status >= 200 && req.status < 400) {
          var resp = JSON.parse(req.responseText);
          console.log(resp);
          drinkArray = displayDrinks(resp);
          $state.go("qResult", { 'drinkArray': drinkArray });

        }
        else {
          console.log("Connected but with an error!");
          console.log(req.status);
        }

      };

      req.onerror = function () {
        console.log("Failed to connect!");
      };

      req.send();
    }
    function displayDrinks(data) {
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
}());
