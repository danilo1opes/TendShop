'use client';

import { useTranslation } from '../../../hook/useTranslation';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import FilterSidebar from '../../../components/Filter/FilterSidebar';
import Image from 'next/image';

export default function CausalPage() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [usdToBrl, setUsdToBrl] = useState(5.2);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    async function fetchDollar() {
      try {
        const res = await fetch(
          'https://economia.awesomeapi.com.br/json/last/USD-BRL'
        );
        const data = await res.json();
        const rate = parseFloat(data.USDBRL.ask);
        setUsdToBrl(rate);
      } catch (error) {
        console.error('Error fetching dollar rate:', error);
      }
    }

    if (language === 'pt') fetchDollar();
  }, [language]);

  const convertToCurrency = (value: number, language: string) => {
    const converted = language === 'pt' ? value * usdToBrl : value;

    return new Intl.NumberFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
      style: 'currency',
      currency: language === 'pt' ? 'BRL' : 'USD',
    }).format(converted);
  };

  const products = [
    {
      rating: 3.5,
      price: 145,
      oldPrice: 242,
      discount: '20%',
      name: t('textItems_two'),
      image: '/homens/moreItem2.jpg',
    },
    {
      rating: 4.5,
      price: 180,
      oldPrice: 242,
      discount: '20%',
      name: t('casual_two'),
      image: '/casual/polo.jpg',
    },
    {
      rating: 4,
      price: 120,
      oldPrice: 150,
      discount: '30%',
      name: t('casual_one'),
      image: '/casual/striped.jpg',
    },
    {
      rating: 3.5,
      price: 240,
      oldPrice: 260,
      discount: '20%',
      name: t('arrivals_name2'),
      image: '/images/arrivals/skinny.png',
    },
    {
      rating: 3.5,
      price: 180,
      name: t('arrivals_name3'),
      image: '/images/arrivals/checkred.png',
    },
    {
      rating: 3.5,
      price: 145,
      oldPrice: 242,
      discount: '20%',
      name: t('arrivals_name4'),
      image: '/images/arrivals/sleeve.png',
    },
  ];

  return (
    <section className="px-4">
      <div className="flex items-center justify-between py-4">
        <div>
          <p className="text-sm text-brand-400">
            <span className="text-brand-400">{t('casual_home')}</span> &gt;{' '}
            <span className="text-brand-primary font-light">
              {t('casual_sub')}
            </span>
          </p>
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold">{t('casual_sub')}</h1>
            <p className="inline text-gray-500 font-normal text-base">
              {t('casual_p')}
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsFilterOpen(true)}
          className="p-2 bg-brand-muted rounded-full hover:bg-brand-60 transition"
        >
          <Image src="/icon/filter.svg" alt="Filter" width={20} height={20} />
        </button>
        <FilterSidebar
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        />
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-8">
        {products.map((product, index) => (
          <div key={index}>
            <div className="rounded-xl overflow-hidden mb-4">
              <Image
                src={product.image}
                alt={product.name}
                width={200}
                height={200}
                className="h-auto"
              ></Image>
            </div>
            <h3 className="text-md white-space-pre-line font-semibold mb-1">
              {product.name}
            </h3>

            {/* Ratings and Prices */}
            <div className="flex items-center text-sm mb-1">
              {Array.from({ length: 5 }, (_, i) => {
                const full = i + 1 <= Math.floor(product.rating);
                const half = i + 0.5 === product.rating;

                return (
                  <span key={i} className="w-4 h-4 mr-1">
                    {(full || half) && (
                      <Image
                        src={
                          full ? '/icon/rating.svg' : '/icon/rating-half.svg'
                        }
                        alt={t('rating_star')}
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                    )}
                  </span>
                );
              })}
              <div className="flex justify-center items-center gap-4">
                <span className="ml-2 text-brand-gray">{product.rating}/5</span>
                <span className="text-brand-discont text-xs">
                  {product.discount}
                </span>
              </div>
            </div>

            {/* Prices */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">
                {isClient
                  ? convertToCurrency(product.price, i18n.language)
                  : product.price}
              </span>
              {product.oldPrice && (
                <>
                  <span
                    className={`line-through text-brand-old ${
                      i18n.language === 'pt' ? 'text-xs' : 'text-sm'
                    }`}
                  >
                    {isClient
                      ? convertToCurrency(product.oldPrice, i18n.language)
                      : product.oldPrice}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Footer base */}
      <div className="flex justify-center items-center gap-2 py-6 border-t mt-10">
        {/* Previous */}
        <button className="flex items-center gap-1 border px-3 py-1 rounded-full hover:bg-brand-muted transition">
          <ChevronLeft className="w-4 h-4" />
          <span className="text-sm">{t('previous')}</span>
        </button>

        {/* Page numbers */}
        <span className="w-8 h-8 flex items-center justify-center rounded-md bg-brand-55 font-semibold text-sm">
          1
        </span>
        <span className="text-sm text-gray-500">2</span>
        <span className="text-sm text-gray-500">...</span>
        <span className="text-sm text-gray-500">9</span>
        <span className="text-sm text-gray-500">10</span>

        {/* Next */}
        <button className="flex items-center gap-1 border px-3 py-1 rounded-full hover:bg-gray-100 transition">
          <span className="text-sm">{t('next')}</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
