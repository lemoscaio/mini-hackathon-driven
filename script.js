let longitude
let latitude
let API_KEY = '0abcf8b7e32777623a9f64fe87e6a749';
let infoUsers = []

async function getInfoUsersLocation(callback) {
    if ("geolocation" in navigator) {
        await navigator.geolocation.getCurrentPosition((objetoPosition) => {
            latitude = objetoPosition.coords.latitude;
            longitude = objetoPosition.coords.longitude
            console.log('testando');
            callback()
        })
      } else {
        console.log('teste');
      }
      
}

let objetoTemp = {
    "data": {
        "coord": {
            "lon": -43.3009,
            "lat": -22.8441
        },
        "weather": [{
            "id": 803,
            "main": "Clouds",
            "description": "nublado",
            "icon": "04n"
        }],
        "base": "stations",
        "main": {
            "temp": 26.29,
            "feels_like": 26.29,
            "temp_min": 24.84,
            "temp_max": 27.99,
            "pressure": 1012,
            "humidity": 77
        },
        "visibility": 10000,
        "wind": {
            "speed": 3.09,
            "deg": 50
        },
        "clouds": {
            "all": 75
        },
        "dt": 1646430225,
        "sys": {
            "type": 1,
            "id": 8376,
            "country": "BR",
            "sunrise": 1646383837,
            "sunset": 1646428775
        },
        "timezone": -10800,
        "id": 3464374,
        "name": "Duque de Caxias",
        "cod": 200
    },
    "status": 200,
    "statusText": "OK",
    "headers": {
        "content-length": "475",
        "content-type": "application/json; charset=utf-8"
    },
    "config": {
        "transitional": {
            "silentJSONParsing": true,
            "forcedJSONParsing": true,
            "clarifyTimeoutError": false
        },
        "transformRequest": [
            null
        ],
        "transformResponse": [
            null
        ],
        "timeout": 0,
        "xsrfCookieName": "XSRF-TOKEN",
        "xsrfHeaderName": "X-XSRF-TOKEN",
        "maxContentLength": -1,
        "maxBodyLength": -1,
        "headers": {
            "Accept": "application/json, text/plain, */*"
        },
        "method": "get",
        "url": "https://api.openweathermap.org/data/2.5/weather?lat=-22.8441034&lon=-43.3009435&units=metric&lang=pt_br&appid=0abcf8b7e32777623a9f64fe87e6a749"
    },
    "request": {}
}

function getWeatherByLocation() {
    let URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=pt_br&appid=${API_KEY}`
    axios({
        method: 'get',
        url: URL,
    }).then(response => {
        infoUsers = response
        console.log(infoUsers);
        renderInfosHTML()
     
    })
}

function renderInfosHTML() {
    const container = document.querySelector('.modal-body')
    const cityName = document.querySelector('#exampleModalLabel')
    container.innerHTML =
        `
        <section class="container-left">
            <div class="gif-weather">
                <img src="gifs/${infoUsers.data.weather[0].icon}" alt="">
            </div>
        </section>

        <section class="weather-info container-right">

            <div class="weather-summary">
                <h2 class="temperature-number">${infoUsers.data.main.temp}º C</h2>
                <div class="weather-icon">
                    <img src='http://openweathermap.org/img/wn/${infoUsers.data.weather[0].icon}@2x.png'/>
                </div>
            </div>

            <div class="weather-other-info d-flex justify-content-space-between">
                <p class="weather__description">${infoUsers.data.weather[0].description}</p>
                <P class="teperature-feelslike">Sensação: ${infoUsers.data.main.feels_like}°</P>
            </div>
            <div class="weather__wind">
                <p class="weather__wind-degrees">Velocidade: ${infoUsers.data.wind.speed} Km/h</p>
                <p class="weather__wind-degrees">Direção: ${infoUsers.data.wind.deg}º</p>
            </div>
        </section>
    `
}
function getInfosLocationByTheUser() {
    let postalCode = document.querySelector('.postalCode').value
    let siglaPais = document.querySelector('.siglasPais').value
    console.log(postalCode,siglaPais);
    const URL= `http://api.openweathermap.org/geo/1.0/zip?zip=${postalCode},${siglaPais}&appid=${API_KEY}`
                //  http://api.openweathermap.org/geo/1.0/zip?zip={zip code},{country code}&appid={API key}
 
    axios({
        method:'get',
        url: URL
    }).then(response =>{
        infoUsers = response
        console.log(infoUsers);
        renderInfosHTML()
    })
}

getInfoUsersLocation(getWeatherByLocation)
// renderInfosHTML()

// getInfoUsersLocation(getWeatherByLocation)