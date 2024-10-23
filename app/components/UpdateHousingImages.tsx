import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../lib/firebase"; // Firestore setup

const housingCollectionRef = collection(db, "housing");

const updateHousingImages = async () => {
  const housingDocs = await getDocs(housingCollectionRef);

  const updatePromises = housingDocs.docs.map((docSnapshot) => {
    const docRef = doc(db, "housing", docSnapshot.id);

    // Replace with actual image URLs for each housing item
    const images = [
      "https://example.com/images/image1.jpg",
      "https://example.com/images/image2.jpg",
      "https://example.com/images/image3.jpg",
      "https://example.com/images/image4.jpg",
      "https://example.com/images/image5.jpg",
    ];

    // Update the document with the new images array
    return updateDoc(docRef, { images });
  });

  await Promise.all(updatePromises);
  console.log("Housing images updated!");
};

updateHousingImages();

export default updateHousingImages;
