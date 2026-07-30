import React, { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false)
  const phone = '919876543210'
  const defaultMsg = encodeURIComponent('Hi NB Trekkers! I would like to inquire about upcoming weekend treks and group bookings.')

  return (
    <div className="whatsapp-float-container">
      {isOpen && (
        <div className="whatsapp-popup">
          <div className="whatsapp-popup-header">
            <div className="whatsapp-avatar">
              <MessageCircle size={24} color="#ffffff" />
            </div>
            <div className="whatsapp-info">
              <h4>Namma Bengaluru Trekkers</h4>
              <p>Typically replies within 5 minutes</p>
            </div>
            <button className="whatsapp-close" onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="whatsapp-popup-body">
            <div className="whatsapp-bubble">
              👋 Hey Trekker! Planning your next weekend adventure? Ask us anything about batches, dates, or custom corporate trips!
            </div>
          </div>
          <div className="whatsapp-popup-footer">
            <a
              href={`https://wa.me/${phone}?text=${defaultMsg}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-send-btn"
            >
              <span>Chat on WhatsApp</span>
              <Send size={16} />
            </a>
          </div>
        </div>
      )}

      <button className="whatsapp-float-btn" onClick={() => setIsOpen(!isOpen)} title="Chat on WhatsApp">
        <MessageCircle size={28} />
        <span className="whatsapp-ping"></span>
      </button>
    </div>
  )
}
