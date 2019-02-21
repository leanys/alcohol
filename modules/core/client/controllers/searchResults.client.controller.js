(function () {
    'use strict';
  
    angular
      .module('core')
      .controller('SearchResultsController', SearchResultsController);
    
      SearchResultsController.$inject = ['$scope', '$state','$stateParams', 'Authentication','headerService'];
  
    function SearchResultsController($scope, $state, $stateParams, Authentication,headerService) {
        
        
        console.log($stateParams['recipe']);
        console.log(headerService.searchVar); 
        var vm = this;
        vm.drinkIngredients = $stateParams['drinkIngredients'];
        vm.recipe = $stateParams['recipe'];
        vm.image = '';

        
        // apiCall();
        function apiCall()
        {
            // var recipe = vm.recipe;
            var drinkIngredients = vm.drinkIngredients;
            var image = vm.image;
            var req = new XMLHttpRequest();
            req.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ headerService.searchVar);
            req.onload = function()
            {
                if (req.status >= 200 && req.status < 400) 
                {
                var resp = JSON.parse(req.responseText);
                var info = displayDrinks(resp);
                drinkIngredients = info[0];
                var recipe = info[1];
                image = info[2];
                vm.drinkIngredients = drinkIngredients;
                vm.recipe = recipe;
                vm.image = image;
                vm.recipe =
                console.log(vm.recipe);

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
                    console.log(data.drinks[i]);
                    // htmlString += "<p>" + data.drinks[i].strDrink;
                    
                    // htmlString += "<p>" + "   Ingredients are: ";
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
                    
                    // htmlString += "<p>" + "   Instructions are: ";
                    if (data.drinks[i].strInstructions != "") 
                    {
                    var rec = data.drinks[i].strInstructions + ".";
                    }
                    vm.drinkIngredients = drinkIngredients;
                    // vm.recipe = recipe;
                    // console.log(type(vm.drinkIngredients));
                    vm.image = image;
                    return [drinkIngredients, rec] ;

                }
            
            }
        }

       
       
    }
  }());





// (function () {
//     'use strict';
   
//     angular
//       .module('core')
//       .controller('searchResultscontroller', searchResultscontroller); 
  
//     function searchResultscontroller() 
//     {
//         var vm = this;
//         vm.drinkInfo = '';
//         vm.displayDrinks = displayDrinks;
      

//         var drinkInfo = document.getElementById("drinkInfo");
//         var btn = document.getElementById("btn");

//         var a = input.value;
//         btn.addEventListener("click", function() 
//         {
//         var input = document.getElementById("input").value;
//         var req = new XMLHttpRequest();
//         req.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ input);
//         req.onload = function()
//         {
//             if (req.status >= 200 && req.status < 400) 
//             {
//             var resp = JSON.parse(req.responseText);
//             displayDrinks(resp);
//             } 
//             else 
//             {
//             console.log("Connected but with an error!");
//             console.log(req.status);
//             }
            
//         };

//         req.onerror = function() 
//         {
//             console.log("Failed to connect!");
//         };

//         req.send();

//         });

        // function displayDrinks(data) 
        // {
        // var htmlString = "";
        // for (i = 0; i < data.drinks.length; i++) 
        // {
        //     console.log(data.drinks[i]);
        //     htmlString += "<p>" + data.drinks[i].strDrink;
            
        //     htmlString += "<p>" + "   Ingredients are: ";
        //     if (data.drinks[i].strIngredient1 != "") 
        //     {
        //     htmlString += data.drinks[i].strIngredient1 + ", ";
        //     }
            
        //     if (data.drinks[i].strIngredient2 != "")
        //     {
        //     htmlString += data.drinks[i].strIngredient2;
        //     }

        //     if (data.drinks[i].strIngredient3 != "")
        //     {
        //     htmlString += data.drinks[i].strIngredient3;
        //     }

        //     if (data.drinks[i].strIngredient4 != "")
        //     {
        //     htmlString += data.drinks[i].strIngredient4;
        //     }

        //     if (data.drinks[i].strIngredient5 != "")
        //     {
        //     htmlString += data.drinks[i].strIngredient5;
        //     }

        //     if (data.drinks[i].strIngredient6 != "")
        //     {
        //     htmlString += data.drinks[i].strIngredient6;
        //     }

        //     if (data.drinks[i].strIngredient7 != "")
        //     {
        //     htmlString += data.drinks[i].strIngredient7;
        //     }

        //     if (data.drinks[i].strIngredient8 != "")
        //     {
        //     htmlString += data.drinks[i].strIngredient8;
        //     }

        //     if (data.drinks[i].strIngredient9 != "")
        //     {
        //     htmlString += data.drinks[i].strIngredient9;
        //     }

        //     if (data.drinks[i].strIngredient10 != "")
        //     {
        //     htmlString += data.drinks[i].strIngredient10;
        //     }

        //     if (data.drinks[i].strIngredient11 != "")
        //     {
        //     htmlString += data.drinks[i].strIngredient11;
        //     }

        //     if (data.drinks[i].strIngredient12 != "")
        //     {
        //     htmlString += data.drinks[i].strIngredient12;
        //     }

        //     if (data.drinks[i].strIngredient13 != "")
        //     {
        //     htmlString += data.drinks[i].strIngredient13;
        //     }


        //     htmlString += "<p>" + "   Instructions are: ";
        //     if (data.drinks[i].strInstructions != "") 
        //     {
        //     htmlString += data.drinks[i].strInstructions + ".";
        //     }
        //     htmlString += '.</p>';
        //     htmlString += '</p>';

        // }

        // drinkInfo.insertAdjacentHTML('beforeend', htmlString);
        
        // }
                
//     }

//   }());


  
  