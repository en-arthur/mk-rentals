export const products = [
  // Chafing Dishes
  {
    id: 'chafing-001',
    name: 'Chafing Dish',
    category: 'chafing-dishes',
    description: 'Keep food warm at your event',
    longDescription: 'Stainless steel chafing dish with roll-top lid.',
    images: ['/product_images/Roll-Top Chafing Dishes.jpg', '/product_images/chafing-dish+5.jpeg', '/product_images/chafing_dish+6.jpeg']
  },
  {
    id: 'chafing-002',
    name: 'Standard Chafing Dish',
    category: 'chafing-dishes',
    description: 'Classic chafing dish for buffet service',
    longDescription: 'Stainless steel chafing dish for buffets.',
    images: ['/product_images/chafing dishes.jpg', '/product_images/chafing_dishes-2.jpg', '/product_images/chafing_dish+3.jpeg', '/product_images/chafing_dish+4.jpeg', '/product_images/round chafing dishes.jpg']
  },
  {
    id: 'chafing-003',
    name: 'Chafing Dish',
    category: 'chafing-dishes',
    description: 'Large capacity for main courses',
    longDescription: 'Full-size chafing dish for serving main courses.',
    images: ['/product_images/chafing dish+.jpeg']
  },
  {
    id: 'chafing-004',
    name: 'Professional Chafing Dish',
    category: 'chafing-dishes',
    description: 'Professional chafing dish for catering',
    longDescription: 'Professional chafing dish for large events.',
    images: ['/product_images/chafing-dish+2.jpeg']
  },
  {
    id: 'chafing-005',
    name: 'Rectangular Chafing Dish',
    category: 'chafing-dishes',
    description: 'Rectangular chafing dish',
    longDescription: 'Rectangular design for versatile food service. Durable stainless steel construction.',
    images: ['/product_images/chafing_dish1.jpeg', '/product_images/chafing_dish2.jpeg']
  },
  {
    id: 'chafing-006',
    name: 'Insulated Food Container',
    category: 'chafing-dishes',
    description: 'Keep food hot or cold for hours',
    longDescription: 'Insulated container that maintains food temperature.',
    images: ['/product_images/insulated food container+1.jpeg', '/product_images/insulated food container2.jpeg', '/product_images/insulated food container3.jpeg']
  },
  {
    id: 'chafing-007',
    name: 'Gas Stove',
    category: 'chafing-dishes',
    description: 'Portable gas stove for outdoor cooking',
    longDescription: 'Portable gas stove for outdoor events and catering.',
    images: ['/product_images/ gas stoves+1.jpeg', '/product_videos/single gas cooker.mp4']
  },
  {
    id: 'chafing-008',
    name: '2-in-1 Gas Cooker',
    category: 'chafing-dishes',
    description: '2-burner gas cooker',
    longDescription: 'Dual-burner cooker for preparing multiple dishes at once.',
    images: ['/product_images/2 in 1 gas cooker.jpeg']
  },
  {
    id: 'chafing-009',
    name: '3-in-1 Gas Cooker',
    category: 'chafing-dishes',
    description: '3-burner gas cooker',
    longDescription: '3-burner cooker for large events and catering.',
    images: ['/product_images/3 in 1 gas cooker.jpeg', '/product_videos/3 in 1 gas cooker.mp4']
  },
  {
    id: 'chafing-010',
    name: 'Coal Pot',
    category: 'chafing-dishes',
    description: 'Traditional coal pot',
    longDescription: 'Coal pot for outdoor cooking and traditional food preparation.',
    images: ['/product_images/coal pots+1.jpeg']
  },
  {
    id: 'chafing-011',
    name: 'Coal Pot 2',
    category: 'chafing-dishes',
    description: 'Traditional coal pot',
    longDescription: 'Coal pot for outdoor events and traditional cooking.',
    images: ['/product_images/coal pot+2.jpeg']
  },

  // Tables & Chairs
  {
    id: 'table-001',
    name: 'Folding Table',
    category: 'tables-chairs',
    description: 'Folding table seats 6-8 people',
    longDescription: 'Folding table with plastic top and steel frame. Easy to set up and transport.',
    images: ['/product_images/tables.jpg', '/product_images/table2.jpg', '/product_images/table3.jpg', '/product_images/table4.jpg']
  },
  {
    id: 'chair-001',
    name: 'Folding Chair',
    category: 'tables-chairs',
    description: 'Comfortable folding chairs',
    longDescription: 'Durable folding chairs for events. Lightweight and easy to transport.',
    images: ['/product_images/chairs.jpeg']
  },

  // Ice Chests
  {
    id: 'ice-001',
    name: 'Ice Chest',
    category: 'ice-chests',
    description: 'Perfect for both small and large gatherings',
    longDescription: 'Perfect size for smaller gatherings.',
    images: ['/product_images/ice_chest.jpg']
  },
  {
    id: 'ice-002',
    name: 'Ice Chest',
    category: 'ice-chests',
    description: 'Perfect for smaller gatherings',
    longDescription: 'Compact ice chest for smaller events. Easy to transport.',
    images: ['/product_images/ice-chest-2.jpg']
  },
  {
    id: 'ice-003',
    name: 'Igloo Cooler',
    category: 'ice-chests',
    description: 'Premium Igloo cooler',
    longDescription: 'Igloo brand cooler with excellent insulation. Keeps contents cold for hours.',
    images: ['/product_images/Igloo cooler.jpeg']
  },
  {
    id: 'ice-004',
    name: 'Igloo Cooler 2',
    category: 'ice-chests',
    description: 'Durable Igloo cooler',
    longDescription: 'Igloo cooler with superior insulation. Keeps beverages and food cold.',
    images: ['/product_images/igloo cooler 2.jpeg']
  },
  {
    id: 'ice-005',
    name: 'Large Wheeled Cooler',
    category: 'ice-chests',
    description: 'Wheeled cooler for easy mobility',
    longDescription: 'Large wheeled cooler for easy transport. Perfect for large events.',
    images: ['/product_images/large-wheeled-cooler.jpeg']
  },
  {
    id: 'ice-006',
    name: 'Igloo Trailmate Journey 70-Quart Cooler',
    category: 'ice-chests',
    description: '70-quart cooler with all-terrain wheels',
    longDescription: 'Igloo Trailmate 70-quart cooler with all-terrain wheels. Perfect for large outdoor events.',
    images: ['/product_images/Igloo Trailmate Journey 70-Quart Cooler +1.jpeg']
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
