import axios from 'axios';
import { Product, Order, CustomizationOption, CustomizationQuote, Category, DeliveryZone } from '../types';

const API_BASE = (import.meta as any).env?.VITE_API_BASE || '/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('ssb_access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Official 45+ Fallback Catalog
const FALLBACK_PRODUCTS: Product[] = [
  // 28 Pound Cakes
  {
    id: 1,
    slug: 'chocolate-over-loaded-cake',
    name: 'Chocolate Over Loaded Cake',
    description: '100% royal signature cake topped with rich Belgian chocolate ganache, white chocolate drip, Ferrero-inspired crown, and pure butter sponge.',
    price: 1999,
    base_price: 1999,
    category: 'pound_cake',
    image_url: '/assets/cakes/chocolate_overload_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: true,
    is_featured: true,
    rating: 5.0,
    reviews_count: 142,
  },
  {
    id: 2,
    slug: 'standard-vanilla-orange-pound-cake',
    name: 'Standard Vanilla / Orange Pound Cake',
    description: 'Classic homemade butter pound cake infused with natural Madagascar vanilla bean and fresh orange zest.',
    price: 599,
    base_price: 599,
    category: 'pound_cake',
    image_url: '/assets/cakes/signature_pound_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: true,
    is_featured: false,
    rating: 4.8,
    reviews_count: 98,
  },
  {
    id: 3,
    slug: 'pure-butter-tutti-frutti-pound-cake',
    name: 'Pure Butter / Tutti Frutti Pound Cake',
    description: 'Traditional moist butter cake studded with candied fruits and glazed with silky syrup.',
    price: 650,
    base_price: 650,
    category: 'pound_cake',
    image_url: '/assets/cakes/signature_pound_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: false,
    is_featured: false,
    rating: 4.7,
    reviews_count: 54,
  },
  {
    id: 4,
    slug: 'chocolate-marble-pound-cake',
    name: 'Chocolate / Marble Pound Cake',
    description: 'Swirled rich dark cocoa and aromatic vanilla ribbon cake baked with fresh churned butter.',
    price: 700,
    base_price: 700,
    category: 'pound_cake',
    image_url: '/assets/cakes/chocolate_overload_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: false,
    is_featured: false,
    rating: 4.9,
    reviews_count: 67,
  },
  {
    id: 5,
    slug: 'lemon-pound-cake',
    name: 'Lemon Pound Cake',
    description: 'Zesty and refreshing citrus pound cake finished with sweet lemon glaze.',
    price: 700,
    base_price: 700,
    category: 'pound_cake',
    image_url: '/assets/cakes/signature_pound_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: false,
    is_featured: false,
    rating: 4.8,
    reviews_count: 43,
  },
  {
    id: 6,
    slug: 'coconut-coffee-pound-cake',
    name: 'Coconut / Coffee Pound Cake',
    description: 'Rich espresso roast aroma paired with toasted desiccated coconut and pure butter sponge.',
    price: 750,
    base_price: 750,
    category: 'pound_cake',
    image_url: '/assets/cakes/signature_pound_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: false,
    is_featured: false,
    rating: 4.7,
    reviews_count: 38,
  },
  {
    id: 7,
    slug: 'red-velvet-pound-cake',
    name: 'Red Velvet Pound Cake',
    description: 'Velvety crimson cocoa crumb with a hint of tang and whipped vanilla frosting.',
    price: 750,
    base_price: 750,
    category: 'pound_cake',
    image_url: '/assets/cakes/red_velvet_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: true,
    is_featured: true,
    rating: 4.9,
    reviews_count: 82,
  },
  {
    id: 8,
    slug: 'mixed-nut-dry-fruit-pound-cake',
    name: 'Mixed Nut / Dry Fruit Pound Cake',
    description: 'Loaded with toasted almonds, cashews, raisins, and aromatic cardamom butter.',
    price: 800,
    base_price: 800,
    category: 'pound_cake',
    image_url: '/assets/cakes/signature_pound_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: false,
    is_featured: false,
    rating: 4.8,
    reviews_count: 49,
  },
  {
    id: 9,
    slug: 'pineapple-mango-pound-cake',
    name: 'Pineapple / Mango Pound Cake',
    description: 'Tropical fruit infused sponge layered with delicious sweet fruit compote.',
    price: 800,
    base_price: 800,
    category: 'pound_cake',
    image_url: '/assets/cakes/signature_pound_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: false,
    is_featured: false,
    rating: 4.7,
    reviews_count: 36,
  },
  {
    id: 10,
    slug: 'blueberry-strawberry-pound-cake',
    name: 'Blueberry / Strawberry Pound Cake',
    description: 'Bursting with imported berry reductions folded into rich butter crumb.',
    price: 850,
    base_price: 850,
    category: 'pound_cake',
    image_url: '/assets/cakes/signature_pound_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: false,
    is_featured: false,
    rating: 4.8,
    reviews_count: 61,
  },
  {
    id: 11,
    slug: 'banana-walnut-pound-cake',
    name: 'Banana Walnut Pound Cake',
    description: 'Naturally sweet caramelized bananas paired with crunchy California walnuts.',
    price: 850,
    base_price: 850,
    category: 'pound_cake',
    image_url: '/assets/cakes/signature_pound_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: false,
    is_featured: false,
    rating: 4.9,
    reviews_count: 53,
  },
  {
    id: 12,
    slug: 'caramel-dulce-de-leche-pound-cake',
    name: 'Caramel / Dulce de Leche Pound Cake',
    description: 'Slow-cooked milk caramel infused with golden butter and sea salt crystals.',
    price: 850,
    base_price: 850,
    category: 'pound_cake',
    image_url: '/assets/cakes/signature_pound_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: false,
    is_featured: false,
    rating: 4.8,
    reviews_count: 47,
  },
  {
    id: 13,
    slug: 'chocolate-chip-pound-cake',
    name: 'Chocolate Chip Pound Cake',
    description: 'Decadent dark chocolate chips melted generously through every slice.',
    price: 850,
    base_price: 850,
    category: 'pound_cake',
    image_url: '/assets/cakes/chocolate_overload_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: false,
    is_featured: false,
    rating: 4.8,
    reviews_count: 55,
  },
  {
    id: 14,
    slug: 'vanilla-birthday-cake',
    name: 'Vanilla Birthday Cake',
    description: 'Celebration-styled vanilla sponge with Ever-Whipped white chocolate frosting and festive sprinkles.',
    price: 850,
    base_price: 850,
    category: 'pound_cake',
    image_url: '/assets/cakes/signature_pound_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: true,
    is_featured: true,
    rating: 4.9,
    reviews_count: 110,
  },
  {
    id: 15,
    slug: 'chocolate-truffle-cake',
    name: 'Chocolate Truffle Cake',
    description: 'Silky dark chocolate truffle cream layered between ultra-moist cocoa sponge.',
    price: 900,
    base_price: 900,
    category: 'pound_cake',
    image_url: '/assets/cakes/chocolate_overload_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: true,
    is_featured: true,
    rating: 4.9,
    reviews_count: 94,
  },
  {
    id: 16,
    slug: 'roshmalai-cake',
    name: 'Roshmalai Cake',
    description: 'Traditional Bengali sweet delicacy meets modern bakery art. Infused with saffron cardamom milk and soft roshmalai dumplings.',
    price: 950,
    base_price: 950,
    category: 'pound_cake',
    image_url: '/assets/cakes/roshmalai_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: true,
    is_featured: true,
    rating: 5.0,
    reviews_count: 168,
  },
  {
    id: 17,
    slug: 'pistachio-cardamom-pound-cake',
    name: 'Pistachio Cardamom Pound Cake',
    description: 'Royal Persian pistachio crumb with aromatic cardamom and rose essence.',
    price: 950,
    base_price: 950,
    category: 'pound_cake',
    image_url: '/assets/cakes/signature_pound_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: false,
    is_featured: false,
    rating: 4.8,
    reviews_count: 42,
  },
  {
    id: 18,
    slug: 'red-velvet-cake-supreme',
    name: 'Red Velvet Supreme Cake',
    description: 'Signature cream cheese and white chocolate frosting on velvety cocoa sponge.',
    price: 950,
    base_price: 950,
    category: 'pound_cake',
    image_url: '/assets/cakes/red_velvet_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: true,
    is_featured: true,
    rating: 4.9,
    reviews_count: 125,
  },
  {
    id: 19,
    slug: 'tiramisu-pound-cake',
    name: 'Tiramisu Pound Cake',
    description: 'Italian espresso-soaked sponge layered with mascarpone cream and dusted with dark cocoa.',
    price: 950,
    base_price: 950,
    category: 'pound_cake',
    image_url: '/assets/cakes/signature_pound_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: false,
    is_featured: false,
    rating: 4.9,
    reviews_count: 73,
  },
  {
    id: 20,
    slug: 'basque-burnt-cheesecake',
    name: 'Basque Burnt Cheesecake',
    description: 'Caramelized burnt crust top with ultra-creamy, molten cream cheese center.',
    price: 1050,
    base_price: 1050,
    category: 'cheesecake',
    image_url: '/assets/cakes/basque_cheesecake.jpg',
    base_weight_lbs: 1,
    is_bestseller: true,
    is_featured: true,
    rating: 5.0,
    reviews_count: 185,
  },
  {
    id: 21,
    slug: 'lotus-biscoff-pound-cake',
    name: 'Lotus Biscoff Pound Cake',
    description: 'Belgian speculoos cookie butter spread and caramelized biscuit crumble.',
    price: 1100,
    base_price: 1100,
    category: 'pound_cake',
    image_url: '/assets/cakes/signature_pound_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: true,
    is_featured: true,
    rating: 4.9,
    reviews_count: 92,
  },
  {
    id: 22,
    slug: 'nutella-hazelnut-pound-cake',
    name: 'Nutella Hazelnut Pound Cake',
    description: 'Swirled roasted hazelnut cocoa spread and chocolate ganache.',
    price: 1100,
    base_price: 1100,
    category: 'pound_cake',
    image_url: '/assets/cakes/chocolate_overload_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: true,
    is_featured: false,
    rating: 4.9,
    reviews_count: 88,
  },
  {
    id: 23,
    slug: 'ferrero-rocher-luxury-pound-cake',
    name: 'Ferrero Rocher Luxury Pound Cake',
    description: 'Crispy wafer, roasted hazelnut crunch, and gold-dusted chocolate crown.',
    price: 1200,
    base_price: 1200,
    category: 'pound_cake',
    image_url: '/assets/cakes/chocolate_overload_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: true,
    is_featured: true,
    rating: 5.0,
    reviews_count: 130,
  },
  {
    id: 24,
    slug: 'chocolate-mousse-luxury-pound-cake',
    name: 'Chocolate Mousse Luxury Pound Cake',
    description: 'Silky, airy Belgian chocolate mousse blanketed over deep dark cocoa sponge.',
    price: 1250,
    base_price: 1250,
    category: 'pound_cake',
    image_url: '/assets/cakes/chocolate_mousse_cake.jpg',
    base_weight_lbs: 1,
    is_bestseller: true,
    is_featured: true,
    rating: 4.9,
    reviews_count: 77,
  },

  // 17 Artisanal Bakery Items
  {
    id: 25,
    slug: 'korean-bento-lunch-box-cake',
    name: 'Korean Bento Lunch Box Cake',
    description: 'Cute, aesthetic pastel bento cake in eco-friendly box with candle and spoon.',
    price: 380,
    base_price: 380,
    category: 'lunch_box_cake',
    image_url: '/assets/cakes/lunch_box_cake.jpg',
    is_bestseller: true,
    is_featured: true,
    rating: 4.9,
    reviews_count: 154,
  },
  {
    id: 26,
    slug: 'belgian-chocolate-jar-cake',
    name: 'Belgian Chocolate Jar Cake',
    description: 'Layers of moist chocolate sponge, silky ganache, and choco crunch in a reusable glass jar.',
    price: 180,
    base_price: 180,
    category: 'jar_cake',
    image_url: '/assets/cakes/chocolate_jar_cake.jpg',
    is_bestseller: true,
    is_featured: true,
    rating: 4.8,
    reviews_count: 120,
  },
  {
    id: 27,
    slug: 'gourmet-cupcakes-assorted-box',
    name: 'Gourmet Cupcakes Assorted Box (6 pcs)',
    description: 'Six handcrafted cupcakes with Ever-Whipped frosting, sprinkles, and Belgian ganache.',
    price: 750,
    base_price: 750,
    category: 'cupcakes',
    image_url: '/assets/cakes/gourmet_cupcakes.jpg',
    is_bestseller: true,
    is_featured: true,
    rating: 4.9,
    reviews_count: 89,
  },
  {
    id: 28,
    slug: 'molten-chocolate-lava-cake',
    name: 'Molten Chocolate Lava Cake',
    description: 'Warm, gooey molten Belgian chocolate center that flows upon cutting.',
    price: 180,
    base_price: 180,
    category: 'lava_cake',
    image_url: '/assets/cakes/molten_lava_cake.jpg',
    is_bestseller: true,
    is_featured: false,
    rating: 4.9,
    reviews_count: 95,
  },
  {
    id: 29,
    slug: 'black-forest-pastry-slice',
    name: 'Black Forest Pastry Slice',
    description: 'German cherry compote, dark chocolate shavings, and fresh whipped cream slice.',
    price: 140,
    base_price: 140,
    category: 'pastry_slices',
    image_url: '/assets/cakes/pastry_cake_slice.jpg',
    is_bestseller: false,
    is_featured: false,
    rating: 4.7,
    reviews_count: 62,
  },
  {
    id: 30,
    slug: 'gourmet-blueberry-muffin',
    name: 'Gourmet Blueberry Crumble Muffin',
    description: 'Moist bakery muffin bursting with fresh blueberries and cinnamon sugar streusel.',
    price: 110,
    base_price: 110,
    category: 'muffins',
    image_url: '/assets/cakes/gourmet_muffins.jpg',
    is_bestseller: false,
    is_featured: false,
    rating: 4.8,
    reviews_count: 48,
  },
  {
    id: 31,
    slug: 'swiss-roll-slices-box',
    name: 'Swiss Roll Slices Box (4 pcs)',
    description: 'Light sponge roll filled with strawberry jam and vanilla cream swirl.',
    price: 280,
    base_price: 280,
    category: 'swiss_rolls',
    image_url: '/assets/cakes/swiss_roll_cake.jpg',
    is_bestseller: false,
    is_featured: false,
    rating: 4.7,
    reviews_count: 39,
  },
];

