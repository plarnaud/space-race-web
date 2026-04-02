'use client'

import { useState } from 'react'

export function Controls() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      className="fixed bottom-28 right-6 z-10 pointer-events-auto"
      style={{
        fontFamily: 'var(--font-mono)',
        background: 'rgba(10, 18, 32, 0.7)',
        backdropFilter: 'blur(8px)',
        border: '1px solid rgba(0, 212, 255, 0.1)',
        borderRadius: '4px',
        padding: '12px 16px',
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
      <div className="space-y-1.5 text-[11px]" style={{ color: '#7a8ba3' }}>
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
      </div>
    </div>
  )
}
