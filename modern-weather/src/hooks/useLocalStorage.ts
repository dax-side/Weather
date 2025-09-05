import { useState, useCallback } from 'react'

export function useLocalStorage<T>(key: string, initialValue: T) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue
    }
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)

      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }, [key, storedValue])

  // Remove from local storage
  const removeValue = useCallback(() => {
    try {
      setStoredValue(initialValue)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key)
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue] as const
}

// Specialized hook for weather app preferences
export function useWeatherPreferences() {
  const [lastSearchedCity, setLastSearchedCity] = useLocalStorage<string>('weather-last-city', '')
  const [favoriteCities, setFavoriteCities] = useLocalStorage<string[]>('weather-favorites', [])
  const [temperatureUnit, setTemperatureUnit] = useLocalStorage<'celsius' | 'fahrenheit'>('weather-unit', 'celsius')

  const addFavoriteCity = useCallback((city: string) => {
    setFavoriteCities(prev => {
      if (!prev.includes(city)) {
        return [...prev, city]
      }
      return prev
    })
  }, [setFavoriteCities])

  const removeFavoriteCity = useCallback((city: string) => {
    setFavoriteCities(prev => prev.filter(c => c !== city))
  }, [setFavoriteCities])

  const toggleFavoriteCity = useCallback((city: string) => {
    setFavoriteCities(prev => {
      if (prev.includes(city)) {
        return prev.filter(c => c !== city)
      } else {
        return [...prev, city]
      }
    })
  }, [setFavoriteCities])

  return {
    lastSearchedCity,
    setLastSearchedCity,
    favoriteCities,
    addFavoriteCity,
    removeFavoriteCity,
    toggleFavoriteCity,
    temperatureUnit,
    setTemperatureUnit
  }
}
