import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
const Dashboard = () => {
  const [stats, setStats] = useState({
    coupons: 0,
    stores: 0,
    categories: 0,
  });
const navigate=useNavigate();
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const couponsRes = await axios.get('http://localhost:3000/api/coupons', {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        const storesRes = await axios.get('http://localhost:3000/api/stores', {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        const categoriesRes = await axios.get('http://localhost:3000/api/categories', {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });

        setStats({
          coupons: couponsRes.data.length || 0,
          stores: storesRes.data.count || 0,
          categories: categoriesRes.data.count || 0,
        });
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      }
    };

    fetchStats();
  }, []);

  function handleCoupons()
  {
      navigate("/admin/coupons")
  }

  function handleStores()
  {
      navigate("/admin/stores")
  }

  function handleCategories()
  {
      navigate("/admin/categories")
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-blue-100 p-4 rounded-xl shadow-md hover:cursor-pointer" onClick={handleCoupons}>
        <h2 className="text-xl font-semibold">Total Coupons</h2>
        <p className="text-3xl mt-2">{stats.coupons}</p>
      </div>
      <div className="bg-green-100 p-4 rounded-xl shadow-md hover:cursor-pointer" onClick={handleStores}>
        <h2 className="text-xl font-semibold">Total Stores</h2>
        <p className="text-3xl mt-2">{stats.stores}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-xl shadow-md hover:cursor-pointer" onClick={handleCategories}>
        <h2 className="text-xl font-semibold">Total Categories</h2>
        <p className="text-3xl mt-2">{stats.categories}</p>
      </div>
    </div>
  );
};

export default Dashboard;
