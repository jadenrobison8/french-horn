var userInputEl = document.querySelector("#user-input");
var searchBtn = document.querySelector("#searchBtn");
var suggestionsEl = document.querySelector("#suggestions");
var todayEl = document.querySelector("#today");
var forecast = document.querySelector("#forecast");
var apiKey = "95441f38975a122e879c7fc46334d497";

//search column elements
var cityNameEL = document.querySelector(".cityName");
var currentDateEl = document.querySelector(".currentDate");
var weatherImgEl = document.querySelector(".weatherImg");
var searchHistoryEl = document.querySelector(".history");

//weather elements
var humidityEl = document.querySelector(".humidity");
var tempEl = document.querySelector(".temp");
var windSpeed = document.querySelector(".windSpeed");
var cardRow = document.querySelector(".card-row");

//current date variable


//function to generate city weather
var getWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    fetch(apiUrl).then(function(response) {
        if(response.ok) {
            response.json().then(function(data) {
                //displayWeather(data.items, language);
            });
        } else {
            alert("Error: " + response.statusText);
            console.log(data.items);
        }
    });
};

//click button



getWeather();

//display weather 
var displayWeather = function() {
    //pass user input to getweather

    //display on page
};



//save search history

//load search history


