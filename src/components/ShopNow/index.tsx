'use client';

import { useTranslation } from '../../hook/useTranslation';
import { HiStar } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';

export default function ShopNow() {
  const { t } = useTranslation();
  return (
    <section className="bg-brand-50 text-brand-primary py-12 pb-0">
      <div className="mx-auto space-y-6 px-6">
        <h1 className="uppercase text-4xl font-extrabold leading-tight">
          {t('hero_title1')} <br /> {t('hero_title2')}
        </h1>
        <p className="text-brand-black60 text-base max-w-2xl mx-auto">
          {t('hero_description')}
        </p>
        <Link
          href="/"
          className="bg-brand-primary flex items-center justify-center text-brand-white px-8 py-4 rounded-full text-lg transition hover:opacity-90 w-[350px] h-[50px] "
        >
          {t('hero_shop')}
        </Link>

        <div className="grid grid-cols-2 gap-y-6 justify-self-start text-center mt-10 mx-auto">
          <div>
            <p className="text-2xl font-bold text-brand-primary">
              {t('hero_brandsCount')}
            </p>
            <p className="text-brand-black60 text-sm">
              {t('hero_brandsLabel')}
            </p>
          </div>
          <div className="border-l border-brand-black10 pl-6">
            <p className="text-2xl font-bold text-brand-primary">
              {t('hero_productsCount')}
            </p>
            <p className="text-brand-black60 text-sm">
              {t('hero_productsLabel')}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-2xl font-bold text-brand-primary">
              {t('hero_customersCount')}
            </p>
            <p className="text-brand-black60 text-sm">
              {t('hero_customersLabel')}
            </p>
          </div>
        </div>
      </div>
      <div className="relative mt-10 w-full">
        <Image
          src="/images/arrivals/hero_people.jpg"
          alt={t('fashionable')}
          width={1200}
          height={1600}
          className="w-full h-auto"
          priority
        />
        <HiStar className="absolute top-[5%] right-[5%] text-8xl text-brand-primary z-10" />
        <HiStar className="absolute top-[40%] left-[5%] text-4xl text-brand-primary z-10" />
      </div>
    </section>
  );
}
