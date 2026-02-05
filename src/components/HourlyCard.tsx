import { format, parseISO } from 'date-fns';

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

type HourlyCardProps = {
  hour: string
  climate: number
  weatherCode: WeatherIcon
}



const HourlyCard = ({ hour, climate, weatherCode }: HourlyCardProps) => {

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

  //const time = parseISO(hour)
  //const formattedTime = format(time, 'H a')

  return (
    <div className="w-full flex bg-neutral-600 justify-between rounded-lg py-2 px-3 items-center">
      <div className="flex items-center gap-2">
        <img src={icon.src} alt={icon.src} className="w-8" />
        <p>{hour}</p>
      </div>
      <p>{Math.round(climate) || 22}°</p>
    </div>
  )
}

export default HourlyCard



