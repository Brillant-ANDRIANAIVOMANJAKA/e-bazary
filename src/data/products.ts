import {
  BedDouble,
  Dumbbell,
  Gem,
  Gift,
  Shirt,
  Smartphone,
  Sofa,
  HeartPulse,
  type LucideIcon,
} from "lucide-react";

export type Category =
  | "furniture"
  | "fashion"
  | "electronics"
  | "beauty"
  | "sports"
  | "home"
  | "toys"
  | "jewelry";

export interface Product {
  id: string;
  name: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  image: string;
  category: Category;
  rating: number;
  reviews: number;
  stock: number;
  sold: number;
  trending?: boolean;
  dailyDeal?: boolean;
  description: string;
}

export const categories: { id: Category; label: string; icon: LucideIcon }[] = [
  { id: "furniture", label: "Meubles & Maison", icon: Sofa },
  { id: "fashion", label: "Mode & Vêtements", icon: Shirt },
  { id: "electronics", label: "Électronique", icon: Smartphone },
  { id: "beauty", label: "Santé & Beauté", icon: HeartPulse },
  { id: "sports", label: "Sports & Loisirs", icon: Dumbbell },
  { id: "home", label: "Linge de maison", icon: BedDouble },
  { id: "toys", label: "Cadeaux & Jeux", icon: Gift },
  { id: "jewelry", label: "Bijoux & Sacs", icon: Gem },
];

