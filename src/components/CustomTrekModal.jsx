import React, { useState } from 'react'
import { X, Users, Calendar, Phone, Mail, CheckCircle2 } from 'lucide-react'

export default function CustomTrekModal({ isOpen, onClose }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    groupType: 'Corporate Team',
    groupSize: '10-20',
    preferredTrek: 'Kudremukh Peak',
    date: '',
    requirements: ''
  })

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {submitted ? (
          <div className="modal-success">
            <CheckCircle2 size={64} color="#10B981" />
            <h3>Custom Trip Request Received!</h3>
            <p>Thank you <strong>{formData.name}</strong>! Our corporate & group expedition coordinator will contact you via WhatsApp / Call at <strong>{formData.phone}</strong> within 2 hours with a customized itinerary & discount quote.</p>
            <button className="btn btn-primary" onClick={() => { setSubmitted(false); onClose(); }}>
              Done
            </button>
          </div>
        ) : (
          <div>
            <div className="modal-header">
              <h2>Custom / Corporate Group Trek Inquiry</h2>
              <p>Planning a custom college trip, corporate outing, or private group trek? We organize end-to-end customized experiences with private transport & stay.</p>
            </div>

            <form onSubmit={handleSubmit} className="modal-form">
              <div className="form-grid">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 9876543210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    placeholder="rahul@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Group Type</label>
                  <select
                    value={formData.groupType}
                    onChange={(e) => setFormData({ ...formData, groupType: e.target.value })}
                  >
                    <option>Corporate Team</option>
                    <option>College / Friends Group</option>
                    <option>Family Reunion</option>
                    <option>Private Couple / Small Group</option>
                  </select>
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label>Expected Group Size</label>
                  <select
                    value={formData.groupSize}
                    onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                  >
                    <option>5 - 10 Trekkers</option>
                    <option>10 - 20 Trekkers</option>
                    <option>20 - 50 Trekkers</option>
                    <option>50+ Large Group</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Target Destination / Special Requests</label>
                <textarea
                  rows="3"
                  placeholder="e.g. Kudremukh / Gokarna Beach camping with team building activities & private bus..."
                  value={formData.requirements}
                  onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary btn-block">
                Submit Request & Get Quote
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
