import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    // Join with profiles if you wanted email, but we don't have email in orders. We can fetch user auth emails if needed, but for now just raw orders.
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (data) setOrders(data);
    if (error) console.error("Error fetching orders", error);
    setLoading(false);
  };

  const updateStatus = async (orderId, newStatus) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      alert("Failed to update status: " + error.message);
    } else {
      fetchOrders();
    }
  };

  if (loading) {
    return <div className="p-8 text-neonCyan font-mono tracking-widest uppercase">Loading Admin Data...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-extrabold text-neonCyan mb-8 tracking-tighter uppercase">Admin Dashboard</h2>

      <div className="bg-glassBg backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-black/50 text-gray-400 uppercase tracking-widest text-xs border-b border-gray-800">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Watch Model</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="p-8 text-center text-gray-500 italic">No orders found.</td>
                </tr>
              ) : (
                orders.map(order => (
                  <tr key={order.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                    <td className="p-4 font-mono text-xs text-gray-500">{order.id.slice(0,8)}...</td>
                    <td className="p-4">
                      <div className="font-bold">{order.shipping_details?.fullName}</div>
                      <div className="text-gray-500 text-xs">{order.shipping_details?.city}, {order.shipping_details?.country}</div>
                    </td>
                    <td className="p-4 text-neonCyan">{order.config?.type?.name || 'Custom Build'}</td>
                    <td className="p-4 font-bold">${order.total_price}</td>
                    <td className="p-4">
                      <span className={`px-2 py-1 rounded text-xs uppercase tracking-widest ${
                        order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' :
                        order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-500 border border-blue-500/50' :
                        order.status === 'Delivered' ? 'bg-green-500/20 text-green-500 border border-green-500/50' :
                        'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select 
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="bg-black border border-gray-700 text-white text-xs p-1 rounded focus:border-neonCyan outline-none"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
