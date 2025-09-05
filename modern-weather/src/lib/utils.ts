import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatTemperature(temp: number): string {
  return `${Math.round(temp)}°`
}

export function formatWindSpeed(speed: number): string {
  return `${Math.round(speed)} km/h`
}

export function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
