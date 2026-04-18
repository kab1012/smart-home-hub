import { useState, useEffect } from 'react'
import './App.css'
import type { View, Device, Reminder, AddOption } from './types'
import { seedDevices } from './data/devices'
import { seedReminders } from './data/reminders'
import { TABS } from './data/constants'
import { isDayTime } from './utils/time'
import AddModal from './components/AddModal'
import HomeTab from './components/tabs/HomeTab'
import FavoritesTab from './components/tabs/FavoritesTab'
import RoomTab from './components/tabs/RoomTab'
import CategoryTab from './components/tabs/CategoryTab'

export default function App() {
  const [view, setView]           = useState<View>('home')
  const [devices, setDevices]     = useState<Device[]>(seedDevices)
  const [reminders, setReminders] = useState<Reminder[]>(seedReminders)
  const [showAdd, setShowAdd]     = useState(false)
  const [toast, setToast]         = useState<string | null>(null)
  const [light, setLight]         = useState(isDayTime)

  useEffect(() => { document.body.classList.toggle('light', light) }, [light])
  useEffect(() => {
    const tick = setInterval(() => setLight(isDayTime()), 60_000)
    return () => clearInterval(tick)
  }, [])

  const toggle    = (id: string) => setDevices(prev => prev.map(d => d.id === id ? { ...d, active: !d.active } : d))
  const toggleFav = (id: string) => setDevices(prev => prev.map(d => d.id === id ? { ...d, favorite: !d.favorite } : d))

  const toggleReminder = (id: string) => setReminders(prev => prev.map(r => r.id === id ? { ...r, done: !r.done } : r))
  const deleteReminder = (id: string) => setReminders(prev => prev.filter(r => r.id !== id))
  const addReminder    = (r: Omit<Reminder, 'id' | 'done'>) => {
    setReminders(prev => [...prev, { ...r, id: `r${Date.now()}`, done: false }])
    flash('Reminder added!')
  }

  const flash = (msg: string) => { setToast(msg); setTimeout(() => setToast(null), 2500) }

  const handleAdd = (opt: AddOption) => { setShowAdd(false); flash(`"${opt.label}" setup coming soon!`) }

  return (
    <div className={`dashboard ${light ? 'light' : ''}`}>
      <nav className="top-nav">
        <button className={`nav-tab home-tab ${view === 'home' ? 'home-tab-active' : ''}`} onClick={() => setView('home')}>
          🏠 Home
        </button>
        {TABS.map(tab => (
          <button key={tab} className={`nav-tab ${view === tab ? 'tab-active' : 'tab-inactive'}`} onClick={() => setView(tab)}>
            {tab}
          </button>
        ))}
        <button className="theme-toggle" onClick={() => setLight(v => !v)} aria-label="Toggle theme">
          <div className={`toggle-track ${light ? 'on' : ''}`}>
            <div className="toggle-thumb" />
          </div>
          <span className="toggle-icon">{light ? '☀️' : '🌙'}</span>
        </button>
        {view === 'home' && (
          <button className="nav-tab add-tab" onClick={() => setShowAdd(true)}>＋</button>
        )}
      </nav>

      <div className="tab-body">
        {view === 'home'        && <HomeTab devices={devices} reminders={reminders} onToggleReminder={toggleReminder} onDeleteReminder={deleteReminder} onAddReminder={addReminder} />}
        {view === 'Favorites'   && <FavoritesTab devices={devices} onToggle={toggle} onFav={toggleFav} />}
        {view === 'Living Room' && <RoomTab room="Living Room" devices={devices} onToggle={toggle} onFav={toggleFav} />}
        {view === 'Lights'      && <CategoryTab category="light"  label="lights"   devices={devices} onToggle={toggle} onFav={toggleFav} />}
        {view === 'Plugs'       && <CategoryTab category="plug"   label="plugs"    devices={devices} onToggle={toggle} onFav={toggleFav} />}
        {view === 'Switches'    && <CategoryTab category="switch" label="switches" devices={devices} onToggle={toggle} onFav={toggleFav} />}
      </div>

      {showAdd && <AddModal onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
