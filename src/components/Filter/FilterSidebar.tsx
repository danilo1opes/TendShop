'use client';

import Image from 'next/image';
import { useTranslation } from '../../hook/useTranslation';
import { useState } from 'react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function FilterSidebar({ isOpen, onClose }: Props) {
  const { t } = useTranslation();

  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(200);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  if (!isOpen) return null;

  {
    /* Data Colors*/
  }

  const toggleColor = (color: string) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  {
    /* Data Size */
  }
  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  {
    /* Data */
  }
  const arraysFilters = [
    t('filters_one'),
    t('filters_two'),
    t('filters_three'),
    t('filters_four'),
    t('filters_five'),
  ];

  const sizeFilters = [
    t('sizes_filter.XX-Small'),
    t('sizes_filter.X-Small'),
    t('sizes_filter.Small'),
    t('sizes_filter.Medium'),
    t('sizes_filter.Large'),
    t('sizes_filter.X-Large'),
    t('sizes_filter.XX-Large'),
    t('sizes_filter.3X-Large'),
    t('sizes_filter.4X-Large'),
  ];

  const styleFilters = [
    t('style_one'),
    t('style_two'),
    t('style_three'),
    t('style_four'),
  ];

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-brand-primary/30 z-40 backdrop-blur-sm"
      />

      {/* Drawer */}
      <div className="fixed inset-x-0 top-5 mx-auto w-[95%] max-w-md h-[90%] bg-brand-white z-50 rounded-2xl shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">{t('filters')}</h2>
          <button onClick={onClose}>
            <Image src="/icon/closed.svg" alt="Close" width={20} height={20} />
          </button>
        </div>

        {/* Conteúdo scrollável */}
        <div className="p-4 overflow-y-auto flex-1 space-y-6">
          {/* Categorias */}
          <div className="space-y-2">
            {arraysFilters.map((cat) => (
              <div
                key={cat}
                className="flex justify-between items-center text-sm"
              >
                <span>{cat}</span>
                <Image
                  src="/icon/set-right.svg"
                  alt="Close"
                  width={8}
                  height={8}
                />
              </div>
            ))}
          </div>

          {/* Preço */}
          <div>
            <h3 className="font-semibold mb-2">{t('filters_price')}</h3>
            <div className="flex items-center justify-between text-sm">
              <span>${minPrice}</span>
              <span>${maxPrice}</span>
            </div>
            <div className="mt-4 mb-6 h-1 bg-brand-muted rounded-full relative">
              {/* Barra de progresso entre os dois pontos */}
              <div
                className="absolute h-1 bg-brand-primary rounded-full"
                style={{
                  left: `${((minPrice - 50) / 150) * 100}%`,
                  right: `${100 - ((maxPrice - 50) / 150) * 100}%`,
                }}
              />

              {/* Controle deslizante mínimo */}
              <input
                type="range"
                min="50"
                max="200"
                value={minPrice}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value < maxPrice) setMinPrice(value);
                }}
                className="absolute w-full top-0 h-1 appearance-none bg-transparent cursor-pointer price-range-slider"
                style={{ zIndex: 20 }}
              />

              {/* Controle deslizante máximo */}
              <input
                type="range"
                min="50"
                max="200"
                value={maxPrice}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (value > minPrice) setMaxPrice(value);
                }}
                className="absolute w-full top-0 h-1 appearance-none bg-transparent cursor-pointer price-range-slider"
                style={{ zIndex: 20 }}
              />

              {/* Indicadores visuais */}
              <div
                className="absolute w-4 h-4 bg-brand-primary rounded-full -top-1.5 cursor-grab"
                style={{
                  left: `calc(${((minPrice - 50) / 150) * 100}% - 8px)`,
                  zIndex: 30,
                }}
              />
              <div
                className="absolute w-4 h-4 bg-brand-primary rounded-full -top-1.5 cursor-grab"
                style={{
                  left: `calc(${((maxPrice - 50) / 150) * 100}% - 8px)`,
                  zIndex: 30,
                }}
              />
            </div>
          </div>

          {/* Cores */}
          <div>
            <h3 className="font-semibold mb-2">{t('filters_color')}</h3>
            <div className="flex flex-wrap gap-2">
              {[
                '#60D669',
                '#E74C3C',
                '#F1C40F',
                '#F39C12',
                '#5DADE2',
                '#2E86DE',
                '#8E44AD',
                '#E91E63',
                '#FFF',
                '#000',
              ].map((color, idx) => {
                const isSelected = selectedColors.includes(color);
                const isWhite = color === '#FFF';

                return (
                  <div
                    key={idx}
                    onClick={() => toggleColor(color)}
                    className="w-10 h-10 rounded-full border cursor-pointer relative flex items-center justify-center"
                    style={{ backgroundColor: color }}
                  >
                    {isSelected && (
                      <img
                        src={
                          isWhite
                            ? '/icon/checked-black.svg'
                            : '/icon/checked-white.svg'
                        }
                        alt="Selected"
                        className="w-6 h-6"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Tamanhos */}
          <div>
            <h3 className="font-semibold mb-2">{t('filters_size')}</h3>
            <div className="flex flex-wrap gap-2">
              {sizeFilters.map((size) => (
                <button
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-3 py-1 rounded-full border transition ${
                    selectedSizes.includes(size)
                      ? 'bg-brand-primary text-brand-white'
                      : 'bg-brand-50 text-brand-seven'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Estilo */}
          <div>
            <h3 className="font-semibold mb-2">{t('filter_style')}</h3>
            <div className="space-y-2 text-sm">
              {styleFilters.map((style) => (
                <div key={style} className="flex justify-between">
                  <span>{style}</span>
                  <Image
                    src="/icon/set-right.svg"
                    alt="Close"
                    width={8}
                    height={8}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Botão aplicar */}
        <div className="p-4 border-t">
          <button className="w-full bg-black text-white py-3 rounded-full text-sm">
            {t('applyFilter')}
          </button>
        </div>
      </div>
    </>
  );
}
