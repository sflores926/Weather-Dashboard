//assigned variables

var currentCityForecast = document.getElementById("current-city-forecast");
var currentCity = document.getElementById("current-city");
var image = document.getElementById("image");
var temperature = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var uvIndex = document.getElementById("uv-index");


//function to retrieve weather 
function getWeather(city) {
    var apiKey = "05027a18faadbe64fa845a2851972b89";
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;


    fetch(apiUrl)
        .then(function (response) {
            console.log(response)
            response.json();
        }).then(function (data) {
            // console.log(data);
            currentWeather(data, city);
        })
}

// getWeather("houston");

function currentWeather(weather, citySearched) {
    currentCityForecast.textContent = "";
    currentCity.textContent = citySearched;

    var date = document.createElement("span");
    date.textContent = "(" + moment(weather.dt.value).format("MMMM Do, YYYY") + ")";
    currentCity.appendChild(date);
    var weatherIcon = response.data.weather[0].icon;
    image.setAttribute("src", "https://openwethermap.org/img/wn/" + weatherIcon + "@02.png");
    temperature.innerHTML = "Temp: " + weather.main.temp + " °F";
    wind.innerHTML = "Wind: " + weather.wind.speed + " MPH";
    humidity.innerHTML = "Humidity: " + weather.main.humidity + "%";

    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    uvIndex(lat,lon);
}

function uvIndex(lat, lon){
    var apiKey = "05027a18faadbe64fa845a2851972b89";
    var apiUrl = 'https://api.openweathermap.org/data/2.5/uvi?lat=' +  lat + '&lon=' + lon + '&appid=' + apiKey;

    fetch(apiUrl)
    .then(function(response){
        response.json()
        .then(function(data){
            displayIndex(data)
        });
    })

    function displayIndex(index){
        var uvIndexVal = document.createElement("span");
        uvIndex.index.textContent = index.value;

        if()
    }
}
