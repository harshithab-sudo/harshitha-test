import React, { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  Calendar,
  Users,
  MapPin,
  ShieldCheck,
  CreditCard,
  QrCode,
  Download,
  ArrowRight,
  Sparkles,
  Phone,
  Mail,
  User,
  Tag,
  Check,
  Package,
  Printer,
  FileCheck,
  BadgeCheck,
  Lock,
  ArrowLeft,
  Flame,
  Clock,
  Compass,
  Star
} from "lucide-react";
import { trekData } from "../data/treksData";

export default function Booking() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const passedTrek = state?.trek || trekData[0];
  const passedBatch = state?.selectedBatch || passedTrek.upcomingBatches?.[0] || "Sat, 2 Aug";
  const passedPickup = state?.selectedPickup || passedTrek.pickupPoints?.[0]?.name || "Silk Board Junction";
  const passedGuests = state?.guests || 1;

  const [step, setStep] = useState(1);
  const [selectedTrek, setSelectedTrek] = useState(passedTrek);
  const [batchDate, setBatchDate] = useState(passedBatch);
  const [pickupPoint, setPickupPoint] = useState(passedPickup);
  const [guestsCount, setGuestsCount] = useState(passedGuests);

  // Add-ons
  const [addons, setAddons] = useState({
    sleepingBag: false, // ₹250 each
    trekkingPole: false, // ₹150 each
    insurance: true // ₹199 each (default selected for safety)
  });

  // Coupons
  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    emergencyPhone: "",
    age: "",
    gender: "male",
    govtIdType: "aadhaar",
    govtIdNumber: "",
    paymentMethod: "upi",
    agreedToTerms: true
  });

  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleTrekChange = (e) => {
    const found = trekData.find(t => t.id === Number(e.target.value));
    if (found) {
      setSelectedTrek(found);
      if (found.upcomingBatches?.[0]) setBatchDate(found.upcomingBatches[0]);
      if (found.pickupPoints?.[0]?.name) setPickupPoint(found.pickupPoints[0].name);
    }
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddonToggle = (key) => {
    setAddons(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculations
  const baseTrekCost = selectedTrek.price * guestsCount;
  const sleepingBagCost = addons.sleepingBag ? 250 * guestsCount : 0;
  const trekkingPoleCost = addons.trekkingPole ? 150 * guestsCount : 0;
  const insuranceCost = addons.insurance ? 199 * guestsCount : 0;
  const totalAddonsCost = sleepingBagCost + trekkingPoleCost + insuranceCost;

  const subtotal = baseTrekCost + totalAddonsCost;
  const gstAmount = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = Math.max(0, subtotal + gstAmount - appliedDiscount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");
    const cleanCode = couponCode.trim().toUpperCase();

    if (cleanCode === "TREK10") {
      const disc = Math.round(subtotal * 0.10);
      setAppliedDiscount(disc);
      setCouponSuccess(`Code 'TREK10' verified! Saved ₹${disc} (10% OFF)`);
    } else if (cleanCode === "FIRSTTREK") {
      const disc = 200;
      setAppliedDiscount(disc);
      setCouponSuccess(`Code 'FIRSTTREK' verified! Saved ₹200 OFF`);
    } else {
      setCouponError("Invalid coupon code. Try 'TREK10' or 'FIRSTTREK'");
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      if (!formData.name || !formData.phone || !formData.email) {
        alert("Please fill in your Full Name, Email, and Mobile number.");
        return;
      }
      if (!formData.govtIdNumber) {
        alert("Government ID number is required for Forest Department permits.");
        return;
      }
      setStep(3);
    }
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    const randomId = "NBT-" + Math.floor(100000 + Math.random() * 900000);
    setBookingId(randomId);
    setBookingConfirmed(true);
  };

  if (bookingConfirmed) {
    return (
      <div className="booking-page-container" style={{ paddingTop: "60px" }}>
        <div className="container max-w-3xl">
          <div className="boarding-pass-ticket">
            {/* Ticket Header */}
            <div className="boarding-pass-header">
              <div style={{ background: "#4ade80", color: "#1f2937", width: "70px", height: "70px", borderRadius: "50%", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: "16px" }}>
                <BadgeCheck size={44} color="#1f2937" />
              </div>
              <h2 style={{ fontSize: "26px", fontWeight: "900", margin: 0, color: "white" }}>EXPEDITION BOARDING PASS</h2>
              <p style={{ color: "#9ca3af", fontSize: "14px", marginTop: "4px" }}>Official Seat & Forest Permit Receipt</p>
              
              <div style={{ marginTop: "16px", background: "rgba(255,255,255,0.1)", display: "inline-block", padding: "8px 24px", borderRadius: "999px", color: "#4ade80", fontWeight: "800", letterSpacing: "1px", fontSize: "15px" }}>
                TICKET REF #: {bookingId}
              </div>
            </div>

            {/* Ticket Body */}
            <div className="boarding-pass-body">
              <div className="boarding-pass-grid">
                <div>
                  <span style={{ fontSize: "12px", color: "#6b7280", textTransform: "uppercase", display: "block", fontWeight: "700" }}>EXPEDITION</span>
                  <strong style={{ fontSize: "17px", color: "#1f2937" }}>{selectedTrek.name}</strong>
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "#6b7280", textTransform: "uppercase", display: "block", fontWeight: "700" }}>BATCH DATE</span>
                  <strong style={{ fontSize: "17px", color: "#16a34a" }}>🗓️ {batchDate}</strong>
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "#6b7280", textTransform: "uppercase", display: "block", fontWeight: "700" }}>PRIMARY TREKKER</span>
                  <strong style={{ fontSize: "16px", color: "#1f2937" }}>{formData.name} ({guestsCount} Seats)</strong>
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "#6b7280", textTransform: "uppercase", display: "block", fontWeight: "700" }}>GOVT ID VERIFIED</span>
                  <strong style={{ fontSize: "15px", color: "#16a34a" }}>✓ {formData.govtIdType.toUpperCase()}: {formData.govtIdNumber}</strong>
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "#6b7280", textTransform: "uppercase", display: "block", fontWeight: "700" }}>BOARDING LOCATION</span>
                  <strong style={{ fontSize: "15px", color: "#1f2937" }}>📍 {pickupPoint}</strong>
                </div>
                <div>
                  <span style={{ fontSize: "12px", color: "#6b7280", textTransform: "uppercase", display: "block", fontWeight: "700" }}>TOTAL FARE PAID</span>
                  <strong style={{ fontSize: "18px", color: "#16a34a" }}>₹{grandTotal.toLocaleString('en-IN')} (Incl. GST)</strong>
                </div>
              </div>

              {/* QR Code & WhatsApp Section */}
              <div style={{ marginTop: "32px", padding: "24px", background: "#f0fdf4", borderRadius: "20px", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <div style={{ background: "white", padding: "10px", borderRadius: "12px", border: "1px solid #cbd5e1" }}>
                    <QrCode size={48} color="#1f2937" />
                  </div>
                  <div>
                    <h4 style={{ color: "#166534", margin: 0, fontSize: "16px", fontWeight: "800" }}>📲 Verified Batch WhatsApp Group</h4>
                    <p style={{ color: "#15803d", fontSize: "13px", margin: "4px 0 0 0" }}>Connect with your Trek Captain for live bus pickup tracking.</p>
                  </div>
                </div>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                  Join WhatsApp Group
                </a>
              </div>

              {/* Actions */}
              <div style={{ marginTop: "28px", display: "flex", gap: "12px", justifyContent: "center" }}>
                <button className="btn btn-outline" onClick={() => window.print()}>
                  <Printer size={16} /> Download / Print Ticket
                </button>
                <Link to="/" className="btn btn-primary">
                  Return to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="booking-page-container">
      {/* Hero Banner */}
      <div className="booking-hero-banner">
        <div className="container">
          <span style={{ background: "rgba(255,255,255,0.15)", color: "#4ade80", padding: "6px 16px", borderRadius: "999px", fontSize: "13px", fontWeight: "700" }}>
            <Sparkles size={14} style={{ display: "inline", marginRight: "4px" }} /> Official Ticket Desk
          </span>
          <h1>Reserve Your Mountain Expedition</h1>
          <p>Instant seat reservation • Verified Forest Permits • 100% Refund Guarantee</p>
        </div>
      </div>

      <div className="container">
        {/* 3-Step Bar */}
        <div className="booking-stepper-bar">
          <div className={`stepper-step ${step >= 1 ? 'active' : ''}`}>
            <div className="stepper-num">1</div>
            <span className="stepper-text">Select Batch & Pickup</span>
          </div>
          <div style={{ width: "30px", height: "2px", background: step >= 2 ? "#16a34a" : "#cbd5e1" }} />
          <div className={`stepper-step ${step >= 2 ? 'active' : ''}`}>
            <div className="stepper-num">2</div>
            <span className="stepper-text">ID & Trekker Details</span>
          </div>
          <div style={{ width: "30px", height: "2px", background: step >= 3 ? "#16a34a" : "#cbd5e1" }} />
          <div className={`stepper-step ${step >= 3 ? 'active' : ''}`}>
            <div className="stepper-num">3</div>
            <span className="stepper-text">Payment Lock</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "32px" }}>
          {/* Form Main Card */}
          <div className="booking-card-main">
            {step === 1 && (
              <form onSubmit={handleNextStep}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                  <div style={{ background: "#dcfce7", color: "#16a34a", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800" }}>1</div>
                  <h3 style={{ fontSize: "20px", color: "#1f2937", margin: 0, fontWeight: "800" }}>Select Expedition & Boarding Location</h3>
                </div>

                {/* Selected Trek Visual Preview */}
                <div style={{ display: "flex", gap: "16px", background: "#f8fafc", padding: "16px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                  <img src={selectedTrek.image} alt={selectedTrek.name} style={{ width: "100px", height: "80px", borderRadius: "12px", objectFit: "cover" }} />
                  <div>
                    <span style={{ background: "#16a34a", color: "white", padding: "2px 8px", borderRadius: "999px", fontSize: "11px", fontWeight: "700" }}>
                      {selectedTrek.category}
                    </span>
                    <h4 style={{ fontSize: "17px", margin: "4px 0", color: "#1f2937" }}>{selectedTrek.name}</h4>
                    <p style={{ fontSize: "13px", color: "#6b7280", margin: 0 }}>
                      <MapPin size={12} style={{ display: "inline" }} /> {selectedTrek.location} | {selectedTrek.duration}
                    </p>
                  </div>
                </div>

                {/* Change Trek Dropdown */}
                <div style={{ marginBottom: "20px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#374151", marginBottom: "8px" }}>Change Trekking Destination</label>
                  <select
                    className="filter-select"
                    value={selectedTrek.id}
                    onChange={handleTrekChange}
                    style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #cbd5e1" }}
                  >
                    {trekData.map(t => (
                      <option key={t.id} value={t.id}>
                        {t.name} — ₹{t.price} ({t.duration})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Batch Date Selection */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#374151", marginBottom: "8px" }}>Select Upcoming Batch Date</label>
                  <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                    {selectedTrek.upcomingBatches?.map((b, i) => (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setBatchDate(b)}
                        style={{
                          padding: "12px 20px",
                          borderRadius: "999px",
                          border: batchDate === b ? "2px solid #16a34a" : "1px solid #cbd5e1",
                          background: batchDate === b ? "#dcfce7" : "white",
                          color: batchDate === b ? "#16a34a" : "#4b5563",
                          fontWeight: "700",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px"
                        }}
                      >
                        <Calendar size={15} /> {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Pickup Location */}
                <div style={{ marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#374151", marginBottom: "8px" }}>Boarding Pickup Location (Bangalore)</label>
                  <select
                    className="filter-select"
                    value={pickupPoint}
                    onChange={(e) => setPickupPoint(e.target.value)}
                    style={{ width: "100%", padding: "14px", borderRadius: "12px", border: "1px solid #cbd5e1" }}
                  >
                    {selectedTrek.pickupPoints?.map((p, i) => (
                      <option key={i} value={p.name}>
                        📍 {p.name} (Boarding Time: {p.time})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Seats Counter */}
                <div style={{ marginBottom: "28px", background: "#f8fafc", padding: "16px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <strong style={{ fontSize: "15px", color: "#1f2937", display: "block" }}>Number of Trekkers / Seats</strong>
                      <span style={{ fontSize: "12px", color: "#6b7280" }}>🔥 Fast filling! Limited permits remaining.</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                      <button
                        type="button"
                        onClick={() => setGuestsCount(Math.max(1, guestsCount - 1))}
                        style={{ width: "38px", height: "38px", borderRadius: "50%", border: "1px solid #cbd5e1", background: "white", fontSize: "18px", fontWeight: "800", cursor: "pointer" }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: "20px", fontWeight: "900", color: "#16a34a" }}>{guestsCount}</span>
                      <button
                        type="button"
                        onClick={() => setGuestsCount(guestsCount + 1)}
                        style={{ width: "38px", height: "38px", borderRadius: "50%", border: "1px solid #cbd5e1", background: "white", fontSize: "18px", fontWeight: "800", cursor: "pointer" }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: "100%" }}>
                  Proceed to Trekker Details <ArrowRight size={18} />
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleNextStep}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                  <div style={{ background: "#dcfce7", color: "#16a34a", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800" }}>2</div>
                  <h3 style={{ fontSize: "20px", color: "#1f2937", margin: 0, fontWeight: "800" }}>Trekker Identity & Permit Info</h3>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "6px" }}>Primary Trekker Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={handleFormChange}
                      style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "6px" }}>Email Address (for Receipt) *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="rahul@example.com"
                      value={formData.email}
                      onChange={handleFormChange}
                      style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "6px" }}>WhatsApp Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={handleFormChange}
                      style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: "700", marginBottom: "6px" }}>Emergency Phone Number *</label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      required
                      placeholder="Parent/Spouse number"
                      value={formData.emergencyPhone}
                      onChange={handleFormChange}
                      style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                    />
                  </div>
                </div>

                {/* Govt ID Field */}
                <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                  <h4 style={{ fontSize: "14px", color: "#1f2937", margin: "0 0 10px 0", fontWeight: "800" }}>
                    🆔 Govt ID Verification (Required for Forest Permits)
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: "12px" }}>
                    <select
                      name="govtIdType"
                      value={formData.govtIdType}
                      onChange={handleFormChange}
                      style={{ padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                    >
                      <option value="aadhaar">Aadhaar</option>
                      <option value="dl">Driving License</option>
                      <option value="passport">Passport</option>
                    </select>
                    <input
                      type="text"
                      name="govtIdNumber"
                      required
                      placeholder="Enter ID Number (e.g. 1234-5678-9012)"
                      value={formData.govtIdNumber}
                      onChange={handleFormChange}
                      style={{ padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                    />
                  </div>
                </div>

                {/* Addons Selection */}
                <h4 style={{ fontSize: "15px", color: "#1f2937", marginBottom: "12px" }}>Optional Gear Rentals & Insurance</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "28px" }}>
                  <div
                    className={`addon-card-option ${addons.sleepingBag ? 'selected' : ''}`}
                    onClick={() => handleAddonToggle('sleepingBag')}
                  >
                    <input type="checkbox" checked={addons.sleepingBag} readOnly />
                    <div style={{ flex: 1 }}>
                      <strong>Sleeping Bag Rental (+₹250 per trekker)</strong>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>Sanitized -5°C rated camping sleeping bag.</div>
                    </div>
                  </div>

                  <div
                    className={`addon-card-option ${addons.trekkingPole ? 'selected' : ''}`}
                    onClick={() => handleAddonToggle('trekkingPole')}
                  >
                    <input type="checkbox" checked={addons.trekkingPole} readOnly />
                    <div style={{ flex: 1 }}>
                      <strong>Trekking Pole Rental (+₹150 per trekker)</strong>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>Shock-absorbing aluminum trek stick.</div>
                    </div>
                  </div>

                  <div
                    className={`addon-card-option ${addons.insurance ? 'selected' : ''}`}
                    onClick={() => handleAddonToggle('insurance')}
                  >
                    <input type="checkbox" checked={addons.insurance} readOnly />
                    <div style={{ flex: 1 }}>
                      <strong>Personal Wilderness Insurance (+₹199 per trekker)</strong>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>Medical evacuation & injury coverage up to ₹2 Lakhs.</div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <button type="button" className="btn btn-outline" onClick={() => setStep(1)} style={{ flex: 1 }}>
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>
                    Proceed to Payment <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleFinalSubmit}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
                  <div style={{ background: "#dcfce7", color: "#16a34a", width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "800" }}>3</div>
                  <h3 style={{ fontSize: "20px", color: "#1f2937", margin: 0, fontWeight: "800" }}>Select Payment & Confirm Lock</h3>
                </div>

                {/* Payment Options */}
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "24px" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "14px", padding: "18px", border: formData.paymentMethod === 'upi' ? "2px solid #16a34a" : "1px solid #e5e7eb", borderRadius: "16px", cursor: "pointer", background: formData.paymentMethod === 'upi' ? "#f0fdf4" : "white" }}>
                    <input type="radio" name="paymentMethod" value="upi" checked={formData.paymentMethod === 'upi'} onChange={handleFormChange} />
                    <QrCode size={24} color="#16a34a" />
                    <div>
                      <strong style={{ fontSize: "15px" }}>Instant UPI (Google Pay, PhonePe, Paytm)</strong>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>0% convenience fee — Instant ticket issuance</div>
                    </div>
                  </label>

                  <label style={{ display: "flex", alignItems: "center", gap: "14px", padding: "18px", border: formData.paymentMethod === 'card' ? "2px solid #16a34a" : "1px solid #e5e7eb", borderRadius: "16px", cursor: "pointer", background: formData.paymentMethod === 'card' ? "#f0fdf4" : "white" }}>
                    <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleFormChange} />
                    <CreditCard size={24} color="#16a34a" />
                    <div>
                      <strong style={{ fontSize: "15px" }}>Credit Card / Debit Card / Net Banking</strong>
                      <div style={{ fontSize: "12px", color: "#6b7280" }}>100% Encrypted Razorpay Gateway</div>
                    </div>
                  </label>
                </div>

                {/* Coupon Code Input */}
                <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0", marginBottom: "24px" }}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: "700", color: "#1f2937", marginBottom: "8px" }}>
                    🎁 Discount Coupon Code
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Try TREK10 or FIRSTTREK"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      style={{ flex: 1, padding: "10px 14px", borderRadius: "8px", border: "1px solid #cbd5e1", textTransform: "uppercase" }}
                    />
                    <button type="button" onClick={handleApplyCoupon} className="btn btn-primary btn-sm">
                      Apply
                    </button>
                  </div>
                  {couponSuccess && <p style={{ color: "#16a34a", fontSize: "13px", marginTop: "8px", fontWeight: "600" }}>✓ {couponSuccess}</p>}
                  {couponError && <p style={{ color: "#ef4444", fontSize: "13px", marginTop: "8px", fontWeight: "600" }}>✕ {couponError}</p>}
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <button type="button" className="btn btn-outline" onClick={() => setStep(2)} style={{ flex: 1 }}>
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 2, background: "linear-gradient(135deg, #16a34a, #15803d)" }}>
                    <Lock size={16} style={{ display: "inline", marginRight: "6px" }} /> Pay ₹{grandTotal.toLocaleString('en-IN')} & Confirm Seats
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Sticky Summary Sidebar */}
          <div className="booking-summary-sidebar">
            <h3 style={{ fontSize: "18px", color: "#1f2937", marginBottom: "16px", borderBottom: "1px solid #f1f5f9", paddingBottom: "12px", fontWeight: "800" }}>
              Order Breakdown
            </h3>

            <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
              <img src={selectedTrek.image} alt={selectedTrek.name} style={{ width: "70px", height: "70px", borderRadius: "12px", objectFit: "cover" }} />
              <div>
                <strong style={{ fontSize: "15px", color: "#1f2937", display: "block" }}>{selectedTrek.name}</strong>
                <span style={{ fontSize: "13px", color: "#6b7280" }}>🗓️ {batchDate}</span>
                <span style={{ fontSize: "12px", color: "#16a34a", display: "block", fontWeight: "600" }}>📍 {pickupPoint}</span>
              </div>
            </div>

            <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: "14px", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Base Fare ({guestsCount} seats)</span>
                <strong>₹{baseTrekCost.toLocaleString('en-IN')}</strong>
              </div>

              {totalAddonsCost > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#4b5563" }}>
                  <span>Rental Add-ons</span>
                  <strong>+₹{totalAddonsCost.toLocaleString('en-IN')}</strong>
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "space-between", color: "#4b5563" }}>
                <span>GST (5%)</span>
                <strong>+₹{gstAmount.toLocaleString('en-IN')}</strong>
              </div>

              {appliedDiscount > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "#16a34a", fontWeight: "700" }}>
                  <span>Coupon Discount</span>
                  <span>-₹{appliedDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div style={{ borderTop: "2px dashed #cbd5e1", paddingTop: "12px", marginTop: "4px", display: "flex", justifyContent: "space-between", fontSize: "18px" }}>
                <strong style={{ color: "#1f2937" }}>Grand Total</strong>
                <strong style={{ color: "#16a34a" }}>₹{grandTotal.toLocaleString('en-IN')}</strong>
              </div>
            </div>

            {/* Safety Assurance */}
            <div style={{ marginTop: "24px", background: "#f0fdf4", padding: "12px 16px", borderRadius: "12px", display: "flex", gap: "10px", alignItems: "center" }}>
              <ShieldCheck size={20} color="#16a34a" />
              <span style={{ fontSize: "12px", color: "#166534", fontWeight: "600" }}>100% Refund guarantee if cancelled 7 days prior</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}