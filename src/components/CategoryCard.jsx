import React from 'react';

const CategoryCard = ({image,name,totalCoupons}) => {
  return (
    <>
      <div className='flex flex-col justify-center items-center   border-3 rounded-lg border-yellow-500  min-w-[350px] px-5 py-1'>
        <img src={image} alt="logo_image" className='h-12 w-12' />
        <p className='font-bold font-serif'>{name}</p>
        <p>{totalCoupons} offers</p>
      </div>
    </>
  );
}

export default CategoryCard;
