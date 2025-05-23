import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// This component automatically scrolls to the top of the page when navigating
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    // Scroll to top when the route changes
    window.scrollTo(0, 0)
  }, [pathname])

  // This component doesn't render anything
  return null
}

export default ScrollToTop 