import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin,
  Clock,
  Compass,
  Star,
  ArrowRight,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  Globe,
  Sparkles,
  Users
} from 'lucide-react'
import { trekData } from '../data/treksData'

export default function Treks() {
  const [searchParams] = useSearchParams()
  const categoryParam = searchParams.get('category') || searchParams.get('region') || 'All'
  const searchParam = searchParams.get('search') || ''

  const [search, setSearch] = useState(searchParam)
  const [activeCategory, setActiveCategory] = useState(categoryParam)
  const [activeDifficulty, setActiveDifficulty] = useState('All')
  const [activeDuration, setActiveDuration] = useState('All')
  const [sortBy, setSortBy] = useState('popular')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    if (searchParams.get('category') || searchParams.get('region')) {
      setActiveCategory(searchParams.get('category') || searchParams.get('region'))
    }
    if (searchParams.get('search')) {
      setSearch(searchParams.get('search'))
    }
  }, [searchParams])

  const categoriesList = ['All', 'Western Ghats', 'Himalayas', 'Sahyadri', 'Sunrise', 'Kerala', 'North East']
  const difficulties = ['All', 'Easy', 'Moderate', 'Hard', 'Himalayan']
  const durations = ['All', '1 Day', '2 Days', '3 Days', '5+ Days']

  const getFilteredTreks = () => {
    let list = [...trekData]

    if (search.trim() !== '') {
      const q = search.toLowerCase()
      list = list.filter(
        t => t.name.toLowerCase().includes(q) ||
             t.location.toLowerCase().includes(q) ||
             t.state.toLowerCase().includes(q) ||
             t.category.toLowerCase().includes(q)
      )
    }

    if (activeCategory !== 'All') {
      const catLower = activeCategory.toLowerCase()
      list = list.filter(t => 
        t.category.toLowerCase() === catLower ||
        t.region.toLowerCase() === catLower ||
        t.state.toLowerCase().includes(catLower)
      )
    }

    if (activeDifficulty !== 'All') {
      list = list.filter(t => t.difficulty.toLowerCase().includes(activeDifficulty.toLowerCase()))
    }

    if (activeDuration !== 'All') {
      if (activeDuration === '5+ Days') {
        list = list.filter(t => t.duration.includes('5') || t.duration.includes('6') || t.duration.includes('7') || t.duration.includes('8'))
      } else {
        list = list.filter(t => t.duration.toLowerCase().includes(activeDuration.toLowerCase()))
      }
    }

    if (sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating)
    }

    return list
  }

  const filteredTreks = getFilteredTreks()

  return (
    <div className="page treks-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="hero-bg">
          <img src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1920" alt="All India Treks" />
          <div className="hero-overlay"></div>
        </div>
        <div className="container page-hero-content text-center">
          <span className="high-demand-badge">
            🏔️ {trekData.length}+ All-India Expeditions
          </span>
          <h1>Upcoming Trek Expeditions</h1>
          <p>
            Explore snow peaks in the Himalayas, beach backpacking in Gokarna, fort trails in Sahyadri, Shola forests in Western Ghats, and tea ridges in Munnar & Wayanad.
          </p>
        </div>
      </section>

      <div className="container section">
        {/* Filter Card */}
        <div className="filter-wrapper-card" style={{ background: "white", padding: "24px", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
          <div className="filter-top-bar" style={{ display: "flex", gap: "16px", flexWrap: "wrap", alignItems: "center", marginBottom: "20px" }}>
            {/* Search Input */}
            <div className="search-box-field" style={{ flex: 1, minWidth: "260px", position: "relative" }}>
              <Search size={18} className="search-icon" style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "#64748b" }} />
              <input
                type="text"
                placeholder="Search by trek name, Gokarna, Wayanad, Himalayas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: "100%", padding: "12px 14px 12px 42px", borderRadius: "12px", border: "1px solid #cbd5e1" }}
              />
            </div>

            {/* Sort By Dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <SlidersHorizontal size={16} color="#64748b" />
              <select
                className="filter-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: "12px", borderRadius: "12px", border: "1px solid #cbd5e1", background: "white" }}
              >
                <option value="popular">Sort: Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", borderTop: "1px solid #f1f5f9", paddingTop: "16px" }}>
            {categoriesList.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: "600",
                  border: activeCategory.toLowerCase() === cat.toLowerCase() ? "none" : "1px solid #e2e8f0",
                  background: activeCategory.toLowerCase() === cat.toLowerCase() ? "linear-gradient(135deg, #059669, #047857)" : "#f8fafc",
                  color: activeCategory.toLowerCase() === cat.toLowerCase() ? "white" : "#475569",
                  cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ marginTop: "24px", marginBottom: "16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "15px", color: "#64748b" }}>
            Showing <strong>{filteredTreks.length}</strong> {activeCategory !== 'All' ? activeCategory : ''} expeditions
          </span>
          {activeCategory !== 'All' && (
            <button onClick={() => { setActiveCategory('All'); setSearch(''); }} style={{ background: "none", border: "none", color: "#059669", fontWeight: "600", cursor: "pointer", fontSize: "13px" }}>
              Reset Filters ✕
            </button>
          )}
        </div>

        {/* Treks Grid */}
        {filteredTreks.length > 0 ? (
          <div className="treks-grid">
            {filteredTreks.map((trek) => (
              <motion.div
                key={trek.id}
                className="trek-card"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="trek-card-image" style={{ position: "relative", height: "220px", overflow: "hidden" }}>
                  <img src={trek.image} alt={trek.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <span className="region-tag" style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(15, 23, 42, 0.85)", color: "white", padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: "700" }}>
                    {trek.region}
                  </span>
                  <span className={`difficulty-tag difficulty-${trek.difficulty.toLowerCase()}`} style={{ position: "absolute", top: "12px", right: "12px", background: "#16a34a", color: "white", padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: "700" }}>
                    {trek.difficulty}
                  </span>
                </div>

                <div className="trek-card-content" style={{ padding: "20px", display: "flex", flexDirection: "column", flex: 1, gap: "12px" }}>
                  {/* Top Location & Rating */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "12px", fontWeight: "700", color: "#16a34a", display: "flex", alignItems: "center", gap: "4px" }}>
                      <MapPin size={13} /> {trek.state} • {trek.location.split('(')[0]}
                    </span>
                    <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "#fef3c7", color: "#d97706", padding: "2px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: "700" }}>
                      <Star size={13} fill="#F59E0B" color="#F59E0B" />
                      <span>{trek.rating}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontSize: "18px", fontWeight: "800", color: "#1f2937", margin: 0, lineHeight: "1.3" }}>
                    {trek.name}
                  </h3>

                  {/* Structured Description / Tagline Box */}
                  <div style={{ background: "#f8fafc", padding: "10px 14px", borderRadius: "10px", borderLeft: "3px solid #16a34a" }}>
                    <p style={{ fontSize: "13px", color: "#4b5563", margin: 0, lineHeight: "1.5", fontStyle: "italic" }}>
                      "{trek.tagline}"
                    </p>
                  </div>

                  {/* Meta Chips */}
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <span style={{ background: "#f1f5f9", color: "#334155", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Clock size={12} color="#16a34a" /> {trek.duration}
                    </span>
                    <span style={{ background: "#f1f5f9", color: "#334155", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Compass size={12} color="#16a34a" /> {trek.distance}
                    </span>
                    <span style={{ background: "#f1f5f9", color: "#334155", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: "600" }}>
                      ⛰️ {trek.altitude}
                    </span>
                  </div>

                  {/* Batch Badge */}
                  <div style={{ fontSize: "12px", color: "#15803d", fontWeight: "700", background: "#dcfce7", padding: "6px 12px", borderRadius: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                    <Sparkles size={13} color="#16a34a" />
                    <span>Next Verified Batch: {trek.upcomingBatches?.[0] || 'Upcoming'}</span>
                  </div>

                  {/* Price & Action */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                    <div>
                      <span style={{ fontSize: "12px", color: "#9ca3af", textDecoration: "line-through", marginRight: "6px" }}>₹{trek.originalPrice}</span>
                      <strong style={{ fontSize: "20px", color: "#16a34a", fontWeight: "900" }}>₹{trek.price}</strong>
                      <span style={{ fontSize: "11px", color: "#6b7280" }}> / person</span>
                    </div>
                    <Link to={`/treks/${trek.id}`} className="btn btn-primary btn-sm">
                      View Expedition <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center" style={{ padding: "60px 20px", background: "white", borderRadius: "20px", border: "1px solid #e2e8f0" }}>
            <Compass size={48} color="#94a3b8" style={{ marginBottom: "16px" }} />
            <h3>No expeditions match your search filter</h3>
            <p style={{ color: "#64748b", marginTop: "8px" }}>Try searching for a different region, state, or click reset filters.</p>
            <button onClick={() => { setActiveCategory('All'); setSearch(''); }} className="btn btn-primary margin-top-md">
              View All {trekData.length} Treks
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
