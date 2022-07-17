import { API_KEY } from '../secret'

const API = axios.create({
  baseURL: 'https://api.openweathermap.org',
})

export const getCoord = async (city, country) => {
  const { data } = await API.get(
    `/geo/1.0/direct?q=${city},${country}&appid=${API_KEY}`
  )

  if (data.length === 0) {
    //not fount
    console.log('not fount city')
    return {}
  }

  return data[0]

}

export const getWeatherData = async (lat, lon) => {
  const { data } = await API.get(
    `/data/2.5/weather?lat=${lat}&lon=${lon}&units=${'metric'}&appid=${API_KEY}&lang=es`
  )

  console.log(data)
  return data
}

export const getCityName = async (lat, lon) => {
  const { data } = await API.get(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  )
  const city = data[0].name

  console.log('nombre de la ciudad: ', city)

  return city
}
