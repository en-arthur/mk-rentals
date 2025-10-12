export const products = [
  // Chafing Dishes
  {
    id: 'chafing-001',
    name: 'Full-Size Chafing Dish',
    category: 'chafing-dishes',
    description: 'Professional stainless steel chafing dish, perfect for buffet service',
    longDescription: 'High-quality stainless steel chafing dish for keeping food warm. Includes water pan, food pan, lid, and fuel holder.',
    images: ['/product_images/Roll-Top Chafing Dishes.jpg', '/product_images/chafing dishes.jpg', '/product_images/chafing dish+.jpeg', '/product_images/chafing-dish+2.jpeg']
  },
  {
    id: 'chafing-002',
    name: 'Half-Size Chafing Dish',
    category: 'chafing-dishes',
    description: 'Compact chafing dish perfect for smaller portions or side dishes',
    images: ['/product_images/chafing_dishes-2.jpg', '/product_images/chafing_dish+3.jpeg', '/product_images/chafing_dish+4.jpeg']
  },
  {
    id: 'chafing-003',
    name: 'Round Chafing Dish',
    category: 'chafing-dishes',
    description: 'Elegant round chafing dish for soups and stews',
    images: ['/product_images/round chafing dishes.jpg', '/product_images/chafing-dish+5.jpeg', '/product_images/chafing_dish+6.jpeg']
  },
  {
    id: 'chafing-004',
    name: 'Rectangular Chafing Dish',
    category: 'chafing-dishes',
    description: 'Classic rectangular chafing dish for versatile food service',
    longDescription: 'Traditional rectangular chafing dish design perfect for a wide variety of dishes. Durable stainless steel construction with reliable heat retention.',
    images: ['/product_images/chafing_dish1.jpeg', '/product_images/chafing_dish2.jpeg']
  },
  {
    id: 'chafing-005',
    name: 'Insulated Food Container',
    category: 'chafing-dishes',
    description: 'Keep food hot or cold for extended periods with our insulated food containers',
    longDescription: 'Heavy-duty insulated food containers designed to maintain food temperature for hours. Perfect for transporting and serving food at events. Durable construction with excellent insulation properties.',
    images: ['/product_images/insulated food container+1.jpeg', '/product_images/insulated food container2.jpeg', '/product_images/insulated food container3.jpeg']
  },
  {
    id: 'chafing-006',
    name: 'Gas Stove',
    category: 'chafing-dishes',
    description: 'Portable gas stove for outdoor cooking and event catering',
    longDescription: 'Professional-grade portable gas stove perfect for outdoor events, catering, and large gatherings. Reliable and efficient cooking solution.',
    images: ['/product_images/ gas stoves+1.jpeg']
  },
  {
    id: 'chafing-007',
    name: '2-in-1 Gas Cooker',
    category: 'chafing-dishes',
    description: 'Versatile 2-burner gas cooker for efficient cooking',
    longDescription: 'Dual-burner gas cooker allowing you to prepare multiple dishes simultaneously. Ideal for events requiring varied menu options.',
    images: ['/product_images/2 in 1 gas cooker.jpeg']
  },
  {
    id: 'chafing-008',
    name: '3-in-1 Gas Cooker',
    category: 'chafing-dishes',
    description: 'Triple-burner gas cooker for large-scale event cooking',
    longDescription: 'High-capacity 3-burner gas cooker designed for large events and catering operations. Cook multiple dishes at once with ease.',
    images: ['/product_images/3 in 1 gas cooker.jpeg']
  },
  {
    id: 'chafing-009',
    name: 'Coal Pot',
    category: 'chafing-dishes',
    description: 'Traditional coal pot for authentic outdoor cooking',
    longDescription: 'Traditional coal pot perfect for authentic cooking experiences. Ideal for outdoor events and traditional food preparation.',
    images: ['/product_images/coal pots+1.jpeg', '/product_images/coal pot+2.jpeg']
  },

  // Tables & Chairs
  {
    id: 'table-001',
    name: 'Folding Table',
    category: 'tables-chairs',
    description: 'Sturdy folding table that seats 6-8 people comfortably',
    longDescription: 'Heavy-duty folding table with plastic top and steel frame. Easy to set up and transport. Perfect for events, parties, and gatherings.',
    images: ['/product_images/tables.jpg', '/product_images/table2.jpg', '/product_images/table3.jpg', '/product_images/table4.jpg']
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
    longDescription: 'Heavy-duty ice chest with large capacity. Perfect for keeping beverages and food cold throughout your event. Durable construction with excellent insulation.',
    images: ['/product_images/ice_chest.jpg']
  },
  {
    id: 'ice-002',
    name: 'Medium Ice Chest',
    category: 'ice-chests',
    description: 'Perfect size for smaller gatherings',
    longDescription: 'Compact and portable ice chest ideal for smaller events. Easy to transport while maintaining excellent cooling performance.',
    images: ['/product_images/ice-chest-2.jpg']
  },
  {
    id: 'ice-003',
    name: 'Igloo Cooler',
    category: 'ice-chests',
    description: 'Premium Igloo coolers with wheels for easy transport',
    longDescription: 'High-quality Igloo brand coolers featuring wheeled design for easy mobility. Perfect for large events and outdoor gatherings. Excellent insulation keeps contents cold for extended periods.',
    images: ['/product_images/large-wheeled-cooler.jpeg', '/product_images/Igloo cooler.jpeg', '/product_images/Igloo Trailmate Journey 70-Quart Cooler +1.jpeg', '/product_images/igloo cooler 2.jpeg']
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
