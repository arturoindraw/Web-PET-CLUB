import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Instagram, 
  Facebook, 
  ExternalLink, 
  Navigation, 
  ShieldCheck,
  Heart
} from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

interface FooterSectionProps {
  onOpenBooking: () => void;
  onOpenCRM: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenBooking, onOpenCRM }) => {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent('Calle 59 #9-40 La Castellana, Montería, Colombia')}`;
  const wazeUrl = `https://waze.com/ul?q=${encodeURIComponent('Calle 59 #9-40 La Castellana Monteria')}`;

  return (
    <footer id="contacto" className="bg-[#0b0c13] text-gray-300 pt-20 pb-12 border-t-2 border-gray-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top: Location & Interactive Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-center">
          
          {/* Contact Details (Left) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#ff2a85] p-0.5 shadow-[0_0_15px_rgba(255,42,133,0.4)]">
                <img
                  src="/assets/aistudio/PET_HOUSE_logo_aa6a9ad4.jpg"
                  alt="Pet House Club"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-white tracking-wide">
                  PET HOUSE CLUB
                </h3>
                <p className="text-xs text-[#00f0ff] font-semibold">
                  Montería · La Castellana
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed">
              El club más exclusivo y completo para tu mascota en Montería. Te esperamos con los brazos abiertos en nuestras instalaciones climatizadas y seguras.
            </p>

            {/* Address */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#131622] border border-gray-800">
              <MapPin className="w-5 h-5 text-[#00f0ff] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-gray-400 block">Dirección Sede Principal:</span>
                <strong className="text-white text-sm">{CLUB_INFO.address}</strong>
                <p className="text-xs text-gray-400 mt-0.5">Montería, Córdoba, Colombia</p>
              </div>
            </div>

            {/* Phone & WhatsApp */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#131622] border border-gray-800">
              <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-gray-400 block">Celular / WhatsApp Oficial:</span>
                <a
                  href={CLUB_INFO.social.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 font-bold text-base hover:underline flex items-center gap-2"
                >
                  <span>{CLUB_INFO.phone}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <p className="text-xs text-gray-400">Atención inmediata a consultas y agendamiento</p>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-[#131622] border border-gray-800">
              <Clock className="w-5 h-5 text-[#ffd600] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs text-gray-400 block">Horarios de Atención:</span>
                <p className="text-xs text-white font-medium">{CLUB_INFO.hours.weekdays}</p>
                <p className="text-xs text-gray-400">{CLUB_INFO.hours.sundays}</p>
                <p className="text-[11px] text-[#00f0ff] mt-0.5 font-semibold">{CLUB_INFO.hours.daycare}</p>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs text-gray-400 font-medium mr-1">Síguenos:</span>
              <a
                href={CLUB_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram de Pet House Club Montería"
                className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-[#ff2a85] hover:border-[#ff2a85] transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={CLUB_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook de Pet House Club Montería"
                className="w-10 h-10 rounded-xl bg-gray-900 border border-gray-700 flex items-center justify-center text-gray-300 hover:text-[#00f0ff] hover:border-[#00f0ff] transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>

          </div>

          {/* Interactive Stylized Map Box (Right) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#141724] border-2 border-gray-800 overflow-hidden shadow-2xl relative">
              
              {/* Map Header Bar */}
              <div className="p-4 bg-[#10131d] border-b border-gray-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#00f0ff] animate-ping" />
                  <span className="text-xs font-bold text-white">
                    Ubicación en La Castellana, Montería
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-gray-800 text-[11px] font-semibold text-gray-300 hover:text-white border border-gray-700 hover:border-gray-600 flex items-center gap-1"
                  >
                    <span>Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={wazeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 rounded-lg bg-cyan-950/60 text-[11px] font-semibold text-[#00f0ff] border border-cyan-800/60 hover:bg-cyan-900/60 flex items-center gap-1"
                  >
                    <span>Waze</span>
                    <Navigation className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Map Body: Stylized Dark OpenStreetMap / Google Maps View */}
              <div className="relative h-72 sm:h-80 w-full bg-[#171922] overflow-hidden">
                <iframe
                  title="Mapa Ubicación Pet House Club Montería"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.8624156689656!2d-75.8754128!3d8.761214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e5a2fe160aa3149%3A0x6b4458f237f3780e!2sCl.%2059%20%239-40%2C%20Monter%C3%ADa%2C%20C%C3%B3rdoba!5e0!3m2!1ses!2sco!4v1700000000000!5m2!1ses!2sco"
                  className="w-full h-full border-0 filter grayscale contrast-125 invert-[0.85] opacity-80"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

                {/* Floating Stylized Neon Marker Overlay */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center">
                  <div className="px-3.5 py-1.5 rounded-xl bg-[#0e1017]/95 border-2 border-[#ffd600] text-white text-xs font-bold shadow-[0_0_20px_rgba(255,214,0,0.6)] flex items-center gap-1.5 whitespace-nowrap mb-1">
                    <span className="text-[#ff2a85]">🐾</span>
                    <span>PET HOUSE CLUB</span>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-[#ff2a85] border-2 border-white shadow-[0_0_15px_rgba(255,42,133,0.9)] animate-bounce" />
                </div>
              </div>

              {/* Quick Action Footer under map */}
              <div className="p-4 bg-[#10131d] border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-xs text-gray-400">
                  Parqueadero privado para clientes y rampa de acceso pet-friendly.
                </p>
                <button
                  onClick={onOpenBooking}
                  className="w-full sm:w-auto px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#ff2a85] hover:bg-[#e01e77] shadow-[0_0_15px_rgba(255,42,133,0.4)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Reservar Cita Ahora</span>
                </button>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Staff CRM Access */}
        <div className="pt-8 border-t border-gray-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Pet House Club Montería. Todos los derechos reservados.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onOpenCRM}
              className="text-gray-400 hover:text-[#00f0ff] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>Acceso Staff CRM</span>
            </button>
            <span>·</span>
            <span>Montería, Colombia</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
