import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateEstimatedPrice,
  formatCOP,
  validateBooking,
  formatWhatsAppBookingMessage,
  transformBookingToCRMContact,
  DELIVERY_FLAT_COP,
} from './booking';
import { BookingFormData } from '../types';

test('calculateEstimatedPrice calculates daycare correctly with size and delivery', () => {
  // guarderia base is 38000
  const smallNoDelivery = calculateEstimatedPrice('guarderia', 'small', false);
  assert.equal(smallNoDelivery, 38000);

  const mediumWithDelivery = calculateEstimatedPrice('guarderia', 'medium', true);
  // 38000 + 8000 + 15000 = 61000
  assert.equal(mediumWithDelivery, 61000);

  const giantWithDelivery = calculateEstimatedPrice('guarderia', 'giant', true);
  // 38000 + 25000 + 15000 = 78000
  assert.equal(giantWithDelivery, 78000);
});

test('formatCOP formats Colombian Peso currency string', () => {
  const formatted = formatCOP(55000);
  assert.ok(formatted.includes('55.000') || formatted.includes('55,000') || formatted.includes('$'));
});

test('validateBooking checks for required fields correctly', () => {
  // Empty form should fail
  const emptyResult = validateBooking({});
  assert.equal(emptyResult.valid, false);
  assert.ok(emptyResult.errors.serviceId);
  assert.ok(emptyResult.errors.petName);
  assert.ok(emptyResult.errors.ownerName);

  // Valid form without delivery
  const validData: Partial<BookingFormData> = {
    serviceId: 'peluqueria',
    petName: 'Rocky',
    petType: 'dog',
    date: '2026-11-20',
    timeSlot: '10:00 AM',
    ownerName: 'Andrea Sierra',
    ownerPhone: '3051234567',
    includesDelivery: false,
  };
  const validResult = validateBooking(validData);
  assert.equal(validResult.valid, true);
  assert.equal(Object.keys(validResult.errors).length, 0);

  // If delivery is checked but no address given, it should fail
  const deliveryWithoutAddress: Partial<BookingFormData> = {
    ...validData,
    includesDelivery: true,
    deliveryAddress: '',
  };
  const deliveryResult = validateBooking(deliveryWithoutAddress);
  assert.equal(deliveryResult.valid, false);
  assert.ok(deliveryResult.errors.deliveryAddress);
});

test('formatWhatsAppBookingMessage creates encoded text with pet and owner details', () => {
  const sample: BookingFormData = {
    id: 'PHC-9988',
    serviceId: 'guarderia',
    serviceName: 'Guardería (Pet Daycare)',
    petName: 'Milo',
    petType: 'dog',
    petBreed: 'Golden Retriever',
    petAge: '2 años',
    petSize: 'large',
    date: '2026-11-15',
    timeSlot: '08:00 AM',
    includesDelivery: true,
    deliveryAddress: 'Calle 59 #10-25',
    deliveryNeighborhood: 'La Castellana',
    ownerName: 'Laura Perez',
    ownerPhone: '3054397799',
    ownerEmail: 'laura@test.com',
    specialNotes: 'Llevar comida propia',
    totalEstimateCOP: 69000,
    createdAt: '2026-11-09',
    status: 'confirmed',
  };

  const message = decodeURIComponent(formatWhatsAppBookingMessage(sample));
  assert.ok(message.includes('Milo'));
  assert.ok(message.includes('Laura Perez'));
  assert.ok(message.includes('Guardería'));
  assert.ok(message.includes('La Castellana'));
});

test('transformBookingToCRMContact maps fields into CRM structure', () => {
  const sample: BookingFormData = {
    id: 'PHC-1122',
    serviceId: 'bano-spa',
    serviceName: 'Baño y Aseo Completo',
    petName: 'Canela',
    petType: 'dog',
    petBreed: 'Poodle',
    petAge: '3 años',
    petSize: 'small',
    date: '2026-11-18',
    timeSlot: '03:00 PM',
    includesDelivery: false,
    deliveryAddress: '',
    deliveryNeighborhood: '',
    ownerName: 'Daniel Soto',
    ownerPhone: '3109876543',
    ownerEmail: 'daniel@example.com',
    specialNotes: 'Alérgica a perfumes fuertes',
    totalEstimateCOP: 42000,
    createdAt: '2026-11-09',
    status: 'confirmed',
  };

  const crm = transformBookingToCRMContact(sample);
  assert.equal(crm.clientName, 'Daniel Soto');
  assert.equal(crm.petName, 'Canela');
  assert.equal(crm.totalCOP, 42000);
  assert.equal(crm.source, 'web_booking');
  assert.equal(crm.status, 'confirmed');
});
