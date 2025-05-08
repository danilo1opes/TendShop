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
  const image = ['/homens/htwo.png', '/homens/hthree.png'];
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
      rating: 5,
      date: 'August 14, 2023',
    },
    {
      name: 'Alex M.',
      review: t('review_two'),
      rating: 4,
      date: 'August 15, 2023',
    },
    {
      name: 'Ethan R.',
      review: t('review_three'),
      rating: 5,
      date: 'August 16, 2023',
    },
    {
      name: 'Olivia P.',
      review: t('review_four'),
      rating: 4,
      date: 'August 17, 2023',
    },
    {
      name: 'Liam K.',
      review: t('review_five'),
      rating: 4,
      date: 'August 18, 2023',
    },
    {
      name: 'Ava H.',
      review: t('review_six'),
      rating: 4,
      date: 'August 19, 2023',
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
    <section className="max-w-6xl mx-auto">
      {/* Breadcrumb - Desktop only */}
      <div className="hidden md:flex items-center gap-2 py-4 px-4 text-sm">
        <span className="text-brand-gray">{t('casual_home')}</span>
        <span className="text-brand-gray">&gt;</span>
        <span className="text-brand-gray">{t('shop')}</span>
        <span className="text-brand-gray">&gt;</span>
        <span>{t('shop_man')}</span>
      </div>

      {/* Product Display Section */}
      <div className="md:flex md:gap-8 md:px-4">
        {/* Left Column - Images */}
        <div className="md:w-1/2">
          <div className="flex flex-col items-center gap-6 p-4 md:p-0">
            {/* Main Image */}
            <div className="w-full">
              <img
                src={imagemSelecionada || '/homens/principal.jpg'}
                alt="Camiseta"
                className="w-full object-contain rounded-xl"
              />
            </div>

            {/* Thumbnail Images */}
            <div className="flex gap-4 md:gap-4">
              <button
                onClick={() => setImagemSelecionada('/homens/principal.jpg')}
                className={`rounded-[20px] overflow-hidden transition-all duration-200 ${
                  imagemSelecionada === '/homens/principal.jpg'
                    ? 'ring-2 ring-brand-primary'
                    : ''
                }`}
              >
                <div className="bg-brand-white rounded-[18px] p-1">
                  <img
                    src="/homens/principal.jpg"
                    alt="Miniatura 1"
                    className="w-24 h-24 md:w-32 md:h-32 object-cover"
                  />
                </div>
              </button>
              {image.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setImagemSelecionada(img)}
                  className={`rounded-[20px] overflow-hidden transition-all duration-200 ${
                    imagemSelecionada === img ? 'ring-2 ring-black' : ''
                  }`}
                >
                  <div className="bg-brand-white rounded-[18px] p-1">
                    <img
                      src={img}
                      alt={`Miniatura ${index + 2}`}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Product Details */}
        <div className="md:w-1/2">
          <div className="py-6 px-4 md:p-0 md:pt-4">
            <h2 className="text-2xl md:text-3xl font-bold text-start mb-4">
              {t('mens_title')}
            </h2>

            {/* Ratings */}
            {tshirt.map((shirt, index) => (
              <div key={index}>
                {/* Ratings */}
                <div className="flex items-center text-sm mb-3">
                  {Array.from({ length: 5 }, (_, i) => {
                    const full = i + 1 <= Math.floor(shirt.rating);
                    const half =
                      i + 1 === Math.ceil(shirt.rating) &&
                      !Number.isInteger(shirt.rating);

                    return (
                      <span key={i} className="w-4 h-4 mr-1">
                        {full ? (
                          <Image
                            src="/icon/rating.svg"
                            alt={t('rating_star')}
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                        ) : half ? (
                          <Image
                            src="/icon/rating-half.svg"
                            alt={t('rating_star')}
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                        ) : (
                          <span className="w-4 h-4 block"></span>
                        )}
                      </span>
                    );
                  })}

                  <p className="ml-1">
                    {shirt.rating}
                    <span className="text-brand-gray">/5</span>
                  </p>
                </div>

                {/* Prices */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="font-bold text-xl md:text-2xl">
                    {isClient
                      ? convertToCurrency(shirt.price)
                      : `${language === 'pt' ? 'R$' : '$'} ${shirt.price}`}
                  </span>
                  {shirt.oldPrice && (
                    <>
                      <span className="line-through text-brand-old">
                        {isClient
                          ? convertToCurrency(shirt.oldPrice)
                          : `${language === 'pt' ? 'R$' : '$'} ${
                              shirt.oldPrice
                            }`}
                      </span>
                      <span className="text-white bg-brand-199 px-2 py-0.5 rounded-md text-xs">
                        {shirt.discount}
                      </span>
                    </>
                  )}
                </div>

                {/* Product Description */}
                <p className="text-brand-sixteen mb-6">{t('mens_small')}</p>
              </div>
            ))}

            {/* Color section */}
            <div className="mb-6">
              <h6 className="text-base font-medium mb-2 text-brand-eight">
                {t('selected_color')}
              </h6>
              <div className="flex gap-4">
                {['#5B4E2E', '#34574C', '#2F314D'].map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(index)}
                    className={`w-10 h-10 mt-2 rounded-full flex items-center justify-center transition-all duration-200 border-2 ${
                      selectedColor === index
                        ? 'border-brand-primary'
                        : 'border-transparent'
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
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <h6 className="text-base font-medium mb-2 text-brand-eight">
                {t('choose_size')}
              </h6>
              <div className="flex gap-4">
                {sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-full transition-all duration-200 font-medium ${
                      selectedSize === size
                        ? 'bg-brand-primary text-brand-white'
                        : 'bg-brand-muted text-brand-primary'
                    }`}
                  >
                    {t(`sizes.${size}`)}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mt-8">
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

              <button className="flex-1 bg-brand-white text-brand-white rounded-full py-3 font-semibold text-center transition-all duration-200 hover:opacity-90">
                {t('add_cart')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16 px-4 md:px-0">
        <div className="border-b border-brand-border flex justify-center md:justify-start gap-8 items-center mb-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`relative py-2 text-sm font-medium transition-colors duration-200 ${
                tab === activeTab ? 'text-brand-primary' : 'text-brand-60'
              }`}
            >
              {tab}
              {tab === activeTab && (
                <span className="absolute left-0 -bottom-px w-full h-[2px] bg-brand-primary rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Reviews Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h3 className="text-lg sm:text-xl font-bold">
            {t('all_reviews')}
            <span className="text-brand-gray text-sm font-medium"> (451)</span>
          </h3>

          <div className="flex items-center gap-3 sm:gap-4">
            <button className="p-2 bg-brand-border rounded-md">
              <Image
                src="/icon/filter.svg"
                alt="Filter"
                width={20}
                height={20}
              />
            </button>

            <div className="relative w-[140px] sm:w-auto">
              <select className="w-full appearance-none bg-gray-100 rounded-md pl-3 pr-8 py-2 text-sm">
                <option>{t('option_one')}</option>
                <option>{t('option_two')}</option>
                <option>{t('option_three')}</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
                <Image
                  src="/icon/set-right.svg"
                  alt="Arrow"
                  width={8}
                  height={8}
                />
              </div>
            </div>

            <button className="bg-brand-primary text-brand-white px-4 py-2 rounded-full text-sm whitespace-nowrap">
              {t('write_review')}
            </button>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {reviews.slice(0, 6).map((review, index) => (
            <div
              key={index}
              className="bg-white border border-brand-border rounded-xl p-4 relative"
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
                    src="/icon/rating-half.svg"
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
              <p className="text-xs text-brand-60">
                {t('posted')} {review.date}
              </p>

              {/* Three dots menu */}
              <button className="absolute top-4 right-4">
                <svg
                  width="16"
                  height="4"
                  viewBox="0 0 16 4"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="2" cy="2" r="2" fill="#D9D9D9" />
                  <circle cx="8" cy="2" r="2" fill="#D9D9D9" />
                  <circle cx="14" cy="2" r="2" fill="#D9D9D9" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mb-16">
          <button className="border border-gray-300 px-6 py-2 rounded-full text-brand-primary hover:bg-brand-muted transition">
            {t('load_more_reviews')}
          </button>
        </div>
      </div>

      {/* You Might Also Like Section */}
      <div className="px-4 md:px-0 mt-10 mb-20">
        <h2 className="text-2xl font-extrabold tracking-wide mb-8 text-center uppercase">
          {t('more_items')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Product 1 */}
          <div className="product-card">
            <div className="rounded-xl overflow-hidden mb-4">
              <img
                src="/homens/moreItem1.jpg"
                alt={t('textItems_one')}
                className="w-full h-auto"
              />
            </div>
            <h3 className="text-md font-semibold mb-1">{t('textItems_one')}</h3>
            <div className="flex items-center text-sm mb-1">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <Image
                    key={star}
                    src="/icon/rating.svg"
                    alt="Star"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                ))}
              </div>
              <div className=" flex items-center gap-4">
                <span className="ml-2 text-brand-gray">4.0/5</span>
                <span className="text-xs text-brand-199">-20%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{convertToCurrency(212)}</span>
              <span className="line-through text-brand-60">
                {convertToCurrency(242)}
              </span>
            </div>
          </div>

          {/* Product 2 */}
          <div className="product-card">
            <div className="rounded-xl overflow-hidden mb-4">
              <img
                src="/homens/moreItem2.jpg"
                alt={t('textItems_two')}
                className="w-full h-auto"
              />
            </div>
            <h3 className="text-md font-semibold mb-1">{t('textItems_two')}</h3>
            <div className="flex items-center text-sm mb-1">
              <div className="flex">
                {[1, 2, 3].map((star) => (
                  <Image
                    key={star}
                    src="/icon/rating.svg"
                    alt="Star"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                ))}
                <Image
                  src="/icon/rating-half.svg"
                  alt="Half Star"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </div>
              <span className="ml-2 text-brand-gray">3.5/5</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{convertToCurrency(145)}</span>
            </div>
          </div>

          {/* Product 3 */}
          <div className="product-card">
            <div className="rounded-xl overflow-hidden mb-4">
              <img
                src="/homens/moreItem1.jpg"
                alt={t('casual_two')}
                className="w-full h-auto"
              />
            </div>
            <h3 className="text-md font-semibold mb-1">{t('casual_two')}</h3>
            <div className="flex items-center text-sm mb-1">
              <div className="flex">
                {[1, 2, 3, 4].map((star) => (
                  <Image
                    key={star}
                    src="/icon/rating.svg"
                    alt="Star"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                ))}
                <Image
                  src="/icon/rating-half.svg"
                  alt="Half Star"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                />
              </div>
              <span className="ml-2 text-brand-gray">4.5/5</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{convertToCurrency(180)}</span>
            </div>
          </div>

          {/* Product 4 */}
          <div className="product-card">
            <div className="rounded-xl overflow-hidden mb-4">
              <img
                src="/images/arrivals/sleeve.png"
                alt={t('arrivals_name4')}
                className="w-full h-auto"
              />
            </div>
            <h3 className="text-md font-semibold mb-1">
              {t('arrivals_name4')}
            </h3>
            <div className="flex items-center text-sm mb-1">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Image
                    key={star}
                    src="/icon/rating.svg"
                    alt="Star"
                    width={16}
                    height={16}
                    className="w-4 h-4"
                  />
                ))}
              </div>
              <div className="flex items-center gap-4">
                <span className="ml-2 text-brand-gray">5.0/5</span>
                <span className="text-xs text-brand-199">-20%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold">{convertToCurrency(120)}</span>
              <span className="line-through text-brand-60">
                {convertToCurrency(150)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
