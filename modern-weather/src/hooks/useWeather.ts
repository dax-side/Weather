import { useState, useCallback } from 'react'

export interface WeatherData {
  name: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  visibility: number
  sys: {
    country: string
    sunrise: number
    sunset: number
  }
}

export function useWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchWeather = useCallback(async (city: string) => {
    if (!city.trim()) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(city)}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to fetch weather data')
      }

      const data = await response.json()
      setWeather(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
      setWeather(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const clearWeather = useCallback(() => {
    setWeather(null)
    setError(null)
  }, [])

  return {
    weather,
    isLoading,
    error,
    fetchWeather,
    clearWeather
  }
}
