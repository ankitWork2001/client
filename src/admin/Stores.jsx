import React, { useEffect, useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import axios from 'axios';

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/stores', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setStores(data.stores);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch stores:', error);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this store?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/stores/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setStores((prev) => prev.filter((store) => store._id !== id));
    } catch (error) {
      console.error('Failed to delete store:', error);
    }
  };

  const handleEdit = (store) => {
    // Open a modal or redirect to edit form with pre-filled values
    console.log('Edit store:', store);
    // For example: navigate(`/admin/edit-store/${store._id}`)
  };

  useEffect(() => {
    fetchStores();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <div className="text-xl font-semibold mb-4">Top Stores</div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="text-left py-3 px-4">Store Name</th>
              <th className="text-left py-3 px-4">Total Coupons</th>
              <th className="text-left py-3 px-4">Featured</th>
              <th className="text-left py-3 px-4">Created At</th>
              <th className="text-left py-3 px-4">Rank</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store, index) => (
              <tr key={store._id} className="border-t">
                <td className="py-3 px-4">{store.name}</td>
                <td className="py-3 px-4">{store.totalCoupons}</td>
                <td className="py-3 px-4">Yes</td>
                <td className="py-3 px-4">
                  {new Date(store.createdAt).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                  })}
                </td>
                <td className="py-3 px-4">{index + 1}</td>
                <td className="py-3 px-4 flex gap-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded"
                    onClick={() => handleEdit(store)}
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                    onClick={() => handleDelete(store._id)}
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {stores.length === 0 && (
              <tr>
                <td colSpan="6" className="py-4 text-center">
                  No stores found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Stores;
