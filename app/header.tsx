'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { ShoppingCart, Package, Home, History } from "lucide-react";
import { useState, useEffect } from "react";

export default function Header() {
  const { getTotalItems, items } = useCartStore();
  const [totalItems, setTotalItems] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    setTotalItems(getTotalItems());
  }, [getTotalItems, items]);

  return (
    <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Package className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gray-900">Mini Ecommerce Next.Js</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home className="h-4 w-4" />
              <span>Inicio</span>
            </Link>
            <Link 
              href="/catalog" 
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Package className="h-4 w-4" />
              <span>Catálogo</span>
            </Link>
            <Link 
              href="/orders" 
              className="flex items-center space-x-1 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <History className="h-4 w-4" />
              <span>Pedidos</span>
            </Link>
          </div>

          {/* Cart Button */}
          <Link href="/cart">
            <Button variant="outline" className="relative">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Carrito
              {isClient && totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}