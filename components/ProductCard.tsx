'use client'

import type { Product } from "../type";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import Link from "next/link";
import { useCartStore } from "@/lib/store/cart-store";
import { ShoppingCart, Eye, Tag } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

export function ProductCard({ product, viewMode = 'grid' }: ProductCardProps) {
  const { addItem: addToCart } = useCartStore();

  function handleAddButton() {
            addToCart(product);
        }

  const currentPrice = product.salePrice || product.price;
  const hasDiscount = product.onSale && product.salePrice;

  if (viewMode === 'list') {
   return (
      <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="flex">
          {/* Image Container */}
          <div className="relative overflow-hidden w-48 h-48 flex-shrink-0">
            <Link href={`/product/${product.id}`}>
              <div className="w-full h-full relative">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="200px"
                />
              </div>
            </Link>
            
            {/* Sale Badge */}
            {product.onSale && (
              <div className="absolute top-3 left-3">
                <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Tag className="h-3 w-3" />
                  Oferta
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-between">
            <div>
              <div className="mb-2">
                <span className="text-xs text-gray-500 uppercase tracking-wide">
                  {product.category}
                </span>
              </div>
              
              <h3 className="font-semibold text-xl mb-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>

              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl font-bold text-gray-900">
                  ${currentPrice.toFixed(2)}
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </div>

              {product.description && (
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
              )}

              {/* Stock Info */}
              <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${
                (product.stock || 0) > 10 
                  ? 'bg-green-100 text-green-800' 
                  : (product.stock || 0) > 0 
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {(product.stock || 0) > 0 ? `${product.stock || 0} disponibles` : 'Sin stock'}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <Link href={`/product/${product.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Detalles
                </Button>
              </Link>
              
              <Button 
                onClick={handleAddButton}
                disabled={(product.stock || 0) === 0}
                className="flex-1"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                {(product.stock || 0) === 0 ? 'Sin Stock' : 'Agregar'}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <div className="aspect-square relative">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </Link>
        
        {/* Sale Badge */}
        {product.onSale && (
          <div className="absolute top-3 left-3">
            <div className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Tag className="h-3 w-3" />
              Oferta
            </div>
          </div>
        )}

        {/* Stock Badge */}
        <div className="absolute top-3 right-3">
          <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
            (product.stock || 0) > 10 
              ? 'bg-green-100 text-green-800' 
              : (product.stock || 0) > 0 
              ? 'bg-yellow-100 text-yellow-800'
              : 'bg-red-100 text-red-800'
          }`}>
            {(product.stock || 0) > 0 ? `${product.stock || 0} disponibles` : 'Sin stock'}
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {product.category}
          </span>
        </div>
        
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-gray-900">
            ${currentPrice.toFixed(2)}
          </span>
          {hasDiscount && (
            <span className="text-sm text-gray-500 line-through">
              ${product.price.toFixed(2)}
            </span>
          )}
        </div>

        {product.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>
        )}
         </CardContent>   

      <CardFooter className="p-4 pt-0 flex gap-2 flex-wrap">
        <Link href={`/product/${product.id}`} className="flex-1 min-w-[120px]">
          <Button variant="outline" className="w-full" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Ver Detalles
          </Button>
        </Link>
        
        <Button 
          onClick={handleAddButton}
          disabled={(product.stock || 0) === 0}
          className="flex-1 min-w-[120px]"
          size="sm"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {(product.stock || 0) === 0 ? 'Sin Stock' : 'Agregar'}
        </Button>
         </CardFooter>
    </Card>
  );
}