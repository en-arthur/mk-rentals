export const products = [
  // Chafing Dishes
  {
    id: 'chafing-001',
    name: 'Full-Size Chafing Dish (8 qt)',
    category: 'chafing-dishes',
    description: 'Professional stainless steel chafing dish, perfect for buffet service',
    longDescription: 'High-quality stainless steel chafing dish for keeping food warm. Includes water pan, food pan, lid, and fuel holder.',
    images: ['/product_images/Roll-Top Chafing Dishes.jpg', '/product_images/chafing dishes.jpg']
  },
  {
    id: 'chafing-002',
    name: 'Half-Size Chafing Dish (4 qt)',
    category: 'chafing-dishes',
    description: 'Compact chafing dish perfect for smaller portions or side dishes',
    images: ['/product_images/chafing_dishes-2.jpg']
  },
  {
    id: 'chafing-003',
    name: 'Round Chafing Dish',
    category: 'chafing-dishes',
    description: 'Elegant round chafing dish for soups and stews',
    images: ['/product_images/round chafing dishes.jpg']
  },

  // Tables & Chairs
  {
    id: 'table-001',
    name: '6ft Folding Table',
    category: 'tables-chairs',
    description: 'Sturdy folding table that seats 6-8 people comfortably',
    longDescription: 'Heavy-duty folding table with plastic top and steel frame. Easy to set up and transport.',
    images: ['/product_images/tables.jpg', '/product_images/table2.jpg']
  },
  {
    id: 'table-002',
    name: '8ft Folding Table',
    category: 'tables-chairs',
    description: 'Large folding table for bigger gatherings',
    images: ['/product_images/table3.jpg', '/product_images/table4.jpg']
  },
  {
    id: 'chair-001',
    name: 'Plastic Banquet Chair',
    category: 'tables-chairs',
    description: 'Comfortable and durable plastic chair for any event',
    images: ['/product_images/tables.jpg']
  },
  {
    id: 'chair-002',
    name: 'Chair Cover with Sash',
    category: 'tables-chairs',
    description: 'Elegant chair cover to elevate your event decor',
    images: ['/product_images/table2.jpg']
  },

  // Cookware
  {
    id: 'pot-001',
    name: 'Large Cooking Pot (50L)',
    category: 'cookware',
    description: 'Heavy-duty aluminum pot for cooking large quantities',
    images: ['/product_images/chafing dishes.jpg']
  },
  {
    id: 'pot-002',
    name: 'Medium Cooking Pot (30L)',
    category: 'cookware',
    description: 'Versatile pot for medium-sized cooking needs',
    images: ['/product_images/chafing_dishes-2.jpg']
  },
  {
    id: 'pan-001',
    name: 'Large Frying Pan',
    category: 'cookware',
    description: 'Professional-grade frying pan',
    images: ['/product_images/chafing dishes.jpg']
  },

  // Ice Chests
  {
    id: 'ice-001',
    name: 'Large Ice Chest (100L)',
    category: 'ice-chests',
    description: 'Keep drinks cold for hours with our large ice chest',
    images: ['/product_images/ice_chest.jpg']
  },
  {
    id: 'ice-002',
    name: 'Medium Ice Chest (50L)',
    category: 'ice-chests',
    description: 'Perfect size for smaller gatherings',
    images: ['/product_images/ice-chest-2.jpg']
  },

  // Accessories
  {
    id: 'linen-001',
    name: 'Table Linen (6ft)',
    category: 'accessories',
    description: 'Quality tablecloth to enhance your table setting',
    images: ['/product_images/tables.jpg']
  },
  {
    id: 'tray-001',
    name: 'Serving Tray Set',
    category: 'accessories',
    description: 'Stainless steel serving trays in various sizes',
    images: ['/product_images/chafing dishes.jpg']
  },
  {
    id: 'napkin-001',
    name: 'Cloth Napkins (Set of 50)',
    category: 'accessories',
    description: 'Premium cloth napkins for elegant dining',
    images: ['/product_images/table2.jpg']
  }
];

// Helper functions
export function getProductById(id) {
  return products.find(product => product.id === id);
}

export function getProductsByCategory(category) {
  return products.filter(product => product.category === category);
}

export function getFeaturedProducts() {
  return products.filter(product => product.featured);
}

export function getAllCategories() {
  return [...new Set(products.map(product => product.category))];
}
