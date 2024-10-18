// "use client";
// import { useEffect } from "react";
// import { addPackage } from "../../lib/firestore";

// const packages = [
//   // Stockholm Packages
//   {
//     title: "Art in Stockholm",
//     city: "Stockholm",
//     description: "Explore Stockholm's vibrant art scene with local guides.",
//     price: 180,
//     tag: "Art",
//     image:
//       "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Theatre Night",
//     city: "Stockholm",
//     description: "Attend an unforgettable theatre performance in Stockholm.",
//     price: 220,
//     tag: "Theatre",
//     image:
//       "https://images.unsplash.com/photo-1555685812-4b74347d126e?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Live Music at Stockholm",
//     city: "Stockholm",
//     description:
//       "Experience live music performances across Stockholm's venues.",
//     price: 160,
//     tag: "Music",
//     image:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Stockholm Food Tasting",
//     city: "Stockholm",
//     description: "Savor local Swedish delicacies and fine dining in Stockholm.",
//     price: 200,
//     tag: "Food",
//     image:
//       "https://images.unsplash.com/photo-1519183071298-a2962eade1ea?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Nature Trails in Stockholm",
//     city: "Stockholm",
//     description: "Discover the breathtaking natural surroundings of Stockholm.",
//     price: 140,
//     tag: "Nature",
//     image:
//       "https://images.unsplash.com/photo-1487930728126-2a4aefcba891?crop=entropy&fit=crop&w=1050&h=700",
//   },

//   // Copenhagen Packages
//   {
//     title: "Copenhagen Art Walk",
//     city: "Copenhagen",
//     description: "Join a guided tour through Copenhagen's art galleries.",
//     price: 170,
//     tag: "Art",
//     image:
//       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Copenhagen Theatre Tour",
//     city: "Copenhagen",
//     description: "Experience Copenhagen's thriving theatre scene.",
//     price: 230,
//     tag: "Theatre",
//     image:
//       "https://images.unsplash.com/photo-1543497487-825e51f1786b?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Music in the Heart of Copenhagen",
//     city: "Copenhagen",
//     description: "Attend live music events across Copenhagen's best venues.",
//     price: 160,
//     tag: "Music",
//     image:
//       "https://images.unsplash.com/photo-1535376482995-e5bbeb61f3f9?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Culinary Journey in Copenhagen",
//     city: "Copenhagen",
//     description: "Indulge in Copenhagen's renowned culinary scene.",
//     price: 180,
//     tag: "Food",
//     image:
//       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Copenhagen Nature Excursion",
//     city: "Copenhagen",
//     description:
//       "Take a scenic hike through the beautiful nature around Copenhagen.",
//     price: 150,
//     tag: "Nature",
//     image:
//       "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&fit=crop&w=1050&h=700",
//   },

//   // Helsinki Packages
//   {
//     title: "Helsinki Art and Architecture",
//     city: "Helsinki",
//     description:
//       "Discover Helsinki's art and architecture on this guided tour.",
//     price: 180,
//     tag: "Art",
//     image:
//       "https://images.unsplash.com/photo-1533659360899-4f6e1546d3b1?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Theatre Performances in Helsinki",
//     city: "Helsinki",
//     description: "Immerse yourself in Helsinki's theatre performances.",
//     price: 220,
//     tag: "Theatre",
//     image:
//       "https://images.unsplash.com/photo-1551033544-5c2459adcde5?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Music Experience in Helsinki",
//     city: "Helsinki",
//     description: "Explore Helsinki's music festivals and live performances.",
//     price: 170,
//     tag: "Music",
//     image:
//       "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Finnish Cuisine Tasting",
//     city: "Helsinki",
//     description: "Taste Helsinki's traditional and modern Finnish cuisine.",
//     price: 160,
//     tag: "Food",
//     image:
//       "https://images.unsplash.com/photo-1519985176271-adb1088fa94c?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Helsinki Nature Getaway",
//     city: "Helsinki",
//     description: "Explore Helsinki's pristine forests and natural landscapes.",
//     price: 130,
//     tag: "Nature",
//     image:
//       "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&fit=crop&w=1050&h=700",
//   },

//   // Oslo Packages
//   {
//     title: "Oslo Art Festival",
//     city: "Oslo",
//     description: "Enjoy Oslo's art festival and explore local galleries.",
//     price: 200,
//     tag: "Art",
//     image:
//       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Theatre Experience in Oslo",
//     city: "Oslo",
//     description: "Catch a live performance in Oslo's top theatres.",
//     price: 240,
//     tag: "Theatre",
//     image:
//       "https://images.unsplash.com/photo-1551033544-5c2459adcde5?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Live Music in Oslo",
//     city: "Oslo",
//     description: "Attend Oslo's vibrant music performances.",
//     price: 180,
//     tag: "Music",
//     image:
//       "https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Oslo Food Tour",
//     city: "Oslo",
//     description: "Savor Oslo's culinary delights on a guided food tour.",
//     price: 200,
//     tag: "Food",
//     image:
//       "https://images.unsplash.com/photo-1504674900247-0877df9cc836?crop=entropy&fit=crop&w=1050&h=700",
//   },
//   {
//     title: "Nature Exploration in Oslo",
//     city: "Oslo",
//     description: "Hike and explore Oslo's beautiful natural surroundings.",
//     price: 150,
//     tag: "Nature",
//     image:
//       "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?crop=entropy&fit=crop&w=1050&h=700",
//   },
// ];

// const UploadPackages = () => {
//   useEffect(() => {
//     // Upload each package to Firestore
//     packages.forEach(async (pkg) => {
//       await addPackage(pkg);
//     });
//   }, []);

//   return <div>Uploading Packages to Firestore...</div>;
// };

// export default UploadPackages;
