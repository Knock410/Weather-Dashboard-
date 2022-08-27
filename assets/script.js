var requestUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}"
var APIKey = "d730384eadcace798781efeee25eace8";

fetch(requestUrl)
.then(function(response){
    return response.json();
})
.then(function(date){
    console.log(date);
});