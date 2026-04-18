import type { AddOption } from '../types'

export const ADD_OPTIONS: AddOption[] = [
  { label: 'New Room',   icon: '🏠', description: 'Bedroom, Kitchen, Office…',   category: 'room'       },
  { label: 'Light',      icon: '💡', description: 'Bulb, strip, floor lamp',      category: 'light'      },
  { label: 'Smart Plug', icon: '🔌', description: 'Monitor & control power',      category: 'plug'       },
  { label: 'Switch',     icon: '🎛️', description: 'Wall or in-line switch',       category: 'switch'     },
  { label: 'Camera',     icon: '📷', description: 'Indoor or outdoor cam',        category: 'camera'     },
  { label: 'Thermostat', icon: '🌡️', description: 'AC, heater or fan controller', category: 'thermostat' },
  { label: 'Door Lock',  icon: '🔒', description: 'Smart lock or deadbolt',       category: 'lock'       },
  { label: 'Speaker',    icon: '🔊', description: 'Smart or Bluetooth speaker',   category: 'speaker'    },
  { label: 'Scene',      icon: '✨', description: 'Group actions into one tap',   category: 'scene'      },
  { label: 'Automation', icon: '⚡', description: 'Schedule or trigger actions',  category: 'automation' },
]
