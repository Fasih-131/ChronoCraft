import React from 'react';

export default function LiveMetrics({ config }) {
  const calculateTotal = (key) => {
    return Object.values(config).reduce((acc, item) => acc + (item && item[key] ? Number(item[key]) : 0), 0);
  };

  const totalPrice = calculateTotal('price');
  const totalWeight = calculateTotal('weight');

  return (
    <div className="bg-glassBg backdrop-blur-lg border border-gray-800 rounded-2xl p-6 shadow-2xl mb-6">
      <h2 className="text-xl font-bold mb-4 text-neonCyan uppercase tracking-widest border-b border-gray-800 pb-2">Live Metrics</h2>
      
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-400">Total Price</div>
        <div className="text-3xl font-mono text-white">${totalPrice}</div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="text-gray-400">Total Weight</div>
        <div className="text-xl font-mono text-white">{totalWeight}g</div>
      </div>
    </div>
  );
}
