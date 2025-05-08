'use client';
import Image from 'next/image';

export default function Logo() {
  // Array com todas as marcas para facilitar manutenção
  const brands = [
    { name: 'Versace', src: '/images/versace.svg', width: 120 },
    { name: 'Zara', src: '/images/zara.svg', width: 80 },
    { name: 'Gucci', src: '/images/gucci.svg', width: 120 },
    { name: 'Prada', src: '/images/prada.svg', width: 120 },
    { name: 'Calvin Klein', src: '/images/calvin-klein.svg', width: 120 },
  ];

  return (
    <section className="bg-black py-6 sm:py-8 md:py-10 px-4">
      {/* Layout para Mobile (até sm) - 2 linhas com 2-3 logos */}
      <div className="sm:hidden max-w-md mx-auto">
        <div className="grid grid-cols-3 gap-4 justify-items-center items-center mb-6">
          {brands.slice(0, 3).map((brand) => (
            <div key={brand.name} className="flex justify-center">
              <Image
                src={brand.src}
                width={brand.width * 0.7}
                height={40}
                alt={`${brand.name} logo`}
                className="max-h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-8">
          {brands.slice(3).map((brand) => (
            <div key={brand.name} className="flex justify-center">
              <Image
                src={brand.src}
                width={brand.width * 0.7} // Menor no mobile
                height={40}
                alt={`${brand.name} logo`}
                className="max-h-8 w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Layout para Tablet e Desktop  */}
      <div className="hidden sm:flex max-w-6xl mx-auto justify-between items-center">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="flex justify-center px-2 sm:px-3 md:px-4"
          >
            <Image
              src={brand.src}
              width={brand.width}
              height={40}
              alt={`${brand.name} logo`}
              className="max-h-8 md:max-h-10 lg:max-h-12 w-auto object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
