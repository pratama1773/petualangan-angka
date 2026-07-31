import { Link } from 'react-router-dom'
import { Calculator } from 'lucide-react'

export default function Brand() {
  return (
    <Link to="/" className="brand">
      <span className="brand-badge">
        <Calculator size={20} strokeWidth={2.4} />
      </span>
      Petualangan Angka
    </Link>
  )
}
