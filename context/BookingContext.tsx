"use client";
import { createContext, useContext, useState } from "react";
import { deleteBooking, updateBookingWithHousing } from "../lib/bookingService";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast"; // Import useToast

interface BookingContextType {
  bookingId: string | null;
  setBookingId: (id: string | null) => void;
  bookingStartDate: Date | null;
  setBookingStartDate: (date: Date | null) => void;
  bookingEndDate: Date | null;
  setBookingEndDate: (date: Date | null) => void;
  handleDeleteBooking: (id: string) => Promise<void>; // Add function type to the context
  handleSkipHousing: () => void; // Add handleSkipHousing to the interface
  handleBookHousing: (housingData: {
    // Update to handleBookHousing
    id: string;
    title: string;
    price: number;
    host: string;
    city: string;
  }) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingStartDate, setBookingStartDate] = useState<Date | null>(null);
  const [bookingEndDate, setBookingEndDate] = useState<Date | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const handleDeleteBooking = async (id: string) => {
    try {
      await deleteBooking(id); // Use deleteBooking from bookingService
      setBookingId(null); // Clear the bookingId from context
      toast({
        description: "Items in cart has been deleted successfully!",
        duration: 3000,
      });
      router.push("/"); // Navigate to home page after deletion
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast({ description: "Failed to delete booking." });
    }
  };

  const handleSkipHousing = () => {
    if (bookingId) {
      router.push(`/checkout?bookingId=${bookingId}`);
    } else {
      console.error("No bookingId found");
      router.push("/");
      toast({
        description: "You need to log in to continue the booking",
      });
    }
  };

  const handleBookHousing = async (housingData: {
    id: string;
    title: string;
    price: number;
    host: string;
    city: string;
  }) => {
    if (bookingId) {
      try {
        await updateBookingWithHousing(bookingId, housingData);
        router.push(`/checkout?bookingId=${bookingId}`);
      } catch (error) {
        console.error("Error updating booking with housing: ", error);
        toast({
          description: "Failed to update booking with housing details.",
        });
      }
    } else {
      console.error("No bookingId found");
      toast({
        description: "You need to log in to book a package and housing!",
      });
      router.push("/");
    }
  };

  return (
    <BookingContext.Provider
      value={{
        bookingId,
        setBookingId,
        bookingStartDate,
        setBookingStartDate,
        bookingEndDate,
        setBookingEndDate,
        handleDeleteBooking,
        handleSkipHousing,
        handleBookHousing,
      }}
    >
      {" "}
      {children}
    </BookingContext.Provider>
  );
};

// Custom hook to use the booking context
export const useBookingContext = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookingContext must be used within a BookingProvider");
  }
  return context;
};
