import type { Reminder } from '../types'
import { PRIORITY_COLORS } from '../data/constants'

interface Props {
  r: Reminder
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function ReminderRow({ r, onToggle, onDelete }: Props) {
  return (
    <div
      className={`reminder-block ${r.done ? 'reminder-done' : ''}`}
      style={{ '--p-color': PRIORITY_COLORS[r.priority] } as React.CSSProperties}
    >
      <div className="reminder-block-top">
        <div className="reminder-priority-dot" style={{ background: PRIORITY_COLORS[r.priority] }} />
        <button className="reminder-delete" onClick={() => onDelete(r.id)}>✕</button>
      </div>
      <span className="reminder-text">{r.text}</span>
      <span className="reminder-meta">
        {new Date(r.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} · {r.time}
      </span>
      <button
        className="reminder-check"
        onClick={() => onToggle(r.id)}
      >
        {r.done ? '✓' : ''}
      </button>
    </div>
  )
}
