'use client'

import { useState, useEffect } from 'react'

export function Controls() {
  const [dismissed, setDismissed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setIsMobile(window.innerWidth < 768)
    const handler = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  if (dismissed) return null

  return (
    <div
      className="fixed z-10 pointer-events-auto md:bottom-28 md:right-6 max-md:bottom-[90px] max-md:left-3"
      style={{
        fontFamily: 'var(--font-mono)',
        background: 'rgba(10, 18, 32, 0.7)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(0, 212, 255, 0.1)',
        borderRadius: '4px',
        padding: '10px 14px',
      }}
    >
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-1.5 right-2 hover:opacity-100 transition-opacity"
        style={{
          color: '#3d4f65',
          border: 'none',
          background: 'none',
          cursor: 'pointer',
          fontSize: '11px',
          fontFamily: 'var(--font-mono)',
          opacity: 0.7,
        }}
      >
        ×
      </button>
      <div
        className="text-[9px] uppercase tracking-[2px] mb-2"
        style={{ color: '#3d4f65' }}
      >
        Controls
      </div>
      <div className="space-y-1.5 text-[10px] md:text-[11px]" style={{ color: '#7a8ba3' }}>
        {isMobile ? (
          <>
            <div className="flex justify-between gap-4">
              <span style={{ color: '#3d4f65' }}>ORBIT</span>
              <span>One finger drag</span>
            </div>
            <div className="flex justify-between gap-4">
              <span style={{ color: '#3d4f65' }}>PAN</span>
              <span>Two finger drag</span>
            </div>
            <div className="flex justify-between gap-4">
              <span style={{ color: '#3d4f65' }}>ZOOM</span>
              <span>Pinch</span>
            </div>
            <div className="flex justify-between gap-4">
              <span style={{ color: '#3d4f65' }}>TIME</span>
              <span>Drag timeline bar</span>
            </div>
            <div className="flex justify-between gap-4">
              <span style={{ color: '#3d4f65' }}>INSPECT</span>
              <span>Tap planet or mission</span>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between gap-6">
              <span style={{ color: '#3d4f65' }}>ORBIT</span>
              <span>Left click + drag</span>
            </div>
            <div className="flex justify-between gap-6">
              <span style={{ color: '#3d4f65' }}>PAN</span>
              <span>Right click + drag</span>
            </div>
            <div className="flex justify-between gap-6">
              <span style={{ color: '#3d4f65' }}>ZOOM</span>
              <span>Scroll wheel</span>
            </div>
            <div className="flex justify-between gap-6">
              <span style={{ color: '#3d4f65' }}>TIME</span>
              <span>← → keys or drag timeline</span>
            </div>
            <div className="flex justify-between gap-6">
              <span style={{ color: '#3d4f65' }}>INSPECT</span>
              <span>Click a mission or planet</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
