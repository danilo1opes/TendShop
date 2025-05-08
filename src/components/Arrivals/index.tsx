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
    <section className="bg-brand-white py-10 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">New Arrivals</h2>

      <div className="overflow-x-auto">
        <div className="flex gap-4 w-max">
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
              <h3 className="text-md font-semibold mb-1">{product.name}</h3>

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
                    <span className="text-brand-discont text-sm">
                      {product.discount}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-8">
        <button className="border px-6 py-2 rounded-full text-black hover:bg-black hover:text-white transition">
          View All
        </button>
      </div>
    </section>
  );
}
