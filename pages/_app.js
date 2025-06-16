// pages/_app.js
import '../styles/globals.css';
import { useState } from 'react';
// CORRECTED: Using the new createPagesBrowserClient function
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';
import { Inter } from 'next/font/google';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

function MyApp({ Component, pageProps }) {
  // Use the new function here
  const [supabaseClient] = useState(() => createPagesBrowserClient());

  return (
    <SessionContextProvider
      supabaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <main className={`${inter.variable} font-sans`}>
        <Component {...pageProps} />
      </main>
    </SessionContextProvider>
  );
}

export default MyApp;