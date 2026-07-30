import { useState, useCallback } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'
import CustomTrekModal from './components/CustomTrekModal'
import Preloader from './components/Preloader'
import Home from './pages/Home'
import Treks from './pages/Treks'
import About from './pages/About'
import Contact from './pages/Contact'
import Gallery from "./pages/Gallery"
import Booking from "./pages/Booking"
import TrekDetails from "./pages/TrekDetails"
import ScrollToTop from "./ScrollToTop"

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isCustomModalOpen, setIsCustomModalOpen] = useState(false)

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false)
  }, [])

  const handleOpenCustomModal = () => setIsCustomModalOpen(true)
  const handleCloseCustomModal = () => setIsCustomModalOpen(false)

  return (
    <>
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}
      <Router>
        <ScrollToTop />
        <div className="app">
          <Navbar onOpenCustomModal={handleOpenCustomModal} />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home onOpenCustomModal={handleOpenCustomModal} />} />
              <Route path="/treks" element={<Treks />} />
              <Route path="/treks/:id" element={<TrekDetails />} />
              <Route path="/trekdetails" element={<TrekDetails />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/booking" element={<Booking />} />
            </Routes>
          </main>
          <Footer onOpenCustomModal={handleOpenCustomModal} />
          <WhatsAppFloat />
          <CustomTrekModal isOpen={isCustomModalOpen} onClose={handleCloseCustomModal} />
        </div>
      </Router>
    </>
  )
}