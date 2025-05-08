'use client';

import { useTranslation } from '../../hook/useTranslation';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Arrivals() {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

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

  const convertToCurrency = (value: number) => {
    const converted = language === 'pt' ? value * usdToBrl : value;

    return new Intl.NumberFormat(language === 'pt' ? 'pt-BR' : 'en-US', {
      style: 'currency',
      currency: language === 'pt' ? 'BRL' : 'USD',
    }).format(converted);
  };

  const products = [
    {
      name: t('arrivals_name1'),
      image: '/images/arrivals/tshirt.png',
      rating: 4.5,
      price: 120,
    },
    {
      name: t('arrivals_name2'),
      image: '/images/arrivals/skinny.png',
      rating: 3.5,
      price: 240,
      oldPrice: 260,
      discount: '-20%',
    },
    {
      name: t('arrivals_name3'),
      image: '/images/arrivals/checkred.png',
      rating: 4.5,
      price: 180,
    },
    {
      name: t('arrivals_name4'),
      image: '/images/arrivals/sleeve.png',
      rating: 4.5,
      price: 130,
      oldPrice: 260,
      discount: '-50%',
    },
  ];

  return (
    <section className="bg-brand-white py-10 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-8 uppercase">
        New Arrivals
      </h2>

      {/* Mobile: Horizontal scroll view */}
      <div className="md:hidden overflow-x-auto">
        <div className="flex gap-4 w-max">
          {products.map((product, index) => (
            <div key={index} className="w-60">
              <div className="rounded-xl overflow-hidden mb-4 bg-gray-50">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={240}
                  height={240}
                  className="h-auto w-full object-contain"
                />
              </div>
              <h3 className="text-md font-semibold mb-1">{product.name}</h3>

              {/* Ratings */}
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
                <span className="ml-2 text-brand-gray">{product.rating}/5</span>
              </div>

              {/* Prices */}
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">
                  {isClient
                    ? convertToCurrency(product.price)
                    : `${language === 'pt' ? 'R$' : '$'} ${product.price}`}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="line-through text-brand-old">
                      {isClient
                        ? convertToCurrency(product.oldPrice)
                        : `${language === 'pt' ? 'R$' : '$'} ${
                            product.oldPrice
                          }`}
                    </span>
                    <span className="text-brand-discont text-sm bg-red-100 px-2 rounded-full">
                      {product.discount}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tablet/Desktop: Grid view */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="flex flex-col">
            <div className="rounded-xl overflow-hidden mb-4 bg-gray-50">
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="h-auto w-full object-contain"
              />
            </div>
            <h3 className="text-md font-semibold mb-1">{product.name}</h3>

            {/* Ratings */}
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
              <span className="ml-2 text-brand-gray">{product.rating}/5</span>
            </div>

            {/* Prices */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">
                {isClient
                  ? convertToCurrency(product.price)
                  : `${language === 'pt' ? 'R$' : '$'} ${product.price}`}
              </span>
              {product.oldPrice && (
                <>
                  <span className="line-through text-brand-old">
                    {isClient
                      ? convertToCurrency(product.oldPrice)
                      : `${language === 'pt' ? 'R$' : '$'} ${product.oldPrice}`}
                  </span>
                  <span className="text-brand-discont text-sm bg-red-100 px-2 rounded-full">
                    {product.discount}
                  </span>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button className="border border-black px-6 py-2 rounded-full text-black hover:bg-black hover:text-white transition">
          View All
        </button>
      </div>
    </section>
  );
}
