import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ZoomIn, MapPin, Sparkles, ChevronLeft, ChevronRight, Quote, Camera } from "lucide-react";

const galleryImages = [
  {
    id: 1,
    title: "Gokarna Cliff Sunset & Beach Campers",
    category: "Coastal Trails",
    location: "Kudle Beach, Gokarna",
    altitude: "Sea Level",
    quote: "Watching the sun dip into the Arabian sea after hiking over 5 coastal beaches was sheer bliss!",
    photographer: "Megha Kulkarni",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200"
  },
  {
    id: 2,
    title: "Kedarkantha 12,500 ft Snow Peak Triumph",
    category: "Himalayan Summits",
    location: "Uttarakhand Himalayas",
    altitude: "12,500 ft",
    quote: "Reaching the summit at dawn with Swargarohini peaks glowing pink in the background was life-changing.",
    photographer: "Varun Gowda",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200"
  },
  {
    id: 3,
    title: "Kudremukh Green Grassland Waves",
    category: "Western Ghats",
    location: "Chikmagalur, Karnataka",
    altitude: "6,214 ft",
    quote: "Rolling green Shola hills extending into infinity. Kudremukh is truly South India’s green paradise.",
    photographer: "Chetan Reddy",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200"
  },
  {
    id: 4,
    title: "Uttari Betta Cloud Sea Sunrise",
    category: "Sunrise Trails",
    location: "Kunamale, Karnataka",
    altitude: "3,708 ft",
    quote: "Standing above an ocean of white clouds just 75 km from Bangalore. Best weekend wake up!",
    photographer: "Rahul S.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  {
    id: 5,
    slug: "fireflies-camping",
    title: "Campfire & Acoustic Guitar Night",
    category: "Camping & Fires",
    location: "Coorg Estate Homestay",
    altitude: "3,500 ft",
    quote: "Hot soup, acoustic tunes around the campfire, and clear starry skies with new friends.",
    photographer: "Priya M.",
    image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=1200"
  },
  {
    id: 6,
    title: "Wayanad Heart Lake Chembra Peak",
    category: "Coastal Trails",
    location: "Wayanad, Kerala",
    altitude: "6,890 ft",
    quote: "The mist cleared for 10 minutes, revealing the legendary natural heart-shaped lake in full glory!",
    photographer: "Ananya R.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200"
  },
  {
    id: 7,
    title: "Hampta Pass & Chandratal Lake",
    category: "Himalayan Summits",
    location: "Spiti & Manali",
    altitude: "14,065 ft",
    quote: "Trekking from green Kullu pine woods into the cold moonlike desert of Spiti Valley in 4 days.",
    photographer: "Varun Gowda",
    image: "https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=1200"
  },
  {
    id: 8,
    title: "Munnar Meesapulimala Tea Carpet Walk",
    category: "Coastal Trails",
    location: "Munnar, Kerala",
    altitude: "8,661 ft",
    quote: "Hiking above the clouds surrounded by endless green tea leaves and cool mountain breeze.",
    photographer: "Kiran B.",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200"
  },
  {
    id: 9,
    title: "Harishchandragad Konkan Kada Concave Cliff",
    category: "Western Ghats",
    location: "Sahyadri, Maharashtra",
    altitude: "4,671 ft",
    quote: "Standing on the edge of the 1,800 ft vertical drop of Konkan Kada cliff at sunset.",
    photographer: "Chetan Reddy",
    image: "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=1200"
  },
  {
    id: 10,
    title: "Meghalaya Double Decker Root Bridge",
    category: "Coastal Trails",
    location: "Cherrapunji, Meghalaya",
    altitude: "4,200 ft",
    quote: "Walking across 500-year-old living tree roots over crystal turquoise rainforest streams.",
    photographer: "Megha Kulkarni",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200"
  },
  {
    id: 11,
    title: "Skandagiri Night Trek Ocean of Fog",
    category: "Sunrise Trails",
    location: "Chikkaballapur, Karnataka",
    altitude: "4,750 ft",
    quote: "Ascending under moonlight to catch the golden sun breaking through dense white fog beds.",
    photographer: "Nikhil V.",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200"
  },
  {
    id: 12,
    title: "Dudhsagar Milky Waterfalls Jungle Pool",
    category: "Western Ghats",
    location: "Goa & Karnataka Border",
    altitude: "1,017 ft",
    quote: "The thunder of Dudhsagar falls spraying cool mist across the railway bridge!",
    photographer: "Siddharth K.",
    image: "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1200"
  },
  {
    id: 13,
    title: "Hampi Coracle Boat Sunset Ride",
    category: "Coastal Trails",
    location: "Tungabhadra River, Hampi",
    altitude: "1,500 ft",
    quote: "Floating on round coracle boats past ancient stone temples while sun set behind giant boulders.",
    photographer: "Devika N.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200"
  },
  {
    id: 14,
    title: "Kasol Parvati River Tents",
    category: "Camping & Fires",
    location: "Parvati Valley, Himachal",
    altitude: "9,700 ft",
    quote: "Sleeping right next to the roaring river with pine trees overhead and hot tea in hand.",
    photographer: "Aman T.",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1200"
  },
  {
    id: 15,
    title: "Valley of Flowers Rainbow Meadow",
    category: "Himalayan Summits",
    location: "Uttarakhand",
    altitude: "14,400 ft",
    quote: "Trekking through millions of wild orchids, blue poppies, and alpine rhododendrons.",
    photographer: "Varun Gowda",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  {
    id: 16,
    title: "Tadiandamol Peak Ridge Walk",
    category: "Western Ghats",
    location: "Coorg, Karnataka",
    altitude: "5,740 ft",
    quote: "Coorg’s highest peak offering green 360-degree views of Kerala and Karnataka coffee hills.",
    photographer: "Shreya S.",
    image: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1200"
  },
  {
    id: 17,
    title: "Pitchavaram Mangrove Tunnel Kayaking",
    category: "Coastal Trails",
    location: "Pondicherry Coast",
    altitude: "Sea Level",
    quote: "Paddling silent wooden canoes through dense green mangrove tree tunnels.",
    photographer: "Rohan G.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200"
  },
  {
    id: 18,
    title: "Netravati Peak Ridge Walk",
    category: "Western Ghats",
    location: "Samse, Kudremukh",
    altitude: "4,980 ft",
    quote: "Clean air, silent misty ridges, and crystal mountain streams along the entire path.",
    photographer: "Chetan Reddy",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1200"
  },
  {
    id: 19,
    title: "Varkala Cliff Beach Surfers",
    category: "Coastal Trails",
    location: "Varkala Beach, Kerala",
    altitude: "150 ft",
    quote: "Golden hour over red ocean cliffs followed by fresh seafood at beachside cafes.",
    photographer: "Megha Kulkarni",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200"
  },
  {
    id: 20,
    title: "Triund Dharamshala Starry Camp Night",
    category: "Camping & Fires",
    location: "McLeod Ganj, Himachal",
    altitude: "9,350 ft",
    quote: "Camping directly under the giant white Dhauladhar mountain wall under a million stars.",
    photographer: "Deepak P.",
    image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=1200"
  },
  {
    id: 21,
    title: "Kolukkumalai Sunrise & Highest Tea Estate",
    category: "Sunrise Trails",
    location: "Munnar Border",
    altitude: "7,130 ft",
    quote: "Riding 4x4 jeeps up rocky tracks to watch golden rays illuminate the cloud beds.",
    photographer: "Kavya M.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
  },
  {
    id: 22,
    title: "Spiti Valley Chicham High Bridge",
    category: "Coastal Trails",
    location: "Kaza, Spiti Valley",
    altitude: "14,500 ft",
    quote: "Standing over Asia’s highest gorge bridge in the heart of cold Himalayan desert.",
    photographer: "Varun Gowda",
    image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=1200"
  },
  {
    id: 23,
    title: "Makalidurga Fort Railway Track Hike",
    category: "Sunrise Trails",
    location: "Doddaballapur, Karnataka",
    altitude: "4,430 ft",
    quote: "Walking along scenic railway tracks before scaling the granite fortress for sunrise.",
    photographer: "Aditya N.",
    image: "https://images.unsplash.com/photo-1507400492013-162706c8c05e?w=1200"
  },
  {
    id: 24,
    title: "Kumara Parvatha Shesha Parvatha Ridge",
    category: "Western Ghats",
    location: "Kukke Subramanya",
    altitude: "5,617 ft",
    quote: "Toughest trek in Karnataka, but standing on Shesha Parvatha ridge makes every drop of sweat worth it!",
    photographer: "Chetan Reddy",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200"
  },
  {
    id: 25,
    title: "NBT Weekend Trekker Batch at Kudremukh Peak",
    category: "Group Batches",
    location: "Chikmagalur, Karnataka",
    altitude: "6,214 ft",
    quote: "30 strangers became family on this Kudremukh summit trail! Unforgettable memories with NBT.",
    photographer: "Batch #412 Team",
    image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?w=1200"
  },
  {
    id: 26,
    title: "Campfire Circle & Acoustic Music Night",
    category: "Group Batches",
    location: "Coorg Pine Forest",
    altitude: "4,200 ft",
    quote: "Singing old Hindi songs under a million stars with the whole trek batch around the bonfire.",
    photographer: "Anand M.",
    image: "https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1200"
  },
  {
    id: 27,
    title: "Sunrise Group Celebration at Skandagiri",
    category: "Group Batches",
    location: "Chikkaballapur",
    altitude: "4,750 ft",
    quote: "Cheering together as the ocean of clouds turned golden at 6:00 AM!",
    photographer: "Sahil V.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200"
  },
  {
    id: 28,
    title: "Team Trail Support at Tadiandamol",
    category: "Group Batches",
    location: "Kodagu, Karnataka",
    altitude: "5,740 ft",
    quote: "Helping each other across steep muddy trails makes group treks so rewarding.",
    photographer: "Namma Bengaluru Crew",
    image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200"
  },
  {
    id: 29,
    title: "Solo Female Explorer Over Monolith Ridge",
    category: "Solo Travelers",
    location: "Channarayanadurga",
    altitude: "3,730 ft",
    quote: "Joined as a solo female traveler and felt 100% safe & welcomed from minute one!",
    photographer: "Priya S.",
    image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=1200"
  },
  {
    id: 30,
    title: "Solo Trekker Summit Meditation",
    category: "Solo Travelers",
    location: "Kedarkantha Ridge",
    altitude: "12,500 ft",
    quote: "Pure solitude and peace on top of Himalayan snow peaks.",
    photographer: "Rohan V.",
    image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=1200"
  },
  {
    id: 31,
    title: "Solo Tea Plantation Trail Journey",
    category: "Solo Travelers",
    location: "Munnar, Kerala",
    altitude: "5,200 ft",
    quote: "Took a break from IT work to solo trek through misty tea gardens. Best decision ever!",
    photographer: "Kavya Menon",
    image: "https://images.unsplash.com/photo-1476514525535-ce74f45814d0?w=1200"
  },
  {
    id: 32,
    title: "Solo Himalayan Snow Trail Ridge Walk",
    category: "Solo Travelers",
    location: "Manali, Himachal Pradesh",
    altitude: "10,800 ft",
    quote: "Stepping out of my comfort zone alone was intimidating, but NBT captains made it effortless.",
    photographer: "Vikram N.",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200"
  },
  {
    id: 33,
    title: "College Friends Summit Celebration & High Five",
    category: "Group Batches",
    location: "Kudremukh Peak, Karnataka",
    altitude: "6,214 ft",
    quote: "Trekking with your college squad is the ultimate core memory unlock! Laughs and views all day.",
    photographer: "Rahul & Squad",
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200"
  },
  {
    id: 34,
    title: "Best Friends Waterfall Stream Dip",
    category: "Group Batches",
    location: "Hebbe Falls, Chikmagalur",
    altitude: "4,200 ft",
    quote: "Dipping our feet in freezing mountain waterfall streams after a 12km hike with the gang.",
    photographer: "Sneha & Friends",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200"
  },
  {
    id: 35,
    title: "Friends Tent Camping & Stargazing Night",
    category: "Group Batches",
    location: "Gokarna Cliff Camping",
    altitude: "Sea Level",
    quote: "Late night laughter, hot chai and stargazing outside our tents with best friends.",
    photographer: "Kiran & Gang",
    image: "https://images.unsplash.com/photo-1537905569824-f89f14cceb68?w=1200"
  }
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const categories = [
    "All",
    "Group Batches",
    "Solo Travelers",
    "Western Ghats",
    "Himalayan Summits",
    "Coastal Trails",
    "Camping & Fires",
    "Sunrise Trails"
  ];

  const filteredImages = activeCategory === "All"
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  const openLightbox = (index) => {
    setSelectedIndex(index);
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  const nextImage = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % filteredImages.length);
    }
  };

  const currentImg = selectedIndex !== null ? filteredImages[selectedIndex] : null;

  return (
    <div className="page gallery-page">
      {/* Page Hero */}
      <section className="page-hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=1920"
            alt="Adventure Photo Gallery"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="container page-hero-content text-center">
          <span className="high-demand-badge">📸 Unfiltered Mountain Memories</span>
          <h1>Trekker Photo & Memory Wall</h1>
          <p>Real candid group smiles, glowing campfires, high-altitude summit triumphs & scenic backpacking moments across India.</p>
        </div>
      </section>

      <div className="container section">
        {/* Category Filters */}
        <div className="filter-tabs-center" style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap", marginBottom: "36px" }}>
          {categories.map(cat => (
            <button
              key={cat}
              className={`tab-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "10px 20px",
                borderRadius: "999px",
                fontWeight: "600",
                fontSize: "14px",
                border: activeCategory === cat ? "none" : "1px solid #e2e8f0",
                background: activeCategory === cat ? "linear-gradient(135deg, #059669, #047857)" : "white",
                color: activeCategory === cat ? "white" : "#475569",
                boxShadow: activeCategory === cat ? "0 4px 14px rgba(5,150,105,0.3)" : "none",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Masonry Grid */}
        <div
          className="gallery-masonry-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px"
          }}
        >
          {filteredImages.map((item, idx) => (
            <motion.div
              key={item.id}
              className="gallery-item-card"
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              onClick={() => openLightbox(idx)}
              style={{
                position: "relative",
                borderRadius: "20px",
                overflow: "hidden",
                height: "280px",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.06)"
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" }}
              />
              <div
                className="gallery-item-overlay"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(15,23,42,0.85) 100%)",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  color: "white"
                }}
              >
                <div style={{ position: "absolute", top: "16px", right: "16px", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", borderRadius: "50%", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <ZoomIn size={18} color="#ffffff" />
                </div>
                <span className="gallery-cat-pill" style={{ background: "#059669", color: "white", padding: "4px 12px", borderRadius: "999px", fontSize: "11px", fontWeight: "700", width: "fit-content", marginBottom: "8px" }}>
                  {item.category}
                </span>
                <h4 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 4px 0", color: "#ffffff" }}>{item.title}</h4>
                <span style={{ fontSize: "12px", color: "#cbd5e1", display: "flex", alignItems: "center", gap: "4px" }}>
                  <MapPin size={12} /> {item.location} ({item.altitude})
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {currentImg && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 999999,
              background: "rgba(2, 6, 23, 0.92)",
              backdropFilter: "blur(10px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px"
            }}
          >
            <button
              onClick={closeLightbox}
              style={{
                position: "absolute",
                top: "24px",
                right: "24px",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "white",
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <X size={24} />
            </button>

            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              style={{
                position: "absolute",
                left: "24px",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "white",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ChevronLeft size={28} />
            </button>

            <button
              onClick={nextImage}
              style={{
                position: "absolute",
                right: "24px",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                color: "white",
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <ChevronRight size={28} />
            </button>

            <div
              className="lightbox-content"
              onClick={(e) => e.stopPropagation()}
              style={{
                maxWidth: "900px",
                width: "100%",
                background: "#0f172a",
                borderRadius: "24px",
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 25px 50px rgba(0,0,0,0.5)"
              }}
            >
              <img
                src={currentImg.image}
                alt={currentImg.title}
                style={{ width: "100%", maxHeight: "540px", objectFit: "cover" }}
              />

              <div style={{ padding: "28px", color: "white" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "12px" }}>
                  <div>
                    <span style={{ background: "#059669", color: "white", padding: "4px 12px", borderRadius: "999px", fontSize: "12px", fontWeight: "700" }}>
                      {currentImg.category}
                    </span>
                    <h3 style={{ fontSize: "22px", marginTop: "8px", fontWeight: "800", color: "#ffffff" }}>{currentImg.title}</h3>
                    <p style={{ color: "#94a3b8", fontSize: "14px", marginTop: "4px" }}>
                      📍 {currentImg.location} • Altitude: <strong>{currentImg.altitude}</strong>
                    </p>
                  </div>
                  <div style={{ textAlign: "right", fontSize: "13px", color: "#64748b" }}>
                    <span>📸 Photo by <strong>{currentImg.photographer}</strong></span>
                  </div>
                </div>

                {/* Quote */}
                <div style={{ marginTop: "16px", padding: "16px 20px", background: "rgba(255,255,255,0.05)", borderRadius: "14px", borderLeft: "3px solid #10b981", display: "flex", gap: "12px", alignItems: "center" }}>
                  <Quote size={20} color="#10b981" />
                  <p style={{ fontStyle: "italic", color: "#cbd5e1", margin: 0, fontSize: "14px" }}>"{currentImg.quote}"</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}