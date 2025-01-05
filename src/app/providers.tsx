'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// Check if PostHog is blocked
const isPostHogBlocked = () => {
  try {
    return window.navigator.webdriver || 
           window.top !== window || 
           window.document.documentElement.hasAttribute('webdriver') ||
           !!document.querySelector('meta[name="robots"][content*="noindex"]') ||
           !!window.navigator.userAgent.match(/HeadlessChrome/)
  } catch {
    return false
  }
}

// Safely capture events, handling any potential errors
export const captureEvent = (eventName: string, properties?: Record<string, any>) => {
  try {
    if (typeof window === 'undefined' || isPostHogBlocked()) {
      // If PostHog is blocked, log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log('[PostHog Blocked] Would have captured:', eventName, properties)
      }
      return
    }

    // Add retry mechanism for failed requests
    const maxRetries = 3
    const retryDelay = 1000 // 1 second

    const attemptCapture = (attempt = 0) => {
      try {
        posthog.capture(eventName, {
          ...properties,
          captureAttempt: attempt + 1,
        })
      } catch (error) {
        if (attempt < maxRetries) {
          setTimeout(() => attemptCapture(attempt + 1), retryDelay * (attempt + 1))
        } else if (process.env.NODE_ENV === 'development') {
          console.warn(`Failed to capture event after ${maxRetries} attempts:`, eventName)
        }
      }
    }

    attemptCapture()
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('PostHog event capture failed:', error)
    }
  }
}

// Initialize PostHog with retry mechanism
const initPostHog = () => {
  try {
    if (typeof window === 'undefined' || isPostHogBlocked()) return

    const config = {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      loaded: (posthog: any) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog loaded successfully')
          posthog.debug()
        }
      },
      autocapture: false, // Disable autocapture to reduce blocked requests
      capture_pageview: false, // We'll handle this manually
      capture_pageleave: false,
      persistence: 'localStorage+cookie' as const, // Use both localStorage and cookie for better persistence
      bootstrap: {
        distinctID: 'anonymous-' + Math.random().toString(36).substring(2, 15),
      },
      respect_dnt: true, // Respect Do Not Track settings
      mask_all_text: true, // Enhance privacy by masking text
      mask_all_element_attributes: true, // Enhance privacy
      cross_subdomain_cookie: false, // Prevent cross-subdomain tracking
      secure_cookie: true, // Use secure cookies
    }

    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, config)
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('PostHog initialization failed:', error)
    }
  }
}

function PostHogPageview(): React.ReactElement {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (!pathname || isPostHogBlocked()) return

    const capturePageView = () => {
      const url = window.origin + pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      captureEvent('$pageview', {
        $current_url: url,
        path: pathname,
        search: searchParams?.toString() || '',
      })
    }

    // Delay pageview capture slightly to ensure proper initialization
    setTimeout(capturePageView, 100)
  }, [pathname, searchParams])

  return <></>
}

export function CSPostHogProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    if (!isInitialized && typeof window !== 'undefined' && !isPostHogBlocked()) {
      initPostHog()
      setIsInitialized(true)
    }
  }, [isInitialized])

  // If PostHog is blocked, just render children
  if (typeof window !== 'undefined' && isPostHogBlocked()) {
    return <>{children}</>
  }

  return (
    <PostHogProvider client={posthog}>
      <PostHogPageview />
      {children}
    </PostHogProvider>
  )
} 