export type Category = 'light' | 'fan' | 'vacuum' | 'camera' | 'plug' | 'switch' | 'thermostat' | 'lock' | 'speaker'
export type Room     = 'Living Room' | 'Bedroom' | 'Kitchen' | 'Office' | 'Garden'
export type View     = 'home' | 'Favorites' | 'Living Room' | 'Lights' | 'Plugs' | 'Switches'
export type Priority = 'low' | 'medium' | 'high'

export interface Device {
  id: string; name: string; icon: string; active: boolean
  category: Category; room: Room; favorite: boolean
  brightness?: number; energy?: string; temperature?: number
}

export interface Reminder {
  id: string; text: string; time: string; date: string
  priority: Priority; done: boolean
}

export interface AddOption {
  label: string; icon: string; description: string
  category: Category | 'room' | 'scene' | 'automation'
}
