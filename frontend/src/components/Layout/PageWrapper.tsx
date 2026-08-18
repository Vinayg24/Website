import { ReactNode, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import useScrollToTop from '../../hooks/useScrollToTop'

interface PageWrapperProps {
  children: ReactNode
  title: string
  description: string
}

export const PageWrapper = ({ children, title, description }: PageWrapperProps) => {
  // Reset scroll position on route navigation
  useScrollToTop()
  const shouldReduceMotion = useReducedMotion()

  // SEO document metadata updates & JSON-LD Schemas
  useEffect(() => {
    document.title = title

    // Standard Meta Description
    let metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute('content', description)
    } else {
      metaDesc = document.createElement('meta')
      metaDesc.setAttribute('name', 'description')
      metaDesc.setAttribute('content', description)
      document.head.appendChild(metaDesc)
    }

    // Canonical Tag
    let canonical = document.querySelector('link[rel="canonical"]')
    if (canonical) {
      canonical.setAttribute('href', window.location.href)
    } else {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      canonical.setAttribute('href', window.location.href)
      document.head.appendChild(canonical)
    }

    // OpenGraph Title
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', title)
    } else {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      ogTitle.setAttribute('content', title)
      document.head.appendChild(ogTitle)
    }

    // OpenGraph Description
    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) {
      ogDesc.setAttribute('content', description)
    } else {
      ogDesc = document.createElement('meta')
      ogDesc.setAttribute('property', 'og:description')
      ogDesc.setAttribute('content', description)
      document.head.appendChild(ogDesc)
    }

    // JSON-LD PhotographyBusiness Schema
    const schemaId = 'srk-photography-schema'
    let schemaScript = document.getElementById(schemaId) as HTMLScriptElement | null
    if (!schemaScript) {
      schemaScript = document.createElement('script')
      schemaScript.id = schemaId
      schemaScript.type = 'application/ld+json'
      document.head.appendChild(schemaScript)
    }

    const jsonLdData = {
      '@context': 'https://schema.org',
      '@type': ['LocalBusiness', 'PhotographyBusiness'],
      'name': 'Shree Radha Krishna Studio',
      'image': 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85',
      'telephone': '+91-9460142572',
      'email': 'ajeetdigitallab@gmail.com',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': '44 A, Ved Vatika, Ramnagar Extension, Sodala',
        'addressLocality': 'Jaipur',
        'addressRegion': 'Rajasthan',
        'postalCode': '302019',
        'addressCountry': 'IN'
      },
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': 26.8978,
        'longitude': 75.7725
      },
      'url': window.location.origin,
      'priceRange': '₹₹₹₹',
      'openingHoursSpecification': {
        '@type': 'OpeningHoursSpecification',
        'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        'opens': '10:00',
        'closes': '20:00'
      }
    }

    schemaScript.text = JSON.stringify(jsonLdData)
  }, [title, description])

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
      transition={{ duration: shouldReduceMotion ? 0.1 : 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ width: '100%', minHeight: '100vh', backgroundColor: '#080808' }}
    >
      {children}
    </motion.div>
  )
}

export default PageWrapper

