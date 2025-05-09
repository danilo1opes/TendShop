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
  const [selectedSizes, setSelectedSizes] = useState(['medium', 'large']);
  const [selectedColors, setSelectedColors] = useState(['#2E86DE']);
  const [priceRange, setPriceRange] = useState([50, 200]);

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
    {
      rating: 5.0,
      price: 212,
      oldPrice: 232,
      discount: '30%',
      name: t('selling_name1'),
      image: '/images/selling/vertical.jpg',
    },
    {
      rating: 4.0,
      price: 145,
      name: t('selling_name2'),
      image: '/images/selling/courage.jpg',
    },
    {
      rating: 3.0,
      price: 80,
      name: t('selling_name3'),
      image: '/images/selling/Loose.jpg',
    },
  ];

  // Filter categories for sidebar
  const categories = [
    { name: t('filters_one'), slug: 't-shirts' },
    { name: t('filters_two'), slug: 'shorts' },
    { name: t('filters_three'), slug: 'shirts' },
    { name: t('filters_four'), slug: 'hoodie' },
    { name: t('filters_five'), slug: 'jeans' },
  ];

  // Style categories
  const styleCategories = [
    { name: t('style_one'), slug: 'casual' },
    { name: t('style_two'), slug: 'formal' },
    { name: t('style_three'), slug: 'party' },
    { name: t('style_four'), slug: 'gym' },
  ];

  // Available colors
  const colors = [
    { color: '#60D669', name: 'Green' },
    { color: '#E74C3C', name: 'Red' },
    { color: '#F1C40F', name: 'Yellow' },
    { color: '#F39C12', name: 'Orange' },
    { color: '#5DADE2', name: 'Light Blue' },
    { color: '#2E86DE', name: 'Blue', selected: true },
    { color: '#8E44AD', name: 'Purple' },
    { color: '#E91E63', name: 'Pink' },
    { color: '#FFF', name: 'White' },
    { color: '#000', name: 'Black' },
  ];

  // Available sizes
  const sizes = [
    { name: t('sizes_filter.XX-Small'), slug: 'xx-small' },
    { name: t('sizes_filter.X-Small'), slug: 'x-small' },
    { name: t('sizes_filter.Small'), slug: 'small' },
    { name: t('sizes_filter.Medium'), slug: 'medium', selected: true },
    { name: t('sizes_filter.Large'), slug: 'large', selected: true },
    { name: t('sizes_filter.X-Large'), slug: 'x-large' },
    { name: t('sizes_filter.XX-Large'), slug: 'xx-large' },
    { name: t('sizes_filter.3X-Large'), slug: '3x-large' },
    { name: t('sizes_filter.4X-Large'), slug: '4x-large' },
  ];

  const toggleSize = (slug: string) => {
    if (selectedSizes.includes(slug)) {
      setSelectedSizes(selectedSizes.filter((item) => item !== slug));
    } else {
      setSelectedSizes([...selectedSizes, slug]);
    }
  };

  // Handle color selection
  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((item) => item !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  // Handle price range changes
  const handleMinPriceChange = (e: { target: { value: string } }) => {
    const value = parseFloat(e.target.value);
    if (value < priceRange[1]) {
      setPriceRange([value, priceRange[1]]);
    }
  };

  const handleMaxPriceChange = (e: { target: { value: string } }) => {
    const value = parseFloat(e.target.value);
    if (value > priceRange[0]) {
      setPriceRange([priceRange[0], value]);
    }
  };

  return (
    <div className="container mx-auto">
      {/* Breadcrumb Navigation */}
      <div className="px-4 md:px-0">
        <p className="text-sm text-brand-400 py-4">
          <span className="text-brand-400">{t('casual_home')}</span> &gt;{' '}
          <span className="text-brand-primary font-light">
            {t('casual_sub')}
          </span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Desktop Sidebar - Hidden on Mobile */}
        <div className="hidden md:block md:w-64">
          <div className="border border-brand-border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg">{t('filters')}</h2>
              <Image
                src="/icon/filter.svg"
                alt={t('filters')}
                width={18}
                height={18}
              />
            </div>

            {/* Categories */}
            {categories.map((category) => (
              <div
                key={category.slug}
                className="py-2 border-b border-brand-border cursor-pointer"
              >
                <div className="flex justify-between items-center">
                  <span className="text-brand-seven">{category.name}</span>
                  <Image
                    src="/icon/set-right.svg"
                    alt="Right"
                    width={8}
                    height={8}
                  />
                </div>
              </div>
            ))}

            {/* Price Filter */}
            <div className="py-4 border-b border-brand-border">
              <h3 className="font-semibold mb-3 flex justify-between items-center">
                <span>{t('filters_price')}</span>
                <Image
                  src="/icon/set-right.svg"
                  alt="Expand"
                  width={8}
                  height={8}
                  className="transform rotate-90"
                />
              </h3>

              <div className="px-1">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>

                <div className="mt-4 mb-6 h-1 bg-brand-muted rounded-full relative">
                  {/* Progress bar between the two points */}
                  <div
                    className="absolute h-1 bg-brand-primary rounded-full"
                    style={{
                      left: `${((priceRange[0] - 50) / 150) * 100}%`,
                      right: `${100 - ((priceRange[1] - 50) / 150) * 100}%`,
                    }}
                  ></div>

                  {/* Minimum slider control */}
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={priceRange[0]}
                    onChange={handleMinPriceChange}
                    className="absolute w-full top-0 h-1 appearance-none bg-transparent cursor-pointer price-range-slider"
                    style={{ zIndex: 20 }}
                  />

                  {/* Maximum slider control */}
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={priceRange[1]}
                    onChange={handleMaxPriceChange}
                    className="absolute w-full top-0 h-1 appearance-none bg-transparent cursor-pointer price-range-slider"
                    style={{ zIndex: 20 }}
                  />

                  {/* Visual indicators */}
                  <div
                    className="absolute w-4 h-4 bg-brand-primary rounded-full -top-1.5 cursor-grab"
                    style={{
                      left: `calc(${
                        ((priceRange[0] - 50) / 150) * 100
                      }% - 8px)`,
                      zIndex: 30,
                    }}
                  ></div>
                  <div
                    className="absolute w-4 h-4 bg-brand-primary rounded-full -top-1.5 cursor-grab"
                    style={{
                      right: `calc(${
                        100 - ((priceRange[1] - 50) / 150) * 100
                      }% - 8px)`,
                      zIndex: 30,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Colors */}
            <div className="py-4 border-b border-brand-border">
              <h3 className="font-semibold mb-3 flex justify-between items-center">
                <span>{t('filters_color')}</span>
                <Image
                  src="/icon/set-right.svg"
                  alt="Expand"
                  width={8}
                  height={8}
                  className="transform rotate-90"
                />
              </h3>

              <div className="flex flex-wrap gap-2">
                {colors.map((color, idx) => (
                  <div
                    key={idx}
                    className={`w-8 h-8 rounded-full cursor-pointer ${
                      color.color === '#FFF' ? 'border border-brand-border' : ''
                    }`}
                    style={{ backgroundColor: color.color }}
                    onClick={() => toggleColor(color.color)}
                  >
                    {selectedColors.includes(color.color) && (
                      <div className="flex items-center justify-center h-full">
                        <Image
                          src={
                            color.color === '#FFF' || color.color === '#F1C40F'
                              ? '/icon/checked-black.svg'
                              : '/icon/checked-white.svg'
                          }
                          alt="Selected"
                          width={12}
                          height={12}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="py-4 border-b border-brand-border">
              <h3 className="font-semibold mb-3 flex justify-between items-center">
                <span>{t('filters_size')}</span>
                <Image
                  src="/icon/set-right.svg"
                  alt="Expand"
                  width={8}
                  height={8}
                  className="transform rotate-90"
                />
              </h3>

              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size.slug}
                    onClick={() => toggleSize(size.slug)}
                    className={`px-3 py-1 text-xs rounded-full border transition ${
                      selectedSizes.includes(size.slug)
                        ? 'bg-brand-primary text-brand-white'
                        : 'bg-brand-50 text-brand-seven'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Dress Style */}
            <div className="py-4 border-b border-brand-border">
              <h3 className="font-semibold mb-3 flex justify-between items-center">
                <span>{t('filter_style')}</span>
                <Image
                  src="/icon/set-right.svg"
                  alt="Expand"
                  width={8}
                  height={8}
                  className="transform rotate-90"
                />
              </h3>

              {styleCategories.map((style) => (
                <div key={style.slug} className="py-2 cursor-pointer">
                  <div className="flex justify-between items-center">
                    <span className="text-brand-seven">{style.name}</span>
                    <Image
                      src="/icon/set-right.svg"
                      alt="Right"
                      width={8}
                      height={8}
                    />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full bg-brand-primary text-white py-3 rounded-full text-sm mt-4">
              {t('applyFilter')}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Header */}
          <div className="md:hidden px-4">
            <div className="flex items-center justify-between py-4">
              <div>
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
                <Image
                  src="/icon/filter.svg"
                  alt={t('filters')}
                  width={20}
                  height={20}
                />
              </button>
            </div>
          </div>

          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center mb-6">
            <div>
              <div className="flex gap-2 items-center">
                <h1 className="text-2xl font-bold">{t('casual_sub')}</h1>
                <p className="inline text-gray-500 font-normal text-base">
                  {t('casual_p')}
                </p>
              </div>
            </div>
          </div>

          {/* Products Grid - Mobile */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 px-4 md:hidden">
            {products.slice(0, 6).map((product, index) => (
              <div key={index}>
                <div className="rounded-xl overflow-hidden mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={200}
                    height={200}
                    className="h-auto w-full"
                  />
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
                  <div className="flex justify-center items-center gap-4">
                    <span className="ml-2 text-brand-gray">
                      {product.rating}/5
                    </span>
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

          {/* Products Grid - Desktop */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {products.map((product, index) => (
              <div key={index} className="cursor-pointer">
                <div className="rounded-xl overflow-hidden mb-4 relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-brand-discont text-white text-xs px-2 py-1 rounded">
                      {product.discount}
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                  {product.name}
                </h3>
                {/* Ratings */}
                <div className="flex items-center text-sm mb-1">
                  {Array.from({ length: 5 }, (_, i) => {
                    const rating = product.rating;
                    const full = i + 1 <= Math.floor(rating);
                    const half = !full && i + 0.5 <= rating;

                    if (full) {
                      return (
                        <span key={i} className="w-4 h-4 mr-1">
                          <Image
                            src="/icon/rating.svg"
                            alt={t('rating_star')}
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                        </span>
                      );
                    }

                    if (half) {
                      return (
                        <span key={i} className="w-4 h-4 mr-1">
                          <Image
                            src="/icon/rating-half.svg"
                            alt={t('rating_star_half')}
                            width={16}
                            height={16}
                            className="w-4 h-4"
                          />
                        </span>
                      );
                    }

                    // Does not render anything if it is not full or half (empty)
                    return null;
                  })}
                  <span className="ml-2 text-brand-gray">
                    {product.rating}/5
                  </span>
                </div>

                {/* Prices */}
                <div className="flex items-center gap-2">
                  <span className="font-bold text-lg">
                    {isClient
                      ? convertToCurrency(product.price, i18n.language)
                      : product.price}
                  </span>
                  {product.oldPrice && (
                    <span
                      className={`line-through text-brand-old ${
                        i18n.language === 'pt' ? 'text-xs' : 'text-sm'
                      }`}
                    >
                      {isClient
                        ? convertToCurrency(product.oldPrice, i18n.language)
                        : product.oldPrice}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer base - Mobile */}
          <div className="flex justify-center items-center gap-2 py-6 border-t mt-10 md:hidden px-4">
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

          {/* Footer base - Desktop */}
          <div className="hidden md:flex justify-center items-center gap-2 py-6 border-t mt-10">
            {/* Previous */}
            <button className="flex items-center gap-1 border px-3 py-1 rounded-full hover:bg-brand-muted transition">
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm">{t('previous')}</span>
            </button>

            {/* Page numbers */}
            <span className="w-8 h-8 flex items-center justify-center rounded-md bg-brand-55 font-semibold text-sm">
              1
            </span>
            <span className="w-8 h-8 flex items-center justify-center text-sm text-gray-500 hover:bg-brand-muted rounded-md cursor-pointer">
              2
            </span>
            <span className="text-sm text-gray-500">...</span>
            <span className="w-8 h-8 flex items-center justify-center text-sm text-gray-500 hover:bg-brand-muted rounded-md cursor-pointer">
              9
            </span>
            <span className="w-8 h-8 flex items-center justify-center text-sm text-gray-500 hover:bg-brand-muted rounded-md cursor-pointer">
              10
            </span>

            {/* Next */}
            <button className="flex items-center gap-1 border px-3 py-1 rounded-full hover:bg-brand-muted transition">
              <span className="text-sm">{t('next')}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </div>
  );
}
