import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/clubData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonios" className="py-24 bg-[#0a0c12] relative border-t border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2a85]/10 border border-[#ff2a85]/30 text-[#ff2a85] text-xs font-bold tracking-widest uppercase mb-3">
            <Star className="w-3.5 h-3.5 fill-[#ff2a85]" />
            <span>OPINIONES DE MONTERÍA</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Familias Felices, <span className="text-[#ffd600] text-glow-yellow">Mascotas Consentidas</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            La confianza de nuestros clientes en La Castellana, El Recreo, Monteverde y Pasatiempo es nuestra mayor carta de presentación.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {TESTIMONIALS.map((test) => (
            <div
              key={test.id}
              className="p-8 rounded-3xl bg-[#121520] border-2 border-gray-800 hover:border-gray-700 transition-all flex flex-col justify-between relative group shadow-lg"
            >
              <MessageSquareQuote className="w-10 h-10 text-[#00f0ff]/20 absolute top-6 right-6 pointer-events-none" />

              <div>
                {/* 5 Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#ffd600] text-[#ffd600]" />
                  ))}
                  <span className="text-xs text-gray-400 ml-2">5.0 verificado</span>
                </div>

                {/* Comment quote */}
                <p className="text-gray-200 text-sm sm:text-base italic leading-relaxed mb-6">
                  "{test.comment}"
                </p>
              </div>

              {/* Author & Pet Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-800/80">
                <img
                  src={test.avatarUrl}
                  alt={test.petName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#ff2a85] shadow-[0_0_10px_rgba(255,42,133,0.3)]"
                />
                <div>
                  <h4 className="text-white font-bold text-sm flex items-center gap-1.5">
                    <span>{test.ownerName}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  </h4>
                  <p className="text-xs text-[#00f0ff] font-semibold">
                    Tutor de {test.petName} ({test.petBreed})
                  </p>
                  <p className="text-[11px] text-gray-500">
                    📍 {test.neighborhood}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
