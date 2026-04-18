import type { Device } from '../types'

export const seedDevices: Device[] = [
  { id: 'lr-fan',    name: 'Ceiling Fan',    icon: '🌀', active: true,  category: 'fan',        room: 'Living Room', favorite: true  },
  { id: 'lr-lamp',   name: 'Reading Lamp',   icon: '💡', active: false, category: 'light',      room: 'Living Room', favorite: false, brightness: 60 },
  { id: 'lr-lights', name: 'Main Lights',    icon: '🔆', active: true,  category: 'light',      room: 'Living Room', favorite: true,  brightness: 75 },
  { id: 'lr-vacuum', name: 'Vacuum',         icon: '🤖', active: false, category: 'vacuum',     room: 'Living Room', favorite: false },
  { id: 'lr-cam',    name: 'Garden Cam',     icon: '📷', active: true,  category: 'camera',     room: 'Living Room', favorite: true  },
  { id: 'bd-light',  name: 'Bed Light',      icon: '🌙', active: false, category: 'light',      room: 'Bedroom',     favorite: false, brightness: 30 },
  { id: 'bd-ac',     name: 'AC',             icon: '❄️', active: true,  category: 'thermostat', room: 'Bedroom',     favorite: true,  temperature: 22 },
  { id: 'kt-plug1',  name: 'Coffee Maker',   icon: '☕', active: true,  category: 'plug',       room: 'Kitchen',     favorite: false, energy: '900W' },
  { id: 'kt-plug2',  name: 'Microwave Plug', icon: '🔌', active: false, category: 'plug',       room: 'Kitchen',     favorite: false, energy: '0W'   },
  { id: 'kt-light',  name: 'Kitchen Light',  icon: '💡', active: true,  category: 'light',      room: 'Kitchen',     favorite: false, brightness: 100 },
  { id: 'of-sw1',    name: 'Desk Lamp Sw.',  icon: '🎛️', active: true,  category: 'switch',     room: 'Office',      favorite: false },
  { id: 'of-sw2',    name: 'Monitor Sw.',    icon: '🖥️', active: true,  category: 'switch',     room: 'Office',      favorite: true  },
  { id: 'of-spk',    name: 'Desk Speaker',   icon: '🔊', active: false, category: 'speaker',    room: 'Office',      favorite: false },
  { id: 'gd-lock',   name: 'Gate Lock',      icon: '🔒', active: false, category: 'lock',       room: 'Garden',      favorite: false },
  { id: 'gd-light',  name: 'Garden Light',   icon: '🏮', active: true,  category: 'light',      room: 'Garden',      favorite: false, brightness: 50 },
]
