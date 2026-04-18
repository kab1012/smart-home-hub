export default function EmptyState({ label }: { label: string }) {
  return (
    <div className="empty-state">
      <div className="empty-icon">🔍</div>
      <p>No {label} found</p>
      <span>Use + to add one</span>
    </div>
  )
}
