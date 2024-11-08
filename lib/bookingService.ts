import { db } from "../lib/firebase";
import {
  doc,
  addDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  collection,
} from "firebase/firestore";

export const deleteBooking = async (bookingId: string) => {
  await deleteDoc(doc(db, "bookings", bookingId));
};

export const updateBookingWithHousing = async (
  bookingId: string,
  housingData: {
    id: string;
    title: string;
    price: number;
    host: string;
    city: string;
  }
) => {
  const bookingDocRef = doc(db, "bookings", bookingId);
  await updateDoc(bookingDocRef, {
    housingId: housingData.id,
    housingTitle: housingData.title,
    housingPrice: housingData.price,
    housingHost: housingData.host,
    housingCity: housingData.city,
  });
};
