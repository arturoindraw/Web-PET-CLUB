export type PetType = 'dog' | 'cat';
export type PetSize = 'small' | 'medium' | 'large' | 'giant';

export interface ClubService {
  id: string;
  name: string;
  category: 'daycare' | 'grooming' | 'spa' | 'food' | 'boutique' | 'delivery' | 'training' | 'nutrition' | 'vet';
  tagline: string;
  description: string;
  features: string[];
  basePriceCOP: number;
  priceNote: string;
  durationMinutes: number;
  neonColor: 'blue' | 'pink' | 'yellow';
  popular?: boolean;
  petType: 'all' | 'dog' | 'cat';
}

export interface ClubEvent {
  id: string;
  title: string;
  dateStr: string;
  timeStr: string;
  dayNumber: number;
  monthName: string;
  category: 'celebration' | 'workshop' | 'themed_day';
  description: string;
  includes: string[];
  priceCOP: number;
  totalSpots: number;
  bookedSpots: number;
  badge: string;
}

export interface BookingFormData {
  id?: string;
  serviceId: string;
  serviceName: string;
  petName: string;
  petType: PetType;
  petBreed: string;
  petAge: string;
  petSize: PetSize;
  date: string;
  timeSlot: string;
  includesDelivery: boolean;
  deliveryAddress: string;
  deliveryNeighborhood: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  specialNotes: string;
  totalEstimateCOP: number;
  createdAt: string;
  status: 'confirmed' | 'pending' | 'in_service' | 'completed';
}

export interface CRMContact {
  id: string;
  clientName: string;
  phone: string;
  email: string;
  petName: string;
  petType: PetType;
  petBreed: string;
  service: string;
  appointmentDate: string;
  appointmentTime: string;
  totalCOP: number;
  includesDelivery: boolean;
  address?: string;
  neighborhood?: string;
  status: 'confirmed' | 'pending' | 'in_service' | 'completed';
  notes: string;
  source: 'web_booking' | 'live_chat' | 'whatsapp';
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user' | 'agent';
  text: string;
  timestamp: string;
  quickReplies?: { label: string; action: string }[];
}

export interface Testimonial {
  id: string;
  ownerName: string;
  petName: string;
  petBreed: string;
  petType: PetType;
  rating: number;
  neighborhood: string;
  comment: string;
  avatarUrl: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'spa' | 'guarderia' | 'peluqueria' | 'eventos' | 'instalaciones';
  imageUrl: string;
  caption: string;
}
