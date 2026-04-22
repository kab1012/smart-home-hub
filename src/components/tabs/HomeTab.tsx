import { useState, useEffect } from 'react'
import type { Device, Reminder, Priority } from '../../types'
import { PRIORITY_COLORS, WEATHER } from '../../data/constants'
import { fmt, greeting, greetIcon } from '../../utils/time'
import ReminderRow from '../ReminderRow'
import DeviceCard from '../DeviceCard'
import CameraCard from '../CameraCard'

interface Props {
  devices: Device[]
  reminders: Reminder[]
  onToggle: (id: string) => void
  onFav: (id: string) => void
  onToggleReminder: (id: string) => void
  onDeleteReminder: (id: string) => void
  onAddReminder: (r: Omit<Reminder, 'id' | 'done'>) => void
}

export default function HomeTab({ devices, reminders, onToggle, onFav, onToggleReminder, onDeleteReminder, onAddReminder }: Props) {
  const [now, setNow]           = useState(new Date())
  const [addOpen, setAddOpen]   = useState(false)
  const [text, setText]         = useState('')
  const [rDate, setRDate]       = useState(fmt(new Date()))
  const [rTime, setRTime]       = useState('09:00')
  const [priority, setPriority] = useState<Priority>('medium')

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(t)
  }, [])

  const h       = now.getHours()
  const mins    = now.getMinutes().toString().padStart(2, '0')
  const timeStr = `${h % 12 || 12}:${mins} ${h < 12 ? 'AM' : 'PM'}`
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

      <div className="hero-bar hero-frozen">
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
          <div className="weather-detail">
            <span className="weather-sub">{WEATHER.condition}</span>
            <span className="weather-sub">↑{WEATHER.high}° ↓{WEATHER.low}° · 💧{WEATHER.humidity}%</span>
          </div>
        </div>
      </div>

      <div className="home-section-row">
        <span className="home-section-label">Active</span>
        <span className="home-section-badge">{active.length}/{devices.length}</span>
      </div>
      <div className="home-devices-scroll">
        <div className="device-grid">
          {active.length === 0
            ? <span className="no-active">All devices off</span>
            : active.map(d => d.category === 'camera'
                ? <CameraCard key={d.id} d={d} />
                : <DeviceCard key={d.id} d={d} onToggle={onToggle} onFav={onFav} />
            )
          }
        </div>
      </div>

      {/* ── Reminders section (commented out) — re-enable home-scroll CSS too ── */}
      {false && <div className="home-scroll">
      {false && (
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
          <div className="reminder-grid">
            {reminders.length === 0 && !addOpen && (
              <div className="reminder-empty">🔔 No reminders — tap ＋ to add one</div>
            )}
            {todayList.map(r => (
              <ReminderRow key={r.id} r={r} onToggle={onToggleReminder} onDelete={onDeleteReminder} />
            ))}
            {upcomingList.map(r => (
              <ReminderRow key={r.id} r={r} onToggle={onToggleReminder} onDelete={onDeleteReminder} />
            ))}
          </div>
        </div>
      )}
      </div>}
    </div>
  )
}
