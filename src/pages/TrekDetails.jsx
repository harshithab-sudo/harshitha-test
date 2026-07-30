import { useState, useEffect } from "react";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  Star,
  Clock,
  Compass,
  CheckCircle2,
  XCircle,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  Share2,
  ShieldCheck,
  CheckSquare,
  Sparkles,
  ArrowRight,
  Globe
} from "lucide-react";
import { getTrekById, getTrekBySlug, trekData } from "../data/treksData";

export default function TrekDetails() {
  const { id } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  let trek = state?.trek;
  if (!trek && id) {
    trek = isNaN(Number(id)) ? getTrekBySlug(id) : getTrekById(id);
  }
  if (!trek) {
    trek = trekData[0];
  }

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedBatch, setSelectedBatch] = useState(trek.upcomingBatches?.[0] || "Sat, 2 Aug");
  const [selectedPickup, setSelectedPickup] = useState(trek.pickupPoints?.[0]?.name || "Silk Board Junction");
  const [guests, setGuests] = useState(1);
  const [checkedItems, setCheckedItems] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id, trek]);

  const toggleCheck = (idx) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const totalPrice = trek.price * guests;

  const handleBookNow = () => {
    navigate("/booking", {
      state: {
        trek,
        selectedBatch,
        selectedPickup,
        guests
      }
    });
  };

  const similarTreks = trekData.filter(t => t.id !== trek.id).slice(0, 3);

  return (
    <div className="page trek-details-page">
      {/* HERO BANNER WITH UNIQUE TREK IMAGE */}
      <div className="details-hero">
        <img src={trek.image} alt={trek.name} className="details-hero-img" />
        <div className="details-hero-overlay"></div>
        <div className="container details-hero-content">
          <div className="breadcrumbs">
            <Link to="/">Home</Link> / <Link to="/treks">Treks</Link> / <span>{trek.name}</span>
          </div>

          <div className="details-badges">
            <span className="badge-region-tag"><Globe size={13} /> {trek.region}</span>
            <span className="badge-difficulty">{trek.difficulty}</span>
            <span className="badge-rating">
              <Star fill="#F59E0B" color="#F59E0B" size={15} />
              {trek.rating} ({trek.reviewCount} reviews)
            </span>
          </div>

          <h1 className="details-title">{trek.name}</h1>
          <p className="details-tagline">{trek.tagline}</p>

          <div className="details-quick-meta">
            <span><MapPin size={16} /> {trek.location}</span>
            <span><Clock size={16} /> {trek.duration}</span>
            <span><Compass size={16} /> {trek.distance}</span>
            <span><Sparkles size={16} /> Altitude: {trek.altitude}</span>
          </div>
        </div>
      </div>

      <div className="container section">
        <div className="details-layout-grid">
          {/* MAIN CONTENT AREA */}
          <div className="details-main-content">
            {/* TABS NAVIGATION */}
            <div className="details-tabs-bar">
              {[
                { id: "overview", label: "Overview & Highlights" },
                { id: "itinerary", label: `Itinerary (${trek.itinerary?.length || 0})` },
                { id: "inclusions", label: "Inclusions" },
                { id: "pickup", label: "Pickups & Travel" },
                { id: "packing", label: "Things to Carry" },
                { id: "faqs", label: "FAQs & Policies" },
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`tab-link ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* OVERVIEW TAB */}
            {activeTab === "overview" && (
              <div className="tab-pane">
                <h3>About {trek.name}</h3>
                <p className="trek-overview-text">{trek.overview}</p>

                <h4 className="margin-top-lg">Key Expedition Highlights</h4>
                <div className="highlights-grid">
                  {trek.highlights?.map((h, i) => (
                    <div key={i} className="highlight-card">
                      <CheckCircle2 size={20} color="#10B981" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Key Metrics Dashboard */}
                <div className="metrics-box margin-top-lg">
                  <div className="metric-col">
                    <span className="metric-label">Trek Distance</span>
                    <span className="metric-val">{trek.distance}</span>
                  </div>
                  <div className="metric-col">
                    <span className="metric-label">Peak Altitude</span>
                    <span className="metric-val">{trek.altitude}</span>
                  </div>
                  <div className="metric-col">
                    <span className="metric-label">Region</span>
                    <span className="metric-val">{trek.region}</span>
                  </div>
                  <div className="metric-col">
                    <span className="metric-label">Difficulty</span>
                    <span className="metric-val">{trek.difficulty}</span>
                  </div>
                </div>
              </div>
            )}

            {/* ITINERARY TAB */}
            {activeTab === "itinerary" && (
              <div className="tab-pane">
                <h3>Day-by-Day Timeline Itinerary</h3>
                <p className="subtext">Hour-by-hour itinerary designed for maximum safety, comfort, and breathtaking views.</p>

                <div className="itinerary-timeline">
                  {trek.itinerary?.map((item, idx) => (
                    <div key={idx} className="timeline-item">
                      <div className="timeline-marker">
                        <span>{idx + 1}</span>
                      </div>
                      <div className="timeline-content">
                        <span className="time-badge"><Clock size={13} /> {item.time}</span>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* INCLUSIONS & EXCLUSIONS TAB */}
            {activeTab === "inclusions" && (
              <div className="tab-pane">
                <h3>What is Included & Excluded</h3>
                <div className="inc-exc-grid margin-top-md">
                  <div className="inc-box">
                    <h4 className="inc-title"><CheckCircle2 size={20} color="#10B981" /> What’s Included</h4>
                    <ul>
                      {trek.inclusions?.map((inc, i) => (
                        <li key={i}><CheckCircle2 size={16} color="#10B981" /> {inc}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="exc-box">
                    <h4 className="exc-title"><XCircle size={20} color="#EF4444" /> What’s Excluded</h4>
                    <ul>
                      {trek.exclusions?.map((exc, i) => (
                        <li key={i}><XCircle size={16} color="#EF4444" /> {exc}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* PICKUP LOCATIONS TAB */}
            {activeTab === "pickup" && (
              <div className="tab-pane">
                <h3>Boarding Locations & Travel Schedule</h3>
                <p className="subtext">Boarding locations with exact timings for this expedition.</p>

                <div className="pickups-list margin-top-md">
                  {trek.pickupPoints?.map((pickup, i) => (
                    <div key={i} className="pickup-item-card">
                      <div className="pickup-icon">
                        <MapPin size={22} color="#10B981" />
                      </div>
                      <div className="pickup-details">
                        <h4>{pickup.name}</h4>
                        <p>Scheduled Boarding Time: <strong>{pickup.time}</strong></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PACKING CHECKLIST TAB */}
            {activeTab === "packing" && (
              <div className="tab-pane">
                <h3>Interactive Packing Checklist</h3>
                <p className="subtext">Check off items as you pack your backpack!</p>

                <div className="checklist-grid margin-top-md">
                  {trek.thingsToCarry?.map((item, i) => (
                    <div
                      key={i}
                      className={`checklist-item ${checkedItems[i] ? "checked" : ""}`}
                      onClick={() => toggleCheck(i)}
                    >
                      <CheckSquare size={18} color={checkedItems[i] ? "#10B981" : "#94A3B8"} />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* FAQS & POLICIES TAB */}
            {activeTab === "faqs" && (
              <div className="tab-pane">
                <h3>Frequently Asked Questions & Policy</h3>
                <div className="faqs-list margin-top-md">
                  {trek.faqs?.map((f, i) => (
                    <div key={i} className="faq-box-simple">
                      <h4>Q: {f.q}</h4>
                      <p>A: {f.a}</p>
                    </div>
                  ))}
                </div>

                <div className="policy-card margin-top-lg">
                  <h4>Cancellation & Refund Policy</h4>
                  <ul>
                    <li>100% refund or credit voucher if cancelled 7+ days before trek date.</li>
                    <li>50% voucher if cancelled between 3 to 6 days before trek date.</li>
                    <li>No refund for cancellations within 48 hours of departure.</li>
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* STICKY BOOKING SIDEBAR */}
          <div className="details-sidebar">
            <div className="sticky-booking-card">
              <div className="card-price-header">
                <div>
                  <span className="price-label">Price Per Trekker</span>
                  <div className="price-display">
                    <span className="curr-price">₹{trek.price}</span>
                    <span className="old-price">₹{trek.originalPrice}</span>
                  </div>
                </div>
                <span className="save-badge">Save ₹{trek.originalPrice - trek.price}</span>
              </div>

              {/* Batch Date Selector */}
              <div className="sidebar-field">
                <label><Calendar size={16} /> Select Upcoming Batch Date</label>
                <select
                  value={selectedBatch}
                  onChange={(e) => setSelectedBatch(e.target.value)}
                >
                  {trek.upcomingBatches?.map((b, i) => (
                    <option key={i} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              {/* Boarding Point Selector */}
              <div className="sidebar-field">
                <label><MapPin size={16} /> Select Boarding Point</label>
                <select
                  value={selectedPickup}
                  onChange={(e) => setSelectedPickup(e.target.value)}
                >
                  {trek.pickupPoints?.map((p, i) => (
                    <option key={i} value={p.name}>{p.name} ({p.time})</option>
                  ))}
                </select>
              </div>

              {/* Guests Selector */}
              <div className="sidebar-field">
                <label><Users size={16} /> Number of Trekkers</label>
                <div className="guest-counter">
                  <button onClick={() => setGuests(Math.max(1, guests - 1))}>-</button>
                  <span>{guests} {guests === 1 ? 'Person' : 'People'}</span>
                  <button onClick={() => setGuests(guests + 1)}>+</button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="sidebar-total-box">
                <div className="total-row">
                  <span>Base Fare ({guests} x ₹{trek.price})</span>
                  <span>₹{totalPrice}</span>
                </div>
                <div className="total-row main-total">
                  <span>Total Amount</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>

              {/* Book Action */}
              <button className="btn btn-primary btn-block btn-lg" onClick={handleBookNow}>
                Proceed to Book Seat
              </button>

              {/* WhatsApp Quick Ask */}
              <a
                href={`https://wa.me/919876543210?text=Hi!%20I%20want%20to%20inquire%20about%20booking%20${encodeURIComponent(trek.name)}%20for%20${encodeURIComponent(selectedBatch)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-whatsapp btn-block margin-top-sm"
              >
                <MessageCircle size={18} /> Inquire via WhatsApp
              </a>

              <div className="sidebar-trust-footer">
                <ShieldCheck size={16} color="#10B981" />
                <span>100% Instant Confirmation & Safe Payment</span>
              </div>
            </div>
          </div>
        </div>

        {/* SIMILAR TREKS */}
        <div className="margin-top-xl">
          <h3>Similar Expeditions You Might Like</h3>
          <div className="treks-grid margin-top-md">
            {similarTreks.map(st => (
              <div key={st.id} className="trek-card">
                <div className="trek-card-media">
                  <img src={st.image} alt={st.name} />
                  <span className="badge-difficulty">{st.difficulty}</span>
                </div>
                <div className="trek-card-body">
                  <span className="trek-location"><MapPin size={14} /> {st.location}</span>
                  <h4 className="trek-title">{st.name}</h4>
                  <div className="trek-card-footer">
                    <span className="price-main">₹{st.price}</span>
                    <Link to={`/treks/${st.id}`} className="btn btn-outline-sm">View</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}