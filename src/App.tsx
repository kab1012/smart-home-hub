import { useState, useEffect } from 'react'
import './App.css'

// ─── Types ────────────────────────────────────────────────────────────────────

type Category = 'light' | 'fan' | 'vacuum' | 'camera' | 'plug' | 'switch' | 'thermostat' | 'lock' | 'speaker'
type Room     = 'Living Room' | 'Bedroom' | 'Kitchen' | 'Office' | 'Garden'
type View     = 'home' | 'Favorites' | 'Living Room' | 'Lights' | 'Plugs' | 'Switches'
type Priority = 'low' | 'medium' | 'high'

interface Device {
  id: string; name: string; icon: string; active: boolean
  category: Category; room: Room; favorite: boolean
  brightness?: number; energy?: string; temperature?: number
}

interface Reminder {
  id: string; text: string; time: string; date: string
  priority: Priority; done: boolean
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const seedDevices: Device[] = [
  { id: 'lr-fan',    name: 'Ceiling Fan',    icon: '🌀', active: true,  category: 'fan',        room: 'Living Room', favorite: true  },
  { id: 'lr-lamp',   name: 'Reading Lamp',   icon: '💡', active: false, category: 'light',      room: 'Living Room', favorite: false, brightness: 60 },
  { id: 'lr-lights', name: 'Main Lights',    icon: '🔆', active: true,  category: 'light',      room: 'Living Room', favorite: true,  brightness: 75 },
  { id: 'lr-vacuum', name: 'Vacuum',         icon: '🤖', active: false, category: 'vacuum',     room: 'Living Room', favorite: false },
  { id: 'lr-cam',    name: 'Garden Cam',     icon: '📷', active: true,  category: 'camera',     room: 'Living Room', favorite: true  },
  { id: 'bd-light',  name: 'Bed Light',      icon: '🌙', active: false, category: 'light',      room: 'Bedroom',     favorite: false, brightness: 30 },
  { id: 'bd-ac',     name: 'AC',             icon: '❄️', active: true,  category: 'thermostat', room: 'Bedroom',     favorite: true,  temperature: 22 },
  { id: 'kt-plug1',  name: 'Coffee Maker',   icon: '☕', active: true,  category: 'plug',       room: 'Kitchen',     favorite: false, energy: '900W' },
  { id: 'kt-plug2',  name: 'Microwave Plug', icon: '🔌', active: false, category: 'plug',       room: 'Kitchen',     favorite: false, energy: '0W'   },
  { id: 'kt-light',  name: 'Kitchen Light',  icon: '💡', active: true,  category: 'light',      room: 'Kitchen',     favorite: false, brightness: 100},
  { id: 'of-sw1',    name: 'Desk Lamp Sw.',  icon: '🎛️', active: true,  category: 'switch',     room: 'Office',      favorite: false },
  { id: 'of-sw2',    name: 'Monitor Sw.',    icon: '🖥️', active: true,  category: 'switch',     room: 'Office',      favorite: true  },
  { id: 'of-spk',    name: 'Desk Speaker',   icon: '🔊', active: false, category: 'speaker',    room: 'Office',      favorite: false },
  { id: 'gd-lock',   name: 'Gate Lock',      icon: '🔒', active: false, category: 'lock',       room: 'Garden',      favorite: false },
  { id: 'gd-light',  name: 'Garden Light',   icon: '🏮', active: true,  category: 'light',      room: 'Garden',      favorite: false, brightness: 50 },
]

const fmt = (d: Date) => d.toISOString().split('T')[0]
const today = new Date()

const seedReminders: Reminder[] = [
  { id: 'r1', text: 'Water the garden plants',        time: '08:00', date: fmt(today),                        priority: 'medium', done: false },
  { id: 'r2', text: 'Check smoke detector batteries', time: '10:30', date: fmt(today),                        priority: 'high',   done: false },
  { id: 'r3', text: 'Turn off AC before leaving',     time: '09:00', date: fmt(new Date(Date.now() + 864e5)), priority: 'low',    done: false },
]

// ─── Constants ────────────────────────────────────────────────────────────────

interface AddOption { label: string; icon: string; description: string; category: Category | 'room' | 'scene' | 'automation' }

const ADD_OPTIONS: AddOption[] = [
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

const PRIORITY_COLORS: Record<Priority, string> = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444' }
const WEATHER = { temp: 22, feels: 20, condition: 'Partly Cloudy', icon: '⛅', high: 25, low: 17, humidity: 62 }

function greeting(h: number) { return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening' }
function greetIcon(h: number) { return h < 12 ? '🌅' : h < 17 ? '☀️' : '🌙' }

// ─── Shared components ────────────────────────────────────────────────────────

function EmptyState({ label }: { label: string }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <p>No {label} found</p>
      <span>Use + to add one</span>
    </div>
  )
}

function DeviceCard({ d, onToggle, onFav }: { d: Device; onToggle: (id: string) => void; onFav: (id: string) => void }) {
  return (
    <div className={`device-card ${d.active ? 'card-active' : 'card-inactive'}`} onClick={() => onToggle(d.id)}>
      <div className="card-header">
        <div className="card-title">
          <h4>{d.name}</h4>
          <div className="card-status">
            {d.category === 'thermostat' ? `${d.temperature}°C` : d.category === 'plug' ? (d.active ? d.energy : '0W') : d.active ? 'On' : 'Off'}
          </div>
        </div>
        <button className="fav-btn" onClick={e => { e.stopPropagation(); onFav(d.id) }}>{d.favorite ? '⭐' : '☆'}</button>
      </div>
      {d.category === 'light' && d.active && (
        <div className="mini-bar-wrap"><div className="mini-bar" style={{ width: `${d.brightness}%` }} /></div>
      )}
      <div className="card-icon">
        {d.category === 'fan' && d.active ? <span className="fan-spin">{d.icon}</span> : d.icon}
      </div>
      {d.category === 'lock' && <div className="lock-badge">{d.active ? 'Unlocked' : 'Locked'}</div>}
    </div>
  )
}

function CameraCard({ d }: { d: Device }) {
  return (
    <div className="camera-card">
      <div className="cam-garden"><span style={{ fontSize: 44 }}>{d.icon}</span></div>
      <div className="cam-overlay">
        <div className="cam-name">{d.name}</div>
        <div className="cam-time">Live · {d.room}</div>
      </div>
    </div>
  )
}

// ─── Add Device Modal ─────────────────────────────────────────────────────────

function AddModal({ onClose, onAdd }: { onClose: () => void; onAdd: (o: AddOption) => void }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add to your home</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-grid">
          {ADD_OPTIONS.map(opt => (
            <button key={opt.label} className="add-option" onClick={() => onAdd(opt)}>
              <span className="add-opt-icon">{opt.icon}</span>
              <span className="add-opt-label">{opt.label}</span>
              <span className="add-opt-desc">{opt.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Home Tab ─────────────────────────────────────────────────────────────────

function ReminderRow({ r, onToggle, onDelete }: { r: Reminder; onToggle: (id: string) => void; onDelete: (id: string) => void }) {
  return (
    <div className={`reminder-row ${r.done ? 'reminder-done' : ''}`}>
      <button
        className="reminder-check"
        style={{ '--p-color': PRIORITY_COLORS[r.priority] } as React.CSSProperties}
        onClick={() => onToggle(r.id)}
      >
        {r.done ? '✓' : ''}
      </button>
      <div className="reminder-body">
        <span className="reminder-text">{r.text}</span>
        <span className="reminder-meta">
          {new Date(r.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {r.time}
        </span>
      </div>
      <div className="reminder-priority-dot" style={{ background: PRIORITY_COLORS[r.priority] }} />
      <button className="reminder-delete" onClick={() => onDelete(r.id)}>✕</button>
    </div>
  )
}

function HomeTab({ devices, reminders, onToggleReminder, onDeleteReminder, onAddReminder }: {
  devices: Device[]
  reminders: Reminder[]
  onToggleReminder: (id: string) => void
  onDeleteReminder: (id: string) => void
  onAddReminder: (r: Omit<Reminder, 'id' | 'done'>) => void
}) {
  const [now, setNow]         = useState(new Date())
  const [addOpen, setAddOpen] = useState(false)
  const [text, setText]       = useState('')
  const [rDate, setRDate]     = useState(fmt(new Date()))
  const [rTime, setRTime]     = useState('09:00')
  const [priority, setPriority] = useState<Priority>('medium')

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(t)
  }, [])

  const h       = now.getHours()
  const mins    = now.getMinutes().toString().padStart(2, '0')
  const secs    = now.getSeconds().toString().padStart(2, '0')
  const timeStr = `${h % 12 || 12}:${mins}:${secs} ${h < 12 ? 'AM' : 'PM'}`
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })

  const active       = devices.filter(d => d.active)
  const todayStr     = fmt(now)
  const todayList    = reminders.filter(r => r.date === todayStr)
  const upcomingList = reminders.filter(r => r.date > todayStr)
  const pendingCount = reminders.filter(r => !r.done).length

  const saveReminder = () => {
    if (!text.trim()) return
    onAddReminder({ text: text.trim(), date: rDate, time: rTime, priority })
    setText(''); setRDate(fmt(new Date())); setRTime('09:00'); setPriority('medium')
    setAddOpen(false)
  }

  return (
    <div className="home-tab">

      {/* ── Compact hero bar ── */}
      <div className="hero-bar">
        <div className="hero-left">
          <div className="hero-greeting">{greetIcon(h)} {greeting(h)}</div>
          <div className="hero-time">{timeStr}</div>
          <div className="hero-date">{dateStr}</div>
        </div>
        <div className="hero-divider" />
        <div className="hero-right">
          <div className="weather-main">
            <span className="weather-icon">{WEATHER.icon}</span>
            <span className="weather-temp">{WEATHER.temp}°C</span>
          </div>
          <div className="weather-sub">{WEATHER.condition}</div>
          <div className="weather-sub">↑{WEATHER.high}° ↓{WEATHER.low}° · 💧{WEATHER.humidity}%</div>
        </div>
      </div>

      {/* ── Active devices — horizontal scroll ── */}
      <div className="home-section-row">
        <span className="home-section-label">Active</span>
        <span className="home-section-badge">{active.length}/{devices.length}</span>
      </div>
      <div className="active-scroll">
        {active.length === 0
          ? <span className="no-active">All devices off</span>
          : active.map(d => (
            <div key={d.id} className="active-chip">
              <span>{d.category === 'fan' ? '🌀' : d.icon}</span>
              <span>{d.name}</span>
            </div>
          ))
        }
      </div>

      {/* ── Reminders card ── */}
      <div className="reminders-card">
        <div className="reminders-card-header">
          <span className="home-section-label">Reminders</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {pendingCount > 0 && <span className="home-section-badge badge-warn">{pendingCount} pending</span>}
            <button
              className={`reminder-add-toggle ${addOpen ? 'reminder-add-toggle-open' : ''}`}
              onClick={() => setAddOpen(v => !v)}
            >
              {addOpen ? '✕' : '＋'}
            </button>
          </div>
        </div>

        {/* Inline add form */}
        {addOpen && (
          <div className="inline-form">
            <input
              className="form-input"
              placeholder="What do you want to remember?"
              value={text}
              onChange={e => setText(e.target.value)}
              autoFocus
              onKeyDown={e => e.key === 'Enter' && saveReminder()}
            />
            <div className="inline-form-row">
              <input className="form-input form-input-sm" type="date" value={rDate} min={fmt(new Date())} onChange={e => setRDate(e.target.value)} />
              <input className="form-input form-input-sm" type="time" value={rTime} onChange={e => setRTime(e.target.value)} />
              <div className="priority-pills">
                {(['low', 'medium', 'high'] as Priority[]).map(p => (
                  <button
                    key={p}
                    className={`priority-pill ${priority === p ? 'priority-pill-active' : ''}`}
                    style={{ '--p-color': PRIORITY_COLORS[p] } as React.CSSProperties}
                    onClick={() => setPriority(p)}
                    title={p}
                  >
                    {p === 'low' ? '🟢' : p === 'medium' ? '🟡' : '🔴'}
                  </button>
                ))}
              </div>
            </div>
            <div className="inline-form-actions">
              <button className="inline-cancel" onClick={() => setAddOpen(false)}>Cancel</button>
              <button className="inline-save" onClick={saveReminder} disabled={!text.trim()}>Save</button>
            </div>
          </div>
        )}

        {/* Scrollable list */}
        <div className="reminder-scroll">
          {reminders.length === 0 && !addOpen && (
            <div className="reminder-empty">🔔 No reminders — tap ＋ to add one</div>
          )}
          {todayList.length > 0 && <div className="reminder-group-label">Today</div>}
          {todayList.map(r => (
            <ReminderRow key={r.id} r={r} onToggle={onToggleReminder} onDelete={onDeleteReminder} />
          ))}
          {upcomingList.length > 0 && <div className="reminder-group-label">Upcoming</div>}
          {upcomingList.map(r => (
            <ReminderRow key={r.id} r={r} onToggle={onToggleReminder} onDelete={onDeleteReminder} />
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Other tab views ──────────────────────────────────────────────────────────

function FavoritesTab({ devices, onToggle, onFav }: { devices: Device[]; onToggle: (id: string) => void; onFav: (id: string) => void }) {
  const favs = devices.filter(d => d.favorite)
  if (!favs.length) return <EmptyState label="favourites" />
  return (
    <div className="tab-content">
      <p className="tab-subtitle">{favs.length} pinned devices</p>
      <div className="device-grid">
        {favs.map(d => d.category === 'camera' ? <CameraCard key={d.id} d={d} /> : <DeviceCard key={d.id} d={d} onToggle={onToggle} onFav={onFav} />)}
      </div>
    </div>
  )
}

function RoomTab({ room, devices, onToggle, onFav }: { room: Room; devices: Device[]; onToggle: (id: string) => void; onFav: (id: string) => void }) {
  const roomDevices = devices.filter(d => d.room === room)
  const activeCount = roomDevices.filter(d => d.active).length
  return (
    <div className="main-layout">
      <div className="room-panel">
        <div className="room-info">
          <h3>{room}</h3>
          <div className="device-count">{roomDevices.length} devices</div>
          <div className="active-count">{activeCount} active</div>
        </div>
        <button className="room-btn" onClick={() => roomDevices.forEach(d => !d.active && onToggle(d.id))}>All On</button>
        <button className="room-btn" onClick={() => roomDevices.forEach(d =>  d.active && onToggle(d.id))}>All Off</button>
      </div>
      <div>
        {roomDevices.length === 0 ? <EmptyState label="devices" /> : (
          <div className="device-grid">
            {roomDevices.map(d => d.category === 'camera' ? <CameraCard key={d.id} d={d} /> : <DeviceCard key={d.id} d={d} onToggle={onToggle} onFav={onFav} />)}
          </div>
        )}
      </div>
    </div>
  )
}

function CategoryTab({ category, label, devices, onToggle, onFav }: { category: Category; label: string; devices: Device[]; onToggle: (id: string) => void; onFav: (id: string) => void }) {
  const filtered    = devices.filter(d => d.category === category)
  const activeCount = filtered.filter(d => d.active).length
  return (
    <div className="tab-content">
      <p className="tab-subtitle">{filtered.length} {label} · {activeCount} on</p>
      {filtered.length === 0 ? <EmptyState label={label} /> : (
        <div className="device-grid">
          {filtered.map(d => <DeviceCard key={d.id} d={d} onToggle={onToggle} onFav={onFav} />)}
        </div>
      )}
    </div>
  )
}

// ─── Root ─────────────────────────────────────────────────────────────────────

const TABS: Exclude<View, 'home'>[] = ['Favorites', 'Living Room', 'Lights', 'Plugs', 'Switches']

export default function App() {
  const [view, setView]           = useState<View>('home')
  const [devices, setDevices]     = useState<Device[]>(seedDevices)
  const [reminders, setReminders] = useState<Reminder[]>(seedReminders)
  const [showAdd, setShowAdd]     = useState(false)
  const [toast, setToast]         = useState<string | null>(null)
  const isDayTime = () => { const h = new Date().getHours(); return h >= 8 && h < 18 }
  const [light, setLight] = useState(isDayTime)

  useEffect(() => {
    document.body.classList.toggle('light', light)
  }, [light])

  // auto-switch at 08:00 and 18:00
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
        <button className="nav-tab add-tab" onClick={() => setShowAdd(true)}>＋</button>
      </nav>

      <div className="tab-body">
        {view === 'home'        && <HomeTab devices={devices} reminders={reminders} onToggleReminder={toggleReminder} onDeleteReminder={deleteReminder} onAddReminder={addReminder} />}
        {view === 'Favorites'   && <FavoritesTab devices={devices} onToggle={toggle} onFav={toggleFav} />}
        {view === 'Living Room' && <RoomTab room="Living Room" devices={devices} onToggle={toggle} onFav={toggleFav} />}
        {view === 'Lights'      && <CategoryTab category="light"  label="lights"   devices={devices} onToggle={toggle} onFav={toggleFav} />}
        {view === 'Plugs'       && <CategoryTab category="plug"   label="plugs"    devices={devices} onToggle={toggle} onFav={toggleFav} />}
        {view === 'Switches'    && <CategoryTab category="switch" label="switches" devices={devices} onToggle={toggle} onFav={toggleFav} />}
      </div>

      {showAdd && (
        <AddModal onClose={() => setShowAdd(false)} onAdd={opt => { setShowAdd(false); flash(`"${opt.label}" setup coming soon!`) }} />
      )}

      {toast && <div className="toast">{toast}</div>}
    </div>
  )
}
