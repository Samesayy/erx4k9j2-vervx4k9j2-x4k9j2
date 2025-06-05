// pages/_app.js

import '../styles/globals.css';
import { FavoritesProvider } from '../lib/favoritesContext';

export default function MyApp({ Component, pageProps }) {
  return (
    <FavoritesProvider>
      <Component {...pageProps} />
    </FavoritesProvider>
  );
}
