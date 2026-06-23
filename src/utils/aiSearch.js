/**
 * Mock NLP / Semantic Search Engine for ChronoCraft
 * This simulates an AI text-embedding vector search locally by using keyword weighting and fuzzy matching.
 */

export const performSemanticSearch = (query, products) => {
  if (!query || query.trim() === '') return [];

  const lowerQuery = query.toLowerCase();
  
  // Basic NLP tokenization and stop-word removal
  const stopWords = ['a', 'an', 'the', 'and', 'with', 'for', 'watch', 'timepiece', 'looking'];
  const tokens = lowerQuery
    .replace(/[^\w\s]/gi, '')
    .split(/\s+/)
    .filter(token => token.length > 2 && !stopWords.includes(token));

  // Score each product based on how well it matches the semantic intent
  const scoredProducts = products.map(product => {
    let score = 0;
    const searchableText = `
      ${product.name.toLowerCase()} 
      ${product.brand.toLowerCase()} 
      ${product.description.toLowerCase()} 
      ${product.category.toLowerCase()}
      ${product.specs ? JSON.stringify(product.specs).toLowerCase() : ''}
    `;

    tokens.forEach(token => {
      // Exact word match gets higher weight
      if (new RegExp(`\\b${token}\\b`, 'i').test(searchableText)) {
        score += 3;
      } 
      // Partial match
      else if (searchableText.includes(token)) {
        score += 1;
      }

      // Semantic boost (simulate embeddings matching related concepts)
      if (token === 'diver' || token === 'diving' || token === 'ocean') {
        if (searchableText.includes('300m') || searchableText.includes('diver')) score += 5;
      }
      if (token === 'gold' || token === 'expensive' || token === 'premium') {
        if (product.price > 10000) score += 5;
      }
      if (token === 'cheap' || token === 'affordable') {
        if (product.price < 1000) score += 5;
      }
      if (token === 'swiss') {
        if (searchableText.includes('swiss')) score += 5;
      }
    });

    return { ...product, aiScore: score };
  });

  // Filter out products with 0 score, then sort by highest score
  return scoredProducts
    .filter(p => p.aiScore > 0)
    .sort((a, b) => b.aiScore - a.aiScore);
};
