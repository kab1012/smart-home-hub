import type { JSX } from 'react'
import type { Device, Reminder } from '../types'
import HomeTab from '../components/tabs/HomeTab'
import FavoritesTab from '../components/tabs/FavoritesTab'
import RoomTab from '../components/tabs/RoomTab'
import CategoryTab from '../components/tabs/CategoryTab'

const VIEW_IDS = ['home', 'Favorites', 'Living Room', 'Bedroom', 'Lights', 'Plugs', 'Switches'] as const
export type View = typeof VIEW_IDS[number]

export interface ViewProps {
  devices: Device[]
  reminders: Reminder[]
  onToggle: (id: string) => void
  onFav: (id: string) => void
  onToggleReminder: (id: string) => void
  onDeleteReminder: (id: string) => void
  onAddReminder: (r: Omit<Reminder, 'id' | 'done'>) => void
}

export interface ViewConfig {
  id: View
  label: string
  homeStyle?: boolean
  showAdd?: boolean
  removable?: boolean
  addOption?: { icon: string; description: string }
  render: (props: ViewProps) => JSX.Element
}

export const VIEW_CONFIG: ViewConfig[] = [
  {
    id: 'home',
    label: 'Home',
    homeStyle: true,
    showAdd: true,
    render: ({ devices, reminders, onToggle, onFav, onToggleReminder, onDeleteReminder, onAddReminder }) =>
      <HomeTab devices={devices} reminders={reminders} onToggle={onToggle} onFav={onFav} onToggleReminder={onToggleReminder} onDeleteReminder={onDeleteReminder} onAddReminder={onAddReminder} />,
  },
  {
    id: 'Favorites',
    label: 'Favorites',
    render: ({ devices, onToggle, onFav }) =>
      <FavoritesTab devices={devices} onToggle={onToggle} onFav={onFav} />,
  },
  {
    id: 'Living Room',
    label: 'Living Room',
    removable: true,
    addOption: { icon: '🛋️', description: 'Lights, plugs and switches' },
    render: ({ devices, onToggle, onFav }) =>
      <RoomTab room="Living Room" devices={devices} onToggle={onToggle} onFav={onFav} />,
  },
  {
    id: 'Bedroom',
    label: 'Bedroom',
    removable: true,
    addOption: { icon: '🛏️', description: 'Lights, fan and alarm' },
    render: ({ devices, onToggle, onFav }) =>
      <RoomTab room="Bedroom" devices={devices} onToggle={onToggle} onFav={onFav} />,
  },
  {
    id: 'Lights',
    label: 'Lights',
    render: ({ devices, onToggle, onFav }) =>
      <CategoryTab category="light" label="lights" devices={devices} onToggle={onToggle} onFav={onFav} />,
  },
  {
    id: 'Plugs',
    label: 'Plugs',
    render: ({ devices, onToggle, onFav }) =>
      <CategoryTab category="plug" label="plugs" devices={devices} onToggle={onToggle} onFav={onFav} />,
  },
  {
    id: 'Switches',
    label: 'Switches',
    render: ({ devices, onToggle, onFav }) =>
      <CategoryTab category="switch" label="switches" devices={devices} onToggle={onToggle} onFav={onFav} />,
  },
]
