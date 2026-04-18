export const fmt = (d: Date) => d.toISOString().split('T')[0]

export function greeting(h: number) {
  return h < 12 ? 'Good Morning' : h < 17 ? 'Good Afternoon' : 'Good Evening'
}

export function greetIcon(h: number) {
  return h < 12 ? '🌅' : h < 17 ? '☀️' : '🌙'
}

export function isDayTime() {
  const h = new Date().getHours()
  return h >= 8 && h < 18
}
