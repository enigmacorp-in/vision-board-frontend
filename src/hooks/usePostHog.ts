import { captureEvent } from '@/app/providers'

export const usePostHog = () => {
  // Navigation tracking
  const trackNavigation = (
    source: 'navbar' | 'hero_button' | 'feature_card' | 'footer' | 'cta_button',
    destination: string,
    additionalProps?: Record<string, any>
  ) => {
    captureEvent('navigation', {
      source,
      destination,
      timestamp: new Date().toISOString(),
      ...additionalProps,
    })
  }

  // Button click tracking
  const trackButtonClick = (
    buttonName: string,
    location: string,
    additionalProps?: Record<string, any>
  ) => {
    captureEvent('button_clicked', {
      button_name: buttonName,
      location,
      timestamp: new Date().toISOString(),
      ...additionalProps,
    })
  }

  // Feature usage tracking
  const trackFeatureUsage = (
    featureName: string,
    source: string,
    additionalProps?: Record<string, any>
  ) => {
    captureEvent('feature_used', {
      feature_name: featureName,
      source,
      timestamp: new Date().toISOString(),
      ...additionalProps,
    })
  }

  // Image generation tracking
  const trackImageGeneration = (
    prompt: string,
    source: 'text_to_image' | 'vision_board',
    additionalProps?: Record<string, any>
  ) => {
    captureEvent('image_generated', {
      prompt,
      source,
      timestamp: new Date().toISOString(),
      ...additionalProps,
    })
  }

  // Vision board creation tracking
  const trackVisionBoardCreation = (
    imageCount: number,
    source: string,
    additionalProps?: Record<string, any>
  ) => {
    captureEvent('vision_board_created', {
      image_count: imageCount,
      source,
      timestamp: new Date().toISOString(),
      ...additionalProps,
    })
  }

  // Link click tracking
  const trackLinkClick = (
    linkText: string,
    linkUrl: string,
    location: string,
    additionalProps?: Record<string, any>
  ) => {
    captureEvent('link_clicked', {
      link_text: linkText,
      link_url: linkUrl,
      location,
      timestamp: new Date().toISOString(),
      ...additionalProps,
    })
  }

  // Error tracking
  const trackError = (
    error: string,
    context: string,
    additionalProps?: Record<string, any>
  ) => {
    captureEvent('error_occurred', {
      error_message: error,
      context,
      timestamp: new Date().toISOString(),
      ...additionalProps,
    })
  }

  return {
    trackNavigation,
    trackButtonClick,
    trackFeatureUsage,
    trackImageGeneration,
    trackVisionBoardCreation,
    trackLinkClick,
    trackError,
  }
} 