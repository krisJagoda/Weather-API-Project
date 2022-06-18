const input = document.querySelector('input')
const button = document.querySelector('button')
const cityName = document.querySelector('.city-name')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const axios = require('axios').default

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = '&appid=67dcbf7a2ea60a3e9ffee282d9871218'
const API_UNITS = '&units=metric'

const convertDescription = desc => {
    const arr = desc.split(' ')
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }
    return arr.join(' ')
}

const getWeatherIcon = icon => {
     return `http://openweathermap.org/img/wn/${icon}@2x.png`
};

const showWeather = response => {
    const temp = Math.round(response.data.main.temp) + '℃'
    const description = response.data.weather[0].description
    const correctDesc = convertDescription(description)
    const hum = response.data.main.humidity + '%'
    const icon = getWeatherIcon(response.data.weather[0].icon)

    weather.textContent = correctDesc
    temperature.textContent = temp
    humidity.textContent = hum
    photo.setAttribute('src', icon)
}

async function getWeather() {
    const city = `q=${input.value}`
    const URL = `${API_LINK}?${city}${API_UNITS}${API_KEY}`

    try {
        const response = await axios.get(URL);
        showWeather(response)
    } catch (error) {
        console.error(error);
    }
}

button.addEventListener('click', getWeather)

