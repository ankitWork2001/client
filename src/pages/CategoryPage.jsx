import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import CouponCard from "../components/CouponCard";
import { useSelector,useDispatch } from "react-redux";
import { setCategoryId,setCategoryName } from "../redux/categorySlice";
import { useNavigate } from "react-router-dom";


const CategoryPage = () => {
  const [category, setCategory] = useState();
  const catogoryId = useSelector((state) => state.category.categoryId);
  const categoryName = useSelector((state) => state.category.categoryName);
  const [categoryData, setCategoryData] = useState([]);
  const [formdata, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
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
      if (catogoryId != null) {
        setCategory(
          data.filter((value) => {
            return value?.category?._id == catogoryId;
          })
        );
      } else {
        setCategory(data);
      }
    }

    makeRequest();
  }, [catogoryId]);
  useEffect(() => {
    fetchCategoryData();
  }, []);
  const fetchCategoryData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_APP_BACKEND}api/categories`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${import.meta.env.VITE_APP_TOKEN}`,
        },
      });
      setCategoryData(response.data.categories);
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    if(formdata.categoryName=="All Categories"){
      formdata.categoryId=null;
    }
    console.log("Form submitted:", formdata);
    dispatch(setCategoryId(formdata.categoryId));
    dispatch(setCategoryName(formdata.categoryName));
    navigate("/category");
  };

  return (
    <>
      <div className="m-auto">
        {category?.length > 0 && (
          <h1 className="text-4xl text-center m-auto mt-10 mb-10 font-semibold">
            {categoryName} : Best Deals
          </h1>
        )}

       
        <div className="flex">
          <div className="w-[30vw]">
            <div className="border-2  border-gray-200 rounded-lg p-10 m-4">
              <p className="text-blue-500 text-2xl">Filter By </p>
              <hr className="mt-2" />
              <p className="text-orange-600 text-right text-1xl hover:cursor-pointer">
                Clear All
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col gap-y-1">
                <label className="text-[1.25rem]">Category</label>
                <select
                  className="text-[1rem] border-1 border-gray-300 rounded-lg p-2"
                  value={formdata.categoryId || catogoryId || "All Categories"}
                  onChange={(e) => {
                    const selectedCategory = categoryData.find(
                      (category) => category._id === e.target.value
                    );
                    setFormData((prevData) => ({
                      ...prevData,
                      categoryId: e.target.value,
                      categoryName: selectedCategory
                        ? selectedCategory.name
                        : "All Categories",
                    }));
                  }}
                  name="categoryId"
                >
                  <option value="">All Categories</option>
                  {categoryData?.map((value, index) => {
                    return (
                      <option key={index} value={value._id}>
                        {value.name}
                      </option>
                    );
                  })}
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
