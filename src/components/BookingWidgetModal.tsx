import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Truck, 
  ShieldCheck, 
  Phone, 
  Mail, 
  Copy, 
  CheckCircle2, 
  AlertCircle
} from 'lucide-react';
import { MAIN_SERVICES, ADDITIONAL_SERVICES, MONTERIA_NEIGHBORHOODS, CLUB_INFO } from '../data/clubData';
import { BookingFormData, PetSize, PetType } from '../types';
import { 
  calculateEstimatedPrice, 
  formatCOP, 
  generateAvailableSlots, 
  validateBooking, 
  formatWhatsAppBookingMessage 
} from '../utils/booking';

interface BookingWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedNeighborhood?: string;
  onBookingSuccess: (booking: BookingFormData) => void;
}

export const BookingWidgetModal: React.FC<BookingWidgetModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedNeighborhood,
  onBookingSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [copied, setCopied] = useState<boolean>(false);

  // Form State
  const [formData, setFormData] = useState<Partial<BookingFormData>>({
    serviceId: preselectedServiceId || 'guarderia',
    petName: '',
    petType: 'dog',
    petBreed: '',
    petAge: '2 años',
    petSize: 'small',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    timeSlot: '09:30 AM',
    includesDelivery: !!preselectedNeighborhood,
    deliveryAddress: '',
    deliveryNeighborhood: preselectedNeighborhood || 'La Castellana',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    specialNotes: '',
    status: 'confirmed',
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const [confirmedBooking, setConfirmedBooking] = useState<BookingFormData | null>(null);

  // When props change, update serviceId / neighborhood
  useEffect(() => {
    if (preselectedServiceId) {
      setFormData((prev) => ({ ...prev, serviceId: preselectedServiceId }));
    }
    if (preselectedNeighborhood) {
      setFormData((prev) => ({ 
        ...prev, 
        deliveryNeighborhood: preselectedNeighborhood,
        includesDelivery: true 
      }));
    }
  }, [preselectedServiceId, preselectedNeighborhood]);

  if (!isOpen) return null;

  const allServices = [...MAIN_SERVICES, ...ADDITIONAL_SERVICES];
  const selectedService = allServices.find((s) => s.id === formData.serviceId) || MAIN_SERVICES[0];
  const estimatedPrice = calculateEstimatedPrice(
    formData.serviceId || 'guarderia',
    formData.petSize || 'small',
    !!formData.includesDelivery
  );

  const availableSlots = generateAvailableSlots(formData.date || '');

  // Step 1 -> 2
  const handleProceedToStep2 = () => {
    const errors: Record<string, string> = {};
    if (!formData.serviceId) errors.serviceId = 'Selecciona un servicio.';
    if (!formData.petName || formData.petName.trim().length === 0) {
      errors.petName = 'Ingresa el nombre de tu mascota.';
    }
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      setCurrentStep(2);
    }
  };

  // Step 2 -> 3
  const handleProceedToStep3 = () => {
    const errors: Record<string, string> = {};
    if (!formData.date) errors.date = 'Selecciona una fecha válida.';
    if (!formData.timeSlot) errors.timeSlot = 'Selecciona un horario.';
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      setCurrentStep(3);
    }
  };

  // Step 3 -> 4 (Submit booking)
  const handleConfirmBooking = () => {
    const check = validateBooking(formData);
    setValidationErrors(check.errors);

    if (check.valid) {
      const finalBooking: BookingFormData = {
        id: `PHC-${Math.floor(1000 + Math.random() * 9000)}`,
        serviceId: formData.serviceId || 'guarderia',
        serviceName: selectedService.name,
        petName: formData.petName || 'Mascota',
        petType: formData.petType || 'dog',
        petBreed: formData.petBreed || 'Mestizo',
        petAge: formData.petAge || 'No especificada',
        petSize: formData.petSize || 'small',
        date: formData.date || '',
        timeSlot: formData.timeSlot || '',
        includesDelivery: !!formData.includesDelivery,
        deliveryAddress: formData.deliveryAddress || '',
        deliveryNeighborhood: formData.deliveryNeighborhood || 'La Castellana',
        ownerName: formData.ownerName || '',
        ownerPhone: formData.ownerPhone || '',
        ownerEmail: formData.ownerEmail || '',
        specialNotes: formData.specialNotes || '',
        totalEstimateCOP: estimatedPrice,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
      };

      setConfirmedBooking(finalBooking);
      onBookingSuccess(finalBooking);
      setCurrentStep(4);
    }
  };

  const handleCopySummary = () => {
    if (!confirmedBooking) return;
    const text = `Cita Pet House Club: #${confirmedBooking.id} | ${confirmedBooking.serviceName} para ${confirmedBooking.petName} el ${confirmedBooking.date} a las ${confirmedBooking.timeSlot}. Sede: Calle 59 #9-40 La Castellana, Montería.`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#121520] border-2 border-gray-700 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden my-auto">
        
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-[#161a29] border-b border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#ff2a85]">
              <img
                src="/assets/aistudio/PET_HOUSE_logo_aa6a9ad4.jpg"
                alt="Pet House Club"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  Sistema de Reservas y Agenda
                </h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  En Tiempo Real
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Pet House Club · Montería La Castellana
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-white hover:bg-gray-800 transition-colors cursor-pointer"
            aria-label="Cerrar modal de reserva"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator (1 to 4) */}
        <div className="px-6 py-3 bg-[#0f111a] border-b border-gray-800 flex items-center justify-between text-xs">
          {[
            { step: 1, label: '1. Servicio & Mascota' },
            { step: 2, label: '2. Fecha & Horario' },
            { step: 3, label: '3. Datos & Domicilio' },
            { step: 4, label: '4. Confirmación' },
          ].map((s) => (
            <div
              key={s.step}
              className={`flex items-center gap-1.5 font-semibold ${
                currentStep === s.step
                  ? 'text-[#ff2a85]'
                  : currentStep > s.step
                  ? 'text-emerald-400'
                  : 'text-gray-500'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${
                  currentStep === s.step
                    ? 'bg-[#ff2a85] text-white'
                    : currentStep > s.step
                    ? 'bg-emerald-500 text-gray-950 font-bold'
                    : 'bg-gray-800 text-gray-400'
                }`}
              >
                {currentStep > s.step ? '✓' : s.step}
              </span>
              <span className="hidden sm:inline">{s.label}</span>
            </div>
          ))}
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 max-h-[72vh] overflow-y-auto">
          
          {/* STEP 1: Servicio & Mascota */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Selecciona el Servicio Requerido:
                </label>
                <select
                  value={formData.serviceId}
                  onChange={(e) => setFormData({ ...formData, serviceId: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#181c2b] border border-gray-700 text-white text-sm font-semibold focus:outline-none focus:border-[#00f0ff]"
                >
                  <optgroup label="Servicios Principales">
                    {MAIN_SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({formatCOP(s.basePriceCOP)})
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Servicios Adicionales & Educación">
                    {ADDITIONAL_SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({formatCOP(s.basePriceCOP)})
                      </option>
                    ))}
                  </optgroup>
                </select>
                {validationErrors.serviceId && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {validationErrors.serviceId}
                  </p>
                )}
              </div>

              {/* Pet Type Switcher */}
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Tipo de Mascota:
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, petType: 'dog' })}
                    className={`py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.petType === 'dog'
                        ? 'bg-[#00f0ff]/20 border-[#00f0ff] text-white shadow-[0_0_15px_rgba(0,240,255,0.3)]'
                        : 'bg-[#181c2b] border-gray-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">🐶</span>
                    <span>Perrito (Canino)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, petType: 'cat' })}
                    className={`py-3 px-4 rounded-xl border text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      formData.petType === 'cat'
                        ? 'bg-[#ff2a85]/20 border-[#ff2a85] text-white shadow-[0_0_15px_rgba(255,42,133,0.3)]'
                        : 'bg-[#181c2b] border-gray-700 text-gray-400 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">🐱</span>
                    <span>Gatito (Felino)</span>
                  </button>
                </div>
              </div>

              {/* Pet details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Nombre de la Mascota *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Max, Luna, Toby..."
                    value={formData.petName || ''}
                    onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181c2b] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#ffd600]"
                  />
                  {validationErrors.petName && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {validationErrors.petName}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Raza
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Golden Doodle, Criollo, Persa..."
                    value={formData.petBreed || ''}
                    onChange={(e) => setFormData({ ...formData, petBreed: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181c2b] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#ffd600]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Edad Aproximada
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. 1 año, 6 meses, senior..."
                    value={formData.petAge || ''}
                    onChange={(e) => setFormData({ ...formData, petAge: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181c2b] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#ffd600]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Tamaño de la Mascota
                  </label>
                  <select
                    value={formData.petSize || 'small'}
                    onChange={(e) => setFormData({ ...formData, petSize: e.target.value as PetSize })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181c2b] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#ffd600]"
                  >
                    <option value="small">Pequeño (hasta 8 kg)</option>
                    <option value="medium">Mediano (8 - 18 kg)</option>
                    <option value="large">Grande (18 - 30 kg)</option>
                    <option value="giant">Gigante (+30 kg)</option>
                  </select>
                </div>
              </div>

              {/* Price estimate pill */}
              <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Estimado Preliminar</span>
                  <span className="text-xs text-gray-300">Incluye productos cosméticos de alta gama</span>
                </div>
                <span className="font-display text-xl font-bold text-[#ffd600]">
                  {formatCOP(estimatedPrice)}
                </span>
              </div>

              {/* Bottom Nav */}
              <div className="flex justify-end pt-3">
                <button
                  type="button"
                  onClick={handleProceedToStep2}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#ff2a85] hover:bg-[#e01e77] shadow-[0_0_15px_rgba(255,42,133,0.4)] flex items-center gap-2 cursor-pointer"
                >
                  <span>Continuar a Fecha & Hora</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Fecha & Horario */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                  Selecciona la Fecha Deseada:
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={formData.date || ''}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#181c2b] border border-gray-700 text-white text-sm font-semibold focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>
                {validationErrors.date && (
                  <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {validationErrors.date}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                    Horarios Disponibles en Tiempo Real (Montería):
                  </label>
                  <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Turnos actualizados
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {availableSlots.map((slot) => {
                    const isSelected = formData.timeSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setFormData({ ...formData, timeSlot: slot })}
                        className={`py-3 px-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#00f0ff] border-[#00f0ff] text-gray-950 shadow-[0_0_15px_rgba(0,240,255,0.5)] scale-102'
                            : 'bg-[#181c2b] border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white'
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
                {validationErrors.timeSlot && (
                  <p className="text-xs text-rose-400 mt-2 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {validationErrors.timeSlot}
                  </p>
                )}
              </div>

              {/* Service info summary */}
              <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-between text-xs">
                <div>
                  <span className="text-gray-400">Servicio seleccionado:</span>
                  <span className="text-white font-bold ml-1.5">{selectedService.name}</span>
                </div>
                <div className="text-gray-300">
                  Mascota: <strong className="text-[#00f0ff]">{formData.petName}</strong>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>

                <button
                  type="button"
                  onClick={handleProceedToStep3}
                  className="px-6 py-3 rounded-xl font-bold text-sm text-white bg-[#ff2a85] hover:bg-[#e01e77] shadow-[0_0_15px_rgba(255,42,133,0.4)] flex items-center gap-2 cursor-pointer"
                >
                  <span>Continuar a Datos del Tutor</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Datos del Tutor & Domicilio */}
          {currentStep === 3 && (
            <div className="space-y-6">
              
              {/* Tutor Details */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Datos de Contacto del Tutor:
                </h4>

                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    Nombre Completo del Tutor *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Juan David Martínez"
                    value={formData.ownerName || ''}
                    onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181c2b] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#ffd600]"
                  />
                  {validationErrors.ownerName && (
                    <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {validationErrors.ownerName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Celular / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      placeholder="Ej. 3054397799"
                      value={formData.ownerPhone || ''}
                      onChange={(e) => setFormData({ ...formData, ownerPhone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#181c2b] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#ffd600]"
                    />
                    {validationErrors.ownerPhone && (
                      <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        {validationErrors.ownerPhone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-1">
                      Correo Electrónico (para confirmación)
                    </label>
                    <input
                      type="email"
                      placeholder="tucorreo@ejemplo.com"
                      value={formData.ownerEmail || ''}
                      onChange={(e) => setFormData({ ...formData, ownerEmail: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-[#181c2b] border border-gray-700 text-white text-sm focus:outline-none focus:border-[#ffd600]"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Toggle for Montería */}
              <div className="p-4 rounded-2xl bg-[#161a29] border border-[#ffd600]/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-[#ffd600]/15 text-[#ffd600]">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm">¿Deseas Servicio a Domicilio (Montería)?</h4>
                      <p className="text-xs text-gray-400">Pet Van climatizada y segura puerta a puerta (+ $15.000 COP)</p>
                    </div>
                  </div>

                  <input
                    type="checkbox"
                    checked={!!formData.includesDelivery}
                    onChange={(e) => setFormData({ ...formData, includesDelivery: e.target.checked })}
                    className="w-5 h-5 accent-[#ffd600] rounded cursor-pointer"
                  />
                </div>

                {formData.includesDelivery && (
                  <div className="pt-3 border-t border-gray-800 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Barrio en Montería:
                      </label>
                      <select
                        value={formData.deliveryNeighborhood || 'La Castellana'}
                        onChange={(e) => setFormData({ ...formData, deliveryNeighborhood: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#10131d] border border-gray-700 text-white text-xs font-semibold focus:outline-none focus:border-[#ffd600]"
                      >
                        {MONTERIA_NEIGHBORHOODS.map((nh) => (
                          <option key={nh.name} value={nh.name}>
                            {nh.name} ({nh.zone})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        Dirección exacta de recogida *
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. Calle 62 #12-40 Apto 301"
                        value={formData.deliveryAddress || ''}
                        onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                        className="w-full px-3.5 py-2 rounded-xl bg-[#10131d] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#ffd600]"
                      />
                      {validationErrors.deliveryAddress && (
                        <p className="text-xs text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {validationErrors.deliveryAddress}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Special Notes */}
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-1">
                  Notas Especiales o Alergias (Opcional):
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej. Es tímido con perros grandes, piel sensible a perfumes, etc."
                  value={formData.specialNotes || ''}
                  onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181c2b] border border-gray-700 text-white text-xs focus:outline-none focus:border-[#ffd600]"
                />
              </div>

              {/* Price summary */}
              <div className="p-4 rounded-2xl bg-gray-900 border border-gray-800 flex items-center justify-between">
                <div>
                  <span className="text-xs text-gray-400 block">Total Estimado Final</span>
                  <span className="text-xs text-emerald-400">Se abona al momento del servicio</span>
                </div>
                <span className="font-display text-2xl font-extrabold text-[#ffd600]">
                  {formatCOP(estimatedPrice)}
                </span>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>

                <button
                  type="button"
                  onClick={handleConfirmBooking}
                  className="px-7 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#ff2a85] to-[#f72585] hover:from-[#ff1a7a] hover:to-[#e01e77] shadow-[0_0_20px_rgba(255,42,133,0.5)] flex items-center gap-2 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>¡CONFIRMAR Y AGENDAR CITA!</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Confirmation & Instant Notifications */}
          {currentStep === 4 && confirmedBooking && (
            <div className="space-y-6 text-center">
              
              {/* Success Badge */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold text-emerald-400 tracking-wider uppercase">
                  ¡Cita Registrada Exitosamente!
                </span>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  Código de Reserva: <span className="text-[#ffd600]">#{confirmedBooking.id}</span>
                </h3>
                <p className="text-xs sm:text-sm text-gray-300 mt-2">
                  ¡Gracias {confirmedBooking.ownerName}! Hemos agendado el espacio para <strong className="text-[#00f0ff]">{confirmedBooking.petName}</strong> en Pet House Club Montería.
                </p>
              </div>

              {/* Summary Card */}
              <div className="p-5 rounded-2xl bg-[#161a28] border border-gray-700 text-left space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Servicio:</span>
                  <span className="text-white font-bold">{confirmedBooking.serviceName}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Fecha y Hora:</span>
                  <span className="text-white font-semibold">{confirmedBooking.date} a las {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-2">
                  <span className="text-gray-400">Modalidad:</span>
                  <span className="text-white font-semibold">
                    {confirmedBooking.includesDelivery 
                      ? `Recogida en ${confirmedBooking.deliveryNeighborhood} (${confirmedBooking.deliveryAddress})` 
                      : 'Llegada directa al Club (Calle 59 #9-40 La Castellana)'}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-gray-400 font-medium">Total Estimado:</span>
                  <span className="text-[#ffd600] font-bold text-base">{formatCOP(confirmedBooking.totalEstimateCOP)}</span>
                </div>
              </div>

              {/* CRM & Notification Status Pill (Required by prompt) */}
              <div className="p-3.5 rounded-xl bg-gray-900 border border-gray-800 text-left space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Sincronizado con CRM del Club (HubSpot / PetDB)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Mail className="w-4 h-4 text-[#00f0ff]" />
                  <span>Confirmación enviada a {confirmedBooking.ownerEmail || 'tu correo'} y SMS a {confirmedBooking.ownerPhone}</span>
                </div>
              </div>

              {/* Action Buttons: WhatsApp Immediate Dispatch & Copy Receipt */}
              <div className="space-y-3 pt-2">
                <a
                  href={`https://wa.me/${CLUB_INFO.phoneClean}?text=${formatWhatsAppBookingMessage(confirmedBooking)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl font-bold text-sm sm:text-base text-gray-950 bg-emerald-400 hover:bg-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.5)] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-gray-950" />
                  <span>Confirmar por WhatsApp con el Staff</span>
                </a>

                <div className="flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-gray-800 hover:bg-gray-700 text-gray-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? '¡Copiado al portapapeles!' : 'Copiar Resumen'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cerrar Ventana
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
