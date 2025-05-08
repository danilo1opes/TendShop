'use client';

import { useTranslation } from '../../hook/useTranslation';
import { changeLanguage } from '../../Lib/i18n-client';
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { HiOutlineMenu } from 'react-icons/hi';
import { FiSearch, FiShoppingCart, FiUser } from 'react-icons/fi';
import { FaChevronDown } from 'react-icons/fa';

export default function Navbar() {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  // Fecha o menu quando clica fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (lang: 'en' | 'pt') => {
    if (i18n.language !== lang) {
      changeLanguage(lang);
    }
  };

  return (
    <header className="w-full">
      {/* Banner promocional */}
      <div className="bg-brand-primary text-brand-white text-center py-2 text-sm">
        {t('promo')}
        <Link href="/singup" className="underline font-nunito font-medium ml-1">
          {t('singUpNow')}
        </Link>
      </div>

      {/* Navbar principal */}
      <nav className="flex flex-col w-full bg-brand-white">
        <div className="flex justify-between items-center p-4 border-b">
          {/* Lado esquerdo - Logo e menu mobile */}
          <div className="flex items-center gap-2">
            {/* Menu hamburguer (apenas mobile) */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden"
            >
              <HiOutlineMenu size={24} />
            </button>

            {/* Logo */}
            <Link href="/" className="text-2xl font-roboto font-bold uppercase">
              {t('brandName')}
            </Link>
          </div>

          {/* Menu Desktop (visível apenas em md+) - Links de navegação horizontal */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Shop dropdown */}
            <div className="relative group">
              <button className="flex items-center font-nunito font-medium space-x-1 hover:text-brand-accent">
                <span>{t('shop')}</span>
                <FaChevronDown className="text-xs group-hover:rotate-180 transition-transform" />
              </button>

              {/* Submenu Desktop - Com correção para não desaparecer rapidamente */}
              <div className="absolute hidden group-hover:block hover:block bg-brand-white shadow-lg rounded-lg p-3 min-w-[180px] z-20 mt-2">
                {/* Elemento invisível para aumentar a área de hover */}
                <div className="absolute -top-2 left-0 right-0 h-2 bg-transparent"></div>

                <Link
                  href="/shop/casual"
                  className="block text-base font-nunito text-brand-primary hover:text-brand-accent hover:bg-brand-muted px-3 py-2 rounded-lg transition-all"
                >
                  {t('shop_casual')}
                </Link>
                <Link
                  href="/shop/homens"
                  className="block text-base font-nunito text-brand-primary hover:text-brand-accent hover:bg-brand-muted px-3 py-2 rounded-lg transition-all"
                >
                  {t('shop_men')}
                </Link>
              </div>
            </div>

            {/* Outros links desktop */}
            <Link
              href="/sale"
              className="font-nunito font-medium hover:text-brand-accent"
            >
              {t('on_sale')}
            </Link>
            <Link
              href="/new"
              className="font-nunito font-medium hover:text-brand-accent"
            >
              {t('new')}
            </Link>
            <Link
              href="/brands"
              className="font-nunito font-medium hover:text-brand-accent"
            >
              {t('brands')}
            </Link>
          </div>

          {/* Lado direito - Busca, carrinho, usuário */}
          <div className="flex items-center gap-4">
            {/* Barra de busca desktop */}
            <div className="hidden md:flex items-center bg-brand-muted rounded-full px-4 py-2 min-w-[300px]">
              <FiSearch className="text-brand-gray mr-2" size={20} />
              <input
                type="text"
                placeholder={t('search_products')}
                className="bg-transparent outline-none flex-1 text-sm"
              />
            </div>

            {/* Ícone de busca para mobile */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="md:hidden"
            >
              <FiSearch size={24} />
            </button>

            {/* Ícones universais (desktop e mobile) */}
            <button>
              <Link href="/cart">
                <FiShoppingCart size={24} />
              </Link>
            </button>
            <button>
              <Link href="/account">
                <FiUser size={24} />
              </Link>
            </button>

            {/* Idiomas (visíveis apenas no desktop) */}
            <div className="hidden md:flex gap-2 items-center">
              <button
                onClick={() => handleLanguageChange('pt')}
                className={`rounded-full transition ${
                  i18n.language === 'pt'
                    ? 'border-2 border-brand-accent'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src="/icon/br-flag.webp"
                  alt="Português"
                  width={24}
                  height={24}
                />
              </button>
              <button
                onClick={() => handleLanguageChange('en')}
                className={`rounded-full transition ${
                  i18n.language === 'en'
                    ? 'border-2 border-brand-accent'
                    : 'opacity-60 hover:opacity-100'
                }`}
              >
                <Image
                  src="/icon/us-flag.webp"
                  alt="English"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Menu Mobile Slide-in */}
      {menuOpen && (
        <div
          ref={menuRef}
          className="fixed top-0 left-0 h-full w-4/5 max-w-[300px] bg-brand-white z-30 px-4 py-6 md:hidden shadow-lg space-y-4 transform transition-all duration-300 ease-in-out animate-slide-in overflow-y-auto"
        >
          {/* Cabeçalho do menu mobile */}
          <div className="flex justify-between items-center pb-4 border-b border-brand-muted">
            <Link href="/" className="text-xl font-roboto font-bold uppercase">
              {t('brandName')}
            </Link>
            <button onClick={() => setMenuOpen(false)}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

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

      {/* Overlay de fundo quando o menu mobile está aberto */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      {/* Barra de busca mobile quando ativada */}
      {searchOpen && (
        <div
          ref={searchRef}
          className="fixed top-0 left-0 right-0 bg-brand-white z-30 p-4 shadow-md md:hidden animate-slide-down"
        >
          <div className="flex items-center">
            <button onClick={() => setSearchOpen(false)} className="mr-3">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19 12H5M5 12L12 19M5 12L12 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="flex items-center bg-brand-muted rounded-full px-4 py-2 flex-1">
              <FiSearch className="text-brand-gray mr-2" size={20} />
              <input
                type="text"
                placeholder={t('search_products')}
                className="bg-transparent outline-none flex-1 text-sm"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
