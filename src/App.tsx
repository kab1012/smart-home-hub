import { useState, useEffect } from 'react'
import './App.css'
import type { Device, Reminder, AddOption } from './types'
import { seedDevices } from './data/devices'
import { seedReminders } from './data/reminders'
import { ADD_OPTIONS } from './data/addOptions'
import { isDayTime } from './utils/time'
import { VIEW_CONFIG, type View } from './data/views'
import AddModal from './components/AddModal'

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

  const defaultRooms = VIEW_CONFIG.filter(v => v.removable).map(v => v.id)
  const [activeRooms, setActiveRooms] = useState<View[]>(defaultRooms)

  const removeRoom = (id: View) => {
    setActiveRooms(prev => prev.filter(r => r !== id))
    if (view === id) setView('home')
  }

  const visibleConfig = VIEW_CONFIG.filter(v => !v.removable || activeRooms.includes(v.id))

  const roomOptions: AddOption[] = VIEW_CONFIG
    .filter(v => v.addOption && !activeRooms.includes(v.id))
    .map(v => ({ label: v.label, icon: v.addOption!.icon, description: v.addOption!.description, category: 'room', navigateTo: v.id }))

  const allAddOptions = [...roomOptions, ...ADD_OPTIONS.filter(o => o.category !== 'room')]

  const handleAdd = (opt: AddOption) => {
    setShowAdd(false)
    if (opt.navigateTo) {
      const id = opt.navigateTo as View
      setActiveRooms(prev => prev.includes(id) ? prev : [...prev, id])
      setView(id)
      return
    }
    flash(`"${opt.label}" setup coming soon!`)
  }

  return (
    <div className={`dashboard ${light ? 'light' : ''}`}>
      <nav className="top-nav">
        {visibleConfig.map(({ id, label, homeStyle, removable }) => (
          removable ? (
            <div key={id} className="nav-tab-group">
              <button
                className={`nav-tab ${view === id ? 'tab-active' : 'tab-inactive'}`}
                onClick={() => setView(id)}
              >
                {label}
              </button>
              <button className="nav-tab-remove" onClick={() => removeRoom(id)} aria-label={`Remove ${label}`}>✕</button>
            </div>
          ) : (
            <button
              key={id}
              className={`nav-tab ${homeStyle ? 'home-tab' : ''} ${view === id ? (homeStyle ? 'home-tab-active' : 'tab-active') : 'tab-inactive'}`}
              onClick={() => setView(id)}
            >
              {label}
            </button>
          )
        ))}
        <button className="theme-toggle" onClick={() => setLight(v => !v)} aria-label="Toggle theme">
          <div className={`toggle-track ${light ? 'on' : ''}`}>
            <div className="toggle-thumb" />
          </div>
          <span className="toggle-icon">{light ? '☀️' : '🌙'}</span>
        </button>
        <button
          className="nav-tab add-tab"
          onClick={() => setShowAdd(true)}
          style={{ visibility: visibleConfig.find(v => v.id === view)?.showAdd ? 'visible' : 'hidden' }}
        >＋</button>
      </nav>

      <div className="tab-body">
        {visibleConfig.map(({ id, render }) =>
          view === id && render({ devices, reminders, onToggle: toggle, onFav: toggleFav, onToggleReminder: toggleReminder, onDeleteReminder: deleteReminder, onAddReminder: addReminder })
        )}
      </div>

      {showAdd && <AddModal options={allAddOptions} onClose={() => setShowAdd(false)} onAdd={handleAdd} />}
      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
