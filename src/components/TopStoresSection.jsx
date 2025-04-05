import React, { useEffect,useState } from 'react'
import axios from 'axios';
import StoreCard from './StoreCard';
const TopStoresSection = () => {
    const [stores, setStores] = useState([]);
    useEffect(()=>{
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'http://localhost:3000/api/stores',
            headers: { 
              'Authorization':import.meta.env.VITE_APP_TOKEN,
            }
          };
          
          async function makeRequest() {
            try {
                const response = await axios.request(config);
            //   console.log(JSON.stringify(response.data));
                setStores(response.data.stores);
                

            }
            catch (error) {
              console.log(error);
            }
          }
          
          makeRequest();
    },[]);

  return (
    <div className='w-[90vw] m-auto mt-5'>
        <div className='flex justify-between mb-10 items-center'>
            <h1 className='text-4xl'>Top Stores</h1>
            <button className=' text-orange-300 text-2xl rounded cursor-pointer'>Visit All Stores</button>
        </div>
        <div className='flex flex-wrap gap-x-8 gap-y-8 justify-center items-center bg-amber-200 p-10 rounded-lg'>
            {stores?.map((value,index)=>{
                return (
                    <StoreCard key={index} logo={value.logo} name={value.name} totalCoupons={value.totalCoupons} />
                )
            })}
        </div>

    </div>
  )
}

export default TopStoresSection