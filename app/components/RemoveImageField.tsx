import { doc, getDocs, collection, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Import your Firestore configuration
import { deleteField } from "firebase/firestore"; // Import deleteField function

const housingCollectionRef = collection(db, "housing");

const removeImageField = async () => {
  const housingDocs = await getDocs(housingCollectionRef); // Get all housing documents

  const updatePromises = housingDocs.docs.map((docSnapshot) => {
    const docRef = doc(db, "housing", docSnapshot.id); // Reference each document

    // Remove the 'image' field from the document using deleteField()
    return updateDoc(docRef, {
      image: deleteField(), // This will completely remove the 'image' field from the document
    });
  });

  await Promise.all(updatePromises); // Wait for all updates to complete
  console.log("Image field removed from all housing documents!");
};

removeImageField(); // Call the function to execute the script
