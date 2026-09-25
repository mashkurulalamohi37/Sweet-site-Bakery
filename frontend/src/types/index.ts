export interface Product {
  id: string | number;
  sku?: string;
  slug: string;
  name: string;
  category_id?: string;
  category: string | Category;
  short_description?: string;
  description?: string;
  base_price?: number;
  price: number;
  sale_price?: number;
  is_price_starting_from?: boolean;
  unit?: string;
  base_weight_lbs?: number;
  weight_grams?: number;
  available_sizes?: string[];
  flavor?: string;
  frosting?: string;
  filling?: string;
  ingredients?: string;
  allergens?: string;
  image_url: string;
  gallery_images?: string[];
  stock_quantity?: number;
  is_in_stock?: boolean;
  is_featured?: boolean;
  is_bestseller?: boolean;
  is_new?: boolean;
  is_active?: boolean;
  rating?: number;
  rating_avg?: number;
  reviews_count?: number;
  rating_count?: number;
}

export interface Category {
  id: string | number;
  slug: string;
  name: string;
  description?: string;
  image_url?: string;
  sort_order?: number;
  is_active?: boolean;
  product_count?: number;
}

export interface CartItem {
  id?: string;
  product: Product;
  quantity: number;
  selected_weight_lbs?: number;
  selectedSize?: string;
  unit_price: number;
  cakeMessage?: string;
  customization_notes?: Record<string, any>;
  customizationDetails?: Record<string, any>;
}

export interface CustomizationOption {
  id: string | number;
  category: 'OCCASION' | 'FLAVOR' | 'SIZE' | 'FROSTING' | 'DESIGN' | 'COLOR' | 'EXTRA' | string;
  name: string;
  description?: string;
  extra_price: number;
  color_hex?: string;
  is_active?: boolean;
}

export interface CustomizationQuote {
  base_price: number;
  size_extra: number;
  frosting_extra: number;
  design_extra: number;
  extras_total: number;
  estimated_total: number;
}

export interface OrderItem {
  id?: string | number;
  product_id?: string | number;
  product_name: string;
  product_image?: string;
  unit_size?: string;
  selected_weight_lbs?: number;
  unit_price: number;
  quantity: number;
  line_total?: number;
  cake_message?: string;
  customization_notes?: Record<string, any>;
  customization_details?: Record<string, any>;
}

export interface Order {
  id: string | number;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_email?: string;
  delivery_zone?: string;
  delivery_area?: string;
  delivery_address: string;
  delivery_date: string;
  delivery_time_slot: string;
  subtotal: number;
  delivery_fee: number;
  discount_amount: number;
  total_amount?: number;
  grand_total?: number;
  coupon_code?: string;
  status: string;
  payment_status: string;
  payment_method: string;
  assigned_baker_name?: string;
  assigned_delivery_agent?: string;
  special_instructions?: string;
  customer_notes?: string;
  created_at: string;
  items: OrderItem[];
}

export interface User {
  id: string | number;
  name: string;
  phone?: string;
  email: string;
  role: string;
  is_active?: boolean;
  is_verified?: boolean;
  created_at?: string;
}

export interface DeliveryZone {
  id: string | number;
  name: string;
  description?: string;
  delivery_fee: number;
  free_delivery_threshold?: number;
  estimated_delivery_time?: string;
  is_active?: boolean;
}

export interface FAQ {
  id: string | number;
  question: string;
  answer: string;
  category?: string;
}
