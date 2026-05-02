export interface Product {
  id: string;
  name: string;
  category: 'wallet' | 'eyewear' | 'bracelet';
  price: number;
  currency: '€' | '$' | '£';
  description: string;
  image: string;
  featured: boolean;
  tags: string[];
}

export const products: Product[] = [
  {
    id: "slim-bifold-wallet",
    name: "Slim Bifold Wallet",
    category: "wallet",
    price: 89,
    currency: "€",
    description: "Vegetable-tanned leather. Six card slots. Zero bulk.",
    image: "/images/slim-bifold-wallet.png",
    featured: true,
    tags: ["minimal", "leather", "slim"]
  },
  {
    id: "cardholder",
    name: "Cardholder",
    category: "wallet",
    price: 49,
    currency: "€",
    description: "Four cards. One pocket. Made for the essentials.",
    image: "/images/cardholder.png",
    featured: false,
    tags: ["minimal", "leather", "compact"]
  },
  {
    id: "clip-wallet",
    name: "Clip Wallet",
    category: "wallet",
    price: 59,
    currency: "€",
    description: "Metal clip. Cash and cards. Industrial minimalism.",
    image: "/images/clip-wallet.png",
    featured: false,
    tags: ["minimal", "metal", "slim"]
  },
  {
    id: "aviator-glasses",
    name: "Aviator Glasses",
    category: "eyewear",
    price: 149,
    currency: "€",
    description: "Titanium frame. Classic silhouette. Lightweight.",
    image: "/images/aviator-glasses.png",
    featured: true,
    tags: ["minimal", "titanium", "classic"]
  },
  {
    id: "square-frame-glasses",
    name: "Square Frame Glasses",
    category: "eyewear",
    price: 139,
    currency: "€",
    description: "Acetate frame. Sharp angles. Understated.",
    image: "/images/square-frame-glasses.png",
    featured: false,
    tags: ["minimal", "acetate", "modern"]
  },
  {
    id: "polarized-wayfarers",
    name: "Polarized Wayfarers",
    category: "eyewear",
    price: 129,
    currency: "€",
    description: "Polarized lenses. Acetate frame. Timeless.",
    image: "/images/polarized-wayfarers.png",
    featured: true,
    tags: ["minimal", "polarized", "classic"]
  },
  {
    id: "woven-leather-bracelet",
    name: "Woven Leather Bracelet",
    category: "bracelet",
    price: 69,
    currency: "€",
    description: "Braided leather. Magnetic clasp. Understated detail.",
    image: "/images/woven-leather-bracelet.png",
    featured: false,
    tags: ["minimal", "leather", "woven"]
  },
  {
    id: "matte-steel-bracelet",
    name: "Matte Steel Bracelet",
    category: "bracelet",
    price: 79,
    currency: "€",
    description: "Brushed steel. Cuff design. No engraving.",
    image: "/images/matte-steel-bracelet.png",
    featured: false,
    tags: ["minimal", "steel", "matte"]
  }
];

export const featuredProducts = products.filter(p => p.featured);
export const getProductById = (id: string) => products.find(p => p.id === id);
export const getProductsByCategory = (category: string) => 
  category === 'all' ? products : products.filter(p => p.category === category);
