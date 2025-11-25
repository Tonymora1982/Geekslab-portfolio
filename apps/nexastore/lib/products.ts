// Product types and data for NexaStore
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  tags: string[];
  specs?: Record<string, string>;
  featured?: boolean;
}

export const categories = [
  { id: "laptops", name: "Laptops", icon: "💻" },
  { id: "smartphones", name: "Smartphones", icon: "📱" },
  { id: "audio", name: "Audio", icon: "🎧" },
  { id: "wearables", name: "Wearables", icon: "⌚" },
  { id: "gaming", name: "Gaming", icon: "🎮" },
  { id: "accessories", name: "Accessories", icon: "🔌" },
];

export const products: Product[] = [
  {
    id: "1",
    name: "ProBook Ultra 16",
    slug: "probook-ultra-16",
    description:
      "The ultimate professional laptop with M3 Pro chip, stunning Liquid Retina XDR display, and all-day battery life. Perfect for developers, designers, and creative professionals.",
    price: 2499,
    originalPrice: 2799,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=600&fit=crop",
    ],
    category: "laptops",
    rating: 4.9,
    reviews: 2847,
    inStock: true,
    featured: true,
    tags: ["laptop", "professional", "16-inch", "m3-pro"],
    specs: {
      Processor: "M3 Pro 12-core CPU",
      Memory: "36GB Unified Memory",
      Storage: "1TB SSD",
      Display: '16.2" Liquid Retina XDR',
      Battery: "Up to 22 hours",
    },
  },
  {
    id: "2",
    name: "Galaxy Nova S24 Ultra",
    slug: "galaxy-nova-s24-ultra",
    description:
      "Experience the future of mobile technology with AI-powered features, 200MP camera system, and the brightest display ever on a smartphone.",
    price: 1199,
    originalPrice: 1399,
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop",
    ],
    category: "smartphones",
    rating: 4.8,
    reviews: 5621,
    inStock: true,
    featured: true,
    tags: ["smartphone", "5g", "ai", "camera"],
    specs: {
      Display: '6.8" Dynamic AMOLED 2X',
      Processor: "Snapdragon 8 Gen 3",
      Camera: "200MP + 50MP + 12MP + 10MP",
      Battery: "5000mAh",
      Storage: "512GB",
    },
  },
  {
    id: "3",
    name: "AirPods Pro Max",
    slug: "airpods-pro-max",
    description:
      "Premium over-ear headphones with industry-leading noise cancellation, spatial audio with head tracking, and up to 20 hours of listening time.",
    price: 549,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop",
    ],
    category: "audio",
    rating: 4.7,
    reviews: 3894,
    inStock: true,
    featured: true,
    tags: ["headphones", "noise-cancelling", "wireless", "premium"],
    specs: {
      Driver: "40mm dynamic driver",
      ANC: "Active Noise Cancellation",
      Battery: "20 hours",
      Connectivity: "Bluetooth 5.3",
      Weight: "385g",
    },
  },
  {
    id: "4",
    name: "Watch Ultra 2",
    slug: "watch-ultra-2",
    description:
      "The most rugged and capable smartwatch ever. Precision GPS, titanium case, and advanced health features for extreme athletes and adventurers.",
    price: 799,
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
    ],
    category: "wearables",
    rating: 4.8,
    reviews: 1567,
    inStock: true,
    featured: true,
    tags: ["smartwatch", "fitness", "titanium", "gps"],
    specs: {
      Case: "49mm Titanium",
      Display: "Always-On Retina LTPO",
      "Water Resistance": "100m",
      Battery: "Up to 36 hours",
      GPS: "Precision dual-frequency",
    },
  },
  {
    id: "5",
    name: "PlayStation 5 Pro",
    slug: "playstation-5-pro",
    description:
      "Next-generation gaming console with 8K support, ray tracing, and ultra-fast SSD for instant loading. Experience gaming like never before.",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1486401899868-0e435ed85128?w=800&h=600&fit=crop",
    ],
    category: "gaming",
    rating: 4.9,
    reviews: 8923,
    inStock: true,
    tags: ["console", "gaming", "4k", "ray-tracing"],
    specs: {
      GPU: "AMD RDNA 3.5",
      CPU: "AMD Zen 4",
      Storage: "2TB SSD",
      Resolution: "Up to 8K",
      "Frame Rate": "Up to 120fps",
    },
  },
  {
    id: "6",
    name: "MagSafe Power Station",
    slug: "magsafe-power-station",
    description:
      "3-in-1 charging station for your devices. Simultaneously charge your phone, watch, and earbuds with fast wireless technology.",
    price: 149,
    originalPrice: 179,
    image:
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&h=600&fit=crop",
    ],
    category: "accessories",
    rating: 4.6,
    reviews: 2341,
    inStock: true,
    tags: ["charger", "wireless", "magsafe", "3-in-1"],
    specs: {
      Output: "15W MagSafe",
      Ports: "3 charging surfaces",
      Compatibility: "iPhone, Watch, AirPods",
      "Cable Length": "1.5m",
    },
  },
  {
    id: "7",
    name: "Studio Display 5K",
    slug: "studio-display-5k",
    description:
      "27-inch 5K Retina display with stunning color accuracy, 12MP Ultra Wide camera with Center Stage, and studio-quality speakers.",
    price: 1599,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&h=600&fit=crop",
    ],
    category: "accessories",
    rating: 4.5,
    reviews: 892,
    inStock: true,
    tags: ["monitor", "5k", "retina", "professional"],
    specs: {
      Resolution: "5120 x 2880",
      Size: "27 inches",
      Camera: "12MP Ultra Wide",
      Speakers: "Six-speaker system",
      Brightness: "600 nits",
    },
  },
  {
    id: "8",
    name: "Gaming Laptop RTX 4090",
    slug: "gaming-laptop-rtx-4090",
    description:
      "Ultimate gaming powerhouse with NVIDIA RTX 4090, Intel Core i9, and 240Hz display. Dominate every game at max settings.",
    price: 3299,
    image:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop",
    ],
    category: "laptops",
    rating: 4.8,
    reviews: 1243,
    inStock: true,
    tags: ["laptop", "gaming", "rtx-4090", "high-performance"],
    specs: {
      GPU: "NVIDIA RTX 4090 16GB",
      CPU: "Intel Core i9-14900HX",
      RAM: "64GB DDR5",
      Display: '17.3" QHD 240Hz',
      Storage: "2TB NVMe SSD",
    },
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery) ||
      p.tags.some((t) => t.includes(lowercaseQuery))
  );
}
