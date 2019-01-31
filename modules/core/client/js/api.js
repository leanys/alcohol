var drinkInfo = document.getElementById("drinkInfo");
var btn = document.getElementById("btn");

var a = input.value;


btn.addEventListener("click", function() 
{
  var input = document.getElementById("input").value;
  var req = new XMLHttpRequest();
  req.open('GET', 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+ input);
  req.onload = function()
   {
    if (req.status >= 200 && req.status < 400) 
    {
      var resp = JSON.parse(req.responseText);
      displayDrinks(resp);
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

});

function displayDrinks(data) 
{
  var htmlString = "";
  for (i = 0; i < data.drinks.length; i++) 
  {
    console.log(data.drinks[i]);
    htmlString += "<p>" + data.drinks[i].strDrink;
    
    //TODO add a check for 0 ingredients and the other 13 ingredients ugh
    htmlString += "<p>" + "   Ingredients are: ";
    if (data.drinks[i].strIngredient1 != "") 
    {
      htmlString += data.drinks[i].strIngredient1 + ", ";
    }
    if (data.drinks[i].strIngredient2 != "")
    {
      htmlString += data.drinks[i].strIngredient2;
    }

    htmlString += "<p>" + "   Instructions are: ";
    if (data.drinks[i].strInstructions != "") 
    {
      htmlString += data.drinks[i].strInstructions + ".";
    }
    htmlString += '.</p>';
    htmlString += '</p>';

  }

  drinkInfo.insertAdjacentHTML('beforeend', htmlString);
  
}