import type { Room, Device } from '../../types'
import DeviceCard from '../DeviceCard'
import CameraCard from '../CameraCard'
import EmptyState from '../EmptyState'

interface Props {
  room: Room
  devices: Device[]
  onToggle: (id: string) => void
  onFav: (id: string) => void
}

export default function RoomTab({ room, devices, onToggle, onFav }: Props) {
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
            {roomDevices.map(d => d.category === 'camera'
              ? <CameraCard key={d.id} d={d} />
              : <DeviceCard key={d.id} d={d} onToggle={onToggle} onFav={onFav} />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
