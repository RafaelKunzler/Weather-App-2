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

export function getWeatherIcon(code: number): WeatherIcon {
  if (code === 0) return 'sunny'

  if ([1, 2].includes(code)) return 'partlyCloud'
  if (code === 3) return 'overcast'

  if ([45, 48].includes(code)) return 'fog'

  if ([51, 53, 55, 56, 57].includes(code)) return 'drizzle'

  if (
    [61, 63, 65, 66, 67, 80, 81, 82].includes(code)
  )
    return 'rain'

  if ([71, 73, 75, 77, 85, 86].includes(code)) return 'snow'

  if ([95, 96, 99].includes(code)) return 'storm'

  return 'cloudy' // fallback seguro
}
