import type { Reminder } from '../types'
import { PRIORITY_COLORS } from '../data/constants'

interface Props {
  r: Reminder
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function ReminderRow({ r, onToggle, onDelete }: Props) {
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
