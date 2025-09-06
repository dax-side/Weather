'use client'

import React, { createContext, useContext, useReducer, useCallback, ReactNode } from 'react'
import { WeatherData } from '@/types/weather'

// State interface
interface WeatherState {
  currentWeather: WeatherData | null
  isLoading: boolean
  error: string | null
  lastSearchedCity: string
  favoriteCities: string[]
  temperatureUnit: 'celsius' | 'fahrenheit'
}

// Action types
type WeatherAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_WEATHER'; payload: WeatherData }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_LAST_SEARCHED_CITY'; payload: string }
  | { type: 'ADD_FAVORITE_CITY'; payload: string }
  | { type: 'REMOVE_FAVORITE_CITY'; payload: string }
  | { type: 'SET_TEMPERATURE_UNIT'; payload: 'celsius' | 'fahrenheit' }
  | { type: 'CLEAR_WEATHER' }

// Initial state
const initialState: WeatherState = {
  currentWeather: null,
  isLoading: false,
  error: null,
  lastSearchedCity: '',
  favoriteCities: [],
  temperatureUnit: 'celsius'
}

// Reducer function
function weatherReducer(state: WeatherState, action: WeatherAction): WeatherState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_WEATHER':
      return { ...state, currentWeather: action.payload, error: null }
    case 'SET_ERROR':
      return { ...state, error: action.payload, currentWeather: null }
    case 'SET_LAST_SEARCHED_CITY':
      return { ...state, lastSearchedCity: action.payload }
    case 'ADD_FAVORITE_CITY':
      if (state.favoriteCities.includes(action.payload)) {
        return state
      }
      return { ...state, favoriteCities: [...state.favoriteCities, action.payload] }
    case 'REMOVE_FAVORITE_CITY':
      return {
        ...state,
        favoriteCities: state.favoriteCities.filter(city => city !== action.payload)
      }
    case 'SET_TEMPERATURE_UNIT':
      return { ...state, temperatureUnit: action.payload }
    case 'CLEAR_WEATHER':
      return { ...state, currentWeather: null, error: null }
    default:
      return state
  }
}

// Context interface
interface WeatherContextType {
  state: WeatherState
  dispatch: React.Dispatch<WeatherAction>
  // Helper functions
  fetchWeather: (city: string) => Promise<void>
  addFavoriteCity: (city: string) => void
  removeFavoriteCity: (city: string) => void
  toggleFavoriteCity: (city: string) => void
  setTemperatureUnit: (unit: 'celsius' | 'fahrenheit') => void
  clearWeather: () => void
}

// Create context
const WeatherContext = createContext<WeatherContextType | undefined>(undefined)

// Provider component
export function WeatherProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(weatherReducer, initialState)

  // Load initial data from localStorage
  React.useEffect(() => {
    const lastCity = localStorage.getItem('weather-last-city')
    const favorites = localStorage.getItem('weather-favorites')
    const unit = localStorage.getItem('weather-unit')

    if (lastCity) {
      dispatch({ type: 'SET_LAST_SEARCHED_CITY', payload: lastCity })
    }
    if (favorites) {
      try {
        const parsedFavorites = JSON.parse(favorites)
        parsedFavorites.forEach((city: string) => {
          dispatch({ type: 'ADD_FAVORITE_CITY', payload: city })
        })
      } catch (error) {
        console.error('Error parsing favorites from localStorage:', error)
      }
    }
    if (unit === 'fahrenheit') {
      dispatch({ type: 'SET_TEMPERATURE_UNIT', payload: 'fahrenheit' })
    }
  }, [])

  // Save to localStorage when state changes
  React.useEffect(() => {
    localStorage.setItem('weather-last-city', state.lastSearchedCity)
  }, [state.lastSearchedCity])

  React.useEffect(() => {
    localStorage.setItem('weather-favorites', JSON.stringify(state.favoriteCities))
  }, [state.favoriteCities])

  React.useEffect(() => {
    localStorage.setItem('weather-unit', state.temperatureUnit)
  }, [state.temperatureUnit])

  // Weather fetching function
  const fetchWeather = useCallback(async (city: string) => {
    dispatch({ type: 'SET_LOADING', payload: true })
    dispatch({ type: 'SET_ERROR', payload: null })

    try {
      // Use environment variable for API key (will be replaced during build)
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY
      
      if (!API_KEY) {
        throw new Error('Weather API key not configured')
      }

      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
      )

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('City not found')
        }
        throw new Error('Failed to fetch weather data')
      }

      const data = await response.json()
      dispatch({ type: 'SET_WEATHER', payload: data })
      dispatch({ type: 'SET_LAST_SEARCHED_CITY', payload: city })
    } catch (err) {
      dispatch({
        type: 'SET_ERROR',
        payload: err instanceof Error ? err.message : 'An error occurred'
      })
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }, [])

  // Load initial weather data
  React.useEffect(() => {
    if (state.lastSearchedCity && !state.currentWeather && !state.isLoading) {
      fetchWeather(state.lastSearchedCity)
    } else if (!state.lastSearchedCity && !state.currentWeather && !state.isLoading) {
      fetchWeather('London')
    }
  }, [state.lastSearchedCity, state.currentWeather, state.isLoading, fetchWeather])

  // Helper functions
  const addFavoriteCity = useCallback((city: string) => {
    dispatch({ type: 'ADD_FAVORITE_CITY', payload: city })
  }, [])

  const removeFavoriteCity = useCallback((city: string) => {
    dispatch({ type: 'REMOVE_FAVORITE_CITY', payload: city })
  }, [])

  const toggleFavoriteCity = useCallback((city: string) => {
    if (state.favoriteCities.includes(city)) {
      removeFavoriteCity(city)
    } else {
      addFavoriteCity(city)
    }
  }, [state.favoriteCities, removeFavoriteCity, addFavoriteCity])

  const setTemperatureUnit = useCallback((unit: 'celsius' | 'fahrenheit') => {
    dispatch({ type: 'SET_TEMPERATURE_UNIT', payload: unit })
  }, [])

  const clearWeather = useCallback(() => {
    dispatch({ type: 'CLEAR_WEATHER' })
  }, [])

  const value: WeatherContextType = {
    state,
    dispatch,
    fetchWeather,
    addFavoriteCity,
    removeFavoriteCity,
    toggleFavoriteCity,
    setTemperatureUnit,
    clearWeather
  }

  return (
    <WeatherContext.Provider value={value}>
      {children}
    </WeatherContext.Provider>
  )
}

// Custom hook to use the weather context
export function useWeatherContext() {
  const context = useContext(WeatherContext)
  if (context === undefined) {
    throw new Error('useWeatherContext must be used within a WeatherProvider')
  }
  return context
}
