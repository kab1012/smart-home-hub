import type { Device } from '../types'

interface Props {
  d: Device
  onToggle: (id: string) => void
  onFav: (id: string) => void
}

export default function DeviceCard({ d, onToggle, onFav }: Props) {
  return (
    <div className={`device-card ${d.active ? 'card-active' : 'card-inactive'}`} onClick={() => onToggle(d.id)}>
      <div className="card-header">
        <div className="card-title">
          <h4>{d.name}</h4>
          <div className="card-status">
            {d.category === 'thermostat' ? `${d.temperature}°C` : d.category === 'plug' ? (d.active ? d.energy : '0W') : d.active ? 'On' : 'Off'}
          </div>
        </div>
        <button className="fav-btn" onClick={e => { e.stopPropagation(); onFav(d.id) }}>
          {d.favorite ? '⭐' : '☆'}
        </button>
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
