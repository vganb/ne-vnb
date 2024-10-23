import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import { Package } from "./types";
import { Housing } from "./types";

// Firestore collection reference
const packagesCollectionRef = collection(db, "packages");

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
