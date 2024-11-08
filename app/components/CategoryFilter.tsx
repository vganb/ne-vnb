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
    <div className="w-full sm:w-[600px] md:w-[700px] md:flex md:justify-center bg-orange-100 rounded-lg mt-4 mx-auto">
      <HorizontalScrollbarPage>
        {categories.map((category, index) => (
          <div
            key={index}
            className={`py-1 px-6 bg-orange-300  rounded-2xl text-center font-bold shrink-0 uppercase hover:bg-orange-400 cursor-pointer ${
              selectedCategory === category ? "bg-orange-500 text-white" : ""
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
