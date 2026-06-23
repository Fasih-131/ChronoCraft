const fs = require('fs');
const path = require('path');

const brands = ['Rolex', 'Omega', 'Patek Philippe', 'Tissot', 'Audemars Piguet', 'Tag Heuer', 'Cartier', 'Breitling', 'Hublot', 'IWC'];
const kidsBrands = ['Swatch', 'Flik Flak', 'Casio', 'Timex', 'Lego Watches'];

const models = ['Master', 'Pro', 'Chronograph', 'Elite', 'Sport', 'Heritage', 'Classic', 'Ocean', 'Sky', 'Aero', 'Lunar', 'Cosmo', 'Aqua'];
const materials = ['Stainless Steel', '18k Rose Gold', '18k Yellow Gold', 'White Gold', 'Platinum', 'Ceramic', 'Titanium', 'Carbon Fiber'];
const kidsMaterials = ['Shock-resistant Resin', 'Bio-sourced Plastic', 'Silicone', 'Rubber'];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomPrice = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateWatches = () => {
  let sql = `-- Massive 100 Unique Product Catalog Generated with Instant Photo URLs\n\n`;
  sql += `DELETE FROM public.products;\n\n`;
  sql += `INSERT INTO public.products (name, brand, description, price, category, specs, image_url) VALUES\n`;

  const products = [];

  for (let i = 0; i < 100; i++) {
    const category = i < 40 ? 'Men' : i < 80 ? 'Women' : 'Kids';
    const isKids = category === 'Kids';
    
    const brand = isKids ? kidsBrands[i % kidsBrands.length] : brands[i % brands.length];
    const model = models[i % models.length];
    const material = isKids ? kidsMaterials[i % kidsMaterials.length] : materials[i % materials.length];
    
    const watchType = isKids ? 'colorful kids digital' : 'luxury mechanical';
    const name = `${model} ${100 + i}`;
    const price = isKids ? randomPrice(30, 150) : randomPrice(2000, 35000);
    
    const desc = isKids 
      ? `A highly durable and fun watch for children. Features a ${material.toLowerCase()} case and an easy-to-read display.`
      : `An exquisite ${watchType} watch by ${brand}. Crafted from solid ${material.toLowerCase()} and engineered for precision.`;

    const specs = {
      movement: isKids ? 'Quartz' : 'Automatic',
      crystal: isKids ? 'Acrylic' : 'Sapphire',
      water_resistance: '100m',
      case_material: material
    };

    // Use a public realistic photo generator API that returns instantly, with a unique lock so each is different
    // We add tags to narrow down the imagery to luxury/watch themes
    const imageUrl = `https://loremflickr.com/400/500/watch,luxury?lock=${i + 1}`;

    const nameEscaped = name.replace(/'/g, "''");
    const brandEscaped = brand.replace(/'/g, "''");
    const descEscaped = desc.replace(/'/g, "''");
    const specsJson = JSON.stringify(specs).replace(/'/g, "''");

    products.push(`('${nameEscaped}', '${brandEscaped}', '${descEscaped}', ${price}, '${category}', '${specsJson}', '${imageUrl}')`);
  }

  sql += products.join(',\n') + ';\n';
  fs.writeFileSync(path.join(__dirname, '..', '100_unique_watches.sql'), sql);
  console.log('\nSuccessfully generated 100_unique_watches.sql instantly!');
};

generateWatches();
