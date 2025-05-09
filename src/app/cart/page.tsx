'use client';

import { cartItems } from '../../hook/cartItems';
import { useTranslation } from '../../hook/useTranslation';
import { CartItem } from '../../hook/cart';
import { FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';

export default function CartPage() {
  const { t } = useTranslation();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discount = subtotal * 0.2;
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 md:py-6">
      {/* Breadcrumb */}
      <div className="mb-4 md:mb-6">
        <p className="text-sm text-brand-400">
          <span className="text-brand-400">{t('casual_home')}</span> &gt;{' '}
          <span className="text-brand-primary font-light">{t('cart_sub')}</span>
        </p>
        <h1 className="text-2xl md:text-4xl uppercase font-bold mt-2 md:mt-3">
          {t('cart')}
        </h1>
      </div>

      {/* Main content - Two column layout on desktop, stacked on mobile */}
      <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
        {/* Cart Items - Left Column on desktop, full width on mobile */}
        <div className="w-full lg:w-2/3">
          <div className="bg-brand-white rounded-xl shadow-md p-4 md:p-6 space-y-4 md:space-y-6">
            {cartItems.map((item: CartItem) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-4 md:pb-6 last:border-b-0 last:pb-0"
              >
                <div className="flex items-center gap-3 md:gap-6 w-full sm:w-auto">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="rounded-md object-cover md:w-28 md:h-28"
                  />
                  <div>
                    <h2 className="font-semibold text-lg md:text-xl">
                      {t(item.name)}
                    </h2>
                    <div className="flex flex-col sm:flex-row sm:gap-4 md:gap-8 mt-1 md:mt-2">
                      <p className="text-sm font-bold text-brand-gray">
                        {t('filters_size')}:{' '}
                        <span className="text-brand-gray font-light">
                          {item.size}
                        </span>
                      </p>
                      <p className="text-sm font-bold text-brand-gray">
                        {t('filters_color')}:{' '}
                        <span className="text-brand-gray font-light">
                          {item.color}
                        </span>
                      </p>
                    </div>
                    <p className="font-semibold text-base md:text-lg mt-1 md:mt-2">
                      ${item.price}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-3 md:gap-6 w-full sm:w-auto mt-3 sm:mt-0">
                  <div className="flex items-center border rounded-full px-3 md:px-6 py-1 text-base md:text-lg">
                    <button className="text-brand-sixteen px-1 md:px-2">
                      -
                    </button>
                    <span className="px-2 md:px-4">{item.quantity}</span>
                    <button className="text-brand-sixteen px-1 md:px-2">
                      +
                    </button>
                  </div>
                  <button className="text-brand-199 hover:text-brand-600">
                    <FiTrash2 size={20} className="md:w-6 md:h-6" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary - Right Column on desktop, full width on mobile */}
        <div className="w-full lg:w-1/3 mt-4 lg:mt-0">
          <div className="bg-brand-white rounded-xl shadow-md p-4 md:p-6 lg:sticky lg:top-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
              {t('order')}
            </h2>
            <div className="space-y-2 md:space-y-4 mb-4 md:mb-6">
              <div className="flex justify-between">
                <span className="text-base md:text-lg">Subtotal</span>
                <span className="text-base md:text-lg font-medium">
                  ${subtotal}
                </span>
              </div>
              <div className="flex justify-between text-brand-199">
                <span className="text-base md:text-lg">
                  {t('discount')} (-20%)
                </span>
                <span className="text-base md:text-lg">
                  -${discount.toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base md:text-lg">{t('delivery')}</span>
                <span className="text-base md:text-lg font-medium">
                  ${deliveryFee}
                </span>
              </div>
            </div>

            <hr className="my-4 md:my-6" />

            <div className="flex justify-between font-bold text-lg md:text-xl mb-4 md:mb-8">
              <span>Total</span>
              <span>${total.toFixed(0)}</span>
            </div>

            <div className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="relative w-full">
                <Image
                  src="/icon/promo.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2"
                />
                <input
                  type="text"
                  placeholder={t('promo_cart')}
                  className="w-full border rounded-xl px-10 md:px-12 py-2 md:py-3 text-base md:text-lg"
                />
              </div>
              <button className="bg-brand-primary text-brand-white px-4 md:px-6 py-2 md:py-3 rounded-xl whitespace-nowrap">
                {t('applyCart')}
              </button>
            </div>

            <button className="bg-brand-primary text-brand-white w-full py-3 md:py-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-base md:text-lg">
              {t('checkout')}{' '}
              <Image
                src="/icon/arrow-white.svg"
                alt=""
                width={14}
                height={14}
                className="md:w-4 md:h-4"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
