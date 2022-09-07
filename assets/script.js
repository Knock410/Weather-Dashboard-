//var requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=40.6576&lon=-73.5832&appid=d730384eadcace798781efeee25eace8"
// var requestCity = "http://api.openweathermap.org/geo/1.0/direct?q=Freeport&appid=d730384eadcace798781efeee25eace8"
// var APIKey = "d730384eadcace798781efeee25eace8";
var cityInput = document.querySelector(".city-input");
var button = document.querySelector(".btn");
//debugger //debugs everthing before it and can be tested in console.
button.addEventListener("click", function () {
  var cityInput = document.querySelector(".city-input");
  var requestCity =
    "http://api.openweathermap.org/geo/1.0/direct?q=" +
    cityInput.value +
    "&appid=d730384eadcace798781efeee25eace8";

  fetch(requestCity).then(function (response) {
    response.json().then(function (data) {
      console.log(data);

      var requestWeather =
        "https://api.openweathermap.org/data/2.5/weather?lat=" +
        data[0].lat +
        "&lon=" +
        data[0].lon +
        "&appid=d730384eadcace798781efeee25eace8";
      fetch(requestWeather).then(function (response) {
        response.json().then(function (data) {
          //console.log(data); //Change this to diplay in HTML as innerHTML or text content on selected div
          //debugger
          displayWeather(data);
        });

        var requestUV =
          "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
          data[0].lat +
          "&lon=" +
          data[0].lon +
          "&appid=d730384eadcace798781efeee25eace8";
        fetch(requestUV).then(function (response) {
          response.json().then(function (data) {
            displayUV(data);
            
          });
        });
      });
    });
  });
});

//Function to display data to page
var displayWeather = function (data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  console.log(data);
  document.querySelector(".city").textContent = name;
  document.querySelector(".date").textContent = speed;
  document.querySelector(".temp").textContent = temp;
  document.querySelector(".humidity").textContent =
    "Humidity:" + humidity + "%";
  document.querySelector(".wind").textContent =
    " Wind speed " + speed + " km/h ";
  document.querySelector(".uv").textContent = lat;
};

var displayUV= 

