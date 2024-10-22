import { db } from "../../lib/firebase"; // Import your Firestore config
import { collection, addDoc } from "firebase/firestore";

const housingData = [
  {
    title: "Modern Loft in Södermalm",
    city: "Stockholm",
    price: 150,
    description:
      "A chic, modern loft in the heart of Södermalm, near trendy cafes and shops.",
    image: "https://example.com/images/stockholm1.jpg",
    tag: "For Rent",
    host: "Anna",
    rooms: 2,
    beds: 1,
    bathroom: 1,
    cancellationPolicy: "Free Cancellation 2 Days Prior",
  },
  {
    title: "Cozy Apartment near Gamla Stan",
    city: "Stockholm",
    price: 180,
    description:
      "A cozy 2-bedroom apartment located just a short walk from Gamla Stan.",
    image: "https://example.com/images/stockholm2.jpg",
    tag: "For Rent",
    host: "Lars",
    rooms: 2,
    beds: 2,
    bathroom: 1,
    cancellationPolicy: "Free Cancellation One Week Prior",
  },
  {
    title: "Penthouse with a View of the Archipelago",
    city: "Stockholm",
    price: 350,
    description:
      "A luxurious penthouse offering breathtaking views of the Stockholm Archipelago.",
    image: "https://example.com/images/stockholm3.jpg",
    tag: "Luxury",
    host: "Sofia",
    rooms: 4,
    beds: 3,
    bathroom: 2,
    cancellationPolicy: "Non-refundable",
  },
  {
    title: "Studio in Vasastan",
    city: "Stockholm",
    price: 120,
    description:
      "A compact, stylish studio located in the quiet neighborhood of Vasastan.",
    image: "https://example.com/images/stockholm4.jpg",
    tag: "For Rent",
    host: "Erik",
    rooms: 1,
    beds: 1,
    bathroom: 1,
    cancellationPolicy: "Free Cancellation 3 Days Prior",
  },
  {
    title: "Scandinavian Design Apartment in Grünerløkka",
    city: "Oslo",
    price: 170,
    description:
      "A stylish apartment designed with Scandinavian minimalism in mind, located in Grünerløkka.",
    image: "https://example.com/images/oslo1.jpg",
    tag: "For Rent",
    host: "Ola",
    rooms: 3,
    beds: 2,
    bathroom: 1,
    cancellationPolicy: "Free Cancellation 5 Days Prior",
  },
  {
    title: "Charming Apartment near Oslo Opera House",
    city: "Oslo",
    price: 220,
    description:
      "A charming apartment with easy access to Oslo's cultural landmarks like the Opera House.",
    image: "https://example.com/images/oslo2.jpg",
    tag: "For Rent",
    host: "Maren",
    rooms: 2,
    beds: 2,
    bathroom: 1,
    cancellationPolicy: "Free Cancellation 3 Days Prior",
  },
  {
    title: "Luxury Penthouse in Tjuvholmen",
    city: "Oslo",
    price: 400,
    description:
      "A stunning luxury penthouse located in the waterfront district of Tjuvholmen.",
    image: "https://example.com/images/oslo3.jpg",
    tag: "Luxury",
    host: "Kari",
    rooms: 5,
    beds: 4,
    bathroom: 3,
    cancellationPolicy: "Non-refundable",
  },
  {
    title: "Cozy Flat in Frogner",
    city: "Oslo",
    price: 130,
    description:
      "A small but cozy flat in the elegant district of Frogner, ideal for couples.",
    image: "https://example.com/images/oslo4.jpg",
    tag: "For Rent",
    host: "Henrik",
    rooms: 2,
    beds: 1,
    bathroom: 1,
    cancellationPolicy: "Free Cancellation 4 Days Prior",
  },
  {
    title: "Modern Apartment in Kamppi",
    city: "Helsinki",
    price: 160,
    description:
      "A modern apartment in Kamppi, close to Helsinki's vibrant shopping district.",
    image: "https://example.com/images/helsinki1.jpg",
    tag: "For Rent",
    host: "Juha",
    rooms: 2,
    beds: 1,
    bathroom: 1,
    cancellationPolicy: "Free Cancellation 1 Week Prior",
  },
  {
    title: "Charming Studio near Helsinki Cathedral",
    city: "Helsinki",
    price: 140,
    description:
      "A charming studio with views of Helsinki Cathedral, perfect for solo travelers.",
    image: "https://example.com/images/helsinki2.jpg",
    tag: "For Rent",
    host: "Aino",
    rooms: 1,
    beds: 1,
    bathroom: 1,
    cancellationPolicy: "Free Cancellation 3 Days Prior",
  },
  {
    title: "Luxury Seafront Penthouse",
    city: "Helsinki",
    price: 380,
    description:
      "An exquisite seafront penthouse offering panoramic views of the Baltic Sea.",
    image: "https://example.com/images/helsinki3.jpg",
    tag: "Luxury",
    host: "Eero",
    rooms: 4,
    beds: 3,
    bathroom: 2,
    cancellationPolicy: "Non-refundable",
  },
  {
    title: "Cozy Home in Töölö",
    city: "Helsinki",
    price: 110,
    description:
      "A cozy one-bedroom apartment in the Töölö district, close to parks and museums.",
    image: "https://example.com/images/helsinki4.jpg",
    tag: "For Rent",
    host: "Veera",
    rooms: 1,
    beds: 1,
    bathroom: 1,
    cancellationPolicy: "Free Cancellation 5 Days Prior",
  },
  {
    title: "Spacious Apartment in Nørrebro",
    city: "Copenhagen",
    price: 190,
    description:
      "A spacious and modern apartment in the trendy Nørrebro district.",
    image: "https://example.com/images/copenhagen1.jpg",
    tag: "For Rent",
    host: "Mads",
    rooms: 3,
    beds: 2,
    bathroom: 1,
    cancellationPolicy: "Free Cancellation 2 Days Prior",
  },
  {
    title: "Stylish Flat in Frederiksberg",
    city: "Copenhagen",
    price: 210,
    description:
      "A stylish flat in the upscale neighborhood of Frederiksberg, great for families.",
    image: "https://example.com/images/copenhagen2.jpg",
    tag: "For Rent",
    host: "Nina",
    rooms: 3,
    beds: 2,
    bathroom: 1,
    cancellationPolicy: "Free Cancellation 3 Days Prior",
  },
  {
    title: "Luxury Apartment in Nyhavn",
    city: "Copenhagen",
    price: 360,
    description: "A luxury apartment with a stunning view of Nyhavn Harbor.",
    image: "https://example.com/images/copenhagen3.jpg",
    tag: "Luxury",
    host: "Frederik",
    rooms: 4,
    beds: 3,
    bathroom: 2,
    cancellationPolicy: "Non-refundable",
  },
  {
    title: "Cozy Studio in Christianshavn",
    city: "Copenhagen",
    price: 130,
    description:
      "A cozy studio located in the charming district of Christianshavn.",
    image: "https://example.com/images/copenhagen4.jpg",
    tag: "For Rent",
    host: "Camilla",
    rooms: 1,
    beds: 1,
    bathroom: 1,
    cancellationPolicy: "Free Cancellation 4 Days Prior",
  },
];

export const uploadHousingData = async () => {
  const housingCollection = collection(db, "housing");
  for (const housing of housingData) {
    await addDoc(housingCollection, housing);
  }
  console.log("Housing data uploaded!");
};

// uploadHousingData();
export default uploadHousingData;
