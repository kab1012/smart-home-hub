import type { AddOption } from '../types'

interface Props {
  options: AddOption[]
  onClose: () => void
  onAdd: (o: AddOption) => void
}

export default function AddModal({ options, onClose, onAdd }: Props) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Add to your home</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-grid">
          {options.map(opt => (
            <button key={opt.label} className="add-option" onClick={() => onAdd(opt)}>
              <span className="add-opt-icon">{opt.icon}</span>
              <span className="add-opt-label">{opt.label}</span>
              <span className="add-opt-desc">{opt.description}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
