(function () {
  'use strict';

  angular
    .module('core')
    .controller('FavoriteController', FavoriteController);

    FavoriteController.$inject = ['DrinksService','Authentication', '$uibModal'];

  function FavoriteController(DrinksService,Authentication, $uibModal,drink) {
    var vm = this;
    vm.authentication = Authentication;
    vm.records = [];
    vm.drinks = DrinksService.getFavDrinks(vm.authentication.user.email);
    vm.openModal= openModal;
   
    vm.drinks.then(function(result) {
      var len = result.length;
      for(var i = 0; i < len; i++)
      {
          vm.records[i] = {name: result[i].drinkInfo.name, src: result[i].drinkInfo.img,
              recipe: result[i].drinkInfo.recipe, ingredients: result[i].drinkInfo.ingredients};
      }
    }); 

    vm.deleteDrink = function(name) {
      vm.drinks.then(function(result){
        var len = result.length;
        for(var i = 0; i < len; i++)
        {
          if(name == result[i].drinkInfo.name)
          {
            console.log(result[i]);
            result[i].$remove(function (){
              });
          }
        }
      
      });    
    }


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
      console.log("hi");
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

    //Update stuff
    // vm.updateDrink = function(name) {
    //   vm.drinks.then(function(result){
    //     var len = result.length;
    //     for(var i = 0; i < len; i++)
    //     {
    //       if(name == result[i].drinkInfo.name)
    //       {
    //         console.log(result[i]);
    //         result[i].drinkInfo.name = "ZZoro";
    //         console.log(result[i].drinkInfo.name);
    //         console.log(result[i]);
    //         result[i].$update(function (){
    //           console.log("can we do it fuckin twice?");
    //           });
    //       }
    //     }
      
    //   });    
    // }

    
    
    function openModal(namex, recipe, ingredients,src) {
      var modalInstance = $uibModal.open({
        animation: true,
        backdrop: 'true',
        templateUrl: 'modules/drinks/client/views/drinks.modal.client.view.html',
        controller: 'dmodalController',
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