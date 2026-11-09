import React from 'react';
import { GraduationCap, Apple, Stethoscope, Check, Calendar } from 'lucide-react';
import { ADDITIONAL_SERVICES } from '../data/clubData';
import { formatCOP } from '../utils/booking';

interface AdditionalServicesProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const AdditionalServices: React.FC<AdditionalServicesProps> = ({ onSelectServiceToBook }) => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'adiestramiento':
        return <GraduationCap className="w-6 h-6 text-[#00f0ff]" />;
      case 'asesoria-nutricional':
        return <Apple className="w-6 h-6 text-[#ff2a85]" />;
      case 'clinica-veterinaria':
        return <Stethoscope className="w-6 h-6 text-[#ffd600]" />;
      default:
        return <GraduationCap className="w-6 h-6 text-[#00f0ff]" />;
    }
  };

  return (
    <section className="py-20 bg-[#0d0f17] relative border-b border-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2a85]/10 border border-[#ff2a85]/30 text-[#ff2a85] text-xs font-bold tracking-widest uppercase mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>BIENESTAR INTEGRAL & EDUCACIÓN</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Servicios Adicionales <span className="text-[#00f0ff] text-glow-blue">& Clases</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Acompañamos a tu mascota en cada etapa de crecimiento con educación positiva, salud preventiva y nutrición avanzada.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ADDITIONAL_SERVICES.map((serv) => {
            const isBlue = serv.neonColor === 'blue';
            const isPink = serv.neonColor === 'pink';

            return (
              <div
                key={serv.id}
                className="rounded-3xl bg-[#131622] border-2 border-gray-800 hover:border-gray-700 p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-13 h-13 rounded-2xl bg-gray-900 border border-gray-700 flex items-center justify-center">
                      {getIcon(serv.id)}
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                      Montería Sede
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    {serv.name}
                  </h3>

                  <p className="text-xs font-semibold text-[#00f0ff] mb-3">
                    "{serv.tagline}"
                  </p>

                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-6">
                    {serv.description}
                  </p>

                  <ul className="space-y-2 mb-6">
                    {serv.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-gray-300">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-5 border-t border-gray-800">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs text-gray-400 block">Tarifa</span>
                      <span className="font-display text-xl font-bold text-[#ffd600]">
                        {formatCOP(serv.basePriceCOP)}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400 text-right max-w-[120px]">
                      {serv.priceNote}
                    </span>
                  </div>

                  <button
                    onClick={() => onSelectServiceToBook(serv.id)}
                    className={`w-full py-3 px-4 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isPink
                        ? 'bg-[#ff2a85] hover:bg-[#e01e77] text-white shadow-[0_0_15px_rgba(255,42,133,0.35)]'
                        : isBlue
                        ? 'bg-[#00f0ff] hover:bg-[#00d0e0] text-gray-950 shadow-[0_0_15px_rgba(0,240,255,0.35)]'
                        : 'bg-[#ffd600] hover:bg-[#ebc400] text-gray-950 shadow-[0_0_15px_rgba(255,214,0,0.35)]'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Inscribirse / Agendar</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
