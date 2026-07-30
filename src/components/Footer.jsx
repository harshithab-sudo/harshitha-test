import { Link } from 'react-router-dom'
import { Mountain, MapPin, Phone, Mail, MessageCircle, ShieldCheck, Heart, ArrowRight } from 'lucide-react'

export default function Footer({ onOpenCustomModal }) {
  return (
    <footer className="footer">
      {/* Community / WhatsApp Callout Bar */}
      <div className="footer-community-banner">
        <div className="container community-content">
          <div className="community-info">
            <MessageCircle size={32} color="#10B981" />
            <div>
              <h3>Join Karnataka’s #1 Trekking Community!</h3>
              <p>Get weekly trek updates, sunrise alerts, early bird discounts & weekend slot notifications on WhatsApp.</p>
            </div>
          </div>
          <a
            href="https://wa.me/919876543210?text=Hi!%20I%20want%20to%20join%20the%20NB%20Trekkers%20WhatsApp%20Community."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp"
          >
            <MessageCircle size={18} /> Join WhatsApp Group
          </a>
        </div>
      </div>

      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="logo">
              <div className="logo-icon">
                <Mountain size={24} color="white" />
              </div>
              <div className="logo-text-group">
                <span className="logo-text">NB <span className="logo-highlight">TREKKERS</span></span>
                <span className="logo-subtext">Namma Bengaluru Trekkers</span>
              </div>
            </Link>
            <p className="brand-desc">
              Your premier adventure companion for exploring Karnataka’s Western Ghats, sunrise peaks, and pristine beach trails. We prioritize safety, eco-friendly trekking, and unforgettable memories for solo & group adventurers.
            </p>
            <div className="trust-pills">
              <span className="trust-pill"><ShieldCheck size={14} /> Certified Trek Leads</span>
              <span className="trust-pill"><Heart size={14} /> 15,000+ Trekkers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/treks">Upcoming Treks</Link>
              <Link to="/gallery">Adventure Gallery</Link>
              <Link to="/about">About Us</Link>
              <Link to="/contact">Contact & Location</Link>
              <button onClick={onOpenCustomModal} className="footer-text-btn">
                Corporate / Custom Trips
              </button>
            </div>
          </div>

          {/* Featured Treks */}
          <div className="footer-col">
            <h4>Popular Expeditions</h4>
            <div className="footer-links">
              <Link to="/treks/1">Uttari Betta Sunrise</Link>
              <Link to="/treks/2">Kudremukh Peak Trek</Link>
              <Link to="/treks/3">Netravathi Peak</Link>
              <Link to="/treks/4">Skandagiri Night Trek</Link>
              <Link to="/treks/5">Kodachadri & Waterfalls</Link>
              <Link to="/treks/7">Gokarna Beach Camping</Link>
            </div>
          </div>

          {/* Contact Details */}
          <div className="footer-col">
            <h4>Reach Us</h4>
            <div className="contact-info">
              <a href="tel:+919876543210" className="contact-item">
                <Phone size={18} />
                <span>+91 98765 43210 / +91 91234 56789</span>
              </a>
              <a href="mailto:info@nbtrekkers.com" className="contact-item">
                <Mail size={18} />
                <span>info@nbtrekkers.com</span>
              </a>
              <div className="contact-item">
                <MapPin size={18} />
                <span>#42, 10th Main, Indiranagar 1st Stage, Bangalore, Karnataka 560038</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Namma Bengaluru Trekkers (NB Trekkers). All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/about">Privacy Policy</Link>
            <span>•</span>
            <Link to="/contact">Terms & Cancellation Policy</Link>
            <span>•</span>
            <span className="tagline">Explore. Trek. Discover.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}