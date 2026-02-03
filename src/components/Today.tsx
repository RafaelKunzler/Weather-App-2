import { getWeatherIcon } from '../utils/getWeatherIcon'

import cloudy from '../assets/images/icon-partly-cloudy.webp'
import drizzle from '../assets/images/icon-drizzle.webp'
import fog from '../assets/images/icon-fog.webp'
import overcast from '../assets/images/icon-overcast.webp'
import partlyCloud from '../assets/images/icon-partly-cloudy.webp'
import rain from '../assets/images/icon-rain.webp'
import snow from '../assets/images/icon-snow.webp'
import storm from '../assets/images/icon-storm.webp'
import sunny from '../assets/images/icon-sunny.webp'


type WeatherIcon =
  | 'cloudy'
  | 'drizzle'
  | 'fog'
  | 'overcast'
  | 'partlyCloud'
  | 'rain'
  | 'snow'
  | 'storm'
  | 'sunny'

type TodayProps = {
  city: string
  date: string
  temperature: number
  weatherCode: WeatherIcon | number
  unit: string
}

const Today = ({city, date, temperature, weatherCode, unit}: TodayProps) => {
  const iconMap: Record<WeatherIcon, ImageMetadata> = {
  cloudy,
  drizzle,
  fog,
  overcast,
  partlyCloud,
  rain,
  snow,
  storm,
  sunny,
}

const weatherIcon = getWeatherIcon(weatherCode)
const icon: Record<WeatherIcon, ImageMetadata> = iconMap[weatherIcon]


  return (
    < div className="bg-[url('../assets/images/bg-today-large.svg')] bg-no-repeat bg-center w-full rounded 2xl 
    flex justify-between py-20 px-8 mt-10"
    >
      <div className="">
        <h1 className="text-2xl font-bold">{city}</h1>
        <p className="font-light mt-2">{date}</p>
      </div>
      <div className="flex items-center">
        <img src={icon.src} alt="sun" className="w-24" />
        <h1 className="font-bold text-6xl">{Math.round(temperature)}{unit}</h1>
      </div>
    </div >

  )
}

export default Today

  