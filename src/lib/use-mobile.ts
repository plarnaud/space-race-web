'use client'

import { useState, useEffect } from 'react'

export function useIsMobile() {
  const [mobile, setMobile] = useState(false)
  useEffect(() => {
    setMobile(window.innerWidth < 768)
    const h = () => setMobile(window.innerWidth < 768)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])
  return mobile
}
