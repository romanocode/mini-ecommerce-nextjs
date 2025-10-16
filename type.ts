import { Product as PrismaProduct, Order as PrismaOrder, OrderItem as PrismaOrderItem } from '@prisma/client'

export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number | null;
  imageUrl: string;
  category: string;
  onSale?: boolean;
  stock?: number;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Order extends PrismaOrder {
  items: OrderItem[]
}

export interface OrderItem extends PrismaOrderItem {
  product: Product
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutFormData {
  nombre: string;
  correo: string;
  telefono: string;
}

export type OrderStatus = 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'