'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, Loader2, MapPin, Calendar, Clock, Sparkles } from 'lucide-react'
import { SearchBar } from '@/components/weather/search-bar'
import { WeatherCard } from '@/components/weather/weather-card'
import { useWeatherContext } from '@/contexts/WeatherContext'

export function WeatherApp() {
  const { state, fetchWeather } = useWeatherContext()
  const { currentWeather, isLoading, error } = state
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 150, 0],
            y: [0, -80, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-32 w-[500px] h-[500px] bg-gradient-to-r from-blue-400/20 to-cyan-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, -200, 0],
            y: [0, 120, 0],
            scale: [1, 0.7, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-32 left-1/3 w-80 h-80 bg-gradient-to-r from-emerald-400/20 to-teal-600/20 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -60, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 right-10 w-64 h-64 bg-gradient-to-r from-yellow-400/15 to-orange-500/15 rounded-full blur-3xl"
          animate={{
            x: [0, -80, 0],
            y: [0, 100, 0],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl p-4">
        {/* Header with time and date */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="text-center py-12 text-white"
        >
          <motion.div
            className="flex items-center justify-center mb-6"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Sparkles className="h-8 w-8 text-yellow-300 mr-4" />
            <Sparkles className="h-6 w-6 text-pink-300" />
            <Sparkles className="h-8 w-8 text-blue-300 ml-4" />
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent tracking-tight"
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          >
            Weather
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-white/80 font-light mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            Experience the future of weather visualization with stunning real-time data
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center gap-8 text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            <motion.div 
              className="flex items-center gap-3 glass-dark rounded-full px-6 py-3"
              whileHover={{ scale: 1.05 }}
            >
              <Clock className="h-5 w-5 text-blue-300" />
              <span className="text-lg font-medium">{formatTime(currentTime)}</span>
            </motion.div>
            <motion.div 
              className="flex items-center gap-3 glass-dark rounded-full px-6 py-3"
              whileHover={{ scale: 1.05 }}
            >
              <Calendar className="h-5 w-5 text-purple-300" />
              <span className="text-lg font-medium">{formatDate(currentTime)}</span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex justify-center mb-16"
        >
          <div className="w-full max-w-md">
            <SearchBar onSearch={fetchWeather} isLoading={isLoading} />
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex justify-center">
          <AnimatePresence mode="wait">
            {isLoading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center gap-6 text-white"
              >
                <motion.div
                  className="relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Loader2 className="h-16 w-16 text-blue-300" />
                  <motion.div 
                    className="absolute inset-0 h-16 w-16 border-4 border-transparent border-t-pink-400 rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
                <motion.div 
                  className="text-center glass-dark rounded-2xl p-8 border border-white/20"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <p className="text-2xl font-bold mb-2">Loading weather data...</p>
                  <p className="text-blue-200 text-lg">Fetching the latest conditions</p>
                </motion.div>
              </motion.div>
            )}

            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center gap-6 p-8 glass-dark rounded-3xl text-white max-w-md mx-auto border border-red-400/30"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <AlertCircle className="h-16 w-16 text-red-400" />
                </motion.div>
                <div className="text-center">
                  <p className="text-2xl font-bold mb-4">Oops! Something went wrong</p>
                  <p className="text-red-200 text-lg">{error}</p>
                </div>
              </motion.div>
            )}

            {currentWeather && !isLoading && !error && (
              <motion.div
                key="weather"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <WeatherCard weather={currentWeather} />
              </motion.div>
            )}

            {!currentWeather && !isLoading && !error && (
              <motion.div
                key="welcome"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                className="text-center"
              >
                <motion.div
                  className="glass-dark rounded-3xl p-12 max-w-2xl mx-auto border border-white/20"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div
                    className="text-8xl mb-8"
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1] 
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut" 
                    }}
                  >
                    🌤️
                  </motion.div>
                  <h2 className="text-4xl font-bold text-white mb-6">
                    Welcome to the Future of Weather
                  </h2>
                  <p className="text-xl text-white/70 leading-relaxed">
                    Search for any city above to begin your journey through immersive weather visualization
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info */}
        {currentWeather && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex items-center justify-center gap-3 mt-12 glass-dark rounded-full px-8 py-4 mx-auto w-fit border border-white/20"
          >
            <MapPin className="h-5 w-5 text-emerald-300" />
            <span className="text-white font-medium">
              Showing weather for {currentWeather.name}, {currentWeather.sys.country}
            </span>
          </motion.div>
        )}
      </div>
    </div>
  )
}
