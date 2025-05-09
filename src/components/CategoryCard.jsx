import React from "react";

const CategoryCard = ({ image, name, totalCoupons }) => {
  const scrollToCategory = () => {
    const element = document.getElementById(name);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      onClick={scrollToCategory}
      className="flex flex-col items-center justify-center bg-white border border-yellow-400 hover:border-yellow-500 rounded-xl p-4 sm:p-5 w-32 sm:w-36 md:w-40 lg:w-44 transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
    >
      <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3">
        <img
          src={image}
          alt={`${name} category`}
          className="object-contain w-full h-full"
        />
      </div>
      <p className="text-sm sm:text-base font-semibold text-gray-800 text-center truncate w-full">
        {name}
      </p>
      <p className="text-xs sm:text-sm text-gray-500 mt-1">{totalCoupons} offers</p>
    </div>
  );
};

export default CategoryCard;
