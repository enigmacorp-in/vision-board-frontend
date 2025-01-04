'use client';

/**
 * Gallery page - Temporarily disabled
 * 
 * This page is currently redirecting to home as the gallery feature is temporarily disabled.
 * To re-enable the gallery:
 * 1. Remove the redirect in this file
 * 2. Uncomment the gallery link in Header.tsx
 * 3. Restore the original gallery page implementation
 * 4. Re-enable the "View Gallery" button in create/page.tsx
 */

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Gallery() {
  const router = useRouter();

  useEffect(() => {
    // Temporary redirect until gallery feature is re-enabled
    router.replace('/');
  }, [router]);

  return null;
} 