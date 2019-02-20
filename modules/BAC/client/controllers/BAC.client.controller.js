(function () {
  'use strict';
  var app = angular.module("BAC", []);
  angular
    .module('BAC')
    .controller('BACcontroller', BACcontroller); 

  function BACcontroller() { 
    var vm = this;
    vm.weight = '';
    vm.percent = ''; //TO DO: Validate Percent
    vm.sum= '';
    vm.gender ='';
    var g = '';
    vm.calculate = calculate;
    vm.hours = '';

    function calculate() {
      var weight = vm.weight;
      var percent = vm.percent; //TO dO: validate percent, as of now takes percent and divides by 100
      var gender = vm.gender;
      var amount = vm.amount;
      var numberOf = vm.numberOf;
      var hours = vm.hours;

      //get gender into number
      if(gender == "Female"){
        g = .66;
      }
      else{g = .73;}

      //get amount of oz.
      if(amount == "Can(s)(12 oz)"){amount = 12;}
      else if(amount == "Pint(s)(16 oz)"){amount = 16;}
      else if(amount == "Shot(s)(1.5 oz)"){amount = 1.5;}
      else if(amount == "Glass(es)(5 oz)"){amount = 5;}
      else if(amount == "Ounces"){amount = 1;}
      else if(amount == "milliliters(mL)"){amount = (amount * 0.033814);}

      //calculate A
      percent = percent/100;
      var A = numberOf * amount * percent;
      console.log(A);

      //calculate division
      var top = A * 5.14;
      console.log(top);
      var bottom = weight * g;
      console.log(hours);
      var sum = (top / bottom) - (.015 * hours)
      //calculate parentheses 

      
       console.log(sum);
       vm.sum = sum;
      //alert(sum);

    }
  }
}());
