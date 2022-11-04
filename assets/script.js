//Declaring Variables
var cityInput = document.querySelector(".city-input");
var searchButton = document.querySelector(".btn");

function saveToLocalStorage(cityName) {
  var cities = [];
  if (localStorage.getItem("cities")) {
    // push a new value to array
    cities = JSON.parse(localStorage.getItem("cities"));
  }
  cities.push(cityName);
  localStorage.setItem("cities", JSON.stringify(cities));
}

//local storage function 
if (localStorage.getItem("cities")) {
  var cities = JSON.parse(localStorage.getItem("cities"));
  for (let index = 0; index < cities.length; index++) {
    const cityName = cities[index];
    // create a button
    var btn = document.createElement('button')
    btn.innerHTML = cityName

    // append that button
    document.getElementById("history").appendChild(btn);
  }
}

//Search button event listener linked to function that fetches api, captures and displays data
searchButton.addEventListener("click", function () {
  var currentDate = document.querySelector(".date");
  //APi for City name
  var cityInput = document.querySelector(".city-input");
  saveToLocalStorage(cityInput.value);
  var btn = document.createElement('button')
  btn.innerHTML = cityInput.value
  btn.addEventListener
  // append that button
  document.getElementById("history").appendChild(btn);
  var requestCity =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInput.value +
    "&appid=d730384eadcace798781efeee25eace8";

  fetch(requestCity).then(function (response) {
    response.json().then(function (data) {
      console.log(data);
      //debugger;

      //APi for UV
      var requestUV =
        "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
        data[0].lat +
        "&lon=" +
        data[0].lon +
        "&appid=d730384eadcace798781efeee25eace8";
      fetch(requestUV).then(function (response) {
        response.json().then(function (uvData) {
          // displayUV(data);
          console.log("uvz", uvData);
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
              var Wdiv = document.querySelector("#Wdiv");
              Wdiv.innerHTML = "";
              const weatherList = data.list;
              for (let i = 0; i < weatherList.length; i += 8) {
                debugger;
                displayWeather(weatherList[i], uvData[i / 8]);
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
var displayWeather = function (data, uvData) {
  const { name } = data;
  const { dt_txt } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  console.log(data);
  //Declaring variables to display city input
  var cityInput = document.querySelector(".city-input");
  document.querySelector(".city").textContent = cityInput.value;

  var Wdiv = document.querySelector("#Wdiv");

  var main = document.createElement("div");
  main.classList.add("weather", "col", "card", "bg-info");

  //Creates html elemetns and appends them
  var date = document.createElement("div");
  date.classList.add("date", "panel");
  date.textContent = dt_txt;
  var temper = document.createElement("div");
  temper.classList.add("temp", "panel");
  temper.textContent = " Temp: " + temp + " K ";
  var iccon = document.createElement("img", "panel");
  iccon.id = "wicon";
  iccon.setAttribute("src", "");
  iccon.src = "https://openweathermap.org/img/w/" + icon + ".png";
  var desc = document.createElement("div");
  desc.classList.add("desc", "panel");
  desc.textConetent = description;
  var humid = document.createElement("div");
  humid.classList.add("humidty", "panel");
  humid.textContent = " Humidity:" + humidity + " % ";
  var wind = document.createElement("div");
  wind.classList.add("wind", "panel");
  wind.textContent = " Wind speed: " + speed + " km/h ";
  var uv = displayUV(uvData);
  Wdiv.appendChild(main);
  main.appendChild(iccon);
  main.appendChild(humid);
  main.appendChild(date);
  main.appendChild(temper);
  main.appendChild(desc);
  main.appendChild(wind);
  main.appendChild(uv);
};
//Function that changes the UV color
var displayUV = function (data) {
  const { value } = data;

  var uv = document.createElement("div");
  uv.classList.add("uv");

  uv.textContent = " UV " + " Index: " + value;

  //Changes Index Color based off of value
  if (value <= 2) {
    uv.classList.add("low");
  } else if (value >= 3 && value <= 5) {
    uV.classList.add("mod");
  } else if (value >= 6 && value <= 7) {
    uv.classList.add("high");
  } else if (value >= 8 && value <= 10) {
    uv.classList.add("Vhigh");
  } else {
    uv.classList.add("Xhigh");
  }
  return uv;
};
