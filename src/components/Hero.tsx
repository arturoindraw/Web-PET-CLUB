import React from 'react';
import { Calendar, Phone, Sparkles, ShieldCheck, Heart, MapPin, Award } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreServices: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreServices }) => {
  return (
    <section id="hero" className="relative pt-6 pb-20 sm:pt-10 sm:pb-28 overflow-hidden bg-wood-slats">
      {/* Background ambient neon glows */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] bg-gradient-to-tr from-[#ff2a85]/20 via-[#00f0ff]/15 to-[#ffd600]/20 rounded-full blur-[110px] pointer-events-none" 
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col items-center text-center">

          {/* Centralized Neon Logo Badge */}
          <div className="relative mb-8 group">
            {/* Outer Red-Orange Neon Halo */}
            <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#ff3b30] via-[#ff2a85] to-[#ff9500] opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-700 animate-pulse" />
            
            {/* Inner Ring with border */}
            <div className="relative w-56 h-56 sm:w-68 sm:h-68 md:w-80 md:h-80 rounded-full p-2 bg-[#171922] border-4 border-[#ff2a85] shadow-[0_0_35px_rgba(255,42,133,0.65),inset_0_0_20px_rgba(255,42,133,0.3)]">
              <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#ffd600]/60 relative">
                <img
                  src="/assets/aistudio/PET_HOUSE_logo_aa6a9ad4.jpg"
                  alt="Pet House Club Logo Neon Sign"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Subtle Neon Floating Tag */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-[#0e1015]/95 border border-[#ffd600] text-[#ffd600] text-xs font-bold tracking-wider flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,214,0,0.4)] whitespace-nowrap">
              <Sparkles className="w-3.5 h-3.5 text-[#ffd600]" />
              <span>EL CLUB EXCLUSIVO DE MONTERÍA</span>
            </div>
          </div>

          {/* Location Kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-gray-900/80 border border-gray-700 text-gray-300 text-xs sm:text-sm">
            <MapPin className="w-4 h-4 text-[#00f0ff]" />
            <span>Calle 59 #9-40 B. La Castellana · Montería, Colombia</span>
          </div>

          {/* Primary Headline */}
          <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold text-white max-w-4xl tracking-tight leading-tight mb-4">
            Bienvenido al Club más <span className="text-[#00f0ff] text-glow-blue">Exclusivo</span> para tu Mascota en <span className="text-[#ffd600] text-glow-yellow">Montería</span>.
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            <span className="text-white font-semibold">Cuidado, Belleza, Diversión y Nutrición.</span> Todo en un solo lugar. <span className="text-[#ff2a85] font-bold text-glow-pink">¡Tu PET HOUSE!</span>
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-12">
            {/* Primary Rosa Neon CTA Button */}
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl text-base sm:text-lg font-bold text-white bg-gradient-to-r from-[#ff2a85] via-[#ff1a75] to-[#f72585] hover:from-[#ff1a75] hover:to-[#e01874] shadow-[0_0_30px_rgba(255,42,133,0.6)] hover:shadow-[0_0_40px_rgba(255,42,133,0.85)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-3 cursor-pointer group"
            >
              <Calendar className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>¡RESERVA SU CITA AHORA!</span>
            </button>

            {/* Secondary Services Explorer */}
            <button
              onClick={onExploreServices}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl text-base font-semibold text-gray-200 bg-gray-900/80 hover:bg-gray-800 border border-[#00f0ff]/50 hover:border-[#00f0ff] shadow-[0_0_15px_rgba(0,240,255,0.2)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Ver Servicios & Precios</span>
            </button>

            {/* WhatsApp direct pill */}
            <a
              href={CLUB_INFO.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-5 py-4 rounded-2xl text-sm font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 hover:border-emerald-400 transition-all flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Directo</span>
            </a>
          </div>

          {/* Social Proof & Trust Badges Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl pt-6 border-t border-gray-800/80">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#12141c]/90 border border-gray-800 text-left">
              <div className="p-2 rounded-lg bg-[#ffd600]/10 text-[#ffd600]">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">4.9 / 5 Estrellas</div>
                <div className="text-xs text-gray-400">+1,200 familias felices</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#12141c]/90 border border-gray-800 text-left">
              <div className="p-2 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Cero Jaulas</div>
                <div className="text-xs text-gray-400">100% Amor & Respeto</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#12141c]/90 border border-gray-800 text-left">
              <div className="p-2 rounded-lg bg-[#ff2a85]/10 text-[#ff2a85]">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Aire Acondicionado</div>
                <div className="text-xs text-gray-400">Espacios frescos y limpios</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#12141c]/90 border border-gray-800 text-left">
              <div className="p-2 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-white font-bold text-sm">Pet Van Segura</div>
                <div className="text-xs text-gray-400">Domicilio en Montería</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
