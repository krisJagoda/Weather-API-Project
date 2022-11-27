import API_KEY from "./apikey.mjs"

const input = document.querySelector('input')
const button = document.querySelector('button')
const warning = document.querySelector('.warning')
const photo = document.querySelector('.photo')
const weather = document.querySelector('.weather')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather'
const API_UNITS = 'metric'

const convertDescription = desc => {
    const arr = desc.split(' ')
    for (let i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1)
    }
    return arr.join(' ')
}

const getWeatherIcon = icon => {
     return `https://openweathermap.org/img/wn/${icon}@2x.png`
}

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
    const city = `${input.value}`
    const URL = `${API_LINK}?q=${city}&units=${API_UNITS}&appid=${API_KEY}`

    try {
        const response = await axios.get(URL);
        showWeather(response)
    } catch (err) {
        console.error(err.message)
        if (err.response.status === 400 || err.response.status === 404) {
            warning.textContent = 'Enter correct location name'
        }
    }
}

button.addEventListener('click', getWeather)
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault()
        getWeather()
    }
})

