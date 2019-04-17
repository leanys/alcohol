(function () {
  'use strict';
  //var app = angular.module("BAC", ['zingchart-angularjs']);
  angular
    .module('BAC')
    .controller('BACcontroller', BACcontroller); 

    BACcontroller.$inject = ['$scope','Authentication','DrinksService'];

  function BACcontroller($scope,Authentication,DrinksService, drink) { 
    var vm = this;
    vm.authentication = Authentication;
    vm.records = [];
    vm.weight = '';
    vm.percent = ''; //TO DO: Validate Percent
    vm.sum= 0;
    vm.gender ='';
    var g = '';
    vm.calculate = calculate;
    vm.hours = '';
    vm.interpretation = "";
    vm.drinksGiven= ["11", "2","7", "8","9","10", "16", "82"];
    vm.bac = 0;

    $scope.$on('$stateChangeSuccess', function () {
      // do something
      vm.loadDrinks();
    });
  

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
        labels:['0','','','','','','','','.08','','','','','','','','','','','','.20','','','','','.25'],
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
      
    }
    vm.loadDrinks = function () {
    var d = Date.now();
    vm.bac = 0;
    vm.sum = 0;
    vm.records = [];
    vm.drinks = DrinksService.getBacDrinks(vm.authentication.user.email);
    vm.drinks.then(function(result) {
      console.log(result);
      var len = result.length;
      for(var i = 0; i < len; i++)
      {
        if(result[i].drinkInfo.img != "custom")
        {    
          var t = d - result[i].time;
          console.log(d);
          console.log(result[i].time);
          t /= 3600000;
          console.log(t);
          vm.bac += dbCalc(result[i].drinkInfo.abv,t);
          t = parseFloat(t.toFixed(2));
          var p = result[i].drinkInfo.abv / 8.5;
          p *= 100;
          p = parseFloat(p.toFixed(2))
          vm.records[i] =  {percent: p, numberOf: "1",
            size:"Cocktail (5oz)",hours: t};

        }
        else
        {
          var t = d - result[i].time;
          t /= 3600000;
          var temp = + result[i].drinkInfo.ingredients;
          var h =  temp + t;
          h = parseFloat(h.toFixed(2));
          var a = result[i].drinkInfo.abv - (.015*t);
          vm.bac += a;
          var l =  result[i].drinkInfo.recipe.length;
          vm.records[i] = {percent: result[i].drinkInfo.recipe.substring(0,l-1), numberOf: result[i].drinkInfo.recipe.substring(l-1,l), 
            size: result[i].drinkInfo.name, hours: h};
        }
        
      }
      vm.sum = vm.bac;
      vm.sum = parseFloat(vm.sum.toFixed(3))
      console.log(vm.sum);
    });
    }


    //Assuming databse drink = 0 hours, can't really ask for timeframe 
    function dbCalc(abv,t)
    {
      var weight = 200;//vm.weight;
      var gender = "m";//vm.gender;
      if(gender == "Female"){
        g = .66;
      }
      else{g = .73;}
      var A = abv;
      var top = A * 5.14;
      var bottom = weight * g;
      var f =  (top/bottom) - (.015 *t);
      f = parseFloat(f.toFixed(2))
      return f;

    }

    vm.deleteDrink = function(p, n, s, ho) {
      var d = Date.now();
      vm.bac = 0;
      vm.sum = 0;
      vm.records = [];
      vm.drinks.then(function(result){
        var len = result.length;
        for(var i = 0; i < len; i++)
        {
          if(result[i].drinkInfo.img != "custom")
          {
            console.log("no");
            console.log(p);
            var x = result[i].drinkInfo.abv / 8.5;
            x *= 100;
            x = parseFloat(x.toFixed(2))
            console.log(x);
            var t = d - result[i].time;
            t /= 3600000;
            t = parseFloat(t.toFixed(2));
            if(p == x && t == ho)
            {
              console.log(result[i]);
              result[i].$remove(function (){
                });
            }
            else
            {
              var t = d - result[i].time;
              t /= 3600000;
              vm.bac += dbCalc(result[i].drinkInfo.abv,t);
              t = parseFloat(t.toFixed(2));
              var per = result[i].drinkInfo.abv / 8.5;
              per *= 100;
              per = parseFloat(per.toFixed(2))
              vm.records[i] =  {percent: per, numberOf: "1", 
                size:"Cocktail (5oz)",hours: t};
            }
  
          }
          else
          {
            console.log("yes");
            if(p == result[i].drinkInfo.recipe.substring(0,2) && n ==  result[i].drinkInfo.recipe.substring(2,3) && s == result[i].drinkInfo.name)
            {
              console.log(result[i]);
              result[i].$remove(function (){
                });
            }
            else
            {
              var t = d - result[i].time;
              t /= 3600000;
              var temp = + result[i].drinkInfo.ingredients;
              var h =  temp + t;
              h = parseFloat(h.toFixed(2));
              var a = result[i].drinkInfo.abv - (.015*t);
              vm.bac += a;
              console.log(result[i]);
              vm.records[i] = {percent: result[i].drinkInfo.recipe.substring(0,2), numberOf: result[i].drinkInfo.recipe.substring(2,3), 
                size: result[i].drinkInfo.name, hours: h};
            }
            
          }
          
        }
      vm.sum = vm.bac;    
      vm.sum = parseFloat(vm.sum.toFixed(3))  
      });    
    }


    vm.addDrink = function () {
      var d = Date.now();
      vm.bac = 0;
      vm.records = [];
      calculate();   
      console.log(vm.percent); 
      var hack = "";
      hack = hack.concat(vm.percent,vm.numberOf);
      console.log(hack);
      var drink = new DrinksService({
        userId: vm.authentication.user.email,
        drinkInfo: {
          name: vm.amount,
          recipe: hack,
          ingredients: vm.hours,
          abv: vm.sum,
          img: "custom"
        },
        favorite : "false",
        bac : "true",
        time : d
      });
      drink.$save(function (response) 
      {
        console.log("sent");
        vm.drinks = DrinksService.getBacDrinks(vm.authentication.user.email);
        vm.drinks.then(function(result) {
          console.log(result);
          var len = result.length;
          
          for(var i = 0; i < len; i++)
          {
            if(result[i].drinkInfo.img != "custom")
            {
              var t = d - result[i].time;
              t /= 3600000;
              vm.bac += dbCalc(result[i].drinkInfo.abv,t);
            }
            else
            {
              var t = d - result[i].time;
              t /= 3600000;
              var a = result[i].drinkInfo.abv - (.015*t);
              vm.bac += a;
            }
            
          }
          console.log(vm.bac);
          vm.sum = vm.bac;
          vm.sum = parseFloat(vm.sum.toFixed(3))
          if (vm.sum < 0.08){
            vm.interpretation = "You are within the legal limit and can safely drive!";
          }
          else {
            vm.interpretation = "You are not within the legal limit. Do not drive.";
          }
        });
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });      
    };
  }
}());
