import { BookingFormData, CRMContact, PetSize } from '../types';
import { MAIN_SERVICES, ADDITIONAL_SERVICES } from '../data/clubData';

export const SIZE_SURCHARGES: Record<PetSize, number> = {
  small: 0,
  medium: 8000,
  large: 16000,
  giant: 25000,
};

export const DELIVERY_FLAT_COP = 15000;

export function formatCOP(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateEstimatedPrice(
  serviceId: string,
  petSize: PetSize = 'small',
  includesDelivery = false
): number {
  const allServices = [...MAIN_SERVICES, ...ADDITIONAL_SERVICES];
  const service = allServices.find((s) => s.id === serviceId);
  const base = service ? service.basePriceCOP : 40000;
  const sizeCost = SIZE_SURCHARGES[petSize] || 0;
  const deliveryCost = includesDelivery ? DELIVERY_FLAT_COP : 0;
  return base + sizeCost + deliveryCost;
}

export function generateAvailableSlots(dateStr: string): string[] {
  // If date is empty or invalid, return default slots
  if (!dateStr) return ['08:00 AM', '09:30 AM', '11:00 AM', '02:00 PM', '03:30 PM', '05:00 PM'];
  
  // Filter out past slots if date is today
  const baseSlots = [
    '07:30 AM',
    '08:30 AM',
    '09:30 AM',
    '10:30 AM',
    '11:30 AM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
  ];

  return baseSlots;
}

export function validateBooking(
  form: Partial<BookingFormData>
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!form.serviceId) {
    errors.serviceId = 'Por favor selecciona un servicio.';
  }

  if (!form.petName || form.petName.trim().length === 0) {
    errors.petName = 'El nombre de tu mascota es requerido.';
  }

  if (!form.petType) {
    errors.petType = 'Selecciona si es perrito o gatito.';
  }

  if (!form.date) {
    errors.date = 'Selecciona la fecha deseada.';
  }

  if (!form.timeSlot) {
    errors.timeSlot = 'Selecciona un horario disponible.';
  }

  if (!form.ownerName || form.ownerName.trim().length < 3) {
    errors.ownerName = 'Ingresa el nombre completo del tutor.';
  }

  if (!form.ownerPhone || form.ownerPhone.trim().replace(/\D/g, '').length < 7) {
    errors.ownerPhone = 'Ingresa un número de celular/WhatsApp válido.';
  }

  if (form.includesDelivery && (!form.deliveryAddress || form.deliveryAddress.trim().length < 5)) {
    errors.deliveryAddress = 'Ingresa la dirección para la recogida en Montería.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatWhatsAppBookingMessage(data: BookingFormData): string {
  const deliveryText = data.includesDelivery
    ? `*Servicio a Domicilio:* SÍ (${data.deliveryNeighborhood || 'Montería'} - ${data.deliveryAddress})`
    : '*Servicio a Domicilio:* No (Llegada al Club)';

  const lines = [
    `¡Hola Pet House Club! 🐾`,
    `Deseo confirmar mi cita agendada desde su página web:`,
    ``,
    `*Código:* #${data.id || 'PHC-' + Date.now().toString().slice(-4)}`,
    `*Tutor:* ${data.ownerName}`,
    `*Celular:* ${data.ownerPhone}`,
    `*Mascota:* ${data.petName} (${data.petType === 'dog' ? 'Perro' : 'Gato'} - Raza: ${data.petBreed || 'No especificada'}, Tamaño: ${data.petSize})`,
    `*Servicio:* ${data.serviceName}`,
    `*Fecha:* ${data.date}`,
    `*Hora:* ${data.timeSlot}`,
    deliveryText,
    `*Total Estimado:* ${formatCOP(data.totalEstimateCOP)}`,
    data.specialNotes ? `*Notas adicionales:* ${data.specialNotes}` : '',
    ``,
    `¡Quedo atento a la confirmación de su equipo en Montería! 🐶🐱✨`,
  ].filter(Boolean);

  return encodeURIComponent(lines.join('\n'));
}

export function transformBookingToCRMContact(booking: BookingFormData): CRMContact {
  return {
    id: booking.id || `crm-${Date.now()}`,
    clientName: booking.ownerName,
    phone: booking.ownerPhone,
    email: booking.ownerEmail || 'cliente@pethouseclub.com',
    petName: booking.petName,
    petType: booking.petType,
    petBreed: booking.petBreed || 'Mestizo',
    service: booking.serviceName,
    appointmentDate: booking.date,
    appointmentTime: booking.timeSlot,
    totalCOP: booking.totalEstimateCOP,
    includesDelivery: booking.includesDelivery,
    address: booking.deliveryAddress,
    neighborhood: booking.deliveryNeighborhood,
    status: booking.status || 'confirmed',
    notes: booking.specialNotes || 'Reserva generada desde el widget web.',
    source: 'web_booking',
    createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
  };
}
