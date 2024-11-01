import React from "react";
import PackageCard from "./PackageCard";
import { Package } from "../../lib/types";

interface PackageListProps {
  packages: Package[];
  onPackageClick: (id: string) => void;
}

const PackageList: React.FC<PackageListProps> = ({
  packages,
  onPackageClick,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {packages.map((pkg) => (
        <div
          key={pkg.id}
          onClick={() => onPackageClick(pkg.id)}
          className="cursor-pointer"
        >
          <PackageCard
            title={pkg.title}
            city={pkg.city}
            description={pkg.description}
            price={pkg.price}
            tag={pkg.tag}
            image={pkg.image}
          />
        </div>
      ))}
    </div>
  );
};

export default PackageList;
