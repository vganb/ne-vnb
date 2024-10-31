import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import { Booking, Package, PackageData, Housing } from "./types";

// Firestore collection reference
const packagesCollectionRef = collection(db, "packages");
const bookingsCollectionRef = collection(db, "bookings");

// Function to get all packages from Firestore and return both packages and unique tags (categories)
export const getPackages = async () => {
  const querySnapshot = await getDocs(packagesCollectionRef);

  // Map Firestore docs to Package type, ensuring id is only set once
  const packages: Package[] = querySnapshot.docs.map((doc) => {
    const data = doc.data() as Omit<Package, "id">; // Omit 'id' from the Firestore data
    return {
      id: doc.id, // Use Firestore document ID
      ...data, // Spread the rest of the fields from the document data
    };
  });

  // Extract unique tags (categories) from the packages
  const uniqueTags = [...new Set(packages.map((pkg) => pkg.tag))];

  return { packages, uniqueTags };
};

export const getPackageById = async (id: string) => {
  const docRef = doc(db, "packages", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      ...docSnap.data(),
      packageId: docSnap.id, // Map Firestore document ID to `packageId`
    };
  } else {
    throw new Error("Package not found");
  }
};

export const getHousing = async (): Promise<Housing[]> => {
  const housingCollectionRef = collection(db, "housing");
  const querySnapshot = await getDocs(housingCollectionRef);

  // Map Firestore documents to an array of Housing objects, including the document ID
  return querySnapshot.docs.map((doc) => ({
    id: doc.id, // Get the document ID from Firestore
    ...doc.data(), // Spread the rest of the document data
  })) as Housing[]; // Cast to Housing array
};

export const getHousingById = async (id: string): Promise<Housing | null> => {
  const housingDocRef = doc(db, "housing", id);
  const housingDoc = await getDoc(housingDocRef);

  if (housingDoc.exists()) {
    return { id: housingDoc.id, ...housingDoc.data() } as Housing;
  }

  return null; // Return null if no document exists
};

// New function to fetch user-specific bookings along with package and housing details
// firestore.ts
export const fetchBookings = async (userId: string) => {
  const bookingsQuery = query(
    bookingsCollectionRef,
    where("userId", "==", userId)
  );
  const bookingSnapshots = await getDocs(bookingsQuery);

  const bookings = await Promise.all(
    bookingSnapshots.docs.map(async (docSnapshot) => {
      const bookingData = (
        docSnapshot as QueryDocumentSnapshot<Booking>
      ).data();

      // Extract start and end dates from bookingDate field
      const startDate = bookingData.bookingDate?.start;
      const endDate = bookingData.bookingDate?.end;

      // Fetch package details if a packageId exists
      let packageData: PackageData | undefined = undefined;
      if (bookingData.packageId) {
        const packageRef = doc(db, "packages", bookingData.packageId);
        const packageSnapshot = await getDoc(packageRef);
        packageData = packageSnapshot.exists()
          ? (packageSnapshot.data() as PackageData)
          : undefined;
      }

      // Fetch housing details if a housingId exists
      let housingData: Housing | undefined = undefined;
      if (bookingData.housingId) {
        const housingRef = doc(db, "housing", bookingData.housingId);
        const housingSnapshot = await getDoc(housingRef);
        housingData = housingSnapshot.exists()
          ? (housingSnapshot.data() as Housing)
          : undefined;
      }

      return {
        id: docSnapshot.id,
        ...bookingData,
        packageData,
        housingData,
        startDate, // Add startDate to return object
        endDate, // Add endDate to return object
      };
    })
  );

  return bookings;
};
