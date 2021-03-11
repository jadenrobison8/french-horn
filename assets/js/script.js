var userInputEl = document.querySelector("#user-input");
var searchBtn = document.querySelector("#searchBtn");
//var suggestionsEl = document.querySelector("#suggestions");
var todayEl = document.querySelector("#today");
var forecast = document.querySelector("#forecast");
var apiKey = "95441f38975a122e879c7fc46334d497";

//search column elements
var cityNameEL = document.querySelector(".cityName");
var currentDateEl = document.querySelector(".currentDate");
var weatherImgEl = document.querySelector(".weatherImg");
var searchHistoryEl = document.querySelector("#suggestions");

//weather elements
var humidityEl = document.querySelector(".humidity");
var tempEl = document.querySelector(".temp");
var windSpeed = document.querySelector(".windSpeed");
var cardRow = document.querySelector(".card-row");
var uvIndexEl = document.querySelector(".uvIndex");

//current date variable


//search history
var saveSearch = function() {
    //save to local storage 
    //append name and reference to the page
};

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

//click search history
$(searchHistoryEl).on("click", function(event) {
    event.preventDefault();
    
    var city = event.target;
    getWeather(city);
});

//function to generate city weather
var getWeather = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: apiUrl,
        method: "GET"
    })
    .then(function(data) {
        console.log(data);
        let cityObj = {
            cityName: data.name,
            cityTemp: data.main.temp,
            cityHumidity: data.main.humidity,
            cityWindSpeed: data.wind.speed,
            cityUVIndex: data.coord,
            cityWeatherIcon: data.weather[0].icon
        }
        displayForecast(data.name, data.id, data.sys.id);
        
        var lon = cityObj.cityUVIndex.lon;
        var lat = cityObj.cityUVIndex.lat;

        var apiUrl1 = "https://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;
        $.ajax({
            url:apiUrl1,
            method: "GET"
        })
        .then(function(uvData) {
            // save in search history to local storage saveSearch()
            // call display 5 day forecast function   display5Day()
            // weather icon display
            //display searchHistory
            if (JSON.parse(localStorage.getItem("searchHistory")) === null) {
                var searchHistoryArr = [];
                if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
                    searchHistoryArr.push(cityObj.cityName);
                    localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                    var weatherIcon = "https://openweathermap.org/img/w/" + cityObj.cityWeatherIcon + ".png";
                    displayWeather(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, weatherIcon, uvData.value);
                    displaySearch(cityObj.cityName);
                } else {
                    var weatherIcon = "https://openweathermap.org/img/w/" + cityObj.cityWeatherIcon + ".png";
                }
            } else {
                var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
                if (searchHistoryArr.indexOf(cityObj.cityName) === -1) {
                    searchHistoryArr.push(cityObj.cityName);
                    localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArr));
                    var weatherIcon = "https://openweathermap.org/img/w/" + cityObj.cityWeatherIcon + ".png";
                    displayWeather(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, weatherIcon, uvData.value);
                    displaySearch(cityObj.cityName);
                } else {
                    var weatherIcon = "https://openweathermap.org/img/w/" + cityObj.cityWeatherIcon + ".png";
                    displayWeather(cityObj.cityName, cityObj.cityTemp, cityObj.cityHumidity, cityObj.cityWindSpeed, weatherIcon, uvData.value);
                }
            }
            console.log(cityObj.cityName);
            console.log(uvData.value);
        })
    });
};

//display 5 day forecast function
var displayForecast = function(city, state, country) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "," + state + "," + country + "&appid=" + apiKey + "&units=imperial";
    $.ajax({
        url: apiUrl,
        method: "GET"
    })
    .then(function(response) {
        console.log(response);
        //for (var i = 0; i < response.list.length; i +=8) {
        
        //}
    })
};

//display weather 
var displayWeather = function(cityName, cityTemp, cityHumidity, cityWindSpeed, cityWeatherIcon, uvData) {
    //display on page
    cityNameEL.textContent = cityName;
    tempEl.textContent = "Temperature: " + cityTemp + "°F";
    humidityEl.textContent = "Humididty: " + cityHumidity +"%";
    windSpeed.textContent = "Wind Speed: " + cityWindSpeed + " MPH";
    weatherImgEl.setAttribute("src", cityWeatherIcon);
    uvIndexEl.textContent = "UV Index: " + uvData;
};


var displaySearch = function() {
    //get from local storage
    var searchHistoryArr = JSON.parse(localStorage.getItem("searchHistory"));
    for(let i = 0; i < searchHistoryArr.length; i++) {
        var ListItem = $("<li>").attr("class", "historyEntry");
        ListItem.text(searchHistoryArr[i]);
        searchHistoryEl.prepend(ListItem);
    }
};



