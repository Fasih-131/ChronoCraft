import React from 'react';
import { isDarkColor } from '../utils/colorUtils';

export default function StagingCanvas({ config }) {
  const caseColor = config.case?.color || '#333';
  const dialColor = config.dial?.color || '#222';
  const crystalOpacity = config.crystal?.opacity || 0;
  const strapColor = config.strap?.color || '#111';
  
  const design = config.type?.design_family || config.type?.designFamily || 'standard';
  const isCaseDark = isDarkColor(caseColor);
  const containerBgClass = isCaseDark ? 'bg-white/90 border-gray-300' : 'bg-glassBg border-gray-800';

  // Base utilities for rendering
  const getShapeStyles = () => {
    switch(design) {
      case 'aviator': return { borderRadius: '50%', border: `4px solid ${caseColor}` };
      case 'diver_pro': return { borderRadius: '50%', border: `12px dashed ${caseColor}` };
      case 'cushion': return { borderRadius: '30px', border: `8px solid ${caseColor}` };
      case 'tonneau': return { borderRadius: '50% 50% 50% 50% / 20% 20% 20% 20%', border: `6px solid ${caseColor}` };
      case 'racing': return { borderRadius: '50%', border: `6px solid ${caseColor}` };
      case 'bullhead': return { borderRadius: '50%', border: `8px solid ${caseColor}` };
      case 'stealth_tactical': return { clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', backgroundColor: caseColor, padding: '10px' };
      case 'skeleton_tourbillon': return { borderRadius: '50%', border: `2px solid ${caseColor}`, boxShadow: `0 0 0 4px ${caseColor} inset` };
      case 'oval_elegance': return { borderRadius: '50%', transform: 'scaleY(1.3) scaleX(0.8)', border: `4px solid ${caseColor}` };
      case 'diamond_halo': return { borderRadius: '50%', border: `8px dotted white`, backgroundColor: caseColor };
      case 'hexagon': return { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', backgroundColor: caseColor, padding: '8px' };
      case 'bangle': return { borderRadius: '50%', border: `15px solid ${caseColor}` };
      case 'floral_art': return { clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', backgroundColor: caseColor, padding: '15px' };
      case 'wrap_strap': return { borderRadius: '50%', border: `2px solid ${caseColor}` };
      case 'asymmetric': return { borderRadius: '50% 30% 70% 40%', border: `6px solid ${caseColor}` };
      case 'petite_square': return { borderRadius: '8px', border: `4px solid ${caseColor}`, transform: 'scale(0.6)' };
      case 'digital_block': return { borderRadius: '4px', border: `10px solid ${caseColor}`, transform: 'scaleX(1.2)' };
      case 'compass_gear': return { borderRadius: '50%', border: `15px dotted ${caseColor}` };
      case 'heart_shape': return { clipPath: 'path("M 128 200 C 128 200 16 120 16 64 C 16 20 64 20 128 80 C 192 20 240 20 240 64 C 240 120 128 200 128 200")', backgroundColor: caseColor };
      case 'star_burst': return { clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', backgroundColor: caseColor };
      default: return { borderRadius: '50%', border: `6px solid ${caseColor}` };
    }
  };

  const getDialStyles = () => {
    switch(design) {
      case 'stealth_tactical': return { clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)', backgroundColor: dialColor };
      case 'hexagon': return { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', backgroundColor: dialColor };
      case 'floral_art': return { clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', backgroundColor: dialColor };
      case 'heart_shape': return { clipPath: 'path("M 128 200 C 128 200 16 120 16 64 C 16 20 64 20 128 80 C 192 20 240 20 240 64 C 240 120 128 200 128 200")', backgroundColor: dialColor };
      case 'star_burst': return { clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)', backgroundColor: dialColor };
      case 'cushion':
      case 'petite_square':
      case 'digital_block':
        return { borderRadius: '8px', backgroundColor: dialColor };
      default: return { borderRadius: '50%', backgroundColor: dialColor };
    }
  };

  // Render specific internal elements based on design
  const renderInternalFeatures = () => {
    if (design === 'digital_block') {
      return (
        <div className="text-neonCyan font-mono text-4xl font-bold tracking-widest mt-4">10:08</div>
      );
    }
    
    if (design === 'skeleton_tourbillon') {
      return (
        <>
          <div className="absolute w-24 h-24 rounded-full border-4 border-gray-500 top-2 left-2 flex items-center justify-center animate-[spin_10s_linear_infinite]">
            <div className="w-full h-1 bg-gray-400"></div>
            <div className="h-full w-1 bg-gray-400 absolute"></div>
          </div>
          <div className="absolute w-16 h-16 rounded-full border-2 border-yellow-600 bottom-4 right-4 flex items-center justify-center animate-[spin_4s_linear_infinite]">
            <div className="w-full h-0.5 bg-yellow-500"></div>
          </div>
        </>
      );
    }

    const needsSubdials = ['racing', 'aviator', 'tonneau'].includes(design);
    return (
      <>
        {/* Indices */}
        {['minimalist', 'bangle', 'diamond_halo', 'heart_shape', 'star_burst', 'floral_art'].indexOf(design) === -1 && 
          Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="absolute w-1 h-3 bg-white/70" style={{
              top: '5px', left: '50%', transformOrigin: '50% 91px', transform: `translateX(-50%) rotate(${i * 30}deg)`
            }}></div>
          ))
        }

        {/* Subdials */}
        {needsSubdials && (
          <>
            <div className="absolute left-6 w-10 h-10 rounded-full border border-gray-600 bg-black/40"></div>
            <div className="absolute right-6 w-10 h-10 rounded-full border border-gray-600 bg-black/40"></div>
            {design !== 'aviator' && <div className="absolute bottom-6 w-10 h-10 rounded-full border border-gray-600 bg-black/40"></div>}
          </>
        )}

        {/* Hands */}
        <div className="absolute w-2 h-16 bg-gradient-to-t from-gray-500 to-white rounded-full bottom-1/2 origin-bottom transform rotate-[45deg] z-20"></div>
        <div className="absolute w-1.5 h-20 bg-gradient-to-t from-gray-500 to-white rounded-full bottom-1/2 origin-bottom transform rotate-[320deg] z-20"></div>
        <div className="absolute w-0.5 h-24 bg-red-500 rounded-full bottom-1/2 origin-bottom transform rotate-[180deg] z-30"></div>
        <div className="absolute w-3 h-3 bg-gray-300 rounded-full z-40 shadow-md"></div>
      </>
    );
  };

  const isBangleOrWrap = design === 'bangle' || design === 'wrap_strap';

  return (
    <div className={`relative w-full h-full min-h-[500px] flex items-center justify-center backdrop-blur-md rounded-2xl border p-8 shadow-2xl overflow-hidden transition-colors duration-700 ${containerBgClass}`}>
      <div className="absolute w-72 h-72 rounded-full blur-3xl opacity-20 transition-all duration-700 z-0" style={{ backgroundColor: dialColor }}></div>

      <div className="relative flex flex-col items-center justify-center z-10 transition-transform duration-700" style={{ transform: `scale(${config.type?.scale || 1.1})` }}>
        
        {/* Top Strap */}
        {config.strap && !isBangleOrWrap && (
          <div className="relative flex justify-center mb-[-15px] z-0">
            <div className="w-24 h-24 rounded-t-xl shadow-inner" style={{ 
              backgroundColor: strapColor,
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 5px)'
            }}></div>
          </div>
        )}
        
        {/* Wrap Strap Specific Top */}
        {design === 'wrap_strap' && (
          <div className="relative flex justify-center mb-[-5px] z-0">
            <div className="w-10 h-32 rounded-t-xl" style={{ backgroundColor: strapColor }}></div>
            <div className="w-10 h-40 rounded-t-xl absolute -left-12 top-4 transform rotate-12" style={{ backgroundColor: strapColor }}></div>
            <div className="w-10 h-40 rounded-t-xl absolute -right-12 top-4 transform -rotate-12" style={{ backgroundColor: strapColor }}></div>
          </div>
        )}

        {/* Watch Assembly */}
        <div className="relative flex items-center justify-center z-10">
          
          {/* Case */}
          <div 
            className="relative flex items-center justify-center w-64 h-64 shadow-2xl z-10 overflow-hidden"
            style={{ 
              backgroundColor: caseColor,
              boxShadow: `0 20px 50px rgba(0,0,0,0.7), inset 0 0 15px rgba(0,0,0,0.8)`,
              ...getShapeStyles()
            }}
          >
            {/* Dial */}
            <div 
              className="relative flex items-center justify-center w-48 h-48 shadow-[inset_0_10px_30px_rgba(0,0,0,0.8)] overflow-hidden"
              style={{ ...getDialStyles() }}
            >
              {/* Dial Background Texture */}
              <div className="absolute inset-0 opacity-40" style={{ background: `radial-gradient(circle, ${dialColor} 0%, transparent 70%)` }}></div>
              
              {renderInternalFeatures()}

              {/* Crystal Overlay */}
              <div 
                className="absolute inset-0 pointer-events-none transition-all duration-500 z-50 mix-blend-screen"
                style={{ 
                  backgroundColor: config.crystal?.tint || 'rgba(255,255,255,0)',
                  opacity: crystalOpacity,
                  background: `linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 40%, ${config.crystal?.tint || 'transparent'} 50%, transparent 60%, rgba(255,255,255,0.1) 100%)`
                }}
              ></div>
            </div>
          </div>

          {/* Crowns based on design */}
          {design === 'bullhead' ? (
             <>
               <div className="absolute -top-4 left-16 w-4 h-8 rounded-t-md" style={{ backgroundColor: caseColor }}></div>
               <div className="absolute -top-4 right-16 w-4 h-8 rounded-t-md" style={{ backgroundColor: caseColor }}></div>
             </>
          ) : (
            <div className="absolute -right-5 w-5 h-10 rounded-r-md z-0" style={{ backgroundColor: caseColor }}></div>
          )}

        </div>

        {/* Bottom Strap */}
        {config.strap && !isBangleOrWrap && (
          <div className="relative flex justify-center mt-[-15px] z-0">
            <div className="w-24 h-24 rounded-b-xl shadow-inner" style={{ 
              backgroundColor: strapColor,
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.3) 4px, rgba(0,0,0,0.3) 5px)'
            }}></div>
          </div>
        )}

        {/* Wrap Strap Specific Bottom */}
        {design === 'wrap_strap' && (
          <div className="relative flex justify-center mt-[-5px] z-0">
            <div className="w-10 h-32 rounded-b-xl" style={{ backgroundColor: strapColor }}></div>
            <div className="w-10 h-40 rounded-b-xl absolute -left-12 bottom-4 transform -rotate-12" style={{ backgroundColor: strapColor }}></div>
            <div className="w-10 h-40 rounded-b-xl absolute -right-12 bottom-4 transform rotate-12" style={{ backgroundColor: strapColor }}></div>
          </div>
        )}

      </div>
    </div>
  );
}
