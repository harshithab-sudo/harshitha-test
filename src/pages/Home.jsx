import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  TreePine,
  ArrowRight,
  Star,
  Calendar,
  Search,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Users,
  Compass,
  Zap,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Sparkles,
  Flame,
  PhoneCall,
  Globe
} from 'lucide-react'
import { trekData } from '../data/treksData'

const stats = [
  { value: '25,000+', label: 'Happy Trekkers' },
  { value: '50+', label: 'All-India Peaks' },
  { value: '100%', label: 'Safety & First Aid' },
  { value: '9+ Yrs', label: 'Mountain Expeditions' },
]

const regionCategories = [
  { name: 'Himalayas', count: '8 Summit Trails', icon: '🏔️', image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600', filter: 'Himalayas' },
  { name: 'Western Ghats', count: '15 Green Peaks', icon: '⛰️', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600', filter: 'Western Ghats' },
  { name: 'Sahyadri Forts', count: '10 Historical Treks', icon: '🏰', image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600', filter: 'Sahyadri' },
  { name: 'North East', count: '4 Untouched Valleys', icon: '🌿', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600', filter: 'North East' },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer, Bangalore',
    trek: 'Kedarkantha Himalayan Trek',
    text: 'Scaling my first Himalayan snow peak at 12,500 ft with NB Trekkers was magical! The safety standards, microspikes, hot meals, and guides were top notch.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200'
  },
  {
    name: 'Rajesh Kumar',
    role: 'Product Lead, Tech Mahindra',
    trek: 'Kudremukh Expedition',
    text: 'Best organized trek in Karnataka! Homestay food was delicious, jeep rides were thrilling, and the trek leads were certified WFR professionals.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200'
  },
  {
    name: 'Ananya Roy',
    role: 'Consultant, EY',
    trek: 'Rajmachi Fireflies Trek',
    text: 'Trekking through glowing fireflies in Sahyadri under moonlight was surreal! Extremely well managed with friendly group vibes.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200'
  }
]

const faqs = [
  {
    q: 'How do I book a trek seat with NB Trekkers?',
    a: 'You can select your trek, pick an upcoming batch date, select your pickup point, and complete instant online booking. You will receive an instant confirmation receipt and WhatsApp group invite.'
  },
  {
    q: 'Do you organize Himalayan and Sahyadri treks outside Karnataka?',
    a: 'Yes! We run regular year-round expeditions across the Himalayas (Uttarakhand & Himachal), Sahyadris (Maharashtra), Kerala (Munnar), and North-East India (Nagaland).'
  },
  {
    q: 'What is the cancellation & refund policy?',
    a: 'Full refund or 100% credit voucher is provided if cancelled 7 days prior to departure. 50% credit voucher for cancellations within 3-6 days.'
  }
]

export default function Home({ onOpenCustomModal }) {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRegion, setSelectedRegion] = useState('All')
  const [activeFaq, setActiveFaq] = useState(null)
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay handled:', err)
      })
    }
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/treks?search=${encodeURIComponent(searchQuery)}`)
    } else {
      navigate('/treks')
    }
  }

  const upcomingBatchesList = trekData.slice(0, 4)

  const filteredTreks = selectedRegion === 'All'
    ? trekData.slice(0, 6)
    : trekData.filter(t => t.region === selectedRegion || t.category === selectedRegion).slice(0, 6)

  return (
    <div className="page home-page">
      {/* HERO SECTION WITH CINEMATIC MOUNTAIN VIDEO LOOP */}
      <section className="hero">
        <div className="hero-bg">
          <video
            ref={videoRef}
            className="hero-video-bg"
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920"
          >
            <source
              src="https://res.cloudinary.com/demo/video/upload/docs/mountain-aerial-view.mp4"
              type="video/mp4"
            />
            <source
              src="https://res.cloudinary.com/demo/video/upload/docs/rocky-mountains.mp4"
              type="video/mp4"
            />
          </video>
          <div className="hero-overlay"></div>
        </div>

        <div className="container hero-content text-center" style={{ textAlign: "center", margin: "0 auto", padding: "40px 20px" }}>
          <motion.div
            className="hero-trust-badge"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ margin: "0 auto 16px auto" }}
          >
            <Star fill="#F59E0B" color="#F59E0B" size={14} />
            <span>4.9 / 5 Rated • 25,000+ Trekkers</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{ fontSize: "48px", fontWeight: "900", color: "white", textShadow: "0 4px 20px rgba(0,0,0,0.4)" }}
          >
            Conquer India’s <span className="highlight" style={{ color: "#4ade80" }}>Breathtaking Summits</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{ fontSize: "16px", color: "#e2e8f0", maxWidth: "600px", margin: "16px auto 28px auto" }}
          >
            Certified mountain expeditions across Himalayas, Western Ghats & Sahyadris.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}
          >
            <Link to="/treks" className="btn btn-primary btn-lg" style={{ padding: "14px 28px", borderRadius: "999px" }}>
              Explore Expeditions <ArrowRight size={18} />
            </Link>
            <Link to="/booking" className="btn btn-outline btn-lg" style={{ padding: "14px 28px", borderRadius: "999px", color: "white", borderColor: "rgba(255,255,255,0.4)" }}>
              Book Seat
            </Link>
          </motion.div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-box">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-text">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPCOMING BATCHES TICKER */}
      <section className="section live-batches-section">
        <div className="container">
          <div className="section-header-flex">
            <div>
              <div className="badge-flame">
                <Flame size={16} /> Filling Fast
              </div>
              <h2 className="section-title">Upcoming Weekend Batches</h2>
              <p className="section-subtitle">Guaranteed departures every weekend across South & North India.</p>
            </div>
            <Link to="/treks" className="view-all-link">
              View All 20+ Treks <ArrowRight size={16} />
            </Link>
          </div>

          <div className="live-batches-grid">
            {upcomingBatchesList.map(trek => (
              <div key={trek.id} className="batch-card">
                <div className="batch-img">
                  <img src={trek.image} alt={trek.name} />
                  <span className="batch-category">{trek.region}</span>
                </div>
                <div className="batch-details">
                  <span className="batch-date">🗓️ {trek.upcomingBatches[0]}</span>
                  <h4>{trek.name}</h4>
                  <div className="batch-meta">
                    <span><MapPin size={14} /> {trek.state}</span>
                    <span><Clock size={14} /> {trek.duration}</span>
                  </div>
                  <div className="batch-slots-bar">
                    <div className="slots-label">
                      <span>Available Seats</span>
                      <span className="slots-alert">{trek.slots - trek.bookedCount} slots left!</span>
                    </div>
                    <div className="progress-bg">
                      <div
                        className="progress-fill"
                        style={{ width: `${(trek.bookedCount / trek.slots) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="batch-footer">
                    <div className="price-tag">
                      <span className="price-curr">₹{trek.price}</span>
                      <span className="price-old">₹{trek.originalPrice}</span>
                    </div>
                    <Link to={`/treks/${trek.id}`} className="btn btn-sm btn-primary">
                      Book Seat
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE BY REGION */}
      <section className="section bg-alt">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Explore Expeditions By Region</h2>
            <p className="section-subtitle">From snow-capped Himalayan peaks to the misty rain-forests of the Western Ghats.</p>
          </div>

          <div className="categories-grid">
            {regionCategories.map((cat, idx) => (
              <Link key={idx} to={`/treks?region=${cat.filter}`} className="category-card">
                <img src={cat.image} alt={cat.name} />
                <div className="category-overlay"></div>
                <div className="category-content">
                  <span className="cat-icon">{cat.icon}</span>
                  <h3>{cat.name}</h3>
                  <span className="cat-count">{cat.count}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED TREKS GRID WITH REGION TABS */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Top Rated Pan-India Treks</h2>
            <p className="section-subtitle">Handcrafted mountain journeys with wilderness certified leads & forest permits included.</p>

            {/* Filter Tabs */}
            <div className="filter-tabs-center">
              {['All', 'Himalayas', 'Western Ghats', 'Sahyadri', 'North East'].map(tab => (
                <button
                  key={tab}
                  className={`tab-btn ${selectedRegion === tab ? 'active' : ''}`}
                  onClick={() => setSelectedRegion(tab)}
                >
                  {tab === 'All' ? '🔥 All Expeditions' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="treks-grid">
            {filteredTreks.map(trek => (
              <div key={trek.id} className="trek-card">
                <div className="trek-card-media">
                  <img src={trek.image} alt={trek.name} />
                  <span className="badge-difficulty">{trek.difficulty}</span>
                  <div className="rating-badge">
                    <Star fill="#F59E0B" color="#F59E0B" size={14} />
                    <span>{trek.rating}</span>
                  </div>
                </div>
                <div className="trek-card-body">
                  <div className="card-top-info">
                    <span className="trek-location">
                      <MapPin size={14} /> {trek.location}
                    </span>
                    <span className="region-pill-sm">{trek.region}</span>
                  </div>
                  <h3 className="trek-title">{trek.name}</h3>
                  <p className="trek-tagline">{trek.tagline}</p>

                  <div className="trek-meta-pills">
                    <span><Clock size={14} /> {trek.duration}</span>
                    <span><Compass size={14} /> {trek.distance}</span>
                    <span><Sparkles size={14} /> {trek.altitude}</span>
                  </div>

                  <div className="trek-card-footer">
                    <div className="price-block">
                      <span className="price-main">₹{trek.price}</span>
                      <span className="price-strike">₹{trek.originalPrice}</span>
                      <span className="price-sub">/ person</span>
                    </div>
                    <Link to={`/treks/${trek.id}`} className="btn btn-outline-sm">
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center margin-top-lg">
            <Link to="/treks" className="btn btn-primary btn-lg">
              Explore All 20+ India Treks <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="section why-us-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="sub-badge">THE NB TREKKERS GUARANTEE</span>
            <h2 className="section-title">Why Mountain Lovers Trust Us</h2>
            <p className="section-subtitle">We organize safe, memorable, and high-impact outdoor mountain expeditions.</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><ShieldCheck size={28} color="#10B981" /></div>
              <h3>Wilderness First Responders</h3>
              <p>Every trek is captained by certified mountaineers & WFR leads equipped with medical gear and oxygen cylinders.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><Users size={28} color="#10B981" /></div>
              <h3>Solo & Female Friendly</h3>
              <p>Over 40% of our adventurers join solo. Dedicated female captains and zero-tolerance safety policies.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon"><Award size={28} color="#10B981" /></div>
              <h3>High-End Equipment</h3>
              <p>Imported dual-layer weatherproof tents, clean sleeping bags, microspikes, and gaiters provided for snow summits.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOM & CORPORATE BANNER */}
      <section className="container section">
        <div className="custom-banner-card">
          <div className="custom-banner-content">
            <span className="custom-tag">CORPORATE & CUSTOM GROUPS</span>
            <h2>Planning a Corporate Trip or College Expedition?</h2>
            <p>We craft tailored Pan-India itineraries with private transport, customized menus, team-building games, and dedicated coordinators.</p>
            <div className="custom-banner-btns">
              <button onClick={onOpenCustomModal} className="btn btn-light btn-lg">
                Request Custom Quote
              </button>
              <a href="tel:+919876543210" className="btn btn-outline-light">
                <PhoneCall size={18} /> Call Us: +91 98765 43210
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-alt">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Stories From Our Trekkers</h2>
            <p className="section-subtitle">Real experiences shared by our community of mountain adventurers.</p>
          </div>

          <div className="testimonials-grid">
            {testimonials.map((t, idx) => (
              <div key={idx} className="testimonial-card">
                <div className="testimonial-stars">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} fill="#F59E0B" color="#F59E0B" size={16} />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-user">
                  <img src={t.image} alt={t.name} />
                  <div>
                    <h4>{t.name}</h4>
                    <span>{t.role} • <em>{t.trek}</em></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="section">
        <div className="container max-w-4xl">
          <div className="section-header text-center">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Got questions? We have answers!</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className={`faq-item ${activeFaq === idx ? 'open' : ''}`}
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
              >
                <div className="faq-question">
                  <h3>{faq.q}</h3>
                  {activeFaq === idx ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                {activeFaq === idx && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}