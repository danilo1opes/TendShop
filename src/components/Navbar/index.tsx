'use client';

import { useTranslation } from '../../hook/useTranslation';
import { changeLanguage } from '../../Lib/i18n-client';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineMenu } from 'react-icons/hi';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleLanguageChange = (lang: 'en' | 'pt') => {
    if (i18n.language !== lang) {
      changeLanguage(lang);
    }
  };

  return (
    <header className="w-full">
      <div className="bg-brand-primary text-brand-white text-center py-2 text-sm">
        {t('promo')}
        <Link href="/singup" className="underline font-nunito font-medium ml-1">
          {t('singUpNow')}
        </Link>
      </div>

      <nav className="flex justify-between p-4 border-b bg-brand-white">
        <div className="flex items-center gap-2">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <HiOutlineMenu size={24} />
          </button>
          {/* Link para pagina Home*/}
          <Link href="/" className="text-2xl font-roboto font-bold uppercase">
            {t('brandName')}
          </Link>
        </div>

        <div className="md:hidden flex gap-2">
          <button
            onClick={() => {
              setMenuOpen(true);
              setTimeout(() => {
                searchInputRef.current?.focus();
              }, 300);
            }}
          >
            <FiSearch size={24} />
          </button>
          <button>
            <Link href="/cart">
              <FiShoppingCart size={24} />
            </Link>
          </button>
          <button>
            <FiUser size={24} />
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="bg-brand-white px-4 py-6 md:hidden shadow-lg space-y-4 transform transition-all duration-300 ease-in-out -translate-x-full opacity-0 animate-slide-in">
          {/* SHOP com submenu */}
          <div>
            <button
              onClick={() => setShopOpen(!shopOpen)}
              className="flex items-center justify-between w-full text-lg font-nunito font-medium"
            >
              {t('shop')}
              <FaChevronDown
                className={`ml-2 text-sm transition-transform ${
                  shopOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {shopOpen && (
              <div className="mt-2 ml-2 rounded-xl border border-brand-muted bg-brand-light p-3 shadow-md space-y-2">
                <Link
                  href="/shop/casual"
                  className="block text-base font-nunito text-brand-primary hover:text-brand-accent hover:bg-brand-muted px-3 py-1 rounded-lg transition-all"
                >
                  {t('shop_casual')}
                </Link>
                {/* Link específico para a página de homens */}
                <Link
                  href="/shop/homens"
                  className="block text-base font-nunito text-brand-primary hover:text-brand-accent hover:bg-brand-muted px-3 py-1 rounded-lg transition-all"
                >
                  {t('shop_men')}
                </Link>
              </div>
            )}
          </div>

          {/* Outros itens de navegação */}
          {[
            { href: '/sale', label: t('on_sale') },
            { href: '/new', label: t('new') },
            { href: '/brands', label: t('brands') },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block text-lg font-nunito font-medium"
            >
              {item.label}
            </Link>
          ))}

          {/* Busca */}
          <div className="flex items-center bg-brand-muted rounded-full px-4 py-2 mt-4">
            <FiSearch className="text-brand-gray mr-2" size={20} />
            <input
              type="text"
              ref={searchInputRef}
              placeholder={t('search_products')}
              className="bg-transparent outline-none flex-1 text-sm"
            />
          </div>

          {/* Troca de idioma */}
          <div className="flex gap-4 mt-4 items-center">
            <button
              onClick={() => handleLanguageChange('pt')}
              className={`rounded-full p-1 border-2 transition ${
                i18n.language === 'pt'
                  ? 'border-brand-accent'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src="/icon/br-flag.webp"
                alt="Português"
                width={32}
                height={32}
              />
            </button>
            <button
              onClick={() => handleLanguageChange('en')}
              className={`rounded-full p-1 border-2 transition ${
                i18n.language === 'en'
                  ? 'border-brand-accent'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src="/icon/us-flag.webp"
                alt="English"
                width={32}
                height={32}
              />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
