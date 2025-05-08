'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from '../../hook/useTranslation';
import Image from 'next/image';

export default function Selling() {
  const { t, i18n } = useTranslation();
  const [usdToBrl, setUsdToBrl] = useState(5.2);
  const language = i18n.language;
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
      nameSelling: t('selling_name1'),
      imageSelling: '/images/selling/Vertical.jpg',
      rating: 5,
      price: 212,
      oldPrice: 232,
      discount: '-20%',
    },
    {
      nameSelling: t('selling_name2'),
      imageSelling: '/images/selling/Courage.jpg',
      rating: 4,
      price: 145,
    },
    {
      nameSelling: t('selling_name3'),
      imageSelling: '/images/selling/Loose.jpg',
      rating: 3,
      price: 80,
    },
    {
      nameSelling: t('selling_name4'),
      imageSelling: '/images/selling/Faded.jpg',
      rating: 4.5,
      price: 210,
    },
  ];

  return (
    <section className="bg-brand-white py-1 px-4">
      <div className="border-t mb-8 bg-brand-gray w-[90%] mx-auto" />
      <div>
        <h2 className="text-3xl font-bold text-center mb-8">{t('selling')}</h2>

        {/* Products */}
        <div className="overflow-x-auto">
          <div className="flex gap-4 w-max">
            {products.map((product, index) => {
              return (
                <div key={index} className="rounded-lg overflow-hidden mb-4">
                  <Image
                    src={product.imageSelling}
                    alt={product.nameSelling}
                    width={200}
                    height={200}
                    className="h-auto"
                  ></Image>
                  <h3>{product.nameSelling}</h3>

                  {/* Ratings */}
                  <div>
                    <div className="flex item-center text-sm mb-1">
                      {Array.from({ length: 5 }, (_, i) => {
                        const full = i + 1 <= Math.floor(product.rating);
                        const half = i + 0.5 === product.rating;

                        return (
                          <span key={i} className="w-4 h-4 mr-1">
                            {(full || half) && (
                              <Image
                                src={
                                  full
                                    ? '/icon/rating.svg'
                                    : '/icon/rating-half.svg'
                                }
                                alt={t('rating_star')}
                                width={16}
                                height={16}
                                className="w-4 h-4"
                              ></Image>
                            )}
                          </span>
                        );
                      })}
                      <span className="ml-2 text-brand-gray">
                        {product.rating}/5
                      </span>
                    </div>

                    {/* Prices */}
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg">
                        {isClient
                          ? convertToCurrency(product.price)
                          : `${language === 'pt' ? 'R$' : '$'} ${
                              product.price
                            }`}
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
                </div>
              );
            })}
          </div>
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
