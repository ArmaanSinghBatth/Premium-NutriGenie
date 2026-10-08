'use client';
import { useEffect } from 'react';
// Registers the offline-cache service worker in production builds only.
export default function SW() {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js').catch(() => {});
  }, []);
  return null;
}
