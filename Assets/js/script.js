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
    var forecastTime1 = document.getElementById("time1");
    var forecastImg1 = document.getElementById("image1");
    var forecastWind1 = document.getElementById("wind1");
    var forecastTemp1 = document.getElementById("temp1");
    var forecastHum1 = document.getElementById("hum1");
    var forecastTime2 = document.getElementById("time2");
    var forecastImg2 = document.getElementById("image2");
    var forecastWind2 = document.getElementById("wind2");
    var forecastTemp2 = document.getElementById("temp2");
    var forecastHum2 = document.getElementById("hum2");
    var forecastTime3 = document.getElementById("time3");
    var forecastImg3 = document.getElementById("image3");
    var forecastWind3 = document.getElementById("wind3");
    var forecastTemp3 = document.getElementById("temp3");
    var forecastHum3 = document.getElementById("hum3");
    var forecastTime4 = document.getElementById("time4");
    var forecastImg4 = document.getElementById("image4");
    var forecastWind4 = document.getElementById("wind4");
    var forecastTemp4 = document.getElementById("temp4");
    var forecastHum4 = document.getElementById("hum4");
    var forecastTime5 = document.getElementById("time5");
    var forecastImg5 = document.getElementById("image5");
    var forecastWind5 = document.getElementById("wind5");
    var forecastTemp5 = document.getElementById("temp5");
    var forecastHum5 = document.getElementById("hum5");



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
    //function to display weather
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

    //function to retrieve uv index
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

        //function to display uv index
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

    //function to retrieve 5 day forecast
    function fiveDayWeather(city) {
        var apiKey = "05027a18faadbe64fa845a2851972b89";
        // var apiUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey;
        var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial' + '&appid=' + apiKey;
        // var apiUrl= `https://api.openweathermap.org/geo/1.0/direct?q='${city}&limit=5&appid=${apiKey}`;

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


    //function to display 5 day forecast
    function displayFiveDay(weather) {
        console.log(weather.list)

        var day1 = document.getElementById("day1");

        forecastTime1.innerHTML = moment.unix(weather.list[8].dt).format("MMM D, YYYY");
        var forecastWeatherEl = document.createElement("img");
        forecastWeatherEl.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.list[8].weather[0].icon + "@2x.png");
        forecastWeatherEl.setAttribute("alt", weather.list[8].weather[0].description);
        forecastImg1.append(forecastWeatherEl);
        forecastTemp1.innerHTML = "Temp: " + weather.list[8].main.temp + " °F";
        forecastWind1.innerHTML = "Wind: " + weather.list[8].wind.speed + " MPH";
        forecastHum1.innerHTML = "Humidity: " + weather.list[8].main.humidity + "%";
   

        var day2 = document.getElementById("day2");

        forecastTime2.innerHTML = moment.unix(weather.list[16].dt).format("MMM D, YYYY");
        var forecastWeatherEl2 = document.createElement("img");
        forecastWeatherEl2.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.list[16].weather[0].icon + "@2x.png");
        forecastWeatherEl2.setAttribute("alt", weather.list[16].weather[0].description);
        forecastImg2.append(forecastWeatherEl2);
        forecastTemp2.innerHTML = "Temp: " + weather.list[16].main.temp + " °F";
        forecastWind2.innerHTML = "Wind: " + weather.list[16].wind.speed + " MPH";
        forecastHum2.innerHTML = "Humidity: " + weather.list[16].main.humidity + "%";

        var day3 = document.getElementById("day3");

        forecastTime3.innerHTML = moment.unix(weather.list[24].dt).format("MMM D, YYYY");
        var forecastWeatherEl3 = document.createElement("img");
        forecastWeatherEl3.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.list[24].weather[0].icon + "@2x.png");
        forecastWeatherEl3.setAttribute("alt", weather.list[24].weather[0].description);
        forecastImg3.append(forecastWeatherEl3);
        forecastTemp3.innerHTML = "Temp: " + weather.list[24].main.temp + " °F";
        forecastWind3.innerHTML = "Wind: " + weather.list[24].wind.speed + " MPH";
        forecastHum3.innerHTML = "Humidity: " + weather.list[24].main.humidity + "%";

        var day4 = document.getElementById("day4");

        forecastTime4.innerHTML = moment.unix(weather.list[32].dt).format("MMM D, YYYY");
        var forecastWeatherEl4 = document.createElement("img");
        forecastWeatherEl4.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.list[32].weather[0].icon + "@2x.png");
        forecastWeatherEl4.setAttribute("alt", weather.list[32].weather[0].description);
        forecastImg4.append(forecastWeatherEl4);
        forecastTemp4.innerHTML = "Temp: " + weather.list[32].main.temp + " °F";
        forecastWind4.innerHTML = "Wind: " + weather.list[32].wind.speed + " MPH";
        forecastHum4.innerHTML = "Humidity: " + weather.list[32].main.humidity + "%";

        var day5 = document.getElementById("day5");

        forecastTime5.innerHTML = moment.unix(weather.list[38].dt).format("MMM D, YYYY");
        var forecastWeatherEl5 = document.createElement("img");
        forecastWeatherEl5.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.list[38].weather[0].icon + "@2x.png");
        forecastWeatherEl5.setAttribute("alt", weather.list[38].weather[0].description);
        forecastImg5.append(forecastWeatherEl5);
        forecastTemp5.innerHTML = "Temp: " + weather.list[38].main.temp + " °F";
        forecastWind5.innerHTML = "Wind: " + weather.list[38].wind.speed + " MPH";
        forecastHum5.innerHTML = "Humidity: " + weather.list[38].main.humidity + "%";


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