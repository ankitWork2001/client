import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa'; 
import UpdateCoupon from "./Components/UpdateCoupon";
import AdminNavbar from './Components/AdminNavbar';


const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [edit,setEdit]=useState(null)
  const [add,setAdd]=useState(null)

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
        await axios.delete(`http://localhost:3000/api/coupons/${id}`,{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          }
        });
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
    <>
    <AdminNavbar/>
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Coupons Management</h2>
      <button
        className="m-2 ml-1 p-3 text-1xl border-2 border-blue-200 hover:cursor-pointer rounded-lg bg-blue-800 text-white hover:bg-pink-800"
        onClick={() => {
          setAdd(!add);
        }}
      >
        Add Coupon
      </button>
      {add && <AddCoupon />}
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
    </>
  );
};




const AddCoupon = () => {
  const [formData, setFormData] = useState({
    store: "",
    category: "",
    couponCode: "",
    discountType: "",
    discountValue: "",
    affiliateLink: "",
    expiryDate: "",
    terms: "",
    minimumPurchaseAmount: "",
    usageLimit: "",
    targetAudience: "",
    description: "",
    featured: false,
    couponType: "",
    startDate: "",
    maxDiscountCap: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      discountValue: Number(formData.discountValue),
      minimumPurchaseAmount: Number(formData.minimumPurchaseAmount),
      usageLimit: Number(formData.usageLimit),
      maxDiscountCap: Number(formData.maxDiscountCap),
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      await axios.post("http://localhost:3000/api/coupons", payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          "Content-Type": "application/json",
        },
      });
      alert("Coupon added successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to add coupon");
    }
  };

  return (
    <div className='m-4 p-4'> 
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white rounded shadow space-y-4">
      <h2 className="text-2xl font-bold mb-4">Add New Coupon</h2>

      <div>
        <label>Store ID</label>
        <input type="text" name="store" value={formData.store} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>

      <div>
        <label>Category ID</label>
        <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>

      <div>
        <label>Coupon Code</label>
        <input type="text" name="couponCode" value={formData.couponCode} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>

      <div>
        <label>Discount Type</label>
        <select name="discountType" value={formData.discountType} onChange={handleChange} className="w-full p-2 border rounded" required>
          <option value="">Select Discount Type</option>
          <option value="percentage">Percentage</option>
          <option value="flat">Flat</option>
        </select>
      </div>

      <div>
        <label>Discount Value</label>
        <input type="number" name="discountValue" value={formData.discountValue} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>

      <div>
        <label>Affiliate Link</label>
        <input type="text" name="affiliateLink" value={formData.affiliateLink} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>

      <div>
        <label>Expiry Date</label>
        <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="w-full p-2 border rounded" required />
      </div>

      <div>
        <label>Start Date</label>
        <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label>Minimum Purchase Amount</label>
        <input type="number" name="minimumPurchaseAmount" value={formData.minimumPurchaseAmount} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label>Usage Limit</label>
        <input type="number" name="usageLimit" value={formData.usageLimit} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label>Target Audience</label>
        <input type="text" name="targetAudience" value={formData.targetAudience} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label>Coupon Type</label>
        <input type="text" name="couponType" value={formData.couponType} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label>Max Discount Cap</label>
        <input type="number" name="maxDiscountCap" value={formData.maxDiscountCap} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label>Tags (comma separated)</label>
        <input type="text" name="tags" value={formData.tags} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      <div>
        <label>Terms & Conditions</label>
        <textarea name="terms" value={formData.terms} onChange={handleChange} className="w-full p-2 border rounded" />
      </div>

      <div className="flex items-center gap-2">
        <label>Featured</label>
        <input type="checkbox" name="featured" checked={formData.featured} onChange={handleChange} />
      </div>

      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
        Submit
      </button>
    </form>
    </div>
  );
};




export default Coupons;
