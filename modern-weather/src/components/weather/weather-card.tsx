'use client'

import { motion } from 'framer-motion'
import { Droplets, Wind, Eye, Thermometer, Gauge, Sunrise, Sunset } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WeatherData } from '@/types/weather'
import { formatTemperature, formatWindSpeed, capitalizeFirst } from '@/lib/utils'

function getWeatherEmoji(icon: string): string {
  const iconMap: Record<string, string> = {
    '01d': '☀️', // clear sky day
    '01n': '🌙', // clear sky night
    '02d': '⛅', // few clouds day
    '02n': '☁️', // few clouds night
    '03d': '☁️', // scattered clouds
    '03n': '☁️', // scattered clouds
    '04d': '☁️', // broken clouds
    '04n': '☁️', // broken clouds
    '09d': '🌧️', // shower rain
    '09n': '🌧️', // shower rain
    '10d': '🌦️', // rain day
    '10n': '🌧️', // rain night
    '11d': '⛈️', // thunderstorm
    '11n': '⛈️', // thunderstorm
    '13d': '❄️', // snow
    '13n': '❄️', // snow
    '50d': '🌫️', // mist
    '50n': '🌫️', // mist
  }
  return iconMap[icon] || '🌤️'
}

interface WeatherCardProps {
  weather: WeatherData
}

export function WeatherCard({ weather }: WeatherCardProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.02, y: -10 }}
      className="group"
    >
      <Card className="w-full max-w-2xl glass-dark border border-white/20 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
        
        <CardHeader className="text-center pb-8 relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="text-8xl mb-6"
          >
            {getWeatherEmoji(weather.weather[0].icon)}
          </motion.div>
          
          <CardTitle className="text-3xl text-white font-light mb-2">
            {weather.name}, {weather.sys.country}
          </CardTitle>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-white/80 text-lg capitalize font-medium"
          >
            {capitalizeFirst(weather.weather[0].description)}
          </motion.div>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Main temperature */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
            className="text-center"
          >
            <div className="text-7xl font-thin text-white mb-4">
              {formatTemperature(weather.main.temp)}
            </div>
            <div className="flex justify-center gap-8 text-white/70">
              <span className="text-lg">
                H: {formatTemperature(weather.main.temp_max)}
              </span>
              <span className="text-lg">
                L: {formatTemperature(weather.main.temp_min)}
              </span>
            </div>
          </motion.div>

          {/* Weather metrics grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 glass rounded-2xl border border-white/10"
            >
              <Thermometer className="h-8 w-8 text-red-300 mb-3" />
              <span className="text-white/60 text-sm mb-1">Feels like</span>
              <span className="text-white text-xl font-semibold">
                {formatTemperature(weather.main.feels_like)}
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 glass rounded-2xl border border-white/10"
            >
              <Droplets className="h-8 w-8 text-blue-300 mb-3" />
              <span className="text-white/60 text-sm mb-1">Humidity</span>
              <span className="text-white text-xl font-semibold">
                {weather.main.humidity}%
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 glass rounded-2xl border border-white/10"
            >
              <Wind className="h-8 w-8 text-green-300 mb-3" />
              <span className="text-white/60 text-sm mb-1">Wind</span>
              <span className="text-white text-xl font-semibold">
                {formatWindSpeed(weather.wind.speed)}
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 glass rounded-2xl border border-white/10"
            >
              <Eye className="h-8 w-8 text-purple-300 mb-3" />
              <span className="text-white/60 text-sm mb-1">Visibility</span>
              <span className="text-white text-xl font-semibold">
                {weather.visibility ? `${(weather.visibility / 1000).toFixed(1)}km` : 'N/A'}
              </span>
            </motion.div>
          </motion.div>

          {/* Additional metrics */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 glass rounded-2xl border border-white/10"
            >
              <Gauge className="h-8 w-8 text-yellow-300 mb-3" />
              <span className="text-white/60 text-sm mb-1">Pressure</span>
              <span className="text-white text-lg font-semibold">
                {weather.main.pressure} hPa
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 glass rounded-2xl border border-white/10"
            >
              <Sunrise className="h-8 w-8 text-orange-300 mb-3" />
              <span className="text-white/60 text-sm mb-1">Sunrise</span>
              <span className="text-white text-lg font-semibold">
                {formatTime(weather.sys.sunrise)}
              </span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex flex-col items-center p-4 glass rounded-2xl border border-white/10"
            >
              <Sunset className="h-8 w-8 text-pink-300 mb-3" />
              <span className="text-white/60 text-sm mb-1">Sunset</span>
              <span className="text-white text-lg font-semibold">
                {formatTime(weather.sys.sunset)}
              </span>
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
