// types.ts
// Updated PackageData interface in types.ts
export interface PackageData {
  bookingDate: string;
  city: string;
  description: string;
  image: string;
  packageId: string;
  price: number;
  tag: string;
  title: string;
  highlights?: string[]; // Optional array of highlights
  locationMap?: string; // Optional string for the location map URL
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
  image: string;
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

const categories: Category[] = [
  {
    name: "Historical",
  },
  {
    name: "Food",
  },
  {
    name: "Music",
  },
  {
    name: "Adventure & Outdoor",
  },
  {
    name: "Art & Culture",
  },
  {
    name: "Nature & Wildlife",
  },
  {
    name: "Sports",
  },
  {
    name: "Wellness",
  },
  {
    name: "Nightlife",
  },
  {
    name: "Technology",
  },
  {
    name: "Photography",
  },
  {
    name: "Shopping",
  },
  {
    name: "Architecture",
  },
  {
    name: "Festivals",
  },
  {
    name: "Luxury Travel",
  },
  {
    name: "Spiritual Retreats",
  },
  {
    name: "Volunteering",
  },
];
