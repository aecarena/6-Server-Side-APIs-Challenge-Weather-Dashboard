
var APIKey = "37a1ab79b96599f077a52000df09a615";
var city;
var searchBtn = document.querySelector(".search-button");
var savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];


var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
function citySearch(event) {
    event.preventDefault()
    var inputEl = document.querySelector(".input");
    city = inputEl.value
    saveCity(city);

var weatherURL =  "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey;





fetch(weatherURL)
.then(function(data) {
    return data.json()
})
.then(function(response) {
    $(".city").text(response.name);
    $(".current-date").text(dayjs.unix(response.dt).format("MM/DD/YYYY"));
    $(".weather-icon").attr("src", "http://openweathermap.org/img/wn/"+ response.weather[0].icon + "@2x.png");
    $(".temperature").text("Temp:   " + response.main.temp);
    $(".humidity").text("Humidity:   " + response.main.humidity);
    $(".wind").text("Wind Speed:   " + response.wind.speed);
    console.log(response);
    
    var forecastURL =  "https://api.openweathermap.org/data/2.5/forecast?lat="+response.coord.lat+"&lon="+response.coord.lon+"&units=imperial&appid=" + APIKey;
    
    fetch(forecastURL)
    .then(function(data) {
        return data.json()
    })
    .then(function(response) {
        
        console.log(response);
        $("#five-day").empty();

        for (let i = 0; i < response.list.length; i+=8) {
            
            const dayForcast = response.list[i];
            var icon = "http://openweathermap.org/img/wn/"+ dayForcast.weather[0].icon + "@2x.png";

            console.log("dayForcast", dayForcast);
            console.log("icon", icon);

            $("#five-day").append('<div class="col days"><p class="day-1-date">'+dayjs.unix(dayForcast.dt).format("MM/DD/YYYY")+'</p><p class="day-1-icon"><img class="weather-icon" src="'+ icon +'"></p>Temp:<p class="day-1-temperature">'+dayForcast.main.temp+'</p>Humidity:<p class="day-1-humidity">'+dayForcast.main.humidity+'</p>Wind Speed:<p class="day-1-wind">'+dayForcast.wind.speed+'</p></div>')
            
        }
    })
})
}

searchBtn.addEventListener("click", citySearch);
renderCityList(savedCities);


function saveCity(city) {
    savedCities.push(city);
    localStorage.setItem("savedCities", JSON.stringify(savedCities))
}

function renderCityList(cityList) {
    for (let i = 0; i < cityList.length; i++) {
        var buttonEl = $("<button>");
        buttonEl.text(cityList[i]);
        buttonEl.click(function() {
            $("#input").val(cityList[i]);
            $(".search-button").click();
        })
        $("#city-list").append(buttonEl);
    }
}
