import type { Category, Device } from '../../types'
import DeviceCard from '../DeviceCard'
import EmptyState from '../EmptyState'

interface Props {
  category: Category
  label: string
  devices: Device[]
  onToggle: (id: string) => void
  onFav: (id: string) => void
}

export default function CategoryTab({ category, label, devices, onToggle, onFav }: Props) {
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
