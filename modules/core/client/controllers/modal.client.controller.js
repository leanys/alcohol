(function () {
    'use strict';
angular
.module('core')
.controller('modalController', modalController);

modalController.$inject = ['$scope', '$state','$stateParams', '$uibModal', '$uibModalInstance', 'Authentication','headerService','test'];

  function modalController($scope, $state, $stateParams, $uibModal,$uibModalInstance , Authentication, headerService, test) {
    var vm = this;
    vm.close = close;
    $scope.test = test;
    calcAlc(test[2])
    // console.log(test[1]);

    function close(){
      $uibModalInstance.dismiss('cancel');
      
    }
    function calcAlc(ingr){
      var liquor = 0;
      var temp = "";
      for(var i=0; i<ingr.length+1; i++){
        if (ingr[i] == " " || ingr[i] == ","||i == ingr.length) {
          var t = temp.toLowerCase();
          console.log(t);
          //these are all 40 abv or 80 proof
          if(t =="bacardi" || t=="whiskey" || t=="gin" || t=="tequila"||t=="brandy" ||t=="vodka" ||t=="rum" || 
          t=="sec"|| t=="liqueur" || t=="absolut" || t=="kahlua"|| t=="sambuca" ||t=="marnier" ||t=="cognac"){
            ++liquor;
            console.log(t);
            console.log(liquor);
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
    }
  }

}());