"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation"; // Use useParams to get the dynamic id
import { doc, getDoc } from "firebase/firestore"; // Firestore imports
import { db } from "../../../lib/firebase"; // Firestore initialization
import PackageDetail from "../../components/PackageDetail"; // Import the PackageDetail component
import { PackageData } from "../../../lib/types"; // Import the PackageData type
import LoadingSpinner from "@/app/components/LoadingSpinner";

const PackageDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params as { id: string }; // Ensure `id` is a string

  const [packageData, setPackageData] = useState<PackageData | null>(null); // Use the defined type
  const [loading, setLoading] = useState(true);

  // Fetch package data from Firestore
  useEffect(() => {
    const fetchPackage = async () => {
      if (id) {
        try {
          const packageDoc = await getDoc(doc(db, "packages", id)); // Fetch package by ID from Firestore
          if (packageDoc.exists()) {
            // Ensure Firestore document ID is added as `packageId`
            setPackageData({
              ...(packageDoc.data() as PackageData),
              packageId: packageDoc.id, // Attach Firestore document ID to `packageId`
            });
          } else {
            console.error("No such package found!");
          }
        } catch (error) {
          console.error("Error fetching package:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPackage();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!packageData) {
    return <div>Package not found!</div>; // Handle case where no package is found
  }

  const handleGoBack = () => {
    router.back(); // Go back to the previous page
  };

  return (
    <div>
      {/* Only render PackageDetail if packageData is not null */}
      <PackageDetail packageData={packageData} onGoBack={handleGoBack} />
    </div>
  );
};

export default PackageDetailPage;
