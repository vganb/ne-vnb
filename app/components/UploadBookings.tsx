import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Ensure correct path to Firebase config

// Function to generate random bookings and upload to Firestore
export const uploadBookings = async () => {
  // Sample data for users, packages, and housing
  const users = [{ userId: "user1" }, { userId: "user2" }, { userId: "user3" }];

  const packages = [
    {
      packageId: "package1",
      title: "Historical Tour in Stockholm",
      price: 700,
    },
    { packageId: "package2", title: "Cultural Walk in Oslo", price: 500 },
    {
      packageId: "package3",
      title: "Luxury Experience in Helsinki",
      price: 900,
    },
  ];

  const housingOptions = [
    { housingId: "housing1", title: "Luxury Apartment in Nyhavn", price: 200 },
    { housingId: "housing2", title: "Cozy Flat in Frogner", price: 130 },
    null, // Represents no housing selected
  ];

  try {
    for (const user of users) {
      for (const selectedPackage of packages) {
        // Randomly assign housing (null means no housing selected)
        const selectedHousing =
          housingOptions[Math.floor(Math.random() * housingOptions.length)];

        // Calculate the total price
        const totalPrice = selectedHousing
          ? selectedPackage.price + selectedHousing.price
          : selectedPackage.price;

        // Create booking document data
        const bookingData = {
          userId: user.userId,
          packageId: selectedPackage.packageId,
          packageTitle: selectedPackage.title,
          housingId: selectedHousing ? selectedHousing.housingId : null,
          housingTitle: selectedHousing ? selectedHousing.title : null,
          price: totalPrice,
          status: "pending", // Initial status is pending
          createdAt: new Date().toISOString(), // Current date and time
        };

        // Upload the booking to Firestore
        await addDoc(collection(db, "bookings"), bookingData);

        console.log(
          `Booking for ${user.userId} and ${selectedPackage.title} created.`
        );
      }
    }

    console.log("All bookings uploaded!");
  } catch (error) {
    console.error("Error uploading bookings:", error);
  }
};

// Example call to the function
