'use client';

import i18n from '../../../utils/i18n';
import { useTranslation } from '../../../hook/useTranslation';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function MensPage() {
  {
    /* Transalation*/
  }
  const { t } = useTranslation();
  const language = i18n.language;

  {
    /* Selection of Shirts */
  }
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Large');
  const sizes = ['small', 'medium', 'large', 'xlarge'];
  const [quantity, setQuantity] = useState(1);
  const image = ['/homens/htwo.jpg', '/homens/hthree.jpg'];
  const [imagemSelecionada, setImagemSelecionada] = useState(image[0]);
  const tshirt = [
    {
      rating: 4.5,
      price: 260,
      oldPrice: 300,
      discount: '-40%',
      smallText: t('mens_small'),
    },
  ];

  {
    /* More Items */
  }

  const moreItems = [
    {
      rating: 4,
      price: 212,
      oldPrice: 242,
      discount: '20%',
      smallText: t('textItems_one'),
      image: '/homens/moreItem1.jpg',
    },
    {
      rating: 3.5,
      price: 145,
      smallText: t('textItems_two'),
      image: '/homens/moreItem2.jpg',
    },
  ];

  {
    /* All reviews */
  }
  const tabs = [t('product_details'), t('review_rating'), t('faqs')];
  const activeTab = t('review_rating');
  const reviews = [
    {
      name: 'Samantha D.',
      review: t('review_one'),
      rating: 4.5,
      date: 'August 14, 2023',
    },
    {
      name: 'Alex M.',
      review: t('review_two'),
      rating: 5,
      date: 'August 15, 2023',
    },
    {
      name: 'Ethan R.',
      review: t('review_three'),
      rating: 4.5,
      date: 'August 16, 2023',
    },
  ];

  {
    /* BRL \ USD */
  }

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

  return (
    <section>
      <div className="flex flex-col items-center gap-6 p-4">
        <div>
          <img
            src="/homens/principal.jpg"
            alt="Camiseta"
            className="w-full object-contain rounded-xl"
          />
        </div>

        {/* Division Shirt's */}
        <div className="flex gap-8">
          {image.map((img, index) => (
            <button
              key={index}
              onClick={() => setImagemSelecionada(img)}
              className={`rounded-[20px] overflow-hidden transition-all duration-200 ${
                imagemSelecionada === img ? 'ring-2 ring-black' : ''
              }`}
            >
              <div className="bg-white rounded-[18px] p-1">
                <img
                  src={img}
                  alt={`Miniatura ${index + 1}`}
                  className="w-32 h-32 object-cover"
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="py-10 px-4">
        <h2 className="text-3xl font-bold text-start mb-8">
          {t('mens_title')}
        </h2>

        {/* Ratings */}
        {tshirt.map((shirt, index) => (
          <div key={index}>
            {/* Ratings */}
            <div className="flex items-center text-sm mb-1">
              {Array.from({ length: 5 }, (_, i) => {
                const full = i + 1 <= Math.floor(shirt.rating);
                const half = i + 1 === shirt.rating;

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

              <p>
                {shirt.rating}
                <span className="text-brand-gray">/5</span>
              </p>
            </div>

            {/* Prices */}
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg">
                {isClient
                  ? convertToCurrency(shirt.price)
                  : `${language === 'pt' ? 'R$' : '$'} ${shirt.price}`}
              </span>
              {shirt.oldPrice && (
                <>
                  <span className="line-through text-brand-old">
                    {isClient
                      ? convertToCurrency(shirt.oldPrice)
                      : `${language === 'pt' ? 'R$' : '$'} ${shirt.oldPrice}`}
                  </span>
                  <span className="text-brand-discont text-sm">
                    {shirt.discount}
                  </span>
                </>
              )}
            </div>
            <p className="mt-2 text-brand-gray">{t('mens_small')}</p>
          </div>
        ))}
      </div>

      {/* Color section */}

      <div className="mt-2 px-4">
        <hr className="border-t mb-8 bg-brand-gray w-[100%] mx-auto" />
        <h6 className="text-base font-nunito mb-2 font-medium text-brand-select">
          {t('selected_color')}
        </h6>
        <div className="flex gap-4">
          {['#5B4E2E', '#34574C', '#2F314D'].map((color, index) => (
            <button
              key={index}
              onClick={() => setSelectedColor(index)}
              className={`w-10 h-10 mt-2 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${
                selectedColor === index ? 'border-black' : 'border-transparent'
              }`}
              style={{ backgroundColor: color }}
            >
              {selectedColor === index && (
                <Image
                  src="/icon/checked-white.svg"
                  width={15}
                  height={15}
                  alt=""
                />
              )}
            </button>
          ))}
        </div>

        {/* Divider + Size Selection */}
        <hr className="border-t mb-8 mt-8 bg-brand-gray w-[100%] mx-auto" />
        <h6 className="text-base font-nunito mb-2 font-medium text-brand-select">
          {t('choose_size')}
        </h6>
      </div>
      <div className="flex gap-4 px-4">
        {sizes.map((size, index) => (
          <button
            key={index}
            onClick={() => setSelectedSize(size)}
            className={`px-4 mt-2 py-2 rounded-full transition-all duration-200 font-medium ${
              selectedSize === size
                ? 'bg-black text-white'
                : 'bg-gray-200 text-black'
            }`}
          >
            {t(`sizes.${size}`)}
          </button>
        ))}
      </div>

      {/* Divider + Quantity and Add to Cart */}
      <hr className="border-t mb-8 mt-8 bg-brand-gray w-[93%] mx-auto" />
      <div className="flex items-center justify-between gap-4 px-4">
        <div className="flex items-center bg-gray-200 rounded-full px-4 py-2">
          <button
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            className="text-xl font-bold"
          >
            −
          </button>
          <span className="mx-4 font-medium">{quantity}</span>
          <button
            onClick={() => setQuantity((prev) => prev + 1)}
            className="text-xl font-bold"
          >
            +
          </button>
        </div>

        <button className="flex-1 bg-black text-white rounded-full py-3 font-semibold text-center transition-all duration-200 hover:opacity-90">
          {t('add_cart')}
        </button>
      </div>

      {/* Reviews */}
      <div className="border-b border-brand-border flex justify-between mt-10 items-center px-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
              tab === activeTab ? 'text-black' : 'text-gray-400'
            }`}
          >
            {tab}
            {tab === activeTab && (
              <span className="absolute left-0 -bottom-px w-full h-[2px] bg-black rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between mb-6 px-4 mt-10">
        <h3 className="text-xl font-bold white-space-pre-line">
          {t('all_reviews')}
          <span className="text-brand-gray text-sm font-medium"> (451)</span>
        </h3>
        <div className="flex items-center space-x-2">
          <button className="p-2 bg-brand-muted rounded-md">
            <Image src="/icon/filter.svg" alt="Filter" width={20} height={20} />
          </button>
          <button className="bg-brand-primary text-brand-white px-4 py-2 rounded-full text-sm">
            {t('write_review')}
          </button>
        </div>
      </div>

      <div className="px-4">
        {reviews.map((review, index) => (
          <div
            key={index}
            className="bg-white border border-brand-border rounded-xl p-4 mb-4"
          >
            <div className="flex items-center space-x-1 mb-2">
              {Array(Math.floor(review.rating))
                .fill(0)
                .map((_, i) => (
                  <Image
                    key={i}
                    src="/icon/rating.svg"
                    alt="Star"
                    width={18}
                    height={18}
                  />
                ))}
              {review.rating % 1 !== 0 && (
                <Image
                  src="/icon/rating.svg"
                  alt="Half Star"
                  width={18}
                  height={18}
                />
              )}
            </div>
            <div className="flex items-center mb-2 space-x-2">
              <p className="font-semibold">{review.name}</p>
              <Image
                src="/icon/checked.svg"
                alt="Verified"
                width={16}
                height={16}
              />
            </div>
            <p className="text-sm text-brand-seven mb-2">{review.review}</p>
            <p className="text-xs text-brand-400">Posted on {review.date}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button className="border px-6 py-2 rounded-full text-brand-primary hover:bg-brand-primary hover:text-brand-white transition">
          {t('load_more_reviews')}
        </button>
      </div>

      {/* More Items */}
      <div className="px-4 mt-10">
        <h1 className="text-2xl font-extrabold tracking-wide mb-6 text-center uppercase ">
          {t('more_items')}
        </h1>
        <div className="overflow-x-auto">
          <div className="flex gap-4 w-max">
            {moreItems.map((items, index) => (
              <div key={index}>
                <div className="rounded-xl overflow-hidden mb-4">
                  <Image
                    src={items.image}
                    alt={items.smallText}
                    width={200}
                    height={200}
                    className="h-auto"
                  ></Image>
                </div>
                <h3 className="text-md white-space-pre-line font-semibold mb-1">
                  {items.smallText}
                </h3>
                {/* Ratings and Prices */}
                <div className="flex items-center text-sm mb-1">
                  {Array.from({ length: 5 }, (_, i) => {
                    const full = i + 1 <= Math.floor(items.rating);
                    const half = i + 0.5 === items.rating;

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
                          />
                        )}
                      </span>
                    );
                  })}
                  <span className="ml-2 text-brand-gray">{items.rating}/5</span>
                </div>

                {/* Prices */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">
                    {isClient
                      ? convertToCurrency(items.price)
                      : `${language === 'pt' ? 'R$' : '$'} ${items.price}`}
                  </span>
                  {items.oldPrice && (
                    <>
                      <span className="line-through text-brand-old">
                        {isClient
                          ? convertToCurrency(items.oldPrice)
                          : `${language === 'pt' ? 'R$' : '$'} ${
                              items.oldPrice
                            }`}
                      </span>
                      <span className="text-brand-discont text-sm">
                        {items.discount}
                      </span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
