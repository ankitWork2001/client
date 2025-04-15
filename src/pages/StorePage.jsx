import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CouponCard from "../components/CouponCard";
import macbook from "../../assets/dealoftheday_image.jpg";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStoreId,setStoreName } from "../redux/storeSlice";
const StorePage = () => {
  const [store, setStore] = useState();
  const storeId = useSelector((state) => state.store.storeId);
  const storeName = useSelector((state) => state.store.storeName);
  const [storeData, setStoreData] = useState([]);
  const [formdata, setFormData] = useState({});

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${import.meta.env.VITE_APP_BACKEND}api/coupons`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `${import.meta.env.VITE_APP_TOKEN}`,
      },
    };
    async function makeRequest() {
      let response = await axios.request(config);
      let data = response.data;
      if (storeId == null) {
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
  useEffect(() => {
    fetchStoreData();
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if(formdata.storeName=="All Stores"){
      formdata.storeId=null;
    }
    console.log("Form submitted:", formdata);
    dispatch(setStoreId(formdata.storeId));
    dispatch(setStoreName(formdata.storeName));
    navigate("/store");
  };

  const fetchStoreData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}api/stores`, {
        headers: {
          Authorization: `${import.meta.env.VITE_APP_TOKEN}`,
        },
      });
      setStoreData(response.data.stores);
      console.log("Store data:", response.data.stores);
    } catch (error) {
      console.error("Error fetching store data:", error);
    }
  };

  return (
    <>
      <div className="m-auto">
        {store?.length > 0 && (
          <h1 className="text-4xl text-center m-auto mt-10 mb-10 font-semibold">
            {storeName} : Best Deals
          </h1>
        )}

     

        <div className="flex">
          <div className="w-[23vw]">
            <div className="border-2  border-gray-200 rounded-lg p-10 m-4">
              <p className="text-blue-500 text-2xl">Filter By </p>
              <hr className="mt-2" />
              <p className="text-orange-600 text-right text-1xl hover:cursor-pointer">
                Clear All
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-1">
                <label className="text-[1.25rem]">Store</label>
                <select
                  className="text-[1rem] border-1 border-gray-300 rounded-lg p-2"
                  value={formdata.storeId || storeId || "All Stores"}
                  onChange={(e) => {
                    const selectedStore = storeData.find(
                      (store) => store._id === e.target.value
                    );
                    setFormData((prevData) => ({
                      ...prevData,
                      storeId: e.target.value,
                      storeName: selectedStore
                        ? selectedStore.name
                        : "All Stores",
                    }));
                  }}
                  name="storeId"
                >
                  <option value="">All Stores</option>
                  {storeData.map((store) => (
                    <option key={store._id} value={store._id}>
                      {store.name}
                    </option>
                  ))}
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
                  type="submit"
                  className="bg-orange-400 text-center text-white text-[1.2rem] rounded-lg p-2
                hover:cursor-pointer mt-2"
                >
                  Apply Filters
                </button>
              </form>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {store?.map((value, index) => {
              return (
                <CouponCard
                  key={index}
                  companylogo={value?.store?.logo}
                  image={macbook || value?.category?.image}
                  minPurchase={value.minimumPurchaseAmount}
                  description={value.description}
                  id={value._id}
                  code={value.couponCode}
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
