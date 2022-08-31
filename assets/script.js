var requestUrl = "https://api.openweathermap.org/data/2.5/weather?lat=40.6576&lon=-73.5832&appid=d730384eadcace798781efeee25eace8"
// var requestCity = "http://api.openweathermap.org/geo/1.0/direct?q=Freeport&appid=d730384eadcace798781efeee25eace8"
// var APIKey = "d730384eadcace798781efeee25eace8";
var cityInput = document.querySelector(".city-input");
var button = document.querySelector(".btn");
//debugger //debugs everthing before it and can be tested in console.
button.addEventListener("click", function(){
    var cityInput = document.querySelector(".city-input");
    var requestCity = "http://api.openweathermap.org/geo/1.0/direct?q=" +cityInput.value+ "&appid=d730384eadcace798781efeee25eace8" 

    fetch(requestCity).then(function(response){
        response.json().then(function(data){
            console.log(data);
        }); 
});

})


//    fetch(requestUrl).then(function(response){
//         response.json().then(function(data){
//             console.log(data);
// //         }); 
// });
//    fetch(requestCity).then(function(response){
//         response.json().then(function(data){
//             console.log(data);
//         }); 
// });


