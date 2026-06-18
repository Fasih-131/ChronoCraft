import React, { useState } from 'react';

export default function VibeArchitect({ dispatch, dbData }) {
  const [prompt, setPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const analyzeVibe = async (userPrompt) => {
    setIsThinking(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const p = userPrompt.toLowerCase();
    
    // Extract budget if present
    const budgetMatch = p.match(/(?:under|<|budget of|max)\s*\$?\s*(\d+)/i);
    const maxBudget = budgetMatch ? parseInt(budgetMatch[1], 10) : Infinity;

    // Extract gender if present
    let targetGender = null;
    if (p.includes('women') || p.includes('woman') || p.includes('girl') || p.includes('lady')) targetGender = 'Women';
    else if (p.includes('kid') || p.includes('child') || p.includes('boy') || p.includes('girl')) targetGender = 'Kids';
    else if (p.includes('men') || p.includes('man') || p.includes('guy') || p.includes('male')) targetGender = 'Men';

    let targetStyle = 'standard';
    if (p.includes('stealth') || p.includes('dark') || p.includes('tactical')) targetStyle = 'stealth';
    else if (p.includes('classic') || p.includes('heavy') || p.includes('expensive')) targetStyle = 'classic';
    else if (p.includes('cheap') || p.includes('budget') || p.includes('basic')) targetStyle = 'cheap';
    else if (p.includes('neon') || p.includes('cyber') || p.includes('future')) targetStyle = 'cyberpunk';
    else if (p.includes('gold') || p.includes('rich') || p.includes('luxury')) targetStyle = 'luxury';

    let prefFamilies, prefCases, prefDials, prefCrystals, prefStraps;

    if (targetStyle === 'stealth') {
      prefFamilies = ['stealth_tactical', 'racing', 'minimalist'];
      prefCases = ['Forged Carbon Fiber', 'Matte Ceramic', 'Vantablack Coated'];
      prefDials = ['Vantablack Void', 'Carbon Weave'];
      prefCrystals = ['Privacy Glass (Dark)', 'Sapphire AR Coated'];
      prefStraps = ['Kevlar Tactical', 'Fluoroelastomer Rubber'];
    } else if (targetStyle === 'classic') {
      prefFamilies = ['cushion', 'oval_elegance', 'aviator', 'diamond_halo'];
      prefCases = ['Platinum', 'Damascus Steel', 'Titanium Grade 5'];
      prefDials = ['Skeletonized Mechanical', 'Guilloché Silver'];
      prefCrystals = ['Sapphire Crystal (Clear)', 'Domed Sapphire'];
      prefStraps = ['Alligator Leather', 'Milanese Mesh loop'];
    } else if (targetStyle === 'cheap') {
      prefFamilies = ['minimalist', 'petite_square', 'digital_block'];
      prefCases = ['Titanium Grade 5'];
      prefDials = ['Blood Red Matte'];
      prefCrystals = ['Mineral Glass', 'Acrylic Plexi'];
      prefStraps = ['NATO Nylon', 'Neon Silicone'];
    } else if (targetStyle === 'cyberpunk') {
      prefFamilies = ['diver_pro', 'hexagon', 'stealth_tactical'];
      prefCases = ['Cyberpunk Neon Edge', 'Matte Ceramic'];
      prefDials = ['Cyberpunk Neon Cyan', 'Holographic Grid'];
      prefCrystals = ['Cyber Yellow Tint', 'Blue Tinted Sapphire'];
      prefStraps = ['Neon Silicone', 'Carbon Link'];
    } else if (targetStyle === 'luxury') {
      prefFamilies = ['diamond_halo', 'empress', 'skeleton_tourbillon'];
      prefCases = ['Rose Gold 18k', 'Platinum'];
      prefDials = ['Grand Feu Enamel', 'Skeletonized Mechanical'];
      prefCrystals = ['Sapphire Crystal (Clear)'];
      prefStraps = ['Alligator Leather', 'Titanium Bracelet'];
    } else {
      prefFamilies = dbData.types.map(t => t.design_family || t.designFamily);
      prefCases = dbData.cases.map(c => c.name);
      prefDials = dbData.dials.map(d => d.name);
      prefCrystals = dbData.crystals.map(c => c.name);
      prefStraps = dbData.straps.map(s => s.name);
    }

    const getPreferred = (arr, names) => arr.filter(item => names.includes(item.name));
    
    // Filter types by gender first
    let baseTypes = dbData.types;
    if (targetGender) {
      baseTypes = baseTypes.filter(t => t.category === targetGender);
      // Fallback if empty
      if (!baseTypes.length) baseTypes = dbData.types;
    }

    // Filter to preferred design families
    let types = baseTypes.filter(t => prefFamilies.includes(t.design_family || t.designFamily));
    if (!types.length) types = baseTypes; // Fallback if no matching design family for this gender

    let cases = getPreferred(dbData.cases, prefCases);
    let dials = getPreferred(dbData.dials, prefDials);
    let crystals = getPreferred(dbData.crystals, prefCrystals);
    let straps = getPreferred(dbData.straps, prefStraps);

    // Fallback if empty for some reason
    if (!types.length) types = dbData.types;
    if (!cases.length) cases = dbData.cases;
    if (!dials.length) dials = dbData.dials;
    if (!crystals.length) crystals = dbData.crystals;
    if (!straps.length) straps = dbData.straps;

    // Generate all valid combinations of preferred items
    let validCombinations = [];
    for (const t of types) {
      for (const c of cases) {
        for (const d of dials) {
          for (const cr of crystals) {
            for (const s of straps) {
              const total = Number(t.price) + Number(c.price) + Number(d.price) + Number(cr.price) + Number(s.price);
              if (total <= maxBudget) {
                validCombinations.push({ payload: { type: t, case: c, dial: d, crystal: cr, strap: s }, total });
              }
            }
          }
        }
      }
    }

    let finalPayload = null;

    if (validCombinations.length > 0) {
      // Sort combinations by price descending (to maximize the budget)
      validCombinations.sort((a, b) => b.total - a.total);
      
      // Take the top 5 most expensive valid combinations and pick one randomly for variety
      const topPicks = validCombinations.slice(0, 5);
      finalPayload = topPicks[Math.floor(Math.random() * topPicks.length)].payload;
    } else {
      // If NO combinations fit the budget, we have to cheat and grab the absolute cheapest items across the ENTIRE database
      const getCheapest = (arr) => [...arr].sort((a, b) => Number(a.price) - Number(b.price))[0];
      finalPayload = {
        type: getCheapest(dbData.types),
        case: getCheapest(dbData.cases),
        dial: getCheapest(dbData.dials),
        crystal: getCheapest(dbData.crystals),
        strap: getCheapest(dbData.straps)
      };
    }

    dispatch({ type: 'SET_BULK', payload: finalPayload });
    setIsThinking(false);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      analyzeVibe(prompt);
    }
  };

  return (
    <div className="mb-8 p-4 bg-gray-900/60 rounded-xl border border-neonCyan/30 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
      <h3 className="text-sm font-bold text-neonCyan mb-2 uppercase tracking-widest flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
        Vibe Architect AI
      </h3>
      <form onSubmit={handleGenerate} className="flex gap-2">
        <input 
          type="text" 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe your ideal watch (e.g., 'Stealthy and tactical under $300')"
          className="flex-1 bg-black/50 border border-gray-700 rounded-md px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-neonCyan transition-colors"
          disabled={isThinking}
        />
        <button 
          type="submit" 
          disabled={isThinking || !prompt.trim()}
          className="bg-neonCyan text-black px-4 py-2 rounded-md font-bold text-sm hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px]"
        >
          {isThinking ? (
            <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          ) : (
            'Generate Build'
          )}
        </button>
      </form>
    </div>
  );
}
