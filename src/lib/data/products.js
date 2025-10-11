export const products = [
  // Chafing Dishes
  {
    id: 'chafing-001',
    name: 'Full-Size Chafing Dish',
    category: 'chafing-dishes',
    description: 'Professional stainless steel chafing dish, perfect for buffet service',
    longDescription: 'High-quality stainless steel chafing dish for keeping food warm. Includes water pan, food pan, lid, and fuel holder.',
    images: ['/product_images/Roll-Top Chafing Dishes.jpg', '/product_images/chafing dishes.jpg']
  },
  {
    id: 'chafing-002',
    name: 'Half-Size Chafing Dish',
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
    name: 'Folding Table',
    category: 'tables-chairs',
    description: 'Sturdy folding table that seats 6-8 people comfortably',
    longDescription: 'Heavy-duty folding table with plastic top and steel frame. Easy to set up and transport.',
    images: ['/product_images/tables.jpg', '/product_images/table2.jpg']
  },
  {
    id: 'table-002',
    name: 'Large Folding Table',
    category: 'tables-chairs',
    description: 'Large folding table for bigger gatherings',
    images: ['/product_images/table3.jpg', '/product_images/table4.jpg']
  },
  {
    id: 'chair-001',
    name: 'Folding Chair',
    category: 'tables-chairs',
    description: 'Comfortable folding chairs for your event guests',
    longDescription: 'Durable and comfortable folding chairs. Perfect for weddings, parties, and corporate events. Lightweight yet sturdy construction for easy setup and transport.',
    images: ['/product_images/chairs.jpeg']
  },

  // Ice Chests
  {
    id: 'ice-001',
    name: 'Large Ice Chest',
    category: 'ice-chests',
    description: 'Keep drinks cold for hours with our large ice chest',
    images: ['/product_images/ice_chest.jpg']
  },
  {
    id: 'ice-002',
    name: 'Medium Ice Chest',
    category: 'ice-chests',
    description: 'Perfect size for smaller gatherings',
    images: ['/product_images/ice-chest-2.jpg']
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
