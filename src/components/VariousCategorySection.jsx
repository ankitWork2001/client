import React, { useEffect } from 'react'
import axios from 'axios'
const VariousCategorySection = () => {
    const [categories, setCategories] = React.useState()
    useEffect(()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/coupons',
            headers: { 
              'Authorization':import.meta.env.VITE_APP_TOKEN,
            }
          };
          
          async function makeRequest() {
            try {
              const response = await axios.request(config);
            //   console.log(JSON.stringify(response.data));
            let data=response.data;
            let map=new Map();
            data.forEach((item)=>{
                if(!map.has(item.category.name)){
                    map.set(item.category.name,[])
                }
                map.get(item.category.name).push(item);
            });
            let result=Array.from(map.entries()).map(([key, value]) => ({ category: key, coupons: value }));
            console.log(result);
            setCategories(result);
            }
            catch (error) {
              console.log(error);
            }
          }
          
          makeRequest();
    },[])
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
        {categories && categories.map((item) => (
            <IndividualCategorySection key={item.category} coupons={item.coupons} name={item.category} />
        ))}
    </div>
  )
}

const IndividualCategorySection = ({coupons,name}) => {
    
    return (
        <div id={name} className="mb-12">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-blue-500 inline-block">{name}</h2>
                <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">View More</button>
            </div>
            <div className="flex flex-wrap gap-20 p-5 rounded-lg" style={{ background: 'linear-gradient(to top, #1E3A8A, #BFDBFE)' }}>
                {coupons.slice(0, 3).map((coupon) => (
                    <CouponCategoryCard key={coupon.id} logo={coupon.store.logo} brand={coupon.store.name} desc={coupon.description} />
                ))}
            </div>
        </div>
    )
}

const CouponCategoryCard=({logo,brand,desc})=>{
    return (
        <div className="w-70 border border-gray-200 rounded-lg shadow-md transition-shadow duration-300 p-4 flex flex-col items-center">
            <div className="w-26 h-26 mb-4 flex items-center justify-center">
                <img src={logo} alt={brand} className="max-w-full max-h-full object-contain mix-blend-multiply" />
            </div>
            <h3 className="font-bold text-lg text-gray-800 mb-2 text-center">{brand}</h3>
            <p className="text-gray-100 text-center text-sm">{desc}</p>
            <button className="mt-4 bg-orange-400 text-white px-4 py-2 rounded transition-colors duration-300 cursor-pointer">Get Deal</button>
        </div>
    )

}

export default VariousCategorySection