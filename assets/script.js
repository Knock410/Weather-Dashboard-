//var requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=40.6576&lon=-73.5832&appid=d730384eadcace798781efeee25eace8"
// var requestCity = "http://api.openweathermap.org/geo/1.0/direct?q=Freeport&appid=d730384eadcace798781efeee25eace8"
// var APIKey = "d730384eadcace798781efeee25eace8";
var cityInput = document.querySelector(".city-input");
var searchButton = document.querySelector(".btn");

//debugger //debugs everthing before it and can be tested in console.
searchButton.addEventListener("click", function () {
  var currentDate = document.querySelector(".date");

  var cityInput = document.querySelector(".city-input");
  var requestCity =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInput.value +
    "&appid=d730384eadcace798781efeee25eace8";

  fetch(requestCity).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      //   var requestWeather =
      //     "https://api.openweathermap.org/data/2.5/weather?lat=" +
      //     data[0].lat +
      //     "&lon=" +
      //     data[0].lon +
      //     "&appid=d730384eadcace798781efeee25eace8";
      //   fetch(requestWeather).then(function (response) {
      //     response.json().then(function (data) {
      //       //console.log(data); //Change this to diplay in HTML as innerHTML or text content on selected div
      //       //debugger
      // //       displayWeather(data);
      //     });

      var requestUV =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
        data[0].lat +
        "&lon=" +
        data[0].lon +
        "&appid=d730384eadcace798781efeee25eace8";
      fetch(requestUV).then(function (response) {
        response.json().then(function (data) {
          displayUV(data);
          console.log(data);
          //localStorage.setItem("search", JSON.stringify));

          //5 day api forecast
          var fiveDayFor =
            "https://api.openweathermap.org/data/2.5/forecast?lat=" +
            data[0].lat +
            "&lon=" +
            data[0].lon +
            "&appid=d730384eadcace798781efeee25eace8";
          fetch(fiveDayFor).then(function (response) {
            response.json().then(function (data) {
              console.log(data);
              const weatherList = data.list;
              for (let i = 0; i < weatherList.length; i += 8) {
                displayWeather(weatherList[i]);
              }
            });
          });
        });
      });
    });
  });
});
// });

//Function to display data to page
var displayWeather = function (data) {
  const { name } = data;
  const { dt_txt } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  console.log(data);
  document.querySelector(".date").textContent = dt_txt;
  document.querySelector(".city").textContent = name;
  document.querySelector("#wicon").src =
    "http://openweathermap.org/img/w/" + icon + ".png";
  document.querySelector(".desc").textConetent = description;
  document.querySelector(".temp ").textContent = " Temp: " + temp + " K ";
  document.querySelector(".humidity").textContent =
    " Humidity:" + humidity + " % ";
  document.querySelector(".wind").textContent =
    " Wind speed: " + speed + " km/h ";
  //dynamically creating divs for the weather forecast data
  var forecast = document.createElement("div").classList.add("weather");
  var city = document.createElement("h2").classList.add("city");
  //    var forecastOne = document.createElement("div").classList.add("weather")
  //    var forecastOne = document.createElement("div").classList.add("weather")
  //    var forecastOne = document.createElement("div").classList.add("weather")
  //    var city = document.createElement("h2")

  forecast.getElementById("Wdiv").appendChild(city);

  //    <div class="weather">
  //       <h2 class="city"></h2>
  //       <div class ="date"></div>
  //       <div class="temp"></div>
  //       <div class="icon"><img id="wicon" src="" alt=""></div>
  //       <div class ="desc"> </div>
  //       <div class="humidity"></div>
  //       <div class="wind"></div>
  //       <div class="uv"></div>
};

var displayUV = function (data) {
  const { value } = data[0];

  document.querySelector(".uv").textContent = " UV " + " Index: " + value;
  var uV = document.querySelector(".uv");
  //Changes Index Color based off of value
  if (value <= 2) {
    uV.classList.add("low");
  } else if (value >= 3 && value <= 5) {
    uV.classList.add("mod");
  } else if (value >= 6 && value <= 7) {
    uV.classList.add("high");
  } else if (value >= 8 && value <= 10) {
    uV.classList.add("Vhigh");
  } else {
    uV.classList.add("Xhigh");
  }
};
