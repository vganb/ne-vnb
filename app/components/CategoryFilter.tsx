import React from "react";
import HorizontalScrollbarPage from "./HorizontalScrollbarPage";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full sm:w-[400px] bg-orange-100 rounded-lg mt-4 mx-auto">
      <HorizontalScrollbarPage>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`p-1 bg-orange-300 border-2 border-gray-400 rounded-md text-center shrink-0 uppercase hover:bg-orange-400 cursor-pointer ${
              selectedCategory === category ? "bg-orange-500" : ""
            }`}
            onClick={() => onSelectCategory(category)}
          >
            {category}
          </div>
        ))}
      </HorizontalScrollbarPage>
    </div>
  );
};

export default CategoryFilter;
