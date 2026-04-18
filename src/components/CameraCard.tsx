import type { Device } from '../types'

export default function CameraCard({ d }: { d: Device }) {
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
