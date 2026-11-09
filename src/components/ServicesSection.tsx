import React, { useState } from 'react';
import { 
  Sparkles, 
  Scissors, 
  Bath, 
  Bone, 
  ShoppingBag, 
  Truck, 
  Check, 
  Calendar, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { MAIN_SERVICES } from '../data/clubData';
import { ClubService } from '../types';
import { formatCOP } from '../utils/booking';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
  onExploreDelivery: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ 
  onSelectServiceToBook, 
  onExploreDelivery 
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'care' | 'beauty' | 'store'>('all');

  const getServiceIcon = (id: string, color: string) => {
    switch (id) {
      case 'guarderia':
        return <Bone className="w-6 h-6 text-[#00f0ff]" />;
      case 'peluqueria':
        return <Scissors className="w-6 h-6 text-[#ff2a85]" />;
      case 'bano-spa':
        return <Bath className="w-6 h-6 text-[#ffd600]" />;
      case 'alimentos-premium':
        return <Bone className="w-6 h-6 text-[#00f0ff]" />;
      case 'accesorios':
        return <ShoppingBag className="w-6 h-6 text-[#ff2a85]" />;
      case 'domicilio':
        return <Truck className="w-6 h-6 text-[#ffd600]" />;
      default:
        return <Sparkles className="w-6 h-6 text-[#00f0ff]" />;
    }
  };

  const filteredServices = MAIN_SERVICES.filter((service) => {
    if (activeFilter === 'care') return service.category === 'daycare' || service.category === 'delivery';
    if (activeFilter === 'beauty') return service.category === 'grooming' || service.category === 'spa';
    if (activeFilter === 'store') return service.category === 'food' || service.category === 'boutique';
    return true;
  });

  return (
    <section id="servicios" className="py-24 bg-[#0a0c11] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-bold tracking-widest uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SERVICIOS DE ÉLITE EN MONTERÍA</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Servicios Principales con <span className="text-[#ffd600] text-glow-yellow">Estándar VIP</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Todo lo que tu compañero de vida necesita para estar saludable, guapo, entretenido y lleno de energía.
          </p>

          {/* Filter segment tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 p-1.5 bg-[#141722] rounded-2xl max-w-xl mx-auto border border-gray-800">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-gradient-to-r from-[#ff2a85] to-[#f72585] text-white shadow-[0_0_15px_rgba(255,42,133,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Todos los Servicios
            </button>
            <button
              onClick={() => setActiveFilter('beauty')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'beauty'
                  ? 'bg-[#ff2a85] text-white shadow-[0_0_15px_rgba(255,42,133,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Peluquería & Spa
            </button>
            <button
              onClick={() => setActiveFilter('care')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'care'
                  ? 'bg-[#00f0ff] text-gray-950 font-bold shadow-[0_0_15px_rgba(0,240,255,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Guardería & Domicilio
            </button>
            <button
              onClick={() => setActiveFilter('store')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeFilter === 'store'
                  ? 'bg-[#ffd600] text-gray-950 font-bold shadow-[0_0_15px_rgba(255,214,0,0.5)]'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Alimentos & Boutique
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const isDelivery = service.id === 'domicilio';
            const isBlue = service.neonColor === 'blue';
            const isPink = service.neonColor === 'pink';
            const isYellow = service.neonColor === 'yellow';

            let borderGlow = 'border-gray-800 hover:border-[#00f0ff]/60 hover:shadow-[0_0_25px_rgba(0,240,255,0.2)]';
            let iconBg = 'bg-[#00f0ff]/10 border-[#00f0ff]/30';
            if (isPink) {
              borderGlow = 'border-gray-800 hover:border-[#ff2a85]/60 hover:shadow-[0_0_25px_rgba(255,42,133,0.25)]';
              iconBg = 'bg-[#ff2a85]/10 border-[#ff2a85]/30';
            } else if (isYellow) {
              borderGlow = 'border-gray-800 hover:border-[#ffd600]/60 hover:shadow-[0_0_25px_rgba(255,214,0,0.25)]';
              iconBg = 'bg-[#ffd600]/10 border-[#ffd600]/30';
            }

            return (
              <div
                key={service.id}
                className={`relative rounded-3xl bg-[#12151e] border-2 ${borderGlow} p-7 transition-all duration-300 flex flex-col justify-between group ${
                  isDelivery ? 'ring-2 ring-[#ffd600]/40' : ''
                }`}
              >
                {/* Popular or Highlight Badge */}
                {service.popular && (
                  <div className="absolute -top-3.5 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-[#ff2a85] to-[#f72585] text-white text-[11px] font-extrabold tracking-wider uppercase shadow-[0_0_12px_rgba(255,42,133,0.6)]">
                    {isDelivery ? '¡SERVICIO ESTRELLA!' : 'MÁS SOLICITADO'}
                  </div>
                )}

                <div>
                  {/* Icon & Title Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${iconBg} border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                      {getServiceIcon(service.id, service.neonColor)}
                    </div>
                    <div>
                      <h3 className="font-display text-xl font-bold text-white group-hover:text-white transition-colors">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{service.durationMinutes >= 60 ? `${service.durationMinutes / 60}h aprox.` : `${service.durationMinutes} min`}</span>
                        <span>·</span>
                        <span className="capitalize">{service.petType === 'all' ? 'Perros & Gatos' : service.petType === 'dog' ? 'Caninos' : 'Felinos'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tagline / Subtitle */}
                  <p className="text-sm font-semibold text-[#00f0ff] mb-3">
                    "{service.tagline}"
                  </p>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Bullet features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer with Price and Booking Action */}
                <div className="pt-5 border-t border-gray-800/80">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs text-gray-400 block">Tarifa base</span>
                      <span className="font-display text-xl font-bold text-[#ffd600]">
                        {formatCOP(service.basePriceCOP)}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400 text-right max-w-[130px]">
                      {service.priceNote}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => onSelectServiceToBook(service.id)}
                      className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        isPink
                          ? 'bg-[#ff2a85] hover:bg-[#e01e77] text-white shadow-[0_0_15px_rgba(255,42,133,0.4)]'
                          : isBlue
                          ? 'bg-[#00f0ff] hover:bg-[#00d0e0] text-gray-950 shadow-[0_0_15px_rgba(0,240,255,0.4)]'
                          : 'bg-[#ffd600] hover:bg-[#ebc400] text-gray-950 shadow-[0_0_15px_rgba(255,214,0,0.4)]'
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Agendar {service.name.split(' ')[0]}</span>
                    </button>

                    {isDelivery && (
                      <button
                        onClick={onExploreDelivery}
                        className="w-full py-2 text-xs font-semibold text-gray-300 hover:text-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <span>Ver Barrios de Cobertura en Montería</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
