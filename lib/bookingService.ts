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
