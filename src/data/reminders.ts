import type { Reminder } from '../types'

const fmt = (d: Date) => d.toISOString().split('T')[0]
const today = new Date()

export const seedReminders: Reminder[] = [
  { id: 'r1', text: 'Water the garden plants',        time: '08:00', date: fmt(today),                        priority: 'medium', done: false },
  { id: 'r2', text: 'Check smoke detector batteries', time: '10:30', date: fmt(today),                        priority: 'high',   done: false },
  { id: 'r3', text: 'Turn off AC before leaving',     time: '09:00', date: fmt(new Date(Date.now() + 864e5)), priority: 'low',    done: false },
]
