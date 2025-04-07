import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CouponCard from "../components/CouponCard";
import macbook from "../../assets/dealoftheday_image.jpg";
import { useSelector } from "react-redux";
const StorePage = () => {
  const [store, setStore] = useState();
  const storeId = useSelector((state) => state.store.storeId);
  const storeName = useSelector((state) => state.store.storeName);

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
      if(storeId == null) {
        setStore(data);
      } else {
      setStore(
        data.filter((value) => {
          return value?.store?._id == storeId;
        })
      );
    }
  }

    makeRequest();
  }, [storeId]);

  return (
    <>
      <div className="m-auto">
        {store?.length > 0 && (
          <h1 className="text-4xl text-center m-auto mt-10 mb-10 font-semibold">
            {storeName} : Best Deals
          </h1>
        )}

        <div className="flex m-2 ml-[25vw] ">
          <button className="border-2 border-black p-4 text-2xl text-blue-500 rounded-lg w-[15vw] hover:cursor-pointer">Popular</button>
          <button className="border-2 border-black p-4 text-2xl text-blue-500 rounded-lg w-[15vw] hover:cursor-pointer">Discount</button>
          <button className="border-2 border-black p-4 text-2xl text-blue-500 rounded-lg w-[15vw] hover:cursor-pointer">High Price</button>
          <button className="border-2 border-black p-4 text-2xl text-blue-500 rounded-lg w-[15vw] hover:cursor-pointer">Low Price</button>
        </div>

        <div className="flex">
          <div className="w-[23vw]">
            <div className="border-2  border-gray-200 rounded-lg p-10 m-4">
              <p className="text-blue-500 text-2xl">Filter By </p>
              <hr className="mt-2"/>
              <p className="text-orange-600 text-right text-1xl hover:cursor-pointer">Clear All</p>
              <form className="flex flex-col gap-y-1" >
                <label className="text-[1.25rem]" >Store</label>
                <select className="text-[1rem] border-1 border-gray-300 rounded-lg p-2" value={storeName} >
                  <option value="All Stores">All Stores</option>
                  <option value="Amazon">Amazon</option>
                  <option value="Flipkart">Flipkart</option>
                  <option value="Myntra">Myntra</option>
                  <option value="Zara">Zara</option>
                  <option value="H&M">H&M</option>
                </select>
                <label className="text-[1.25rem]" >Max Price</label>
                <input type="number"  className="text-[1rem] border-1 border-gray-300 rounded-lg p-2"/>
                <label className="text-[1.25rem]" >Sort By</label>
                <select className="text-[1rem] border-1 border-gray-300 rounded-lg p-2" >
                  <option value="Ascending">Ascending</option>
                  <option value="Descending">Descending</option>
                </select>

                <button className="bg-orange-400 text-center text-white text-[1.2rem] rounded-lg p-2
                hover:cursor-pointer mt-2" >Apply Filters</button>
              </form>

            </div>
          </div>
          <div className="flex flex-wrap">
            {store?.map((value, index) => {
              return (
                <CouponCard
                  key={index}
                  companylogo={value?.store?.logo}
                  image={macbook || value?.category?.image}
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

export default StorePage;
