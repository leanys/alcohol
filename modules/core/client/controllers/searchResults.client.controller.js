(function () {
    'use strict';
  
    angular
      .module('core')
      .controller('SearchResultsController', SearchResultsController);
    
      SearchResultsController.$inject = ['$scope', '$state','$stateParams', '$uibModal', 'Authentication','DrinksService'];
  
    function SearchResultsController($scope, $state, $stateParams, $uibModal, Authentication, DrinksService, drink ) {
        
        var vm = this;
        
        vm.records = [];
        vm.drink = drink;
        var len = $stateParams['drinkArray'].length;
        var drinkArray = $stateParams['drinkArray'];
        vm.openModal = openModal;
        vm.authentication = Authentication;

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
            time : date
          });
          drink.$save(function (response) {
            console.log("sent");
          }, function (errorResponse) {
            $scope.error = errorResponse.data.message;
          });
        };

     
        for(var i = 0; i < len; i++)
        {
            vm.records[i] = {name: drinkArray[i].name, src: drinkArray[i].img, 
                recipe: drinkArray[i].rec, ingredients: drinkArray[i].ingredients};
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
    }
  }());