import { Link } from 'react-router-dom'

interface BreadcrumbsProps {
  currentPage: string
}

export const Breadcrumbs = ({ currentPage }: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.8rem',
        fontFamily: 'Inter, sans-serif',
        color: '#888888',
        margin: '0 0 20px 0',
      }}
    >
      <Link
        to="/"
        style={{
          color: '#A0A0A0',
          textDecoration: 'none',
          transition: 'color 0.2s ease',
          display: 'inline-flex',
          alignItems: 'center',
          minHeight: '32px',
        }}
      >
        Home
      </Link>
      <span style={{ color: '#D4AF37', fontSize: '0.75rem' }}>›</span>
      <span style={{ color: '#F5E6B3', fontWeight: 500 }}>{currentPage}</span>
    </nav>
  )
}

export default Breadcrumbs

