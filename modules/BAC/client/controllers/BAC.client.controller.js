(function () {
  'use strict';
  //var app = angular.module("BAC", ['zingchart-angularjs']);
  angular
    .module('BAC')
    .controller('BACcontroller', BACcontroller); 

    BACcontroller.$inject = ['$scope'];

  function BACcontroller($scope) { 
    var vm = this;
    vm.weight = '';
    vm.percent = ''; //TO DO: Validate Percent
    vm.sum= 0;
    vm.gender ='';
    var g = '';
    vm.calculate = calculate;
    vm.hours = '';
    vm.interpretation = "";

    window.feed = function(callback) {
      var tick = {};
      tick.plot0 = vm.sum;
      callback(JSON.stringify(tick));
    };

    $scope.myJson = {
      type: "gauge",
      globals: {
        fontSize: 20,
        fontFamily: "Helvetica Neue"
        
      },
      plotarea:{
        marginTop:70
      },
      plot:{
        size:'100%',
        valueBox: {
          placement: 'center',
          text:'%v', //default
          fontSize:20,
          color:"#51554C",
          rules:[
            {
              rule: '%v <= .08',
              text: '%v<br>Good to drive'
            },
            {
              rule: '%v < .2 && %v > .08',
              text: '%v<br>Do not drive',
              
            },
            {
              rule: '%v < .25 && %v > .2',
              text: '%v<br>Slow down'
            },
            {
              rule: '%v >  .25',
              text: '%v<br>Potential Alcohol Poisoning'
            }   
          ]
        }
      },
      tooltip:{
        borderRadius:5
      },
      scaleR:{
        aperture:150,
        minValue:0,
        maxValue:.3,
        step:.01,
        center:{
          visible:false
        },
        tick:{
          visible:false
        },
        item:{
          offsetR:0,
          rules:[
            {
              rule:'%i == 9',
              offsetX:15
            }
          ]
        },
        labels:['0','','','','','','','','','.08','','','','','','','','','','','','.20','','','','','.25'],
        ring:{
          size:40,
          rules:[
            {
              rule:'%v <= .08',
              backgroundColor:'#68e866'
            },
            {
              rule:'%v < .2 && %v > .08',
              backgroundColor:'#FFFE62'
            },
            {
              rule: '%v < .25 && %v >= .2',
              backgroundColor:'#FBC438'
            },
            {
              rule:'%v >= .25',
              backgroundColor:'#FF5E4D'
            }      
          ]
        }
      },
      refresh:{  
          type:"feed",
          transport:"js",
          url:"feed()",
          interval:1500,
          resetTimeout:1000
      },
      series : [
        {
          values : [vm.sum], // starting value
          backgroundColor:'black',
          indicator:[10,10,10,10,0.75],
          animation:{  
            effect:2,
            method:1,
            sequence:2,
            speed: 900
        },
        }]
    };

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
       vm.sum = parseFloat(sum.toFixed(2));
      //alert(sum);

      if (sum < 0.08){
        vm.interpretation = "You are within the legal limit and can safely drive!";
      }
      else {
        vm.interpretation = "You are not within the legal limit. Do not drive.";
      }

    }
  }
}());
