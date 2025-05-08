import './style/globals.css';
import type { ReactNode } from 'react';

import Navbar from '../components/Navbar';
import I18nProvider from '../components/Switcher/LanguageSwitcher';
import Footer from '../components/Footer';

export const metadata = {
  title: 'TendyShop',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <I18nProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
