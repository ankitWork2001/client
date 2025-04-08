import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

const couponsData = [
  {
    id: 1,
    store: "Amazon",
    category: "Laptop",
    couponCode: "MACSAVE10",
    discountType: "Flat Discount",
    expiryDate: "30th April",
    status: "Active",
    clicks: 3200,
    users: 500,
  },
  {
    id: 2,
    store: "Amazon",
    category: "Laptop",
    couponCode: "MACSAVE10",
    discountType: "Flat Discount",
    expiryDate: "30th April",
    status: "Active",
    clicks: 3200,
    users: 500,
  },
  {
    id: 3,
    store: "Amazon",
    category: "Laptop",
    couponCode: "MACSAVE10",
    discountType: "Flat Discount",
    expiryDate: "30th April",
    status: "Active",
    clicks: 3200,
    users: 500,
  },
];

export default function CouponsManagement() {
  const [coupons, setCoupons] = useState(couponsData);

  const handleDelete = (id) => {
    const updatedCoupons = coupons.filter((coupon) => coupon.id !== id);
    setCoupons(updatedCoupons);
  };

  const handleEdit = (id) => {
    console.log("Edit coupon with id:", id);
    // Redirect to edit page or open modal here
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Coupons Management</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded">
          <thead className="bg-blue-600 text-white">
            <tr>
              <th className="p-2 text-left">Store</th>
              <th className="p-2 text-left">Category</th>
              <th className="p-2 text-left">Coupon Code</th>
              <th className="p-2 text-left">Discount Type</th>
              <th className="p-2 text-left">Expiry Date</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Clicks</th>
              <th className="p-2 text-left">Users</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon.id} className="border-b">
                <td className="p-2">{coupon.store}</td>
                <td className="p-2">{coupon.category}</td>
                <td className="p-2 text-pink-600 font-medium">{coupon.couponCode}</td>
                <td className="p-2">{coupon.discountType}</td>
                <td className="p-2 text-red-500 font-medium">{coupon.expiryDate}</td>
                <td className="p-2 text-green-500">{coupon.status}</td>
                <td className="p-2">{coupon.clicks.toLocaleString()}</td>
                <td className="p-2">{coupon.users}</td>
                <td className="p-2 flex gap-2">
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-3 py-1 rounded">
                    Deal Of the Day
                  </Button>
                  <Button
                    variant="outline"
                    className="p-2"
                    onClick={() => handleDelete(coupon.id)}
                  >
                    <Trash2 size={16} className="text-red-600" />
                  </Button>
                  <Button
                    variant="outline"
                    className="p-2"
                    onClick={() => handleEdit(coupon.id)}
                  >
                    <Pencil size={16} className="text-blue-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
