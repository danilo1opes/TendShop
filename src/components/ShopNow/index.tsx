'use client';

import { useTranslation } from '../../hook/useTranslation';
import { HiStar } from 'react-icons/hi';
import Image from 'next/image';
import Link from 'next/link';

export default function ShopNow() {
  const { t } = useTranslation();
  return (
    <section className="bg-brand-50 text-brand-primary py-8 md:py-12 pb-0 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row">
          {/* Conteúdo de texto - lado esquerdo em desktop */}
          <div className="md:w-1/2 md:pr-8 lg:pr-12 space-y-6 mb-8 md:mb-0">
            <h1 className="uppercase text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
              {t('hero_title1')} <br /> {t('hero_title2')}
            </h1>
            <p className="text-brand-black60 text-sm sm:text-base md:max-w-md">
              {t('hero_description')}
            </p>
            <Link
              href="/shop/homens"
              className="bg-brand-primary inline-flex items-center justify-center text-brand-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-base sm:text-lg transition hover:opacity-90 w-full sm:w-[280px] md:w-[350px] h-[45px] sm:h-[50px]"
            >
              {t('hero_shop')}
            </Link>

            {/* Stats - organizados horizontalmente em desktop */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8 md:mt-12">
              <div className="text-center md:text-left">
                <p className="text-xl sm:text-2xl font-bold text-brand-primary">
                  {t('hero_brandsCount')}
                </p>
                <p className="text-brand-black60 text-xs sm:text-sm">
                  {t('hero_brandsLabel')}
                </p>
              </div>
              <div className="text-center md:text-left border-l border-brand-black10 pl-4">
                <p className="text-xl sm:text-2xl font-bold text-brand-primary">
                  {t('hero_productsCount')}
                </p>
                <p className="text-brand-black60 text-xs sm:text-sm">
                  {t('hero_productsLabel')}
                </p>
              </div>
              <div className="col-span-2 md:col-span-1 text-center md:text-left border-l border-brand-black10 md:pl-4">
                <p className="text-xl sm:text-2xl font-bold text-brand-primary">
                  {t('hero_customersCount')}
                </p>
                <p className="text-brand-black60 text-xs sm:text-sm">
                  {t('hero_customersLabel')}
                </p>
              </div>
            </div>
          </div>

          {/* Imagem - em desktop */}
          <div className="relative md:w-1/2 md:flex md:items-center">
            <div className="relative w-full">
              <Image
                src="/images/arrivals/hero_people.jpg"
                alt={t('fashionable')}
                width={800}
                height={1000}
                className="w-full h-auto object-cover rounded-t-lg md:rounded-lg"
                priority
              />
              {/* Star */}
              <HiStar className="absolute top-[5%] right-[5%] text-4xl sm:text-6xl md:text-8xl text-brand-primary z-10" />
              <HiStar className="absolute top-[40%] left-[5%] text-2xl sm:text-3xl md:text-4xl text-brand-primary z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
