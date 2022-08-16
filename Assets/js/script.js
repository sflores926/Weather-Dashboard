function weatherDash() {
    //assigned variables
    var citySearched = document.getElementById("city-search");
    // var currentCityForecast = document.getElementById("current-city-forecast");
    var currentCity = document.getElementById("current-city");
    // var image = document.getElementById("image");
    var temperature = document.getElementById("temp");
    var wind = document.getElementById("wind");
    var humidity = document.getElementById("humidity");
    var uvIndex = document.getElementById("uv-index");
    var searchBtn = document.getElementById("search-btn")
    var pastSearches = JSON.parse(localStorage.getItem("search")) || [];
    var history = document.getElementById("past-searches");
    var clearBtn = document.getElementById("clearBtn");
    var fiveDayCards = document.getElementById("fiveday-cards");



    //function to retrieve weather 
    function getWeather(city) {
        var apiKey = "05027a18faadbe64fa845a2851972b89";
        var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&appid=" + apiKey;
        // https://api.openweathermap.org/data/2.5/weather?q=city&appid=05027a18faadbe64fa845a2851972b89

        fetch(apiUrl)
            .then(function (response) {
                console.log(response)
                return response.json()

            })
            .then(function (data) {
                console.log(data);
                currentWeather(data, city);
            });
    }

    //  getWeather("houston");

    function currentWeather(weather, citySearched) {
        // currentCityForecast.textContent = "";
        currentCity.textContent = citySearched;

        var date = document.createElement("span");
        date.textContent = " (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
        currentCity.append(date);
        var weatherIcon = document.createElement("img")
        weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
        currentCity.appendChild(weatherIcon);
        // var weatherIcon = weather.weather.icon
        // weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherIcon + "@2x.png");
        // image.innerHTML = weatherIcon;
        temperature.innerHTML = "Temp: " + weather.main.temp + " °F";
        wind.innerHTML = "Wind: " + weather.wind.speed + " MPH";
        humidity.innerHTML = "Humidity: " + weather.main.humidity + "%";

        var lat = weather.coord.lat;
        var lon = weather.coord.lon;
        getuvIndex(lat, lon)
        // fiveDayWeather(lat, lon);
    }

    function getuvIndex(lat, lon) {
        var apiKey = "05027a18faadbe64fa845a2851972b89";
        var apiUrl = 'https://api.openweathermap.org/data/2.5/uvi?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;

        fetch(apiUrl)
            .then(function (response) {
                console.log(response)
                return response.json()
                    .then(function (data) {
                        console.log(data);
                        displayIndex(data)
                    });
            })

        function displayIndex(index) {
            var uvIndexVal = document.createElement("span");
            // uvIndex.index.textContent = index.value;

            if (index.value <= 2) {
                uvIndexVal.setAttribute("class", "badge badge-success");
            } else if (index.value < 8) {
                uvIndexVal.setAttribute("class", "badge badge-warning");
            } else if (index.value > 7) {
                uvIndexVal.setAttribute("class", "badge badge-danger");
            }
            uvIndexVal.innerHTML = index.value;
            uvIndex.innerHTML = "UV Index: ";
            uvIndex.appendChild(uvIndexVal);

        }
    }

    function fiveDayWeather(city) {
        var apiKey = "05027a18faadbe64fa845a2851972b89";
        // var forecastUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
        var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial' + '&appid=' + apiKey;


        fetch(apiUrl)
            .then(function (response) {
                console.log(response)
                return response.json()
                    .then(function (data) {
                        console.log(data);
                        displayFiveDay(data);
                    });
            });
    }

    function displayFiveDay(weather) {
        console.log(weather.list[0])

        var day1 = document.getElementById("day1");
        var forecastDate = document.createElement('h3');
        forecastDate.textContent = moment.unix(weather.dt).format("MMM D, YYYY");
        // day1.innerHTML= weather.dt
        day1.innerHTML = forecastDate;


        // day1.innerHTML = weather.list[0].wind.speed


        // var forecast = weather.list[0]; 
        // for(let i = 5; forecast.length; i++){
           
        // }

        // forecastCont[i].textContent = "";

        // var forecastCont = document.querySelectorAll(".daily");
        // for (var i = 5; forecastCont.length; i++) {

        // // }
        // var forecast = city.list;
        // for (var i = 5; i < forecast.length; i = i + 8) {
        //     var dailyForecast = forecast[i];

        //     var forecastDate = document
        // }


    }



    searchBtn.addEventListener("click", function (event) {
        event.preventDefault();
        var searchCity = citySearched.value;
        getWeather(searchCity);
        fiveDayWeather(searchCity)
        pastSearches.push(searchCity);
        localStorage.setItem("search", JSON.stringify(pastSearches));
        searchHistory();
    })



    function searchHistory() {
        history.innerHTML = "";

        for (let i = 0; i < pastSearches.length; i++) {
            let pastItems = document.createElement("input");
            pastItems.setAttribute("type", "text");
            pastItems.setAttribute("value", pastSearches[i]);
            pastItems.addEventListener("click", function () {
                getWeather(pastItems.value);
            })
            history.append(pastItems);
        }
    }

    searchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }

    clearBtn.addEventListener("click", function () {
        localStorage.clear();
        pastSearches = [];
        searchHistory();
    })

}
weatherDash();