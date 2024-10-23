import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Ensure correct path to your Firebase config

// Function to generate random values
const generateRandomFields = () => {
  const durations = ["2 days", "3 days", "4 days"]; // Durations between 2 and 4 days
  const ratings = [3.5, 4.0, 4.5, 5.0]; // Random ratings
  const highlightsArray = [
    ["Guided tour", "Museum", "Monumental Sight"],
    ["Luxury experience", "Hotel included", "Private guide"],
    ["Local food", "Cooking class", "Cultural walk"],
    ["Historical places", "Castle visit", "River cruise"],
  ];

  const locationMap = "https://example.com/map.jpg"; // Single location map URL

  return {
    duration: durations[Math.floor(Math.random() * durations.length)],
    rating: ratings[Math.floor(Math.random() * ratings.length)],
    highlights:
      highlightsArray[Math.floor(Math.random() * highlightsArray.length)],
    locationMap: locationMap, // Single location map URL
    reviews: Math.floor(Math.random() * 1000) + 50, // Generate a number between 50 and 1000
  };
};

// Function to update existing documents with random fields
export const updatePackagesWithRandomFields = async () => {
  const packagesCollectionRef = collection(db, "packages"); // Reference to your "packages" collection
  const querySnapshot = await getDocs(packagesCollectionRef); // Fetch all documents in the collection

  // Loop through each document and update it
  querySnapshot.forEach(async (docSnap) => {
    const packageRef = doc(db, "packages", docSnap.id); // Reference to the document
    const randomFields = generateRandomFields(); // Generate random fields

    // Update the document with new fields
    await updateDoc(packageRef, randomFields);

    console.log(`Updated package ${docSnap.id} with random fields.`);
  });

  console.log("All packages updated with random fields!");
};
