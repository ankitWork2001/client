import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CouponCard from "../components/CouponCard";

const CategoryPage = () => {
  const [category, setCategory] = useState();

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/coupons",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${import.meta.env.VITE_APP_TOKEN}`,
      },
    };
    async function makeRequest() {
      let response = await axios.request(config);
      let data = response.data;
      setCategory(
        data.filter((value) => {
          return value?.category?._id == "67f02a864b8cee1e4ea2f61c";
        })
      );
    }

    makeRequest();
  }, []);

  return (
    <>
      <div className="m-auto">
        {category?.length > 0 && (
          <h1 className="text-4xl text-center m-auto mt-10 mb-10 font-semibold">
            {category[0]?.category?.name} : Best Deals
          </h1>
        )}

        <div className="flex m-2 ml-[25vw] ">
          <button className="border-2 border-black p-4 text-2xl text-blue-500 rounded-lg w-[15vw] hover:cursor-pointer">
            Popular
          </button>
          <button className="border-2 border-black p-4 text-2xl text-blue-500 rounded-lg w-[15vw] hover:cursor-pointer">
            Discount
          </button>
          <button className="border-2 border-black p-4 text-2xl text-blue-500 rounded-lg w-[15vw] hover:cursor-pointer">
            High Price
          </button>
          <button className="border-2 border-black p-4 text-2xl text-blue-500 rounded-lg w-[15vw] hover:cursor-pointer">
            Low Price
          </button>
        </div>

        <div className="flex">
          <div className="w-[30vw]">
            <div className="border-2  border-gray-200 rounded-lg p-10 m-4">
              <p className="text-blue-500 text-2xl">Filter By </p>
              <hr className="mt-2" />
              <p className="text-orange-600 text-right text-1xl hover:cursor-pointer">
                Clear All
              </p>
              <form className="flex flex-col gap-y-1">
                <label className="text-[1.25rem]">Category</label>
                <select className="text-[1rem] border-1 border-gray-300 rounded-lg p-2">
                  <option value="Travel">Travel</option>
                  <option value="Education">Education</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Web Hosting">Web Hosting</option>
                  <option value="Beauty and Health">Beauty and Health</option>
                </select>
                <label className="text-[1.25rem]">Max Price</label>
                <input
                  type="number"
                  className="text-[1rem] border-1 border-gray-300 rounded-lg p-2"
                />
                <label className="text-[1.25rem]">Sort By</label>
                <select className="text-[1rem] border-1 border-gray-300 rounded-lg p-2">
                  <option value="Ascending">Ascending</option>
                  <option value="Descending">Descending</option>
                </select>

                <button
                  className="bg-orange-400 text-center text-white text-[1.2rem] rounded-lg p-2
                hover:cursor-pointer mt-2"
                >
                  Apply Filters
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap">
            {category?.map((value, index) => {
              return (
                <CouponCard
                  key={index}
                  companylogo={value?.store?.logo}
                  image={value?.category?.image}
                  minPurchase={value.minimumPurchaseAmount}
                  description={value.description}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
