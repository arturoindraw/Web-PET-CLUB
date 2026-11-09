/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { ServicesSection } from './components/ServicesSection';
import { HomeDeliveryHighlight } from './components/HomeDeliveryHighlight';
import { AdditionalServices } from './components/AdditionalServices';
import { EventsCalendarSection } from './components/EventsCalendarSection';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FooterSection } from './components/FooterSection';
import { BookingWidgetModal } from './components/BookingWidgetModal';
import { LiveChatWidget } from './components/LiveChatWidget';
import { CRMStaffModal } from './components/CRMStaffModal';
import { INITIAL_CRM_CONTACTS, CLUB_INFO } from './data/clubData';
import { CRMContact, BookingFormData, ClubEvent } from './types';
import { transformBookingToCRMContact } from './utils/booking';
import { Phone, Calendar, Sparkles } from 'lucide-react';

export default function App() {
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [crmModalOpen, setCrmModalOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [preselectedNeighborhood, setPreselectedNeighborhood] = useState<string | undefined>(undefined);
  
  // Persistent CRM storage
  const [crmContacts, setCrmContacts] = useState<CRMContact[]>(() => {
    try {
      const saved = localStorage.getItem('pethouse_crm_contacts');
      return saved ? JSON.parse(saved) : INITIAL_CRM_CONTACTS;
    } catch {
      return INITIAL_CRM_CONTACTS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('pethouse_crm_contacts', JSON.stringify(crmContacts));
    } catch (e) {
      console.warn('Could not persist CRM to localStorage', e);
    }
  }, [crmContacts]);

  const handleOpenBooking = (serviceId?: string) => {
    setPreselectedServiceId(serviceId);
    setPreselectedNeighborhood(undefined);
    setBookingModalOpen(true);
  };

  const handleOpenBookingWithNeighborhood = (neighborhood: string) => {
    setPreselectedServiceId('domicilio');
    setPreselectedNeighborhood(neighborhood);
    setBookingModalOpen(true);
  };

  const handleRegisterEvent = (event: ClubEvent) => {
    setPreselectedServiceId('guarderia');
    setBookingModalOpen(true);
  };

  const handleBookingSuccess = (booking: BookingFormData) => {
    const newCRM = transformBookingToCRMContact(booking);
    setCrmContacts((prev) => [newCRM, ...prev]);
  };

  const handleSaveChatToCRM = (chatLog: string, clientName = 'Visitante Web', phone = 'Por WhatsApp') => {
    setCrmContacts((prev) => {
      const existingIdx = prev.findIndex((c) => c.source === 'live_chat' && c.clientName === clientName);
      if (existingIdx >= 0) {
        const copy = [...prev];
        copy[existingIdx].notes = chatLog;
        return copy;
      } else {
        const newContact: CRMContact = {
          id: `crm-chat-${Date.now()}`,
          clientName: clientName,
          phone: phone,
          email: 'chat@pethouseclub.com',
          petName: 'Por definir en chat',
          petType: 'dog',
          petBreed: 'Por definir',
          service: 'Consulta Chat en Vivo',
          appointmentDate: new Date().toISOString().slice(0, 10),
          appointmentTime: 'Inmediata',
          totalCOP: 0,
          includesDelivery: false,
          status: 'pending',
          notes: chatLog,
          source: 'live_chat',
          createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        };
        return [newContact, ...prev];
      }
    });
  };

  const handleUpdateCRMStatus = (id: string, newStatus: CRMContact['status']) => {
    setCrmContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleScrollToServices = () => {
    const el = document.getElementById('servicios');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0e1015] text-[#f3f4f6] selection:bg-[#ff2a85] selection:text-white">
      
      {/* Schema.org Structured Data for LocalBusiness in Montería */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'LocalBusiness',
            name: 'PET HOUSE CLUB Montería',
            image: '/assets/aistudio/PET_HOUSE_logo_aa6a9ad4.jpg',
            telephone: '+57 305 4397799',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Calle 59 #9-40 B. La Castellana',
              addressLocality: 'Montería',
              addressRegion: 'Córdoba',
              addressCountry: 'CO',
            },
            geo: {
              '@type': 'GeoCoordinates',
              latitude: 8.7612,
              longitude: -75.8754,
            },
            priceRange: '$$',
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                opens: '07:00',
                closes: '19:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Sunday'],
                opens: '08:00',
                closes: '16:00',
              },
            ],
          }),
        }}
      />

      {/* Navigation */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        onOpenCRM={() => setCrmModalOpen(true)}
        crmCount={crmContacts.length}
      />

      {/* Main Content Sections */}
      <main>
        {/* Section A: Hero */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreServices={handleScrollToServices}
        />

        {/* Section B: Nosotros (Misión) */}
        <AboutUs onOpenBooking={() => handleOpenBooking('guarderia')} />

        {/* Section C: Servicios Principales */}
        <ServicesSection
          onSelectServiceToBook={(sId) => handleOpenBooking(sId)}
          onExploreDelivery={() => {
            const el = document.getElementById('domicilio');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Highlight: Servicio a Domicilio (Montería) */}
        <HomeDeliveryHighlight
          onBookWithDelivery={(neighborhood) => handleOpenBookingWithNeighborhood(neighborhood)}
        />

        {/* Section D: Servicios Adicionales & Educación */}
        <AdditionalServices
          onSelectServiceToBook={(sId) => handleOpenBooking(sId)}
        />

        {/* Section E: Eventos del Club & Calendario Dinámico */}
        <EventsCalendarSection
          onRegisterEvent={handleRegisterEvent}
        />

        {/* Section F: Galería de Fotos */}
        <GallerySection />

        {/* Section G: Testimonios */}
        <TestimonialsSection />

        {/* Section H: Contacto, Ubicación y Footer */}
        <FooterSection
          onOpenBooking={() => handleOpenBooking()}
          onOpenCRM={() => setCrmModalOpen(true)}
        />
      </main>

      {/* Fixed Quick Bar on Mobile for maximum conversion */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0e1017]/95 border-t border-gray-800 p-3 backdrop-blur-md flex items-center gap-2">
        <a
          href={CLUB_INFO.social.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="p-3 rounded-xl bg-emerald-600/30 text-emerald-300 border border-emerald-500/50 flex items-center justify-center"
          aria-label="WhatsApp Montería"
        >
          <Phone className="w-5 h-5" />
        </a>
        <button
          onClick={() => handleOpenBooking()}
          className="flex-1 py-3 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#ff2a85] to-[#f72585] shadow-[0_0_15px_rgba(255,42,133,0.5)] flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          <span>¡RESERVAR CITA AHORA!</span>
        </button>
      </div>

      {/* Modals & Live Chat */}
      <BookingWidgetModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedServiceId={preselectedServiceId}
        preselectedNeighborhood={preselectedNeighborhood}
        onBookingSuccess={handleBookingSuccess}
      />

      <CRMStaffModal
        isOpen={crmModalOpen}
        onClose={() => setCrmModalOpen(false)}
        contacts={crmContacts}
        onUpdateStatus={handleUpdateCRMStatus}
      />

      <LiveChatWidget
        onOpenBooking={() => handleOpenBooking()}
        onSaveChatToCRM={handleSaveChatToCRM}
      />
    </div>
  );
}
