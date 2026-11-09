import React from 'react';
import { Heart, ShieldCheck, Camera, Sparkles, CheckCircle2, Home } from 'lucide-react';

interface AboutUsProps {
  onOpenBooking: () => void;
}

export const AboutUs: React.FC<AboutUsProps> = ({ onOpenBooking }) => {
  return (
    <section id="nosotros" className="py-20 bg-[#0d0f15] relative overflow-hidden border-t border-gray-900">
      {/* Decorative neon ambient blur */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 right-0 w-96 h-96 bg-[#ff2a85]/10 rounded-full blur-[100px] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#00f0ff]/10 rounded-full blur-[100px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ff2a85]/10 border border-[#ff2a85]/30 text-[#ff2a85] text-xs font-bold tracking-widest uppercase mb-3">
            <Heart className="w-3.5 h-3.5" />
            <span>NUESTRA MISIÓN & CORAZÓN</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            "Más que una guardería, <span className="text-[#00f0ff] text-glow-blue">somos su segundo hogar</span>."
          </h2>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            En el corazón del barrio La Castellana de Montería creamos un oasis exclusivo para perros y gatos. Nacimos con una convicción clara: cada peludo merece un trato digno, libre de jaulas, con estimulación enriquecedora, amor genuino y cuidados profesionales de élite.
          </p>
        </div>

        {/* 2-Column Story & Feature Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Card with Club Ambiance */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.8)] group">
              <img
                src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=800&q=80"
                alt="Perros felices jugando en Pet House Club Montería"
                className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1015] via-[#0e1015]/40 to-transparent" />
              
              {/* Floating badge inside image */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#13151f]/95 border border-[#ffd600]/40 shadow-xl backdrop-blur-md">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-[#ffd600]/20 flex items-center justify-center text-[#ffd600] font-bold text-xl">
                    🐶🐱
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Protocolo Cero Estrés</div>
                    <div className="text-xs text-gray-300">Supervisión constante con música relajante y feromonas naturales.</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent neon corner tag */}
            <div className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-[#00f0ff] text-gray-950 font-extrabold text-xs tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.7)] flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              <span>SEDE LA CASTELLANA</span>
            </div>
          </div>

          {/* Right Column: Key Commitments */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="p-5 rounded-2xl bg-[#141722]/80 border border-gray-800 hover:border-[#00f0ff]/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#00f0ff]/10 text-[#00f0ff] shrink-0">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Amor Incondicional y Cero Jaulas</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Tu mascota nunca estará encerrada. Diseñamos espacios amplios con césped, piscinas caninas para el clima de Montería y zonas climatizadas de descanso con camitas ortopédicas.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#141722]/80 border border-gray-800 hover:border-[#ff2a85]/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#ff2a85]/10 text-[#ff2a85] shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Personal Certificado y Apasionado</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Contamos con auxiliares veterinarios, etólogos caninos y estilistas profesionales capacitados en comportamiento animal y primeros auxilios. Sabemos leer el lenguaje corporal de tu consentido.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#141722]/80 border border-gray-800 hover:border-[#ffd600]/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-[#ffd600]/10 text-[#ffd600] shrink-0">
                  <Camera className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Tranquilidad Total: Reportes en Vivo</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Durante la estadía en guardería o spa, recibirás fotos y videos en tiempo real por WhatsApp. Siempre sabrás qué está haciendo tu mejor amigo y lo feliz que se encuentra.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenBooking}
                className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#ff2a85] hover:bg-[#e01e77] shadow-[0_0_20px_rgba(255,42,133,0.5)] transition-all flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Agendar Día de Prueba</span>
              </button>
              <div className="text-xs text-gray-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instalaciones abiertas para visita de padres</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
