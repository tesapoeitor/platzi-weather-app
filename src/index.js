import "./style.css"
import { getCoord, getWeatherData, getCityName } from './utils/getData'

const container = document.querySelector('main')
const input = document.querySelector('form>input')
const btn = document.querySelector('form>button')
const city = document.querySelector('#city')
const day = document.querySelector('#day')
const image = document.querySelector('#image')
const temp = document.querySelector('#temp')
const description = document.querySelector('#description')
const humidity = document.querySelector('#humidity')
const wind = document.querySelector('#wind')
const sensation = document.querySelector('#sensation')

const main = async () => {
  const {
    lat = -25.2800459,
    lon = -57.6343814,
    name: cityName,
  } = await findCity()
  const data = await getWeatherData(lat, lon)
  const days = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ]
  const date = new Date()
  const hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
  const minute =
    date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()

  city.innerHTML = cityName
    ? `${cityName} - ${data.sys.country}`
    : 'Asuncion - PY'
  day.innerHTML = `${days[date.getDay()]} ${hour}:${minute}`
  image.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`
  temp.innerHTML = `${Math.round(data.main.temp)} °C`
  description.innerHTML = `${data.weather[0].description}`
  humidity.innerHTML = `${data.main.humidity} %`
  wind.innerHTML = `${Math.round(data.wind.speed * 3.6)} km/h`
  sensation.innerHTML = `${Math.round(data.main.feels_like)} °C`
}

const getPosition = async () => {
  let lat, lon, name
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      lat = position.coords.latitude
      lon = position.coords.longitude
      name = await getCityName(lat, lon)

      console.log('[mi position]', lat, lon, name)

      return {
        lat,
        lon,
        name,
      }
    })
  }
}

const findCity = async () => {
  const query = input.value.toLowerCase().split(' ')
  let country
  let city

  if (query[query.length - 1].includes('-')) {
    country = query[query.length - 1].replace('-', '')
    query.pop()
  }
  // else {
  //     country = "py"
  // }

  city = query.join(' ') || 'asuncion'

  const coords = await getCoord(city, country)
  console.log(coords)
  return coords
}

main()

container.addEventListener('click', (event) => {
  event.preventDefault()
  if (event.target.nodeName === 'BUTTON') {
    main()
  }
})
