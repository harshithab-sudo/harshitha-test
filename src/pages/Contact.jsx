import { useState } from "react";
import { Phone, Mail, MapPin, MessageCircle, Send, CheckCircle2, Clock } from "lucide-react";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Upcoming Trek Query",
    message: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="page contact-page">
      {/* Hero with distinct high-res mountain peak sunset photo */}
      <section className="page-hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1920" alt="Contact Us" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container page-hero-content text-center">
          <span className="high-demand-badge">📞 We Are Available 7 Days A Week</span>
          <h1>Get In Touch</h1>
          <p>Have questions about upcoming Pan-India batches or custom corporate outings? We are here to help!</p>
        </div>
      </section>

      <div className="container section">
        <div className="contact-grid">
          {/* LEFT CONTACT INFO */}
          <div className="contact-info-column">
            <h2>Reach NB Trekkers</h2>
            <p className="margin-top-xs">Call, WhatsApp, or drop by our Bangalore office. Our team responds promptly.</p>

            <div className="contact-cards-list margin-top-md">
              <a href="tel:+919876543210" className="contact-detail-card">
                <div className="icon-wrap"><Phone size={22} color="#10B981" /></div>
                <div>
                  <h4>Phone Call</h4>
                  <p>+91 98765 43210 / +91 91234 56789</p>
                  <span className="sub-note">Available 8 AM - 10 PM IST</span>
                </div>
              </a>

              <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="contact-detail-card">
                <div className="icon-wrap"><MessageCircle size={22} color="#10B981" /></div>
                <div>
                  <h4>WhatsApp Quick Chat</h4>
                  <p>+91 98765 43210</p>
                  <span className="sub-note">Instant response within 5 mins</span>
                </div>
              </a>

              <a href="mailto:info@nbtrekkers.com" className="contact-detail-card">
                <div className="icon-wrap"><Mail size={22} color="#10B981" /></div>
                <div>
                  <h4>Email Us</h4>
                  <p>info@nbtrekkers.com</p>
                </div>
              </a>

              <div className="contact-detail-card">
                <div className="icon-wrap"><MapPin size={22} color="#10B981" /></div>
                <div>
                  <h4>Bangalore Head Office</h4>
                  <p>#42, 10th Main, Indiranagar 1st Stage, Bangalore, Karnataka 560038</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CONTACT FORM */}
          <div className="contact-form-column">
            {submitted ? (
              <div className="contact-success-card">
                <CheckCircle2 size={54} color="#10B981" />
                <h3>Message Sent Successfully!</h3>
                <p>Thank you <strong>{formData.name}</strong>! Our trek coordinator will get back to you on <strong>{formData.phone || formData.email}</strong> shortly.</p>
                <button className="btn btn-primary margin-top-md" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form-card">
                <h3>Send Us A Message</h3>

                <div className="form-group margin-top-md">
                  <label>Your Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Hegde"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-grid margin-top-md">
                  <div className="form-group">
                    <label>Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      placeholder="ramesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group margin-top-md">
                  <label>Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  >
                    <option>Upcoming Trek Query</option>
                    <option>Booking Confirmation Assistance</option>
                    <option>Corporate / Custom Group Quote</option>
                    <option>Cancellation / Refund</option>
                  </select>
                </div>

                <div className="form-group margin-top-md">
                  <label>Message *</label>
                  <textarea
                    rows="4"
                    required
                    placeholder="Write your question or request details here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary btn-block btn-lg margin-top-md">
                  <span>Send Message</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}