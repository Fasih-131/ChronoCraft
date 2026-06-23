const fs = require('fs');
const https = require('https');
const path = require('path');

const brands = ['Rolex', 'Omega', 'Patek Philippe', 'Tissot', 'Audemars Piguet', 'Tag Heuer', 'Cartier', 'Breitling', 'Hublot', 'IWC'];
const kidsBrands = ['Swatch', 'Flik Flak', 'Casio', 'Timex', 'Lego Watches'];

const models = ['Master', 'Pro', 'Chronograph', 'Elite', 'Sport', 'Heritage', 'Classic', 'Ocean', 'Sky', 'Aero', 'Lunar', 'Cosmo', 'Aqua'];
const materials = ['Stainless Steel', '18k Rose Gold', '18k Yellow Gold', 'White Gold', 'Platinum', 'Ceramic', 'Titanium', 'Carbon Fiber'];
const kidsMaterials = ['Shock-resistant Resin', 'Bio-sourced Plastic', 'Silicone', 'Rubber'];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomPrice = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const catalogDir = path.join(__dirname, '..', 'public', 'catalog', 'unique');
if (!fs.existsSync(catalogDir)) {
  fs.mkdirSync(catalogDir, { recursive: true });
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(fs.createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Status: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

const generateWatches = async () => {
  let sql = `-- Massive 100 Unique Product Catalog Generated via Pollinations AI\n\n`;
  sql += `DELETE FROM public.products;\n\n`;
  sql += `INSERT INTO public.products (name, brand, description, price, category, specs, image_url) VALUES\n`;

  const products = [];
  const downloadTasks = [];

  for (let i = 0; i < 100; i++) {
    const category = i < 40 ? 'Men' : i < 80 ? 'Women' : 'Kids';
    const isKids = category === 'Kids';
    const seed = i * 1000;
    
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

    const prompt = `A hyper-realistic studio macro photograph of a ${brand} ${watchType} watch, ${material} case, e-commerce style, isolated dark background`;
    const encodedPrompt = encodeURIComponent(prompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?seed=${seed}&nologo=true&width=400&height=500`;
    
    const filename = `watch_${category.toLowerCase()}_${i}.jpg`;
    const filepath = path.join(catalogDir, filename);

    if (!fs.existsSync(filepath)) {
      downloadTasks.push(async () => {
        let success = false;
        let attempts = 0;
        while (!success && attempts < 5) {
          try {
            await downloadImage(imageUrl, filepath);
            console.log(`[${i+1}/100] Downloaded image for ${brand} ${name}`);
            success = true;
          } catch (err) {
            attempts++;
            console.log(`Failed ${i}, attempt ${attempts}, waiting...`);
            await sleep(5000); // wait 5 seconds before retry
          }
        }
      });
    }

    const nameEscaped = name.replace(/'/g, "''");
    const brandEscaped = brand.replace(/'/g, "''");
    const descEscaped = desc.replace(/'/g, "''");
    const specsJson = JSON.stringify(specs).replace(/'/g, "''");
    const dbImageUrl = `/catalog/unique/${filename}`;

    products.push(`('${nameEscaped}', '${brandEscaped}', '${descEscaped}', ${price}, '${category}', '${specsJson}', '${dbImageUrl}')`);
  }

  console.log(`Starting ${downloadTasks.length} pending downloads sequentially to respect rate limits...`);
  
  for (let i = 0; i < downloadTasks.length; i++) {
    await downloadTasks[i]();
  }

  sql += products.join(',\n') + ';\n';
  fs.writeFileSync(path.join(__dirname, '..', '100_unique_watches.sql'), sql);
  console.log('\nSuccessfully generated 100_unique_watches.sql!');
};

generateWatches();
