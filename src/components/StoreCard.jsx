import React from 'react'
import { useDispatch } from 'react-redux';
import { setStoreId,setStoreName } from '../redux/storeSlice';
import { useNavigate } from 'react-router-dom';
const StoreCard = ({logo,name,totalCoupons,id}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    console.log(`Clicked on ${name}`);
    dispatch(setStoreId(id));
    dispatch(setStoreName(name));

    navigate(`/store`);
  };
  return (
    <div className='bg-amber-50 flex flex-col justify-center items-center border-3 rounded-lg border-yellow-500 min-w-[20vw] min-h-[15vw] gap-2 p-5 cursor-pointer'
    onClick={handleClick}
    >

      <img 
        src={logo} 
        alt={`${name} logo`} 
        className="mix-blend-multiply object-contain h-24 w-auto"
      />
      <h2 className='text-xl font-semibold'>{name}</h2>
      
      <button className='border-1 px-4 py-2 rounded bg-white text-orange-400'> Upto {totalCoupons} % </button>

    </div>
  )
}

export default StoreCard