'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslation } from '../../hook/useTranslation';

export default function Customers() {
  const [current, setCurrent] = useState(0);
  const { t } = useTranslation();

  const witnesses = [
    {
      name: 'Sara M.',
      review: t('review_one'),
      rating: 5,
    },
    {
      name: 'Alex K.',
      review: t('review_two'),
      rating: 5,
    },
    {
      name: 'James L.',
      review: t('review_three'),
      rating: 5,
    },
    {
      name: 'Samantha D.',
      review: t('review_four'),
      rating: 5,
    },
    {
      name: 'Leon K.',
      review: t('review_five'),
      rating: 5,
    },
    {
      name: 'Laura Beatriz',
      review: t('review_six'),
      rating: 5,
    },
    {
      name: 'Mary L.',
      review: t('review_seven'),
      rating: 5,
    },
    {
      name: 'Aurora L.',
      review: t('review_eigth'),
      rating: 5,
    },
  ];

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? witnesses.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrent((prev) => (prev === witnesses.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 px-4 max-w-2xl mx-auto mb-20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl uppercase font-extrabold mb-8 leading-tight">
          {t('title_customers')
            .split('\n')
            .map((line, index) => (
              <span key={index}>
                {line} <br />
              </span>
            ))}
        </h2>

        <button onClick={handlePrev} className="text-2xl">
          <Image
            src="/icon/arrow-left.svg"
            alt="Arrow Left"
            width={30}
            height={30}
          />
        </button>
        <button onClick={handleNext} className="text-2xl">
          <Image
            src="/icon/arrow-right.svg"
            alt="Arrow Left"
            width={30}
            height={30}
          />
        </button>
      </div>

      <div className="bg-brand-white p-6 rounded-2xl shadow-md border-brand-border">
        <div className="flex items-center space-x-1 mb-2">
          {Array(witnesses[current].rating)
            .fill(null)
            .map((_, i) => (
              <Image
                key={i}
                src="icon/rating.svg"
                alt=""
                width={20}
                height={20}
              />
            ))}
        </div>
        <div className="flex items-center mb-2 space-x-2">
          <p className="text-lg font-semibold">{witnesses[current].name}</p>
          <Image src="/icon/checked.svg" alt="" width={18} height={18} />
        </div>
        <p className="text-[16px] leading-relaxed text-brand-sixteen">
          {witnesses[current].review}
        </p>
      </div>
    </section>
  );
}