// Fonction image (Unsplash stable)
const img = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80&fm=webp`;

export const products: Product[] = [
  {
    id: "p1",
    name: "Fauteuil lounge Sweetheart",
    price: 15000.98,
    oldPrice: 89000.59,
    discount: 75,
    image: img("photo-1567538096630-e0c55bd6374c"),
    category: "furniture",
    rating: 4.7,
    reviews: 128,
    stock: 8,
    sold: 28,
    dailyDeal: true,
    description:
      "Fauteuil lounge rembourré haut de gamme, pieds en bois massif. Pensé pour le confort et le style.",
  },
  {
    id: "p2",
    name: "Vase en céramique minimaliste",
    price: 15000.98,
    oldPrice: 89000.59,
    discount: 75,
    image: img("photo-1612196808214-b8e1d6145a8c"),
    category: "home",
    rating: 4.5,
    reviews: 64,
    stock: 20,
    sold: 42,
    dailyDeal: true,
    description:
      "Vase en céramique fait main, idéal pour les fleurs fraîches ou séchées.",
  },
  {
    id: "p3",
    name: "Pouf moderne en velours",
    price: 4900.8,
    oldPrice: 9900.0,
    discount: 50,
    image: img("photo-1555041469-a586c61ea9bc"),
    category: "furniture",
    rating: 4.6,
    reviews: 92,
    stock: 15,
    sold: 56,
    trending: true,
    description:
      "Pouf en velours gris doux. Sert d'assise d'appoint ou de repose-pieds.",
  },
  {
    id: "p4",
    name: "Coussin à motif floral",
    price: 24000.9,
    oldPrice: 49000.8,
    discount: 50,
    image: img("photo-1584100936595-c0654b55a2e2"),
    category: "home",
    rating: 4.4,
    reviews: 38,
    stock: 35,
    sold: 110,
    trending: true,
    description:
      "Coussin réversible tissé main, intérieur/extérieur. Motif floral éclatant.",
  },
  {
    id: "p5",
    name: "Fauteuil design jaune",
    price: 4980,
    oldPrice: 6980,
    discount: 25,
    image: img("photo-1506439773649-6e0eb8cfb237"),
    category: "furniture",
    rating: 4.9,
    reviews: 47,
    stock: 5,
    sold: 18,
    trending: true,
    description:
      "Fauteuil jaune moutarde audacieux. La pièce forte d'un salon moderne.",
  },
  {
    id: "p6",
    name: "Plaid en polaire tricoté",
    price: 4900.8,
    oldPrice: 9900.0,
    discount: 50,
    image: img("photo-1522771739844-6a9f6d5f14af"),
    category: "home",
    rating: 4.7,
    reviews: 153,
    stock: 50,
    sold: 290,
    trending: true,
    description:
      "Plaid doux en polaire tricotée. Parfait pour les soirées cocooning.",
  },
  {
    id: "p7",
    name: "Armoire Bella",
    price: 4980,
    oldPrice: 7980,
    image: img("photo-1555041469-a586c61ea9bc"),
    category: "furniture",
    rating: 4.8,
    reviews: 24,
    stock: 6,
    sold: 12,
    trending: true,
    description: "Armoire en bois massif avec portes coulissantes et miroir intégré.",
  },
  {
    id: "p8",
    name: "Casque studio sans fil",
    price: 6000.86,
    oldPrice: 8400.99,
    discount: 28,
    image: img("photo-1505740420928-5e560c06d30e"),
    category: "electronics",
    rating: 4.6,
    reviews: 412,
    stock: 40,
    sold: 880,
    description:
      "Casque circum-auriculaire haut de gamme avec réduction de bruit active et 40 h d'autonomie.",
  },
  {
    id: "p9",
    name: "Montre connectée 2.0 LTE Wifi",
    price: 6000.86,
    oldPrice: 8400.99,
    discount: 28,
    image: img("photo-1523275335684-37898b6baf30"),
    category: "electronics",
    rating: 4.5,
    reviews: 286,
    stock: 60,
    sold: 540,
    description:
      "Suivi sportif, appels et notifications. Étanche. LTE + Wifi.",
  },
  {
    id: "p10",
    name: 'Ordinateur portable Pro Spectre 15"',
    price: 6000.86,
    oldPrice: 8400.99,
    discount: 28,
    image: img("photo-1496181133206-80ce9b88a853"),
    category: "electronics",
    rating: 4.8,
    reviews: 154,
    stock: 12,
    sold: 230,
    description:
      'Ordinateur ultra-fin, écran 15" 4K, 16 Go de RAM et autonomie pour la journée.',
  },
  {
    id: "p11",
    name: "Affiche de voyage vintage",
    price: 6000.86,
    oldPrice: 8400.99,
    discount: 28,
    image: img("photo-1513519245088-0e12902e5a38"),
    category: "home",
    rating: 4.3,
    reviews: 19,
    stock: 100,
    sold: 76,
    description:
      "Affiche de voyage style vintage imprimée sur papier mat premium.",
  },
  {
    id: "p12",
    name: "Baskets classiques en cuir",
    price: 8900.0,
    oldPrice: 12900.0,
    discount: 31,
    image: img("photo-1542291026-7eec264c27ff"),
    category: "fashion",
    rating: 4.6,
    reviews: 320,
    stock: 45,
    sold: 600,
    description:
      "Baskets en cuir intemporelles à semelle amortie. Disponibles en plusieurs pointures.",
  },
  {
    id: "p13",
    name: "Coffret rouges à lèvres Aurora",
    price: 32000.0,
    oldPrice: 48000.0,
    discount: 33,
    image: img("photo-1586495777744-4413f21062fa"),
    category: "beauty",
    rating: 4.7,
    reviews: 211,
    stock: 80,
    sold: 450,
    description: "Six teintes intenses longue tenue. Finitions mates et satinées.",
  },
  {
    id: "p14",
    name: "Ballon de football Pro Match",
    price: 39000.9,
    oldPrice: 59000.9,
    discount: 33,
    image: img("photo-1614632537190-23e4146777db"),
    category: "sports",
    rating: 4.8,
    reviews: 142,
    stock: 30,
    sold: 220,
    description: "Ballon de match homologué FIFA. Cousu main, qualité compétition.",
  },
 {
  id: "p15",
  name: "Créoles plaquées or",
  price: 78000.0,
  oldPrice: 120000.0,
  discount: 35,
  image: "https://i.pinimg.com/1200x/8b/33/7e/8b337ef6234f2568f67ef2c0bd39a1a0.jpg",
  category: "jewelry",
  rating: 4.9,
  reviews: 89,
  stock: 25,
  sold: 134,
  description: "Créoles plaquées or 18 carats. Hypoallergéniques et légères.",
},
  {
    id: "p16",
    name: "Jeu de construction en bois",
    price: 2400.5,
    oldPrice: 3900.9,
    discount: 38,
    image: "https://i.pinimg.com/1200x/61/2f/a6/612fa6379c1e3b48595d99c1c3a01660.jpg",
    category: "toys",
    rating: 4.6,
    reviews: 76,
    stock: 70,
    sold: 410,
    description:
      "Jeu de construction de 100 pièces en bois naturel. Sûr, durable et créatif.",
  },
];

export const findProduct = (id: string) => products.find((p) => p.id === id);
/** Lien vers la boutique, filtree par categorie et/ou recherche. */
export const shopUrl = (category?: Category, q?: string) => {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (q) params.set("q", q);
  const s = params.toString();
  return s ? `/shop?${s}` : "/shop";
};

export const categoryLabel = (id?: string | null) => categories.find((c) => c.id === id)?.label;
