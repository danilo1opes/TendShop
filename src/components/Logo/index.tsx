'use client';

import Image from 'next/image';

export default function Logo() {
  return (
    <section className="bg-black py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-3 gap-8 justify-items-center">
        <div className="flex justify-center">
          <Image
            src="/images/versace.svg"
            width={120}
            height={40}
            alt="Versace logo"
          />
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/zara.svg"
            width={60}
            height={40}
            alt="Zara logo"
          />
        </div>
        <div className="flex justify-center">
          <Image
            src="/images/gucci.svg"
            width={120}
            height={40}
            alt="Gucci logo"
          />
        </div>

        <div className="flex justify-center col-span-3">
          <div className="flex gap-8">
            <Image
              src="/images/prada.svg"
              width={120}
              height={40}
              alt="Prada logo"
            />
            <Image
              src="/images/calvin-klein.svg"
              width={120}
              height={40}
              alt="Calvin Klein logo"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
