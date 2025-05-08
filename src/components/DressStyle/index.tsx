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
    <section className="bg-brand-muted mt-8 px-4 py-8 rounded-2xl max-w-sm mx-auto">
      <h2 className="text-center text-2xl font-extrabold uppercase mb-6 tracking-wide">
        {t('dressStyle')
          .split('\n')
          .map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
      </h2>

      <div className="space-y-4">
        {dressStyles.map((style, index) => (
          <div
            key={index}
            className="w-[350px] h-[250px] bg-brand-white rounded-[30px] overflow-hidden shadow-sm flex"
          >
            <div className="flex-1 flex items-start pt-8 ml-8">
              <span className="text-[24px] font-medium leading-none">
                {style.title}
              </span>
            </div>
            <div className="w-[300px] h-full relative">
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
