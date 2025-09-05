'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useWeatherContext } from '@/contexts/WeatherContext'

interface SearchBarProps {
  onSearch: (city: string) => void
  isLoading?: boolean
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const { state } = useWeatherContext()
  const { lastSearchedCity } = state
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [hasInitialized, setHasInitialized] = useState(false)

  // Initialize with last searched city only once
  useEffect(() => {
    if (lastSearchedCity && !hasInitialized) {
      setQuery(lastSearchedCity)
      setHasInitialized(true)
    }
  }, [lastSearchedCity, hasInitialized])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  const handleClear = () => {
    setQuery('')
  }

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="relative"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="relative flex items-center">
        <div className="absolute left-4 z-10">
          <MapPin className="h-5 w-5 text-white/60" />
        </div>
        
        <Input
          type="text"
          placeholder="Search for any city in the world..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full pl-12 pr-24 py-4 text-lg
            bg-white/10 backdrop-blur-2xl border-white/20 
            text-white placeholder:text-white/50
            rounded-2xl transition-all duration-300
            focus:bg-white/20 focus:border-white/40 focus:ring-2 focus:ring-white/30
            ${isFocused ? 'shadow-2xl scale-[1.02]' : 'shadow-xl'}
          `}
          disabled={isLoading}
        />
        
        {/* Clear button */}
        {query && (
          <motion.div
            className="absolute right-16"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button 
              type="button"
              size="icon"
              onClick={handleClear}
              className="h-8 w-8 rounded-full bg-transparent hover:bg-white/10 border-0 text-white/50 hover:text-white transition-all duration-300"
              variant="ghost"
            >
              <X className="h-4 w-4" />
            </Button>
          </motion.div>
        )}
        
        <motion.div
          className="absolute right-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button 
            type="submit" 
            size="icon"
            disabled={isLoading || !query.trim()}
            className="h-12 w-12 rounded-xl bg-transparent hover:bg-white/10 border-0 text-white/70 hover:text-white transition-all duration-300"
            variant="ghost"
          >
            <Search className="h-5 w-5" />
          </Button>
        </motion.div>
      </div>
      
      {/* Animated border effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl border-2 border-white/40 opacity-0 pointer-events-none"
        animate={{ 
          opacity: isFocused ? 1 : 0,
          scale: isFocused ? 1 : 0.95
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.form>
  )
}
