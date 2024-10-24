// context/BookingContext.tsx
"use client";
import { createContext, useState, ReactNode } from "react";

interface BookingContextType {
  bookingId: string | null;
  packageId: string | null;
  housingId: string | null;
  setPackageId: (id: string) => void;
  setHousingId: (id: string) => void;
  setBookingId: (id: string) => void;
}

export const BookingContext = createContext<BookingContextType | undefined>(
  undefined
);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [packageId, setPackageId] = useState<string | null>(null);
  const [housingId, setHousingId] = useState<string | null>(null);

  return (
    <BookingContext.Provider
      value={{
        bookingId,
        packageId,
        housingId,
        setPackageId,
        setHousingId,
        setBookingId,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};
