// types.ts
// Updated PackageData interface in types.ts
// types.ts

interface BookingDate {
  start: string;
  end: string;
}
export interface Booking {
  bookingDate: BookingDate;
  createdAt: string;
  housingCity: string;
  housingHost: string;
  housingId: string;
  housingPrice: number;
  housingTitle: string;
  orderId: string;
  packageId: string;
  packageTitle: string;
  price: number;
  status: string;
  userId: string;
}
export interface PackageData {
  bookingDate: string;
  city: string;
  description: string;
  image: string;
  packageId: string; // Firestore document ID
  price: number;
  tag: string;
  duration: number;
  title: string;
  rating?: number;
  reviews?: number;
  highlights?: string[];
  locationMap?: string;
}

export interface Package extends PackageData {
  id: string; // Firestore document ID
}

export interface PackageCardProps {
  title: string;
  city: string;
  description: string;
  price: number;
  tag: string;
  image: string;
  tagBgColor?: string; // Optional background color for the tag
}

export interface Housing {
  id: string;
  title: string;
  city: string;
  price: number;
  description: string;
  images: string[];
  tag: string;
  host: string;
  rooms: number;
  beds: number;
  bathroom: number;
  rating?: number;
  cancellationPolicy: string;
}

interface Category {
  name: string;
}
