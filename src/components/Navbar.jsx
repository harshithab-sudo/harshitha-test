import { Link, useLocation } from 'react-router-dom'
import { Mountain, Menu, X, Phone, MessageCircle, Sparkles } from 'lucide-react'
import { useState, useEffect } from 'react'

export default function Navbar({ onOpenCustomModal }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logoErr, setLogoErr] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/treks', label: 'Upcoming Treks' },
    { to: '/gallery', label: 'Gallery' },
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Announcement Bar */}
      <div className="top-announcement-bar">
        <div className="container announcement-content">
          <span className="announcement-badge">
            <Sparkles size={13} />
            Weekend Special
          </span>
          <p className="announcement-text">
            🔥 Upcoming batches filling fast for Kudremukh & Uttari Betta! Book your seats early.
          </p>
          <div className="announcement-actions">
            <a href="tel:+919876543210" className="announcement-link">
              <Phone size={13} /> +91 98765 43210
            </a>
            <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="announcement-link whatsapp-link">
              <MessageCircle size={13} /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {!logoErr ? (
              <img
                src="/logo.webp"
                alt="NBTrekkers Logo"
                style={{ width: '42px', height: '42px', objectFit: 'contain' }}
                onError={() => setLogoErr(true)}
              />
            ) : (
              <div className="logo-icon">
                <Mountain size={24} color="white" />
              </div>
            )}
            <div className="logo-text-group">
              <span className="logo-text">NB <span className="logo-highlight">TREKKERS</span></span>
              <span className="logo-subtext">Namma Bengaluru Trekkers</span>
            </div>
          </Link>

          <div className={`nav-links ${mobileOpen ? 'active' : ''}`}>
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="nav-actions">
            <button
              className="btn btn-outline-sm"
              onClick={onOpenCustomModal}
              title="Request Custom Group / Corporate Trek"
            >
              <Sparkles size={14} /> Custom / Corporate
            </button>
            <Link to="/treks" className="btn btn-book">
              Book Trek
            </Link>
            <button className="mobile-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle navigation menu">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}