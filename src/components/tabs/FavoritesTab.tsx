import type { Device } from '../../types'
import DeviceCard from '../DeviceCard'
import CameraCard from '../CameraCard'
import EmptyState from '../EmptyState'

interface Props {
  devices: Device[]
  onToggle: (id: string) => void
  onFav: (id: string) => void
}

export default function FavoritesTab({ devices, onToggle, onFav }: Props) {
  const favs = devices.filter(d => d.favorite)
  if (!favs.length) return <EmptyState label="favourites" />
  return (
    <div className="tab-content">
      <p className="tab-subtitle">{favs.length} pinned devices</p>
      <div className="device-grid">
        {favs.map(d => d.category === 'camera'
          ? <CameraCard key={d.id} d={d} />
          : <DeviceCard key={d.id} d={d} onToggle={onToggle} onFav={onFav} />
        )}
      </div>
    </div>
  )
}
