import { useState, useCallback } from 'react'

export interface GeolocationState {
  latitude: number | null
  longitude: number | null
  accuracy: number | null
  error: string | null
  isLoading: boolean
  isSupported: boolean
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    latitude: null,
    longitude: null,
    accuracy: null,
    error: null,
    isLoading: false,
    isSupported: typeof navigator !== 'undefined' && 'geolocation' in navigator
  })

  const getCurrentPosition = useCallback(() => {
    if (!state.isSupported) {
      setState(prev => ({ ...prev, error: 'Geolocation is not supported' }))
      return
    }

    setState(prev => ({ ...prev, isLoading: true, error: null }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState(prev => ({
          ...prev,
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          isLoading: false,
          error: null
        }))
      },
      (error) => {
        let errorMessage = 'Unable to retrieve location'
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Location access denied by user'
            break
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Location information unavailable'
            break
          case error.TIMEOUT:
            errorMessage = 'Location request timed out'
            break
        }
        setState(prev => ({
          ...prev,
          error: errorMessage,
          isLoading: false
        }))
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    )
  }, [state.isSupported])

  const clearLocation = useCallback(() => {
    setState(prev => ({
      ...prev,
      latitude: null,
      longitude: null,
      accuracy: null,
      error: null
    }))
  }, [])

  return {
    ...state,
    getCurrentPosition,
    clearLocation
  }
}
