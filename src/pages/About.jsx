import React from "react";
import { motion } from "framer-motion";
import {
  Mountain,
  ShieldCheck,
  Heart,
  Users,
  Award,
  Leaf,
  Compass,
  CheckCircle2,
  Sparkles,
  Radio,
  Activity,
  Calendar,
  Flame,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";

export default function About() {
  const stats = [
    { value: "25,000+", label: "Happy Trekkers Guided", desc: "Across 30+ state peaks" },
    { value: "50+", label: "Pan-India Trails", desc: "Himalayas, Ghats & Sahyadris" },
    { value: "99.8%", label: "Safety Success Index", desc: "Wilderness First Aid certified" },
    { value: "9+ Years", label: "Mountain Excellence", desc: "Founded in Bangalore 2017" }
  ];

  const teamLeaders = [
    {
      name: "Varun Gowda",
      role: "Founder & Chief Expedition Captain",
      exp: "9+ Years Mountain Experience",
      cert: "Advanced Mountaineering Course (BMC/AMC - NIM)",
      bio: "Over 80 Himalayan summits & 300+ Western Ghats trails. Passionate about safety standards and sustainable eco-trekking.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500"
    },
    {
      name: "Megha Kulkarni",
      role: "Senior Trek Lead & Medical Safety Officer",
      exp: "6+ Years Mountain Experience",
      cert: "Wilderness First Responder (WFR - NOLS)",
      bio: "Certified high-altitude medic. Expert in mountain logistics, group dynamics, and encouraging first-time solo female trekkers.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500"
    },
    {
      name: "Chetan Reddy",
      role: "Himalayan & Sahyadri Specialist",
      exp: "7+ Years Mountain Experience",
      cert: "Basic Mountaineering Course (HMI Darjeeling)",
      bio: "Scale specialist across Kedarkantha, Hampta Pass & Harishchandragad. Known for outdoor cooking and campfire storytelling.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc4aac0f9?w=500"
    },
    {
      name: "Ananya Sharma",
      role: "Eco-Trails & Community Lead",
      exp: "5+ Years Experience",
      cert: "Leave No Trace (LNT) Master Educator",
      bio: "Leads plastic cleanup initiatives across Karnataka peaks. Manages weekend batch coordination and solo trekker onboarding.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500"
    }
  ];

  const corePillars = [
    {
      icon: <ShieldCheck size={32} color="#10B981" />,
      title: "Uncompromised Safety",
      desc: "Every batch is accompanied by certified Wilderness First Responders (WFR), medical oxygen, pulse oximeters, and GPS radio trackers."
    },
    {
      icon: <Leaf size={32} color="#10B981" />,
      title: "Zero-Trace Eco Policy",
      desc: "We follow strict Leave No Trace principles. Banning single-use plastics and organizing post-trek trash cleanup drives on every trail."
    },
    {
      icon: <Users size={32} color="#10B981" />,
      title: "Inclusive & Solo Friendly",
      desc: "Over 45% of our trekkers join solo. We design non-judgmental, warm community vibes where strangers become lifelong trail buddies."
    },
    {
      icon: <Heart size={32} color="#10B981" />,
      title: "Authentic Local Homestays",
      desc: "We support local mountain communities by staying in handpicked Malnad & Himalayan family homestays with hot traditional meals."
    },
    {
      icon: <Award size={32} color="#10B981" />,
      title: "Certified Expedition Leads",
      desc: "Our captains hold credentials from NIM, HMI, and NOLS. You are guided by professionals with hundreds of hours of high-altitude experience."
    },
    {
      icon: <Compass size={32} color="#10B981" />,
      title: "Transparent Fixed Pricing",
      desc: "No hidden permit charges or surprise costs. Transportation, homestays, meals, permits, and equipment are clearly outlined upfront."
    }
  ];

  const timelineSteps = [
    { year: "2017", title: "The First Ascent", desc: "Started as an informal group of 5 friends hiking Savandurga and Uttari Betta on weekends." },
    { year: "2019", title: "Western Ghats Expansion", desc: "Launched organized weekend batches for Kudremukh, Netravati, and Gokarna Beach Backpacking." },
    { year: "2021", title: "Himalayan Expeditions", desc: "Expanded into high-altitude snow treks including Kedarkantha, Valley of Flowers, and Hampta Pass." },
    { year: "2023", title: "20,000 Trekkers Milestone", desc: "Crossed 20,000 happy trekkers with zero safety incidents and launched eco-cleanup drives." },
    { year: "2026", title: "30+ Pan-India Destinations", desc: "Now operating 32+ curated trekking & backpacking trails across Western Ghats, Himalayas, Sahyadri & North-East." }
  ];

  const safetyGear = [
    { title: "Wilderness First Aid Kits", icon: "🩹", desc: "Customized trauma & altitude medical kits carried by every lead." },
    { title: "Portable Medical Oxygen", icon: "🫁", desc: "Canisters carried on high-altitude Himalayan summits above 10,000 ft." },
    { title: "Pulse Oximeters & BP Monitors", icon: "🩺", desc: "Daily medical checks at campsite to monitor oxygen saturation." },
    { title: "Garmin Satellite Communication", icon: "📡", desc: "GPS satellite messaging for real-time location tracking in zero network zones." },
    { title: "Microspikes & Gaiters", icon: "🧊", desc: "High-grade traction equipment provided for snow and icy slope ascents." },
    { title: "Walkie-Talkie Radios", icon: "📻", desc: "Front & sweep leads stay constantly connected across long trail lines." }
  ];

  return (
    <div className="page about-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920"
            alt="About NB Trekkers"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="container page-hero-content text-center">
          <motion.span
            className="high-demand-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Sparkles size={14} /> Namma Bengaluru Trekkers Story
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Crafting Unforgettable Mountain Journeys Since 2017
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Connecting urban adventure seekers with India’s wild green ridges, cloud-covered summits, and sacred snow peaks with uncompromised safety standards.
          </motion.p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="section bg-alt" style={{ padding: "48px 0" }}>
        <div className="container">
          <div className="stats-grid">
            {stats.map((s, idx) => (
              <div key={idx} className="stat-card">
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
                <span style={{ fontSize: "12px", color: "#64748B", marginTop: "4px" }}>{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="section">
        <div className="container max-w-4xl text-center">
          <span className="sub-badge">OUR FOUNDING STORY</span>
          <h2 className="section-title margin-top-xs">Born Out of Passion for Mountains</h2>
          <p className="margin-top-md" style={{ fontSize: "17px", color: "#475569", lineHeight: "1.8" }}>
            Started in 2017 by a group of passionate IT professionals and mountaineers from Bangalore, 
            <strong> Namma Bengaluru Trekkers (NB Trekkers)</strong> was built on a simple belief: 
            <em> Nature has the power to recharge souls, build friendships, and push human limits.</em>
          </p>
          <p className="margin-top-sm" style={{ fontSize: "17px", color: "#475569", lineHeight: "1.8" }}>
            What began as small weekend getaways to Savandurga and Kudremukh has grown into South India’s most trusted trekking community. Today, we organize over 32+ curated itineraries across Western Ghats, Himalayan summits, Sahyadri forts, and North-East valleys.
          </p>
        </div>
      </section>

      {/* Core Commitments / Pillars */}
      <section className="section bg-alt">
        <div className="container">
          <div className="section-header text-center">
            <span className="sub-badge">THE NB TREKKERS DIFFERENCE</span>
            <h2 className="section-title">Our 6 Core Commitments</h2>
            <p className="section-subtitle">Why over 25,000+ trekkers trust us with their mountain dreams.</p>
          </div>

          <div className="features-grid margin-top-lg">
            {corePillars.map((p, i) => (
              <div key={i} className="feature-card" style={{ padding: "28px", borderRadius: "16px" }}>
                <div className="feature-icon" style={{ width: "56px", height: "56px", marginBottom: "16px" }}>
                  {p.icon}
                </div>
                <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>{p.title}</h3>
                <p style={{ color: "#64748B", fontSize: "14px", lineHeight: "1.6" }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Growth Timeline */}
      <section className="section">
        <div className="container max-w-4xl">
          <div className="section-header text-center">
            <span className="sub-badge">MILESTONES</span>
            <h2 className="section-title">Our Journey Over The Years</h2>
            <p className="section-subtitle">How we evolved from 5 friends to a thriving pan-India trekking community.</p>
          </div>

          <div className="timeline-container margin-top-lg">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="timeline-item" style={{ display: "flex", gap: "24px", marginBottom: "32px", alignItems: "flex-start" }}>
                <div
                  className="timeline-badge"
                  style={{
                    background: "linear-gradient(135deg, #059669, #047857)",
                    color: "white",
                    fontWeight: "800",
                    padding: "8px 16px",
                    borderRadius: "999px",
                    fontSize: "14px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 4px 12px rgba(5,150,105,0.3)"
                  }}
                >
                  {step.year}
                </div>
                <div className="timeline-content" style={{ background: "#f8fafc", padding: "20px 24px", borderRadius: "16px", flex: 1, border: "1px solid #e2e8f0" }}>
                  <h3 style={{ fontSize: "18px", color: "#0f172a", marginBottom: "6px" }}>{step.title}</h3>
                  <p style={{ color: "#64748b", fontSize: "14px", margin: 0 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Gear & Standards */}
      <section className="section bg-alt">
        <div className="container">
          <div className="section-header text-center">
            <span className="sub-badge">SAFETY PROTOCOLS</span>
            <h2 className="section-title">Wilderness Safety Equipment</h2>
            <p className="section-subtitle">Every trek is backed by high-grade rescue & medical equipment.</p>
          </div>

          <div className="live-batches-grid margin-top-lg">
            {safetyGear.map((item, idx) => (
              <div key={idx} className="batch-card" style={{ padding: "24px", display: "flex", gap: "16px", alignItems: "center" }}>
                <div style={{ fontSize: "36px", background: "#ecfdf5", width: "64px", height: "64px", borderRadius: "16px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {item.icon}
                </div>
                <div>
                  <h4 style={{ fontSize: "17px", color: "#0f172a", fontWeight: "700" }}>{item.title}</h4>
                  <p style={{ fontSize: "13px", color: "#64748b", marginTop: "4px" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Team Captains */}
      <section className="section">
        <div className="container">
          <div className="section-header text-center">
            <span className="sub-badge">LEADERSHIP</span>
            <h2 className="section-title">Meet Our Expedition Captains</h2>
            <p className="section-subtitle">Certified mountaineers, medics, and wilderness leads guiding your steps.</p>
          </div>

          <div className="team-grid margin-top-lg">
            {teamLeaders.map((m, i) => (
              <div key={i} className="team-card" style={{ borderRadius: "20px", overflow: "hidden", border: "1px solid #e2e8f0" }}>
                <img src={m.image} alt={m.name} style={{ width: "100%", height: "260px", objectFit: "cover" }} />
                <div className="team-body" style={{ padding: "24px" }}>
                  <h3 style={{ fontSize: "20px", marginBottom: "4px" }}>{m.name}</h3>
                  <span className="team-role" style={{ color: "#059669", fontWeight: "700", fontSize: "14px", display: "block", marginBottom: "10px" }}>
                    {m.role}
                  </span>
                  <p style={{ fontSize: "13px", color: "#64748b", marginBottom: "8px" }}>⭐ {m.exp}</p>
                  <p style={{ fontSize: "12px", background: "#f1f5f9", padding: "6px 12px", borderRadius: "8px", color: "#334155", fontWeight: "600", marginBottom: "12px" }}>
                    🎓 {m.cert}
                  </p>
                  <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5" }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section bg-alt text-center">
        <div className="container max-w-3xl">
          <h2 className="section-title">Ready to Join Our Next Batch?</h2>
          <p className="section-subtitle margin-top-xs">
            Whether you are a solo traveler or a group of friends, your next summit experience awaits.
          </p>
          <div style={{ marginTop: "28px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/treks" className="btn btn-primary btn-lg">
              Explore 30+ Treks <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="btn btn-outline btn-lg">
              Contact Trek Desk
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}