import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, Users, Gift, Sparkles, Check, ArrowRight } from 'lucide-react';
import { CLUB_EVENTS } from '../data/clubData';
import { ClubEvent } from '../types';
import { formatCOP } from '../utils/booking';

interface EventsCalendarSectionProps {
  onRegisterEvent: (event: ClubEvent) => void;
}

export const EventsCalendarSection: React.FC<EventsCalendarSectionProps> = ({ onRegisterEvent }) => {
  const [selectedEventId, setSelectedEventId] = useState<string>(CLUB_EVENTS[0].id);

  const activeEvent = CLUB_EVENTS.find((e) => e.id === selectedEventId) || CLUB_EVENTS[0];

  // Calendar dates for November
  const calendarDays = [
    { day: 1, hasEvent: false },
    { day: 2, hasEvent: false },
    { day: 3, hasEvent: false },
    { day: 4, hasEvent: false },
    { day: 5, hasEvent: false },
    { day: 6, hasEvent: false },
    { day: 7, hasEvent: false },
    { day: 8, hasEvent: false },
    { day: 9, hasEvent: false },
    { day: 10, hasEvent: false },
    { day: 11, hasEvent: false },
    { day: 12, hasEvent: false },
    { day: 13, hasEvent: false },
    { day: 14, hasEvent: false },
    { day: 15, hasEvent: true, eventId: 'event-cumpleanos', title: 'Cumpleaños Perrunos' },
    { day: 16, hasEvent: false },
    { day: 17, hasEvent: false },
    { day: 18, hasEvent: false },
    { day: 19, hasEvent: false },
    { day: 20, hasEvent: true, eventId: 'event-charlas', title: 'Charla Nutrición' },
    { day: 21, hasEvent: false },
    { day: 22, hasEvent: false },
    { day: 23, hasEvent: true, eventId: 'event-pool-party', title: 'Splash Party' },
    { day: 24, hasEvent: false },
    { day: 25, hasEvent: false },
    { day: 26, hasEvent: false },
    { day: 27, hasEvent: false },
    { day: 28, hasEvent: false },
    { day: 29, hasEvent: false },
    { day: 30, hasEvent: false },
  ];

  return (
    <section id="eventos" className="py-24 bg-[#0a0c12] relative overflow-hidden">
      {/* Background glow */}
      <div 
        aria-hidden="true" 
        className="absolute bottom-0 right-10 w-96 h-96 bg-[#ffd600]/10 rounded-full blur-[110px] pointer-events-none" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#ffd600]/10 border border-[#ffd600]/30 text-[#ffd600] text-xs font-bold tracking-widest uppercase mb-3">
            <Gift className="w-3.5 h-3.5" />
            <span>COMUNIDAD & CELEBRACIONES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Eventos del Club <span className="text-[#ff2a85] text-glow-pink">& Calendario</span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg">
            Celebramos la vida de tu mascota y creamos momentos inolvidables en Montería. Explora la agenda y asegura tu cupo online.
          </p>
        </div>

        {/* Dynamic Calendar & Event Explorer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Dynamic Month Calendar (Left Column) */}
          <div className="lg:col-span-5 rounded-3xl bg-[#121520] border-2 border-gray-800 p-6 sm:p-7 shadow-xl">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
              <div className="flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-[#00f0ff]" />
                <h3 className="text-white font-bold text-base sm:text-lg">Noviembre 2026</h3>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#00f0ff]/10 text-[#00f0ff] font-semibold border border-[#00f0ff]/30">
                3 Eventos Programados
              </span>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-400 mb-2">
              <span>L</span>
              <span>M</span>
              <span>M</span>
              <span>J</span>
              <span>V</span>
              <span className="text-[#00f0ff]">S</span>
              <span className="text-[#ff2a85]">D</span>
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {calendarDays.map((item) => {
                const isSelected = item.eventId === selectedEventId;
                const hasEvent = item.hasEvent;

                return (
                  <button
                    key={item.day}
                    onClick={() => {
                      if (item.eventId) {
                        setSelectedEventId(item.eventId);
                      }
                    }}
                    className={`h-11 rounded-xl text-xs sm:text-sm font-semibold flex flex-col items-center justify-center transition-all relative ${
                      isSelected
                        ? 'bg-[#ff2a85] text-white shadow-[0_0_15px_rgba(255,42,133,0.7)] font-bold scale-105 z-10'
                        : hasEvent
                        ? 'bg-[#1e2335] text-[#ffd600] border border-[#ffd600]/60 hover:bg-[#252b42] font-bold cursor-pointer'
                        : 'text-gray-400 hover:text-gray-200 hover:bg-gray-800/40'
                    }`}
                  >
                    <span>{item.day}</span>
                    {hasEvent && (
                      <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-[#ffd600]'}`} />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Calendar legend */}
            <div className="mt-6 pt-4 border-t border-gray-800 flex items-center justify-between text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffd600]" />
                <span>Fecha con evento del Club</span>
              </div>
              <span className="text-gray-400">Toca el día para ver detalles</span>
            </div>
          </div>

          {/* Featured Active Event & Full Event Cards (Right Column) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Active Selected Event Detailed Card */}
            <div className="rounded-3xl bg-gradient-to-br from-[#161926] via-[#121420] to-[#0d0f17] border-2 border-[#00f0ff]/50 p-6 sm:p-8 shadow-[0_0_30px_rgba(0,240,255,0.15)] relative">
              
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <span className="px-3.5 py-1 rounded-full bg-[#ffd600]/20 text-[#ffd600] text-xs font-bold border border-[#ffd600]/40 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {activeEvent.badge}
                </span>

                <div className="flex items-center gap-2 text-xs text-gray-300">
                  <Clock className="w-4 h-4 text-[#00f0ff]" />
                  <span>{activeEvent.timeStr}</span>
                </div>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                {activeEvent.title}
              </h3>

              <div className="inline-block px-3 py-1 rounded-lg bg-gray-900 border border-gray-700 text-[#00f0ff] text-xs font-semibold mb-4">
                📅 {activeEvent.dateStr}
              </div>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
                {activeEvent.description}
              </p>

              {/* What's included */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                  ¿Qué incluye esta experiencia?
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeEvent.includes.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-gray-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spots bar & Pricing */}
              <div className="p-4 rounded-2xl bg-gray-900/90 border border-gray-800 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-gray-300 mb-1">
                    <Users className="w-4 h-4 text-[#ff2a85]" />
                    <span>
                      Cupos reservados: <strong>{activeEvent.bookedSpots}</strong> de {activeEvent.totalSpots}
                    </span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-48 h-2 rounded-full bg-gray-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#00f0ff] to-[#ff2a85]"
                      style={{
                        width: `${(activeEvent.bookedSpots / activeEvent.totalSpots) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-400 block">Inversión / Mascota</span>
                  <span className="font-display text-2xl font-extrabold text-[#ffd600]">
                    {formatCOP(activeEvent.priceCOP)}
                  </span>
                </div>
              </div>

              {/* Main Registration Button */}
              <button
                onClick={() => onRegisterEvent(activeEvent)}
                className="w-full py-4 px-6 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-[#ff2a85] to-[#f72585] hover:from-[#ff1a7a] hover:to-[#e01e77] shadow-[0_0_25px_rgba(255,42,133,0.5)] transition-all flex items-center justify-center gap-3 cursor-pointer group"
              >
                <span>¡INSCRIBIRSE A ESTE EVENTO AHORA!</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Quick Switcher among all 3 Events */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {CLUB_EVENTS.map((ev) => (
                <button
                  key={ev.id}
                  onClick={() => setSelectedEventId(ev.id)}
                  className={`p-3.5 rounded-2xl text-left border transition-all cursor-pointer ${
                    selectedEventId === ev.id
                      ? 'bg-[#181c2b] border-[#ffd600] text-white shadow-[0_0_15px_rgba(255,214,0,0.2)]'
                      : 'bg-[#10121a] border-gray-800 text-gray-400 hover:text-gray-200'
                  }`}
                >
                  <div className="text-xs font-bold text-[#00f0ff] mb-1">
                    {ev.dayNumber} Nov
                  </div>
                  <div className="text-xs font-semibold truncate text-white">
                    {ev.title.split('(')[0]}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-1">
                    {formatCOP(ev.priceCOP)}
                  </div>
                </button>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
