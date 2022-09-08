//var requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=40.6576&lon=-73.5832&appid=d730384eadcace798781efeee25eace8"
// var requestCity = "http://api.openweathermap.org/geo/1.0/direct?q=Freeport&appid=d730384eadcace798781efeee25eace8"
// var APIKey = "d730384eadcace798781efeee25eace8";
var cityInput = document.querySelector(".city-input");
var searchButton = document.querySelector(".btn");

//debugger //debugs everthing before it and can be tested in console.
searchButton.addEventListener("click", function () {
 var currentDate = document.querySelector(".date");
   currentDate.innerHTML = moment().format('MMMM Do YYYY, h:mm:ss a');
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
            console.log(data);
            //localStorage.setItem("search", JSON.stringify));
          });
        });
      });
    });
  });
});

//Function to display data to page
var displayWeather = function (data) {
  const { name } = data;
  const { icon,description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;

  console.log(data);
  document.querySelector(".city").textContent = name;
  document.querySelector(".icon").src = icon; 
  document.querySelector(".desc").textConetent = description;
  document.querySelector(".temp ").textContent = " Temp: " + temp + " K ";
  document.querySelector(".humidity").textContent =
    " Humidity:" + humidity + " % ";
  document.querySelector(".wind").textContent =
    " Wind speed: " + speed + " km/h ";
  
};

var displayUV = function (data) {
const {value} = data[0];
document.querySelector(".uv").textContent = " UV " + " Index: " + value;
 }

