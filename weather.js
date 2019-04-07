
const weather = document.querySelector(".js-weather");

const COORDS = "coords";
const API_KEY = "88c8e2cde6b7d35274f758049b4c7e7a"; //Open Weather API's key

function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){ //"then" waiting for fetch
        return response.json();   
    }).then(
        function(json){
           // console.log(json);
           const temperature = json.main.temp;
           const place = json.name;
           weather.innerText = `${temperature} @ ${place}`;
        }
    )
};

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    const latitude= (position.coords.latitude);
    const longitude = (position.coords.longitude);
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("Cannot access geo location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if( loadedCoords === null ){
        askForCoords();
    } else {
        const parsedCoordes = JSON.parse(loadedCoords); //string to obj
        getWeather(parsedCoordes.latitude, parsedCoordes.longitude);
    }
}

function init(){
    loadCoords();
}

init();