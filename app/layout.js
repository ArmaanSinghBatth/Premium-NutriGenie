import './globals.css';
import SW from '../components/SW';

export const metadata = {
  title: 'NutriGenie',
  description: 'Fitness tracking, AI workouts and meals.',
  manifest: '/manifest.webmanifest',
  icons: {
    icon: [{ url: '/icons/favicon-32.png', sizes: '32x32', type: 'image/png' }, { url: '/icons/icon.svg', type: 'image/svg+xml' }],
    apple: '/icons/apple-touch-icon.png',
  },
  appleWebApp: { capable: true, title: 'NutriGenie', statusBarStyle: 'black-translucent' },
};
export const viewport = { themeColor: '#000000', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=DM+Sans:wght@400;500;700&family=Playfair+Display:ital,wght@1,500&display=swap" rel="stylesheet" />
      </head>
      <body className="gold">
        {children}
        <SW />
      </body>
    </html>
  );
}
