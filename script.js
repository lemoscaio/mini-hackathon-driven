let longitude
let latitude
let API_KEY = '0abcf8b7e32777623a9f64fe87e6a749';
let infoUsers = []

async function getInfoUsersLocation(callback) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((objetoPosition) => {
            latitude = objetoPosition.coords.latitude;
            longitude = objetoPosition.coords.longitude
            callback()
        })
    } else {
        console.log("Não conseguimos buscar a localização do usuário. Favor inserir manualmente");
    }
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

function renderInfosHTML(cidade) {
    const container = document.querySelector('.modal-body')
    const cityName = document.querySelector('.modal-title')

    const descricaoTempo = infoUsers.data.weather[0].description.replace(/^\w/, (letra) => letra.toUpperCase());

    const template = `
    <section class="container-left">
        <div class="gif-weather">
            <img class="gif-weather-source" src="gifs/${infoUsers.data.weather[0].icon}.gif" alt="GIF of the weather">
        </div>
    </section>

    <section class="weather-info container-right">

        <div class="weather-summary d-flex justify-content-center align-items-center">
            <h2 class="temperature-number display-7 fw-bold">${infoUsers.data.main.temp}º C</h2>
            <div class="weather-icon">
                <img src='http://openweathermap.org/img/wn/${infoUsers.data.weather[0].icon}@2x.png'/>
            </div>
            <div class="weather-max-min">
                                <p class="fw-light mb-1">Máx: ${infoUsers.data.main.temp_max} C</p>
                                <p class="fw-lighter mb-1">Min: ${infoUsers.data.main.temp_min} C</p>
                            </div>
        </div>

        <div class="weather-other-info d-flex justify-content-evenly ml-4 ml-4">
            <p class="weather__description">${descricaoTempo}</p>
            <P class="teperature-feelslike">Sensação: ${infoUsers.data.main.feels_like}°</P>
        </div>
        <div class="weather__wind">
        <p class="weather__wind-header text-start mt-3 mb-0">Vento:</p>
        <div class="weather__wind-fields d-flex">
            <p class="weather__wind-degrees me-4 mb-0">Velocidade: ${infoUsers.data.wind.speed} Km/h</p>
        <p class="weather__wind-degrees mb-0">Direção: ${infoUsers.data.wind.deg}º</p>
        </div>
        <div>
        
    </section>
`

    container.innerHTML = template


    cityName.textContent = infoUsers.data.name

    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
    myModal.show()
}

function getInfosLocationByTheUser(cidade) {

    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${API_KEY}`

    axios({
        method: 'get',
        url: URL
    }).then(response => {
        infoUsers = response
        console.log(infoUsers);
        renderInfosHTML(cidade)
    }).catch(informarErro)
}

function getFormsValue(event) {
    event.preventDefault()
    const inputCidade = document.querySelector(".city-name")
    const cidade = inputCidade.value

    if (cidade.length > 0) {
        getInfosLocationByTheUser(cidade)
    } else(
        alert("Insira o nome de uma cidade")
    )

}

function informarErro() {
    const elementoErro = document.createElement("div")
    const mensagemErro = `<p class="text-danger">Vish... A busca não retornou resultado.</p>`

    elementoErro.innerHTML = mensagemErro
    const elementoPai = document.querySelector(".form")
    const botaoEl = document.querySelector(".buscar-cidade")

    elementoPai.insertBefore(elementoErro, botaoEl)
}

getInfoUsersLocation(getWeatherByLocation)