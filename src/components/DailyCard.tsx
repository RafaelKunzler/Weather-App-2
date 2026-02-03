import React from 'react'



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

  type DailyCardProps = {
    day: string
    imagePath: WeatherIcon
  }


const DailyCard = ({day, imagePath}: DailyCardProps) => {
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
  
  const icon = iconMap[imagePath]

  return (
    <div className="w-full bg-neutral-800 rounded-xl p-3 text-center items-center">
      <p>{day}</p>
      <img src={icon.src} alt={icon.src} className="w-full self-center" />
      <div className="flex justify-between">
        <p>20°</p>
        <p>14°</p>
      </div>
    </div>
  )
}

export default DailyCard

