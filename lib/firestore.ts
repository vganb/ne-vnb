import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

// Firestore collection reference
const packagesCollectionRef = collection(db, "packages");

// Function to get all packages from Firestore and return both packages and unique tags (categories)
export const getPackages = async () => {
  const querySnapshot = await getDocs(packagesCollectionRef);

  const packages = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  // Extract unique tags (categories) from the packages
  const uniqueTags = [...new Set(packages.map((pkg) => pkg.tag))];

  return { packages, uniqueTags };
};

// Function to add a package to Firestore ONE TIME!
// export const addPackage = async (pkg: any) => {
//   try {
//     await addDoc(packagesCollectionRef, pkg);
//   } catch (error) {
//     console.error("Error adding package: ", error);
//   }
// };
