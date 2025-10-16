import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product, CartItem } from '../../type';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product: Product) => set((state) => {
        const existingItem = state.items.find(item => item.product.id === product.id);
        
        if (existingItem) {
          // Si el producto ya existe, incrementar la cantidad
          return {
            items: state.items.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          };
        } else {
          // Si es un producto nuevo, agregarlo al carrito
          return {
            items: [...state.items, { product, quantity: 1 }]
          };
        }
      }),
      
      updateQuantity: (productId: string, quantity: number) => set((state) => ({
        items: state.items.map(item =>
          item.product.id === productId
            ? { ...item, quantity: Math.max(0, quantity) }
            : item
        ).filter(item => item.quantity > 0) // Remover items con cantidad 0
      })),
      
      removeItem: (productId: string) => set((state) => ({
        items: state.items.filter(item => item.product.id !== productId)
      })),
      
      clearCart: () => set({ items: [] }),
      
      getTotalItems: () => {
        const state = get();
        return state.items.reduce((total, item) => total + item.quantity, 0);
      },
      
      getTotalPrice: () => {
        const state = get();
        return state.items.reduce((total, item) => {
          const price = item.product.salePrice || item.product.price;
          return total + (price * item.quantity);
        }, 0);
      }
    }),
    { name: 'cart-storage' }
  )
)