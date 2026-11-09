import React, { useState } from 'react';
import { Phone, Calendar, MessageCircle, Menu, X, Users, MapPin, Sparkles } from 'lucide-react';
import { CLUB_INFO } from '../data/clubData';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenCRM: () => void;
  crmCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenCRM, crmCount }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0e1015]/90 backdrop-blur-md border-b border-gray-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('hero');
            }}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#ff2a85] p-0.5 shadow-[0_0_15px_rgba(255,42,133,0.4)] group-hover:shadow-[0_0_20px_rgba(0,240,255,0.6)] transition-all">
              <img
                src="/assets/aistudio/PET_HOUSE_logo_aa6a9ad4.jpg"
                alt="Pet House Club Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-xl sm:text-2xl font-bold tracking-wide text-white group-hover:text-[#ffd600] transition-colors">
                  PET HOUSE
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded bg-[#ff2a85]/20 text-[#ff2a85] font-semibold border border-[#ff2a85]/40 tracking-wider">
                  CLUB
                </span>
              </div>
              <p className="text-[11px] text-gray-400 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-[#00f0ff]" />
                La Castellana · Montería
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-300">
            <button
              onClick={() => scrollToSection('nosotros')}
              className="hover:text-[#00f0ff] transition-colors"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="hover:text-[#ff2a85] transition-colors"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('domicilio')}
              className="hover:text-[#ffd600] transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffd600]" />
              Domicilio
            </button>
            <button
              onClick={() => scrollToSection('eventos')}
              className="hover:text-[#00f0ff] transition-colors"
            >
              Eventos & Clases
            </button>
            <button
              onClick={() => scrollToSection('galeria')}
              className="hover:text-[#ff2a85] transition-colors"
            >
              Galería
            </button>
            <button
              onClick={() => scrollToSection('testimonios')}
              className="hover:text-gray-100 transition-colors"
            >
              Testimonios
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="hover:text-[#00f0ff] transition-colors"
            >
              Ubicación
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Staff CRM Portal Toggle Button */}
            <button
              onClick={onOpenCRM}
              title="Panel de CRM y Gestión de Citas (Staff)"
              className="relative px-3 py-1.5 rounded-lg text-xs font-semibold text-gray-300 bg-gray-800/80 hover:bg-gray-700/80 border border-gray-700 hover:border-gray-500 transition-all flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-[#00f0ff]" />
              <span>CRM Staff</span>
              {crmCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#ff2a85] text-white text-[10px] font-bold">
                  {crmCount}
                </span>
              )}
            </button>

            {/* Direct WhatsApp */}
            <a
              href={CLUB_INFO.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contactar por WhatsApp a Pet House Club"
              className="p-2.5 rounded-xl bg-gray-900/90 text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-400/60 shadow-[0_0_12px_rgba(16,185,129,0.2)] transition-all"
            >
              <Phone className="w-4 h-4" />
            </a>

            {/* Main Booking CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#ff2a85] to-[#f72585] hover:from-[#ff1a7a] hover:to-[#e01e77] shadow-[0_0_20px_rgba(255,42,133,0.5)] hover:shadow-[0_0_25px_rgba(255,42,133,0.7)] transition-all flex items-center gap-2 transform active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>RESERVA CITA</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-[#ff2a85] shadow-[0_0_12px_rgba(255,42,133,0.5)]"
            >
              Reservar
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-300 hover:text-white bg-gray-800"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#11131a] border-b border-gray-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 text-sm font-medium">
            <button
              onClick={() => scrollToSection('nosotros')}
              className="p-2.5 text-left rounded-lg bg-gray-900/60 text-gray-200 hover:text-[#00f0ff]"
            >
              Nosotros
            </button>
            <button
              onClick={() => scrollToSection('servicios')}
              className="p-2.5 text-left rounded-lg bg-gray-900/60 text-gray-200 hover:text-[#ff2a85]"
            >
              Servicios
            </button>
            <button
              onClick={() => scrollToSection('domicilio')}
              className="p-2.5 text-left rounded-lg bg-gray-900/60 text-[#ffd600] font-semibold"
            >
              🚐 Domicilio Montería
            </button>
            <button
              onClick={() => scrollToSection('eventos')}
              className="p-2.5 text-left rounded-lg bg-gray-900/60 text-gray-200 hover:text-[#00f0ff]"
            >
              Eventos & Clases
            </button>
            <button
              onClick={() => scrollToSection('galeria')}
              className="p-2.5 text-left rounded-lg bg-gray-900/60 text-gray-200 hover:text-[#ff2a85]"
            >
              Galería
            </button>
            <button
              onClick={() => scrollToSection('contacto')}
              className="p-2.5 text-left rounded-lg bg-gray-900/60 text-gray-200 hover:text-[#00f0ff]"
            >
              Ubicación & Mapa
            </button>
          </div>

          <div className="pt-2 border-t border-gray-800 flex items-center justify-between gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCRM();
              }}
              className="flex-1 py-2 rounded-lg bg-gray-800 text-xs font-semibold text-gray-200 flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-[#00f0ff]" />
              CRM Staff ({crmCount})
            </button>
            <a
              href={CLUB_INFO.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-lg bg-emerald-600/30 border border-emerald-500/50 text-xs font-semibold text-emerald-300 flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              WhatsApp Montería
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
