import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { Package } from "./types";

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
