import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [isFading, setIsFading] = useState(false)
  const [progress, setProgress] = useState(0)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    const duration = 1400
    const intervalTime = 30
    const increment = 100 / (duration / intervalTime)

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment + Math.random() * 2
        if (next >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            setIsFading(true)
            setTimeout(() => {
              if (onCompleteRef.current) onCompleteRef.current()
            }, 450)
          }, 150)
          return 100
        }
        return next
      })
    }, intervalTime)

    return () => clearInterval(timer)
  }, [])

  const circumference = 2 * Math.PI * 85 // 534.07
  const strokeDashoffset = circumference - (Math.min(progress, 100) / 100) * circumference

  return (
    <AnimatePresence>
      {!isFading && (
        <motion.div
          className="nbt-site-loader-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 999999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#ffffff',
            fontFamily: "'Montserrat', sans-serif",
            userSelect: 'none'
          }}
        >
          {/* Ring Wrap */}
          <div style={{ position: 'relative', width: '180px', height: '180px' }}>
            <svg viewBox="0 0 180 180" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              <circle
                cx="90"
                cy="90"
                r="85"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="3"
              />
              <circle
                cx="90"
                cy="90"
                r="85"
                fill="none"
                stroke="#4ade80"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                style={{ transition: 'stroke-dashoffset 0.05s ease-out' }}
              />
            </svg>
            <img
              src="/logo.webp"
              alt="NBTrekkers Logo"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '160px',
                height: '160px',
                objectFit: 'contain'
              }}
              onError={(e) => {
                e.target.style.display = 'none'
              }}
            />
          </div>

          {/* Brand Title */}
          <div
            style={{
              marginTop: '24px',
              fontSize: '20px',
              fontWeight: '900',
              letterSpacing: '-0.5px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              lineHeight: '1.15'
            }}
          >
            <span style={{ color: '#16a34a' }}>NAMMA BENGALURU</span>
            <span style={{ color: '#1f2937' }}>TREKKERS</span>
          </div>

          {/* Loading Subtext */}
          <span
            style={{
              marginTop: '12px',
              fontSize: '13px',
              fontWeight: '600',
              color: '#9ca3af',
              letterSpacing: '0.5px'
            }}
          >
            Loading... {Math.min(Math.round(progress), 100)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
