import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '../types';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  isDrawerOpen: boolean;
  minOrderAmount: number;
  couponCode: string | null;
  discountAmount: number;
  totalPrice: number;
  totalItems: number;
  
  addItem: (product: Product, quantity?: number, selected_weight_lbs?: number | string, customization_notes?: Record<string, any>) => void;
  removeItem: (idOrIndex: string | number) => void;
  updateQuantity: (idOrIndex: string | number, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  applyCoupon: (code: string, discount: number) => void;
  setCoupon: (code: string, discount: number) => void;
  removeCoupon: () => void;
  
  getSubtotal: () => number;
  getTotalItems: () => number;
  getGrandTotal: (deliveryFee?: number) => number;
  isMinOrderMet: () => boolean;
  getRemainingForMinOrder: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      isDrawerOpen: false,
      minOrderAmount: 499,
      couponCode: null,
      discountAmount: 0,
      totalPrice: 0,
      totalItems: 0,

      addItem: (product, quantity = 1, selected_weight_lbs = 1, customization_notes) => {
        const weightNum = typeof selected_weight_lbs === 'number' ? selected_weight_lbs : parseFloat(String(selected_weight_lbs)) || 1;
        const baseUnitPrice = product.price || product.base_price || 599;
        const finalUnitPrice = String(product.category).includes('pound') ? baseUnitPrice * weightNum : baseUnitPrice;
        const itemId = `${product.id}-${weightNum}-${customization_notes?.inscription_text || ''}`;

        set((state) => {
          const existingIndex = state.items.findIndex((item) => item.id === itemId);
          let newItems = [...state.items];
          if (existingIndex > -1) {
            newItems[existingIndex].quantity += quantity;
          } else {
            newItems.push({
              id: itemId,
              product,
              quantity,
              selected_weight_lbs: weightNum,
              selectedSize: `${weightNum} Lb`,
              unit_price: finalUnitPrice,
              customization_notes,
              customizationDetails: customization_notes,
            });
          }

          const calculatedTotal = newItems.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
          const calculatedCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

          return {
            items: newItems,
            isOpen: true,
            isDrawerOpen: true,
            totalPrice: calculatedTotal,
            totalItems: calculatedCount,
          };
        });
      },

      removeItem: (idOrIndex) => {
        set((state) => {
          const newItems = typeof idOrIndex === 'number'
            ? state.items.filter((_, i) => i !== idOrIndex)
            : state.items.filter((item) => item.id !== idOrIndex);
          const calculatedTotal = newItems.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
          const calculatedCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

          return {
            items: newItems,
            totalPrice: calculatedTotal,
            totalItems: calculatedCount,
          };
        });
      },

      updateQuantity: (idOrIndex, quantity) => {
        set((state) => {
          let newItems = [...state.items];
          const index = typeof idOrIndex === 'number'
            ? idOrIndex
            : newItems.findIndex((i) => i.id === idOrIndex);

          if (index === -1) return state;

          if (quantity <= 0) {
            newItems.splice(index, 1);
          } else {
            newItems[index].quantity = Math.min(20, quantity);
          }

          const calculatedTotal = newItems.reduce((sum, item) => sum + item.unit_price * item.quantity, 0);
          const calculatedCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

          return {
            items: newItems,
            totalPrice: calculatedTotal,
            totalItems: calculatedCount,
          };
        });
      },

      clearCart: () => set({ items: [], couponCode: null, discountAmount: 0, totalPrice: 0, totalItems: 0 }),
      openCart: () => set({ isOpen: true, isDrawerOpen: true }),
      closeCart: () => set({ isOpen: false, isDrawerOpen: false }),
      openDrawer: () => set({ isOpen: true, isDrawerOpen: true }),
      closeDrawer: () => set({ isOpen: false, isDrawerOpen: false }),

      applyCoupon: (code, discount) => {
        const subtotal = get().totalPrice;
        const discAmount = discount < 1 ? subtotal * discount : discount;
        set({ couponCode: code, discountAmount: Math.round(discAmount) });
      },
      setCoupon: (code, discount) => get().applyCoupon(code, discount),
      removeCoupon: () => set({ couponCode: null, discountAmount: 0 }),

      getSubtotal: () => get().totalPrice,
      getTotalItems: () => get().totalItems,
      getGrandTotal: (deliveryFee = 60) => {
        const subtotal = get().totalPrice;
        const discount = get().discountAmount;
        return Math.max(0, subtotal + deliveryFee - discount);
      },
      isMinOrderMet: () => get().totalPrice >= get().minOrderAmount,
      getRemainingForMinOrder: () => {
        const remaining = get().minOrderAmount - get().totalPrice;
        return remaining > 0 ? remaining : 0;
      },
    }),
    {
      name: 'ssb-cart-storage',
      partialize: (state) => ({
        items: state.items,
        couponCode: state.couponCode,
        discountAmount: state.discountAmount,
        totalPrice: state.totalPrice,
        totalItems: state.totalItems,
      }),
    }
  )
);