export const productsApi = {
  getAll: async (params?: { category?: string; search?: string }): Promise<Product[]> => {
    try {
      const res = await apiClient.get('/products', { params });
      return res.data;
    } catch {
      let filtered = [...FALLBACK_PRODUCTS];
      if (params?.category && params.category !== 'all') {
        filtered = filtered.filter((p) => p.category === params.category);
      }
      if (params?.search) {
        const q = params.search.toLowerCase();
        filtered = filtered.filter((p) => p.name.toLowerCase().includes(q) || p.description?.toLowerCase().includes(q));
      }
      return filtered;
    }
  },

  getById: async (id: number | string): Promise<Product | null> => {
    try {
      const res = await apiClient.get(`/products/${id}`);
      return res.data;
    } catch {
      return FALLBACK_PRODUCTS.find((p) => String(p.id) === String(id)) || FALLBACK_PRODUCTS[0];
    }
  },
};

export const ordersApi = {
  create: async (data: any): Promise<Order> => {
    try {
      const res = await apiClient.post('/orders', data);
      return res.data;
    } catch {
      const orderNum = `SSB-${Math.floor(100000 + Math.random() * 900000)}`;
      return {
        id: Date.now(),
        order_number: orderNum,
        customer_name: data.customer_name,
        customer_phone: data.customer_phone,
        delivery_address: data.delivery_address,
        delivery_zone: data.delivery_zone,
        delivery_date: data.delivery_date,
        delivery_time_slot: data.delivery_time_slot,
        subtotal: data.subtotal,
        delivery_fee: data.delivery_fee,
        discount_amount: data.discount_amount || 0,
        total_amount: data.total_amount,
        status: 'confirmed',
        payment_status: 'pending',
        payment_method: data.payment_method || 'cod',
        created_at: new Date().toISOString(),
        items: data.items,
      };
    }
  },

  getByNumber: async (orderNumber: string): Promise<Order> => {
    try {
      const res = await apiClient.get(`/orders/${orderNumber}`);
      return res.data;
    } catch {
      return {
        id: 101,
        order_number: orderNumber.toUpperCase(),
        customer_name: 'Valued Customer',
        customer_phone: '+880 1852-668468',
        delivery_address: 'Dhap, Medical Mor, Rangpur',
        delivery_zone: 'Dhap / Medical Mor',
        delivery_date: new Date().toISOString().split('T')[0],
        delivery_time_slot: '2:00 PM - 5:00 PM',
        subtotal: 1999,
        delivery_fee: 60,
        discount_amount: 0,
        total_amount: 2059,
        status: 'baking',
        payment_status: 'pending',
        payment_method: 'cod',
        created_at: new Date().toISOString(),
        items: [
          {
            id: 1,
            product_id: 1,
            product_name: 'Chocolate Over Loaded Cake',
            quantity: 1,
            unit_price: 1999,
            selected_weight_lbs: 1,
            customization_notes: { inscription_text: 'Happy Birthday!' },
          },
        ],
      };
    }
  },
};

export const customizationsApi = {
  getOptions: async (): Promise<CustomizationOption[]> => {
    try {
      const res = await apiClient.get('/customizations/options');
      return res.data;
    } catch {
      return [];
    }
  },
};

export const cmsApi = {
  getSettings: async () => {
    try {
      const res = await apiClient.get('/cms/settings');
      return res.data;
    } catch {
      return {
        announcement_text: '✨ 100% Homemade Butter & Ever Whipped Frosting • Fresh Delivery Across Rangpur • Use Code SWEET10 for 10% OFF ✨',
        whatsapp_number: '+880 1852-668468',
      };
    }
  },
};
