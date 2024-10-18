// types.ts
export interface Package {
  id: string; // Firestore document ID
  title: string;
  city: string;
  description: string;
  price: number;
  tag: string;
  image: string;
  bookingDate?: string; // Add bookingDate if applicable
  packageId?: string; // Add packageId if applicable
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
