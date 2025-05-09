'use client';

import { useTranslation } from '../../hook/useTranslation';
import {
  SiVisa,
  SiMastercard,
  SiPaypal,
  SiApplepay,
  SiGooglepay,
} from 'react-icons/si';
import Image from 'next/image';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <>
      <footer className="relative bg-brand-55 pt-36 pb-10 px-4 md:px-20 mt-[120px]">
        {/* Newsletter box */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-[90%] bg-black text-white text-start rounded-2xl z-10 shadow-lg p-8 max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="md:w-1/2">
              <h2 className="uppercase font-bold mb-4 text-2xl md:text-3xl leading-tight">
                {t('title_letter')}
              </h2>
            </div>
            <div className="md:w-1/2 md:max-w-md">
              <form className="flex flex-col items-center gap-4 justify-center w-full">
                <div className="relative w-full">
                  <Image
                    src="/icon/mail.svg"
                    alt="Email"
                    width={18}
                    height={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                  />
                  <input
                    type="email"
                    placeholder={t('place_letter')}
                    className="w-full pl-12 pr-4 py-2 rounded-md text-brand-primary outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand-white text-brand-primary font-medium px-6 py-2 mt-1 rounded-md hover:bg-brand-border transition"
                >
                  {t('btt_letter')}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mt-20 gap-10">
            {/* Brand Section */}
            <div className="md:w-1/4">
              <h1 className="text-3xl font-extrabold font-roboto uppercase">
                {t('brandName')}
              </h1>
              <p className="text-brand-sixteen mt-4 max-w-sm">
                {t('footer_p')}
              </p>

              {/* Social Icons */}
              <div className="flex gap-4 mt-6">
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full border border-gray-500">
                    <Image
                      src="/icon/twitter.svg"
                      alt="Twitter"
                      width={20}
                      height={20}
                    />
                  </div>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full border border-gray-500">
                    <Image
                      src="/icon/facebook.svg"
                      alt="Facebook"
                      width={20}
                      height={20}
                    />
                  </div>
                </a>
                <a
                  href="https://www.instagram.com/danilo1opes/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full border border-gray-500">
                    <Image
                      src="/icon/instagram.svg"
                      alt="Instagram"
                      width={20}
                      height={20}
                    />
                  </div>
                </a>
                <a
                  href="https://github.com/danilo1opes"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="cursor-pointer h-8 w-8 flex items-center justify-center rounded-full border border-gray-500">
                    <Image
                      src="/icon/github.svg"
                      alt="Github"
                      width={20}
                      height={20}
                    />
                  </div>
                </a>
              </div>
            </div>

            {/* Links with Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 w-full md:w-3/4 text-sm font-medium text-brand-seven">
              <div>
                <h3 className="uppercase font-medium text-brand-primary tracking-widest mb-4">
                  {t('company')}
                </h3>
                <ul className="space-y-2">
                  <li className="text-brand-sixteen"> {t('company_one')}</li>
                  <li className="text-brand-sixteen"> {t('company_two')}</li>
                  <li className="text-brand-sixteen"> {t('company_three')}</li>
                  <li className="text-brand-sixteen"> {t('company_four')}</li>
                </ul>
              </div>

              <div>
                <h3 className="uppercase font-medium text-brand-primary tracking-widest mb-4">
                  {t('help')}
                </h3>
                <ul className="space-y-2">
                  <li className="text-brand-sixteen">{t('help_one')}</li>
                  <li className="text-brand-sixteen">{t('help_two')}</li>
                  <li className="text-brand-sixteen">{t('help_three')}</li>
                  <li className="text-brand-sixteen">{t('help_four')}</li>
                </ul>
              </div>

              <div>
                <h3 className="uppercase font-medium text-brand-primary tracking-widest mb-4">
                  {t('faq')}
                </h3>
                <ul className="space-y-2">
                  <li className="text-brand-sixteen"> {t('faq_one')}</li>
                  <li className="text-brand-sixteen"> {t('faq_two')}</li>
                  <li className="text-brand-sixteen"> {t('faq_three')}</li>
                  <li className="text-brand-sixteen"> {t('faq_four')}</li>
                </ul>
              </div>

              <div>
                <h3 className="uppercase font-medium text-brand-primary tracking-widest mb-4">
                  {t('resources')}
                </h3>
                <ul className="space-y-2">
                  <li className="text-brand-sixteen"> {t('resources_one')}</li>
                  <li className="text-brand-sixteen"> {t('resources_two')}</li>
                  <li className="text-brand-sixteen">{t('resources_three')}</li>
                  <li className="text-brand-sixteen"> {t('resources_four')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="my-10 border-t border-brand-60" />

          {/* Payment */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center text-brand-sixteen">
            <p className="text-base">{t('footer_payment')}</p>
            <div className="flex gap-4 items-center">
              <div className="bg-brand-white rounded-md px-3 py-2 shadow-sm">
                <SiVisa className="text-brand-100 text-xl" />
              </div>
              <div className="bg-brand-white rounded-md px-3 py-2 shadow-sm">
                <SiMastercard className="text-brand-200 text-xl" />
              </div>
              <div className="bg-brand-white rounded-md px-3 py-2 shadow-sm">
                <SiPaypal className="text-brand-accent text-xl" />
              </div>
              <div className="bg-brand-white rounded-md px-3 py-2 shadow-sm">
                <SiApplepay className="text-brand-primary text-xl" />
              </div>
              <div className="bg-brand-white rounded-md px-3 py-2 shadow-sm">
                <SiGooglepay className="text-xl" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
