import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CategoryCard from "./CategoryCard";

const CategoriesSection = () => {
  const [category, setCategory] = useState();

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/api/categories/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${import.meta.env.VITE_APP_TOKEN}`,
      },
    };
    async function makeRequest() {
      let response = await axios.request(config);
      // console.log(response.data.categories);
      setCategory(response?.data?.categories);
    }

    makeRequest();
  }, []);

  return (
    <>
    <div>
      <h1 className="text-4xl m-10 ml-60">Categories</h1>
      <div className="flex flex-row flex-wrap gap-x-8 gap-y-8 w-350  justify-center items-center ml-30">
        {category?.map((value,index)=>{
          return <CategoryCard key={index} image={value.image} name={value.name} totalCoupons={value.totalCoupons} />
        })}
      </div>
      </div>
    </>
  );
};

export default CategoriesSection;
