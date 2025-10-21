import { Product } from '../type';
 
// Datos de prueba comentados para usar los datos de la base de datos Neon
export const products: Product[] = [
  {
    id: '1',
    name: 'Zapatillas Urbanas',
    price: 179.99,
    salePrice: 129.99,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop',
    category: 'Calzado',
    onSale: true,
    stock: 25,
    description: 'Zapatillas urbanas cómodas y elegantes para el día a día',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    id: '2',
    name: 'Casacas Premium',
    price: 189.99,
    salePrice: 149.99,
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=300&fit=crop',
    category: 'Ropa',
    onSale: true,
    stock: 15,
    description: 'Casacas premium con materiales de alta calidad',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    id: '3',
    name: 'Reloj Inteligente',
    price: 299.99,
    salePrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop',
    category: 'Electrónicos',
    onSale: false,
    stock: 8,
    description: 'Reloj inteligente con múltiples funciones y pantalla OLED',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    id: '4',
    name: 'Auriculares Inalámbricos',
    price: 159.99,
    salePrice: 119.99,
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
    category: 'Electrónicos',
    onSale: true,
    stock: 20,
    description: 'Auriculares inalámbricos con cancelación de ruido',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    id: '5',
    name: 'Mochila Deportiva',
    price: 89.99,
    salePrice: null,
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop',
    category: 'Accesorios',
    onSale: false,
    stock: 12,
    description: 'Mochila deportiva resistente al agua con múltiples compartimentos',
    createdAt: new Date(),
    updatedAt: new Date()
  },

  {
    id: '6',
    name: 'Gafas de Sol',
    price: 129.99,
    salePrice: 99.99,
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop',
    category: 'Accesorios',
    onSale: true,
    stock: 18,
    description: 'Gafas de sol con protección UV y diseño moderno',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];