import React from 'react';

const CouponCard = ({companylogo,image,minPurchase,description}) => {
  return (
    <>
    <div className='flex flex-col  bg-gray-100 m-4 p-3 w-max rounded-lg'>
      <div className='flex flex-row gap-x-10 m-2 '>
        <div>
          <img src={companylogo} alt="company-name" className='h-30 mix-blend-multiply opacity-100' />
        </div>
        <div>
          <img src={image} alt="image" className='h-30 mix-blend-multiply opacity-100' />
        </div>
      </div>
      <div className='m-2'>
        <p><span className='text-blue-200'>◆</span> {description}</p>
        <p><span className='text-blue-200'>◆</span> Offer Valid on Minimun Purchase of ₹ {minPurchase}</p>
      </div>
      <div className='flex flex-row gap-x-40 mt-2'>
        <p className='font-bold'>
          Read More...
        </p>
        <button className='btn border-2 border-transparent bg-white text-blue-500 p-2 rounded-lg hover:cursor-pointer  font-semibold'>
          Grab Deal
        </button>
      </div>
    </div>
      
    </>
  );
}

export default CouponCard;
