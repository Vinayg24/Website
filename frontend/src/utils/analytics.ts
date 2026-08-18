/**
 * Analytics Utility for Shree Radha Krishna Studio
 * Decoupled event dispatcher supporting GA4 (gtag), GTM (dataLayer),
 * Meta Pixel (fbq), and Microsoft Clarity (clarity).
 */

export interface AnalyticsEvent {
  action: string
  category?: string
  label?: string
  value?: number
  params?: Record<string, any>
}

/**
 * Track custom user interaction events
 */
export const trackEvent = ({ action, category = 'General', label, value, params = {} }: AnalyticsEvent) => {
  if (typeof window === 'undefined') return

  // 1. Google Analytics 4 (gtag)
  if (typeof (window as any).gtag === 'function') {
    ;(window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
      ...params,
    })
  }

  // 2. Google Tag Manager (dataLayer)
  if (Array.isArray((window as any).dataLayer)) {
    ;(window as any).dataLayer.push({
      event: action,
      eventCategory: category,
      eventLabel: label,
      eventValue: value,
      ...params,
    })
  }

  // 3. Meta Pixel (fbq)
  if (typeof (window as any).fbq === 'function') {
    ;(window as any).fbq('trackCustom', action, {
      category,
      label,
      value,
      ...params,
    })
  }

  // 4. Microsoft Clarity
  if (typeof (window as any).clarity === 'function') {
    ;(window as any).clarity('event', action)
  }
}

/**
 * Track Page Views on route navigation
 */
export const trackPageView = (url: string, title?: string) => {
  trackEvent({
    action: 'page_view',
    category: 'Navigation',
    label: url,
    params: {
      page_path: url,
      page_title: title || typeof document !== 'undefined' ? document.title : '',
    },
  })
}
