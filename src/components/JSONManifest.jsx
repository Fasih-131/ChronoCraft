import React from 'react';

export default function JSONManifest({ config }) {
  const handleSubmit = () => {
    if (!config.case || !config.dial || !config.crystal) {
      alert("Please select all components before submitting.");
      return;
    }
    console.log("Submitting Build Payload:", config);
    alert("Build submitted successfully! Payload logged to console.");
  };

  return (
    <div className="bg-glassBg backdrop-blur-lg border border-gray-800 rounded-2xl p-6 shadow-2xl flex flex-col h-full max-h-[400px]">
      <div className="flex justify-between items-center mb-4 border-b border-gray-800 pb-2">
        <h2 className="text-xl font-bold text-neonCyan uppercase tracking-widest">Manifest</h2>
        <button 
          onClick={handleSubmit}
          className="bg-neonCyan hover:bg-cyan-400 text-black font-bold py-2 px-4 rounded-lg transition-colors duration-300 shadow-[0_0_15px_rgba(0,243,255,0.4)]"
        >
          Submit Build
        </button>
      </div>
      
      <div className="bg-matteBlack rounded-xl p-4 overflow-auto flex-1 border border-gray-800 custom-scrollbar">
        <pre className="text-neonCyan font-mono text-xs sm:text-sm">
          <code>
{JSON.stringify(config, null, 2)}
          </code>
        </pre>
      </div>
    </div>
  );
}
