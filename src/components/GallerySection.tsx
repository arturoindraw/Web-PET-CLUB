import React, { useState } from 'react';
import { Camera, X, Sparkles, ZoomIn } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/clubData';
import { GalleryPhoto } from '../types';

export const GallerySection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredPhotos = GALLERY_ITEMS.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  return (
    <section id="galeria" className="py-24 bg-[#0d0f17] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>MOMENTOS REALES EN EL CLUB</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Galería de <span className="text-[#00f0ff] text-glow-blue">Felicidad & Estilo</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Instalaciones climatizadas en La Castellana, consentidos jugando en grupo y transformaciones de peluquería de primer nivel.
          </p>

          {/* Filter tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'Todas las fotos' },
              { id: 'guarderia', label: 'Guardería & Juegos' },
              { id: 'peluqueria', label: 'Peluquería' },
              { id: 'spa', label: 'Spa Ozonoterapia' },
              { id: 'eventos', label: 'Celebraciones' },
              { id: 'instalaciones', label: 'Instalaciones VIP' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  filter === tab.id
                    ? 'bg-[#00f0ff] text-gray-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                    : 'bg-gray-900/80 text-gray-400 hover:text-white border border-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-3xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-[#ff2a85]/60 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(255,42,133,0.3)] h-72"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1017] via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#ffd600] mb-1">
                  {item.category}
                </span>
                <h3 className="font-display text-lg font-bold text-white mb-1 group-hover:text-[#00f0ff] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-300 line-clamp-2">
                  {item.caption}
                </p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-[#ff2a85] font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Ampliar foto</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6">
          <div className="relative max-w-4xl w-full bg-[#12141e] rounded-3xl overflow-hidden border-2 border-gray-700 shadow-2xl">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-black/70 text-white hover:text-[#ff2a85] transition-colors"
              aria-label="Cerrar vista ampliada"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[70vh] overflow-hidden bg-black flex items-center justify-center">
              <img
                src={selectedPhoto.imageUrl}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </div>

            <div className="p-6 bg-[#12141e] border-t border-gray-800">
              <span className="text-xs font-bold text-[#ffd600] uppercase tracking-wider">
                {selectedPhoto.category}
              </span>
              <h3 className="font-display text-xl font-bold text-white mt-1 mb-2">
                {selectedPhoto.title}
              </h3>
              <p className="text-sm text-gray-300">
                {selectedPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
