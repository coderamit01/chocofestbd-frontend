import type { StoreProduct } from "@/types/store-product";

const IMAGES = {
  lindor: "/images/products/lindt-lindor.png",
  ferrero: "/images/products/ferrero-rocher.png",
  kitkat: "/images/products/kitkat.png",
  cadbury: "/images/products/cadbury-silk.png",
  toblerone: "/images/products/toblerone.png",
  kinder: "/images/products/kinder-bueno.png",
  lindtDark: "/images/products/lindt-excellence-dark.png",
  galaxy: "/images/products/galaxy-smooth.png",
  godiva: "/images/products/godiva-gold.png",
  ritter: "/images/products/ritter-sport.png",
};

export const STORE_PRODUCTS: StoreProduct[] = [
  { id: 1, slug: "lindt-lindor-milk-truffles", name: "Lindt Lindor Milk Truffles", brand: "Lindt", size: "200g", price: 1450, oldPrice: 1650, rating: 4.9, reviewCount: 312, category: "Chocolates", type: "Milk", tag: "Best seller", origin: "Switzerland", stock: 24, image: IMAGES.lindor },
  { id: 2, slug: "ferrero-rocher-t16-gift-box", name: "Ferrero Rocher T16 Gift Box", brand: "Ferrero", size: "200g · 16 pcs", price: 1850, rating: 4.8, reviewCount: 540, category: "Gift boxes", type: "Milk", origin: "Italy", stock: 40, image: IMAGES.ferrero },
  { id: 3, slug: "kitkat-4-finger-pack-of-6", name: "KitKat 4 Finger · Pack of 6", brand: "Nestlé", size: "6 × 41.5g", price: 480, oldPrice: 540, rating: 4.7, reviewCount: 890, category: "Chocolates", type: "Milk", origin: "Malaysia", stock: 120, image: IMAGES.kitkat },
  { id: 4, slug: "cadbury-dairy-milk-silk", name: "Cadbury Dairy Milk Silk", brand: "Cadbury", size: "150g", price: 520, rating: 4.8, reviewCount: 420, category: "Chocolates", type: "Milk", origin: "India", stock: 60, image: IMAGES.cadbury },
  { id: 5, slug: "toblerone-milk-chocolate", name: "Toblerone Milk Chocolate", brand: "Toblerone", size: "100g", price: 390, oldPrice: 450, rating: 4.6, reviewCount: 210, category: "Chocolates", type: "Milk", origin: "Switzerland", stock: 8, image: IMAGES.toblerone },
  { id: 6, slug: "kinder-bueno-pack-of-3", name: "Kinder Bueno · Pack of 3", brand: "Kinder", size: "3 × 43g", price: 420, rating: 4.9, reviewCount: 650, category: "Chocolates", type: "Milk", tag: "New", origin: "Germany", stock: 55, image: IMAGES.kinder },
  { id: 7, slug: "lindt-excellence-70-dark", name: "Lindt Excellence 70% Dark", brand: "Lindt", size: "100g", price: 690, oldPrice: 790, rating: 4.8, reviewCount: 188, category: "Chocolates", type: "Dark", origin: "Switzerland", stock: 30, image: IMAGES.lindtDark },
  { id: 8, slug: "galaxy-smooth-milk", name: "Galaxy Smooth Milk", brand: "Galaxy", size: "110g", price: 330, rating: 4.5, reviewCount: 160, category: "Chocolates", type: "Milk", origin: "UK", stock: 70, image: IMAGES.galaxy },
  { id: 9, slug: "godiva-gold-collection", name: "Godiva Gold Collection", brand: "Godiva", size: "14 pcs", price: 3950, oldPrice: 4400, rating: 4.9, reviewCount: 96, category: "Gift boxes", type: "Assorted", tag: "Premium", origin: "Belgium", stock: 12, image: IMAGES.godiva },
  { id: 10, slug: "ritter-sport-white-whole-hazelnut", name: "Ritter Sport White Whole Hazelnut", brand: "Ritter Sport", size: "100g", price: 450, rating: 4.6, reviewCount: 74, category: "Chocolates", type: "White", origin: "Germany", stock: 22, image: IMAGES.ritter },
  { id: 11, slug: "loacker-quadratini-napolitaner", name: "Loacker Quadratini Napolitaner", brand: "Loacker", size: "250g", price: 560, oldPrice: 620, rating: 4.7, reviewCount: 133, category: "Biscuits & wafers", type: "Wafer", origin: "Italy", stock: 44, image: IMAGES.galaxy },
  { id: 12, slug: "hersheys-kisses-milk", name: "Hershey’s Kisses Milk", brand: "Hershey’s", size: "150g", price: 690, rating: 4.5, reviewCount: 101, category: "Chocolates", type: "Milk", origin: "USA", stock: 0, image: IMAGES.ferrero },
  { id: 13, slug: "milka-alpine-milk", name: "Milka Alpine Milk", brand: "Milka", size: "100g", price: 350, oldPrice: 390, rating: 4.6, reviewCount: 142, category: "Chocolates", type: "Milk", origin: "Germany", stock: 65, image: IMAGES.toblerone },
  { id: 14, slug: "lindt-lindor-assorted-gift-box", name: "Lindt Lindor Assorted Gift Box", brand: "Lindt", size: "337g", price: 2650, oldPrice: 2950, rating: 4.9, reviewCount: 77, category: "Gift boxes", type: "Assorted", origin: "Switzerland", stock: 15, image: IMAGES.ritter },
  { id: 15, slug: "ferrero-raffaello", name: "Ferrero Raffaello", brand: "Ferrero", size: "150g · 15 pcs", price: 1250, rating: 4.8, reviewCount: 204, category: "Gift boxes", type: "White", origin: "Italy", stock: 28, image: IMAGES.kinder },
  { id: 16, slug: "snickers-minis-share-bag", name: "Snickers Minis Share Bag", brand: "Mars", size: "227g", price: 640, oldPrice: 720, rating: 4.6, reviewCount: 156, category: "Snacks & candy", type: "Milk", origin: "USA", stock: 38, image: IMAGES.lindor },
  { id: 17, slug: "lindt-excellence-85-cocoa", name: "Lindt Excellence 85% Cocoa", brand: "Lindt", size: "100g", price: 720, oldPrice: 790, rating: 4.8, reviewCount: 66, category: "Chocolates", type: "Dark", origin: "Switzerland", stock: 26, image: IMAGES.toblerone },
  { id: 18, slug: "lindt-swiss-classic-hazelnut", name: "Lindt Swiss Classic Hazelnut", brand: "Lindt", size: "100g", price: 560, rating: 4.7, reviewCount: 58, category: "Chocolates", type: "Milk", origin: "Switzerland", stock: 40, image: IMAGES.ritter },
  { id: 19, slug: "lindt-lindor-dark-60-truffles", name: "Lindt Lindor Dark 60% Truffles", brand: "Lindt", size: "200g", price: 1490, oldPrice: 1650, rating: 4.9, reviewCount: 64, category: "Chocolates", type: "Dark", tag: "New", origin: "Switzerland", stock: 18, image: IMAGES.lindor },
  { id: 20, slug: "lindt-excellence-sea-salt", name: "Lindt Excellence Sea Salt", brand: "Lindt", size: "100g", price: 690, rating: 4.7, reviewCount: 41, category: "Chocolates", type: "Dark", origin: "Switzerland", stock: 22, image: IMAGES.ritter },
  { id: 21, slug: "lindt-lindor-milk-gift-bag", name: "Lindt Lindor Milk Gift Bag", brand: "Lindt", size: "137g", price: 990, oldPrice: 1090, rating: 4.8, reviewCount: 52, category: "Gift boxes", type: "Milk", origin: "Switzerland", stock: 30, image: IMAGES.galaxy },
];
