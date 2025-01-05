'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { usePostHog } from '@/hooks/usePostHog'

const Footer = () => {
  const pathname = usePathname()
  const { trackNavigation, trackLinkClick } = usePostHog()

  const handleNavClick = (destination: string) => {
    trackNavigation('footer', destination, {
      previous_path: pathname
    })
  }

  const handleExternalLink = (text: string, url: string) => {
    trackLinkClick(text, url, 'footer', {
      previous_path: pathname
    })
  }

  return (
    <footer className="bg-gray-900 text-white py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Enigma AI</h3>
          <p className="text-gray-400">
            Unleash the power of AI to transform your ideas into stunning visuals.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Our Services</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link 
                href="/create-vision" 
                className="hover:text-white transition-colors"
                onClick={() => handleNavClick('create_vision')}
              >
                Vision Board
              </Link>
            </li>
            <li>
              <Link 
                href="/create-image" 
                className="hover:text-white transition-colors"
                onClick={() => handleNavClick('create_image')}
              >
                Text to Image
              </Link>
            </li>
            <li>
              <Link 
                href="/about" 
                className="hover:text-white transition-colors"
                onClick={() => handleNavClick('about')}
              >
                About
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a 
                href="mailto:hello@enigma-ai.com"
                onClick={() => handleExternalLink('Email', 'mailto:hello@enigma-ai.com')}
              >
                Email: hello@enigma-ai.com
              </a>
            </li>
            <li>
              <a 
                href="https://twitter.com/EnigmaAI"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleExternalLink('Twitter', 'https://twitter.com/EnigmaAI')}
              >
                Follow us on Twitter @EnigmaAI
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-gray-800 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Enigma AI. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer 