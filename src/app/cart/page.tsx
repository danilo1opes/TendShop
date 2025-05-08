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
    <section className="px-4">
      <div className="mt-4">
        <p className="text-sm text-brand-400">
          <span className="text-brand-400">{t('casual_home')}</span> &gt;{' '}
          <span className="text-brand-primary font-light">{t('cart_sub')}</span>
        </p>
        <div className="flex gap-2 items-center">
          <h1 className="text-3xl uppercase font-bold mb-2 mt-2">
            {t('cart')}
          </h1>
        </div>
      </div>

      <div className="bg-brand-white rounded-xl shadow-md p-4 space-y-4">
        {cartItems.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-4"
          >
            <div className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={80}
                height={80}
                className="rounded-md object-cover"
              />
              <div>
                <h2 className="font-semibold text-lg">{t(item.name)}</h2>
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
                <p className="font-semibold mt-1">${item.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center border rounded-full px-4 py-1 text-lg">
                <button className="text-brand-sixteen">-</button>
                <button>{item.quantity}</button>
                <button className="text-brand-sixteen">+</button>
              </div>
              <button className="text-brand-199 hover:text-brand-600">
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-brand-white rounded-xl shadow-md mt-6 p-6">
        <h2 className="text-xl font-semibold mb-4">{t('order')}</h2>
        <div className="flex justify-between mb-2">
          <span>Subtotal</span>
          <span>${subtotal}</span>
        </div>
        <div className="flex justify-between mb-2 text-brand-199">
          <span>{t('discount')} (-20%)</span>
          <span>-${discount.toFixed(0)}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>{t('delivery')}</span>
          <span>${deliveryFee}</span>
        </div>
        <hr className="mb-4" />
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Total</span>
          <span>${total.toFixed(0)}</span>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="relative w-full">
            <Image
              src="/icon/promo.svg"
              alt=""
              width={16}
              height={16}
              className="absolute left-3 top-1/2 -translate-y-1/2"
            />
            <input
              type="text"
              placeholder={t('promo_cart')}
              className="w-full border rounded-xl px-10 py-2"
            />
          </div>
          <button className="bg-brand-primary text-brand-white px-4 py-2 rounded-xl">
            {t('applyCart')}
          </button>
        </div>
        <button className="bg-brand-primary text-brand-white w-full py-3 rounded-xl flex items-center justify-center gap-2 font-semibold">
          {t('checkout')}{' '}
          <Image src="/icon/arrow-white.svg" alt="" width={14} height={14} />
        </button>
      </div>
    </section>
  );
}
