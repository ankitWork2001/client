import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import macbook from "../../assets/dealoftheday_image.jpg";

import CouponCard from "./CouponCard";
const DealOfDaySection = () => {
  const [couponDetails, setCouponDetails] = useState();

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_APP_BACKEND}api/coupons/`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${import.meta.env.VITE_APP_TOKEN}`,
      },
    };
    async function makeRequest() {
      let response = await axios.request(config);
      // console.log(response.data);
      let data = response.data;
      setCouponDetails(
        data.filter((value) => {
          return value.featured;
        })
      );
    }

    makeRequest();
  }, []);

  return (
    <>
    <div className="m-auto mt-5 bg-white w-[90vw] rounded-lg">
      <h1 className="text-4xl m-4" > Deals Of The Day</h1>
      <div className="flex flex-wrap gap-x-10">
      {couponDetails?.map((value, index) => {
        return (
          <CouponCard
            key={index}
            companylogo={value?.store?.logo}
            image={macbook}
            minPurchase={value.minimumPurchaseAmount}
            description={value.description}
            id={value._id}
          />
        );
      })}
      </div>
      </div>
    </>
  );
};

export default DealOfDaySection;
