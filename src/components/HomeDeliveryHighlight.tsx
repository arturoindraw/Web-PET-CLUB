import React, { useState } from 'react';
import { Truck, ShieldCheck, Clock, MapPin, CheckCircle2, Sparkles, Navigation, Phone } from 'lucide-react';
import { MONTERIA_NEIGHBORHOODS, CLUB_INFO } from '../data/clubData';

interface HomeDeliveryHighlightProps {
  onBookWithDelivery: (neighborhood: string) => void;
}

export const HomeDeliveryHighlight: React.FC<HomeDeliveryHighlightProps> = ({ onBookWithDelivery }) => {
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(MONTERIA_NEIGHBORHOODS[0].name);

  const currentInfo = MONTERIA_NEIGHBORHOODS.find((n) => n.name === selectedNeighborhood) || MONTERIA_NEIGHBORHOODS[0];

  return (
    <section id="domicilio" className="py-20 bg-wood-slats-subtle relative border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Banner Container */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#151926] via-[#10131c] to-[#0d0f15] border-2 border-[#ffd600]/40 p-8 sm:p-12 shadow-[0_0_40px_rgba(255,214,0,0.15)] overflow-hidden">
          
          {/* Subtle neon glow in corner */}
          <div 
            aria-hidden="true" 
            className="absolute top-0 right-0 w-80 h-80 bg-[#ffd600]/10 rounded-full blur-[90px] pointer-events-none" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ffd600]/15 border border-[#ffd600]/40 text-[#ffd600] text-xs font-bold tracking-wider">
                <Truck className="w-4 h-4" />
                <span>SERVICIO ESTRELLA EN MONTERÍA</span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Servicio a Domicilio: <span className="text-[#ffd600] text-glow-yellow">Pet Van Segura</span>
              </h2>

              <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                <strong className="text-white">"Recogemos y entregamos a tu mascota con total seguridad."</strong> Sabemos que tu tiempo es valioso y que el bienestar de tu consentido es tu mayor prioridad en Montería.
              </p>

              {/* Guarantees Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800">
                  <div className="p-2 rounded-xl bg-[#00f0ff]/10 text-[#00f0ff] shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Cabina 100% Climatizada</h4>
                    <p className="text-xs text-gray-400">Protección del calor monteriano con temperatura ideal de 22°C.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800">
                  <div className="p-2 rounded-xl bg-[#ff2a85]/10 text-[#ff2a85] shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Guacales Higienizados</h4>
                    <p className="text-xs text-gray-400">Desinfección con amonio cuaternario tras cada trayecto individual.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800">
                  <div className="p-2 rounded-xl bg-[#ffd600]/10 text-[#ffd600] shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Puntualidad & WhatsApp</h4>
                    <p className="text-xs text-gray-400">Te enviamos foto al subir a la van y aviso 10 minutos antes de llegar.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gray-900/80 border border-gray-800">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Personal Calificado</h4>
                    <p className="text-xs text-gray-400">Manejo amable y respetuoso con auxiliar canino a bordo.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Interactive Neighborhood Coverage Widget */}
            <div className="lg:col-span-5">
              <div className="p-6 rounded-3xl bg-[#0e1017] border-2 border-gray-800 shadow-2xl relative">
                
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <Navigation className="w-4 h-4 text-[#00f0ff]" />
                    <span className="text-white font-bold text-sm">Verificador de Cobertura</span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    En Vivo
                  </span>
                </div>

                <label htmlFor="neighborhood-select" className="block text-xs font-medium text-gray-300 mb-2">
                  Selecciona tu barrio en Montería:
                </label>

                <select
                  id="neighborhood-select"
                  value={selectedNeighborhood}
                  onChange={(e) => setSelectedNeighborhood(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#171a26] border border-gray-700 text-white text-sm font-semibold focus:outline-none focus:border-[#ffd600] transition-colors mb-4"
                >
                  {MONTERIA_NEIGHBORHOODS.map((nh) => (
                    <option key={nh.name} value={nh.name}>
                      {nh.name} ({nh.zone})
                    </option>
                  ))}
                </select>

                {/* Status Box for Selected Neighborhood */}
                <div className="p-4 rounded-2xl bg-[#141724] border border-[#ffd600]/30 space-y-3 mb-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Estado de Ruta:</span>
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {currentInfo.covered ? 'Cobertura Garantizada' : 'Consultar'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Tiempo est. de recogida:</span>
                    <span className="text-xs font-bold text-white">
                      {currentInfo.estMinutes} a {currentInfo.estMinutes + 10} minutos
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">Tarifa Domicilio:</span>
                    <span className="text-sm font-extrabold text-[#ffd600]">
                      $15.000 COP (Ida y Vuelta)
                    </span>
                  </div>

                  <div className="text-[11px] text-gray-400 pt-1 border-t border-gray-800">
                    <span className="text-[#00f0ff] font-medium">{currentInfo.name}:</span> {currentInfo.note}. Saliendo desde nuestra sede en Calle 59 #9-40 B. La Castellana.
                  </div>
                </div>

                {/* Action button */}
                <button
                  onClick={() => onBookWithDelivery(currentInfo.name)}
                  className="w-full py-3.5 px-4 rounded-xl font-bold text-sm text-gray-950 bg-[#ffd600] hover:bg-[#ebc400] shadow-[0_0_20px_rgba(255,214,0,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Truck className="w-4 h-4" />
                  <span>Agendar Recogida en {currentInfo.name}</span>
                </button>

                <p className="text-[11px] text-gray-500 text-center mt-3">
                  ¿Vives en otra zona o parcelación cercana?{' '}
                  <a
                    href={`https://wa.me/${CLUB_INFO.phoneClean}?text=Hola%20Pet%20House%20Club,%20deseo%20consultar%20cobertura%20de%20domicilio%20para%20el%20barrio...`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00f0ff] hover:underline"
                  >
                    Pregúntanos por WhatsApp
                  </a>
                </p>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
