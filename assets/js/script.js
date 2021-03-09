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
var uvIndexEl = document.querySelector(".uvIndex");

//current date variable


//search history


//search button click
$(searchBtn).on("click", function(event) {
    event.preventDefault();
    if($(userInputEl).val() === "") {
        alert("You must enter a city");
        return;
    }
    console.log("clicked search button");
    getWeather($(userInputEl).val());

});


//function to generate city weather
var getWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: apiUrl,
        method: "GET"
    })
    .then(function(data) {
        let cityObj = {
            cityName: data.name,
            cityTemp: data.main.temp,
            cityHumidity: data.main.humidity,
            cityWindSpeed: data.wind.speed,
            cityUVIndex: data.coord,
            cityWeatherIcon: data.weather[0].icon
        }
        console.log(cityObj);
        
        var lon = cityObj.cityUVIndex.lon;
        var lat = cityObj.cityUVIndex.lat;

        var apiUrl1 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;
        $.ajax({
            url:apiUrl1,
            method: "GET"
        })
        .then(function(uvData) {
            console.log(cityObj.cityName);
            displayWeather(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, cityObj.cityWeatherIcon, uvData.value);
        })

    });
};

//click button



//getWeather();

//display weather 
var displayWeather = function(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon, uvData) {
    //display on page
    cityNameEL.text = cityName;
    tempEl.text = cityTemp;
    humidityEl.text = cityHumidity;
    windSpeed.text = cityWindSpeed;
    //weatherImgEl.attr("src", cityWeatherIcon);
    uvIndexEl.text = "'UV Index:' + uvData";
};

var displaySearch = function() {
    //get from local storage

    //show on page
};

//save search history

//load search history


