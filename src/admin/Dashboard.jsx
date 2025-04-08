import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    coupons: 0,
    stores: 0,
    categories: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [couponsRes, storesRes, categoriesRes] = await Promise.all([
          axios.get('/api/coupons'),
          axios.get('/api/stores'),
          axios.get('/api/categories'),
        ]);

        setStats({
          coupons: couponsRes.data.length || 0,
          stores: storesRes.data.count || 0,
          categories: categoriesRes.data.length || 0,
        });
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className="bg-blue-100 p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold">Total Coupons</h2>
        <p className="text-3xl mt-2">{stats.coupons}</p>
      </div>
      <div className="bg-green-100 p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold">Total Stores</h2>
        <p className="text-3xl mt-2">{stats.stores}</p>
      </div>
      <div className="bg-yellow-100 p-4 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold">Total Categories</h2>
        <p className="text-3xl mt-2">{stats.categories}</p>
      </div>
    </div>
  );
};

export default Dashboard;
