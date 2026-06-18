import React, { useState } from 'react';
import VibeArchitect from './VibeArchitect';

export default function SelectionControls({ config, dispatch, dbData }) {
  const [typeFilter, setTypeFilter] = useState('Men');
  const renderCategory = (title, items, categoryKey) => (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-gray-300 uppercase tracking-wider">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map(item => {
          const isSelected = config[categoryKey]?.id === item.id;
          return (
            <button
              key={item.id}
              onClick={() => dispatch({ type: 'SET_SELECTION', category: categoryKey, item })}
              className={`p-4 rounded-xl text-left transition-all duration-300 backdrop-blur-sm
                ${isSelected 
                  ? 'bg-gray-800/80 border-neonCyan shadow-[0_0_15px_rgba(0,243,255,0.4)]' 
                  : 'bg-glassBg border-gray-800 hover:border-gray-500 hover:bg-gray-800/50'
                } border-2 focus:outline-none`}
            >
              <div className="font-semibold text-lg text-white mb-1">{item.name}</div>
              <div className="text-sm text-neonCyan font-mono">${item.price}</div>
              {item.weight && <div className="text-xs text-gray-400 mt-1">{item.weight}g</div>}
            </button>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto pr-4 custom-scrollbar">
      
      {/* Vibe Architect AI Pane */}
      <VibeArchitect dispatch={dispatch} dbData={dbData} />

      {/* Type Filter Bar */}
      <div className="mb-4 bg-gray-900 rounded-lg p-1 flex shadow-inner border border-gray-800">
        {['Men', 'Women', 'Kids'].map(cat => (
          <button
            key={cat}
            onClick={() => setTypeFilter(cat)}
            className={`flex-1 py-2 rounded-md text-sm font-bold tracking-wider transition-all duration-300 ${
              typeFilter === cat 
                ? 'bg-neonCyan text-black shadow-[0_0_10px_rgba(0,243,255,0.5)]' 
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {renderCategory('Base Model / Type', dbData.types.filter(t => t.category === typeFilter), 'type')}
      {renderCategory('Case', dbData.cases, 'case')}
      {renderCategory('Dial', dbData.dials, 'dial')}
      {renderCategory('Crystal', dbData.crystals, 'crystal')}
      {renderCategory('Strap', dbData.straps, 'strap')}
    </div>
  );
}
