import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa'; 
import UpdateCoupon from "./Components/UpdateCoupon";


const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [edit,setEdit]=useState(null)

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/coupons', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setCoupons(res.data);
    } catch (err) {
      console.error('Error fetching coupons:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        await axios.delete(`http://localhost:3000/api/coupons/${id}`);
        setCoupons(coupons.filter((coupon) => coupon._id !== id));
      } catch (err) {
        console.error('Error deleting coupon:', err);
      }
    }
  };

  const formatDate = (dateStr) => {
    const options = { day: 'numeric', month: 'long' };
    return new Date(dateStr).toLocaleDateString('en-GB', options);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Coupons Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-blue-700 text-white">
            <tr>
              <th className="p-3 text-left">Store</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Coupon Code</th>
              <th className="p-3 text-left">Discount Type</th>
              <th className="p-3 text-left">Expiry Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Clicks</th>
              <th className="p-3 text-left">Users</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <React.Fragment key={coupon._id}>
              <tr key={coupon._id} className="border-t border-gray-300">
                <td className="p-3">{coupon.store?.name || 'N/A'}</td>
                <td className="p-3">{coupon.category?.name || 'N/A'}</td>
                <td className="p-3 text-pink-600 font-semibold">{coupon.couponCode}</td>
                <td className="p-3">{coupon.discountType === 'flat' ? 'Flat Discount' : 'Percentage Discount'}</td>
                <td className="p-3 text-red-600">{formatDate(coupon.expiryDate)}</td>
                <td className="p-3 text-green-600">{coupon.status ? 'Active' : 'Inactive'}</td>
                <td className="p-3">{coupon.clickCount.toLocaleString()}</td>
                <td className="p-3">{coupon.usedCount}</td>
                <td className="p-3 flex items-center gap-2">
                  {coupon.featured && (
                    <button className="bg-orange-500 text-white px-3 py-1 rounded-md text-sm">
                      Deal Of the Day
                    </button>
                  )}
                  <button onClick={() => handleDelete(coupon._id)} className="p-2 text-red-600">
                    <FaTrash />
                  </button>
                  <button
                    onClick={()=>setEdit(edit==coupon._id?null:coupon._id)}
                    className="p-2 text-blue-600"
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
              {edit == coupon._id && (
                  <tr >
                    <td colSpan="10" className="py-4 m-4 ">
                      <UpdateCoupon initialData={coupon} />
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Coupons;
