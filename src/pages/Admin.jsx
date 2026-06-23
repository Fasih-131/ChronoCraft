import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'inventory'
  
  // Orders State
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Inventory State
  const [products, setProducts] = useState([]);
  const [loadingInventory, setLoadingInventory] = useState(true);

  useEffect(() => {
    if (activeTab === 'orders') fetchOrders();
    if (activeTab === 'inventory') fetchInventory();
  }, [activeTab]);

  const fetchOrders = async () => {
    setLoadingOrders(true);
    const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
    if (data) setOrders(data);
    setLoadingOrders(false);
  };

  const fetchInventory = async () => {
    setLoadingInventory(true);
    const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
    if (data) setProducts(data);
    setLoadingInventory(false);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    await supabase.from('orders').update({ status: newStatus }).eq('id', orderId);
    fetchOrders();
  };

  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await supabase.from('products').delete().eq('id', id);
      fetchInventory();
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-end mb-8 border-b border-gray-800 pb-4">
        <h2 className="text-3xl font-extrabold text-white tracking-tighter uppercase">Admin <span className="text-neonCyan">Dashboard</span></h2>
        <div className="flex gap-4">
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`font-bold uppercase tracking-widest text-sm pb-2 border-b-2 ${activeTab === 'orders' ? 'text-neonCyan border-neonCyan' : 'text-gray-500 border-transparent hover:text-white'}`}
          >
            Orders
          </button>
          <button 
            onClick={() => setActiveTab('inventory')} 
            className={`font-bold uppercase tracking-widest text-sm pb-2 border-b-2 ${activeTab === 'inventory' ? 'text-neonCyan border-neonCyan' : 'text-gray-500 border-transparent hover:text-white'}`}
          >
            Inventory
          </button>
        </div>
      </div>

      <div className="bg-glassBg backdrop-blur-md border border-gray-800 rounded-2xl shadow-2xl overflow-hidden">
        {activeTab === 'orders' && (
          <div className="overflow-x-auto">
            {loadingOrders ? <div className="p-8 text-center text-neonCyan">Loading Orders...</div> : (
              <table className="w-full text-left text-sm">
                <thead className="bg-black/50 text-gray-400 uppercase tracking-widest text-xs border-b border-gray-800">
                  <tr>
                    <th className="p-4">Order ID</th>
                    <th className="p-4">Customer</th>
                    <th className="p-4">Cart Size</th>
                    <th className="p-4">Total</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                      <td className="p-4 font-mono text-xs text-gray-500">{order.id.slice(0,8)}...</td>
                      <td className="p-4">
                        <div className="font-bold text-white">{order.shipping_details?.fullName}</div>
                        <div className="text-gray-500 text-xs">{order.shipping_details?.city}</div>
                      </td>
                      <td className="p-4 text-neonCyan">{Array.isArray(order.config) ? `${order.config.length} items` : 'Custom Build'}</td>
                      <td className="p-4 font-bold text-white">${order.total_price}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs uppercase tracking-widest ${
                          order.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/50' :
                          order.status === 'Shipped' ? 'bg-blue-500/20 text-blue-500 border border-blue-500/50' :
                          order.status === 'Delivered' ? 'bg-green-500/20 text-green-500 border border-green-500/50' :
                          'bg-gray-500/20 text-gray-400 border border-gray-500/50'
                        }`}>{order.status}</span>
                      </td>
                      <td className="p-4">
                        <select 
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
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
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Product Catalog</h3>
              <button onClick={() => alert("Product Creation Modal coming soon!")} className="bg-neonCyan text-black px-4 py-2 rounded text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors">
                + Add Product
              </button>
            </div>
            <div className="overflow-x-auto">
              {loadingInventory ? <div className="p-8 text-center text-neonCyan">Loading Inventory...</div> : (
                <table className="w-full text-left text-sm">
                  <thead className="bg-black/50 text-gray-400 uppercase tracking-widest text-xs border-b border-gray-800">
                    <tr>
                      <th className="p-4">Name</th>
                      <th className="p-4">Brand</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Price</th>
                      <th className="p-4">Stock</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product.id} className="border-b border-gray-800/50 hover:bg-white/5 transition-colors">
                        <td className="p-4 font-bold text-white flex items-center gap-3">
                          <img src={product.image_url} alt="thumb" className="w-8 h-8 object-cover rounded bg-black" />
                          {product.name}
                        </td>
                        <td className="p-4 text-neonCyan">{product.brand}</td>
                        <td className="p-4 text-gray-400">{product.category}</td>
                        <td className="p-4 font-mono text-white">${Number(product.price).toLocaleString()}</td>
                        <td className="p-4 text-gray-400">{product.stock}</td>
                        <td className="p-4 flex gap-2">
                          <button className="text-gray-400 hover:text-white uppercase text-xs tracking-widest">Edit</button>
                          <button onClick={() => deleteProduct(product.id)} className="text-red-500 hover:text-red-400 uppercase text-xs tracking-widest">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
