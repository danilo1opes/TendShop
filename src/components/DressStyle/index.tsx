'use client';

import { useTranslation } from '../../hook/useTranslation';
import Image from 'next/image';

export default function DressStyle() {
  const { t } = useTranslation();

  const dressStyles = [
    { title: t('image_one'), image: '/images/dress/casual.png' },
    { title: t('image_two'), image: '/images/dress/formal.png' },
    { title: t('image_three'), image: '/images/dress/party.png' },
    { title: t('image_four'), image: '/images/dress/gym.png' },
  ];

  return (
    <section className="bg-brand-muted px-4 py-8 md:py-10 rounded-2xl mx-auto max-w-7xl">
      <h2 className="text-center text-3xl font-black uppercase mb-6 md:mb-8">
        {t('dressStyle')}
      </h2>

      {/* Desktop Layout - 2x2 Grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl overflow-hidden flex">
          <div className="flex-1 flex items-center">
            <h3 className="text-2xl font-medium pl-8">
              {dressStyles[0].title}
            </h3>
          </div>
          <div className="w-1/2 relative">
            <Image
              src={dressStyles[0].image}
              alt={dressStyles[0].title}
              width={300}
              height={180}
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden flex">
          <div className="flex-1 flex items-center">
            <h3 className="text-2xl font-medium pl-8">
              {dressStyles[1].title}
            </h3>
          </div>
          <div className="w-1/2 relative">
            <Image
              src={dressStyles[1].image}
              alt={dressStyles[1].title}
              width={300}
              height={180}
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden flex">
          <div className="flex-1 flex items-center">
            <h3 className="text-2xl font-medium pl-8">
              {dressStyles[2].title}
            </h3>
          </div>
          <div className="w-1/2 relative">
            <Image
              src={dressStyles[2].image}
              alt={dressStyles[2].title}
              width={300}
              height={180}
              className="object-cover h-full w-full"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl overflow-hidden flex">
          <div className="flex-1 flex items-center">
            <h3 className="text-2xl font-medium pl-8">
              {dressStyles[3].title}
            </h3>
          </div>
          <div className="w-1/2 relative">
            <Image
              src={dressStyles[3].image}
              alt={dressStyles[3].title}
              width={300}
              height={180}
              className="object-cover h-full w-full"
            />
          </div>
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="space-y-4 md:hidden">
        {dressStyles.map((style, index) => (
          <div
            key={index}
            className="w-full bg-brand-white rounded-[30px] overflow-hidden shadow-sm flex"
          >
            <div className="flex-1 flex items-start pt-8 ml-8">
              <span className="text-[24px] font-medium leading-none">
                {style.title}
              </span>
            </div>
            <div className="w-[300px] h-[250px] relative">
              <Image
                src={style.image}
                alt={style.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
