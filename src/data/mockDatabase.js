export const mockDatabase = {
  types: [
    // Men (8)
    { id: 't1', name: "Men's: The Aviator", price: 500, scale: 1.15, category: 'Men', designFamily: 'aviator' },
    { id: 't2', name: "Men's: The Deep Diver", price: 650, scale: 1.2, category: 'Men', designFamily: 'diver_pro' },
    { id: 't3', name: "Men's: The Executive Cushion", price: 800, scale: 1.1, category: 'Men', designFamily: 'cushion' },
    { id: 't4', name: "Men's: The Racer Chrono", price: 550, scale: 1.15, category: 'Men', designFamily: 'racing' },
    { id: 't5', name: "Men's: The Tonneau", price: 400, scale: 1.2, category: 'Men', designFamily: 'tonneau' },
    { id: 't6', name: "Men's: The Bullhead", price: 300, scale: 1.05, category: 'Men', designFamily: 'bullhead' },
    { id: 't7', name: "Men's: The Tactical Octagon", price: 900, scale: 1.2, category: 'Men', designFamily: 'stealth_tactical' },
    { id: 't8', name: "Men's: The Skeleton Tourbillon", price: 750, scale: 1.1, category: 'Men', designFamily: 'skeleton_tourbillon' },
    
    // Women (8)
    { id: 't9', name: "Women's: The Oval Elegance", price: 450, scale: 0.9, category: 'Women', designFamily: 'oval_elegance' },
    { id: 't10', name: "Women's: The Diamond Halo", price: 600, scale: 0.85, category: 'Women', designFamily: 'diamond_halo' },
    { id: 't11', name: "Women's: The Hexagon", price: 500, scale: 0.95, category: 'Women', designFamily: 'hexagon' },
    { id: 't12', name: "Women's: The Solid Bangle", price: 550, scale: 0.9, category: 'Women', designFamily: 'bangle' },
    { id: 't13', name: "Women's: The Floral Art", price: 900, scale: 0.9, category: 'Women', designFamily: 'floral_art' },
    { id: 't14', name: "Women's: The Wrap Strap", price: 480, scale: 0.85, category: 'Women', designFamily: 'wrap_strap' },
    { id: 't15', name: "Women's: The Asymmetric", price: 620, scale: 0.95, category: 'Women', designFamily: 'asymmetric' },
    { id: 't16', name: "Women's: The Petite Square", price: 380, scale: 0.8, category: 'Women', designFamily: 'petite_square' },
    
    // Kids (4)
    { id: 't17', name: "Kids (Boy): The Digital Block", price: 150, scale: 0.7, category: 'Kids', designFamily: 'digital_block' },
    { id: 't18', name: "Kids (Boy): The Compass Gear", price: 120, scale: 0.75, category: 'Kids', designFamily: 'compass_gear' },
    { id: 't19', name: "Kids (Girl): The Heart Princess", price: 150, scale: 0.7, category: 'Kids', designFamily: 'heart_shape' },
    { id: 't20', name: "Kids (Girl): The Star Burst", price: 130, scale: 0.75, category: 'Kids', designFamily: 'star_burst' }
  ],
  cases: [
    { id: 'c1', name: 'Titanium Grade 5', price: 150, weight: 45, color: '#8a8d8f' },
    { id: 'c2', name: 'Forged Carbon Fiber', price: 220, weight: 32, color: '#1a1a1a' },
    { id: 'c3', name: 'Matte Ceramic', price: 300, weight: 55, color: '#0f0f0f' },
    { id: 'c4', name: 'Damascus Steel', price: 450, weight: 78, color: '#5b5d63' },
    { id: 'c5', name: 'Rose Gold 18k', price: 1200, weight: 110, color: '#b76e79' },
    { id: 'c6', name: 'Sapphire Crystal (Clear)', price: 1800, weight: 40, color: 'transparent' },
    { id: 'c7', name: 'Bronze Marine', price: 180, weight: 85, color: '#cd7f32' },
    { id: 'c8', name: 'Cyberpunk Neon Edge', price: 250, weight: 50, color: '#00f3ff' },
    { id: 'c9', name: 'Vantablack Coated', price: 600, weight: 45, color: '#000000' },
    { id: 'c10', name: 'Platinum', price: 2500, weight: 140, color: '#e5e4e2' },
    { id: 'c11', name: 'Snow White Enamel', price: 400, weight: 50, color: '#ffffff' }
  ],
  dials: [
    { id: 'd1', name: 'Skeletonized Mechanical', price: 120, color: '#d4af37' },
    { id: 'd2', name: 'Cyberpunk Neon Cyan', price: 85, color: '#00f3ff' },
    { id: 'd3', name: 'Meteorite Slice', price: 400, color: '#7a7a7a' },
    { id: 'd4', name: 'Vantablack Void', price: 350, color: '#000000' },
    { id: 'd5', name: 'Grand Feu Enamel', price: 280, color: '#ffffff' },
    { id: 'd6', name: 'Holographic Grid', price: 150, color: '#ff00ff' },
    { id: 'd7', name: 'Guilloché Silver', price: 210, color: '#c0c0c0' },
    { id: 'd8', name: 'Carbon Weave', price: 130, color: '#2b2b2b' },
    { id: 'd9', name: 'Toxic Green Lume', price: 110, color: '#39ff14' },
    { id: 'd10', name: 'Blood Red Matte', price: 95, color: '#8a0303' }
  ],
  crystals: [
    { id: 'cr1', name: 'Sapphire AR Coated', price: 90, opacity: 0.2, tint: 'rgba(255,255,255,0.4)' },
    { id: 'cr2', name: 'Mineral Glass', price: 25, opacity: 0.4, tint: 'rgba(255,255,255,0.4)' },
    { id: 'cr3', name: 'Domed Sapphire', price: 140, opacity: 0.3, tint: 'rgba(255,255,255,0.5)' },
    { id: 'cr4', name: 'Acrylic Plexi', price: 15, opacity: 0.6, tint: 'rgba(255,255,255,0.3)' },
    { id: 'cr5', name: 'Red Tinted Sapphire', price: 110, opacity: 0.3, tint: 'rgba(255,0,0,0.2)' },
    { id: 'cr6', name: 'Blue Tinted Sapphire', price: 110, opacity: 0.3, tint: 'rgba(0,0,255,0.2)' },
    { id: 'cr7', name: 'Cyber Yellow Tint', price: 110, opacity: 0.3, tint: 'rgba(255,255,0,0.2)' },
    { id: 'cr8', name: 'Privacy Glass (Dark)', price: 130, opacity: 0.7, tint: 'rgba(0,0,0,0.5)' }
  ],
  straps: [
    { id: 's1', name: 'Titanium Bracelet', price: 200, weight: 60, color: '#8a8d8f' },
    { id: 's2', name: 'Fluoroelastomer Rubber', price: 60, weight: 25, color: '#111111' },
    { id: 's3', name: 'Kevlar Tactical', price: 85, weight: 20, color: '#333333' },
    { id: 's4', name: 'Alligator Leather', price: 350, weight: 15, color: '#2a1a10' },
    { id: 's5', name: 'NATO Nylon', price: 25, weight: 10, color: '#4b5320' },
    { id: 's6', name: 'Milanese Mesh loop', price: 120, weight: 45, color: '#e5e4e2' },
    { id: 's7', name: 'Neon Silicone', price: 40, weight: 25, color: '#00f3ff' },
    { id: 's8', name: 'Carbon Link', price: 280, weight: 30, color: '#1a1a1a' }
  ]
};
