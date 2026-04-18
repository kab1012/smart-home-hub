import type { Priority, View } from '../types'

export const PRIORITY_COLORS: Record<Priority, string> = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
}

export const WEATHER = {
  temp: 22, feels: 20, condition: 'Partly Cloudy',
  icon: '⛅', high: 25, low: 17, humidity: 62,
}

export const TABS: Exclude<View, 'home'>[] = ['Favorites', 'Living Room', 'Lights', 'Plugs', 'Switches']
