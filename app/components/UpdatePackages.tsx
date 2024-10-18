// import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
// import { db } from "../../lib/firebase"; // Ensure this points to your Firebase config

// // Function to generate a random date between two dates
// const getRandomDate = (start: Date, end: Date): Date => {
//   const startTimestamp = start.getTime();
//   const endTimestamp = end.getTime();

//   // Generate a random timestamp between the start and end timestamps
//   const randomTimestamp = new Date(
//     startTimestamp + Math.random() * (endTimestamp - startTimestamp)
//   );

//   return randomTimestamp;
// };

// // Function to update all packages with random booking dates and unique package IDs
// export const updatePackagesWithRandomDateAndID = async () => {
//   const packagesCollectionRef = collection(db, "packages");

//   // Fetch all packages
//   const querySnapshot = await getDocs(packagesCollectionRef);

//   // Define a start and end date for random booking dates
//   const startDate = new Date("2024-01-01"); // Example start date
//   const endDate = new Date("2024-12-31"); // Example end date

//   querySnapshot.forEach(async (document) => {
//     const docRef = doc(db, "packages", document.id);

//     // Generate a random booking date between the startDate and endDate
//     const randomBookingDate = getRandomDate(startDate, endDate).toISOString(); // Convert to ISO string

//     // Use the Firestore document ID as the unique packageId
//     const packageId = document.id;

//     // Update the package with both packageId and random bookingDate
//     await updateDoc(docRef, {
//       packageId: packageId, // Add unique package ID
//       bookingDate: randomBookingDate, // Add random booking date
//     });

//     console.log(
//       `Updated package ${packageId} with random bookingDate: ${randomBookingDate}`
//     );
//   });

//   console.log(
//     "All packages updated with random booking dates and package IDs."
//   );
// };

// // Call the function to update packages with random booking dates and package IDs
// updatePackagesWithRandomDateAndID().catch((error) => {
//   console.error(
//     "Error updating packages with random dates and package IDs:",
//     error
//   );
// });
