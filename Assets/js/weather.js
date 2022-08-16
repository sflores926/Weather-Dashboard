var citySearched = document.getElementById("city-search");
var currentCityForecast = document.getElementById("current-city-forecast");
var currentCity = document.getElementById("current-city");
var image = document.getElementById("image");
var temperature = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uvIndex = document.getElementById("uv-index");
var searchBtn = document.getElementById("search-btn")
var pastSearches = JSON.parse(localStorage.getItem("search")) || [];
var history = document.getElementById("past-searches");
var clearBtn = document.getElementById("clearBtn");

function getWeather(city) {
    var apiKey = "05027a18faadbe64fa845a2851972b89";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial"+ "&appid=" + apiKey;
    // https://api.openweathermap.org/data/2.5/weather?q=city&appid=05027a18faadbe64fa845a2851972b89

    fetch(apiUrl)
        .then(function (response) {
            // console.log(response)
            response.json()
        .then(function (data) {
            //  console.log(data);
            
     });
        })
    }