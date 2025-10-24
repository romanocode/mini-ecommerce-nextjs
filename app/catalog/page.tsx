'use client';

import { useState, useEffect } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Filter, Grid, List } from 'lucide-react';
import type { Product } from '@/type';

export default function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde la API
  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  // Filtrar productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Ordenar productos
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case 'price-high':
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case 'newest':
        const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        return bTime - aTime;
      default:
        return 0;
    }
  });

  // Obtener categorías únicas
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Catálogo de Productos</h1>
          <p className="text-gray-600">
            Descubre nuestra amplia selección de productos de calidad
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filtros y Búsqueda
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'Todas las categorías' : category}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="name">Ordenar por nombre</option>
                <option value="price-low">Precio: Menor a Mayor</option>
                <option value="price-high">Precio: Mayor a Menor</option>
                <option value="newest">Más recientes</option>
              </select>

              {/* View Mode */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Cargando productos...
            </h3>
          </div>
        ) : (
          <>
            {/* Results Info */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Mostrando {sortedProducts.length} de {products.length} productos
              </p>
              {selectedCategory !== 'all' && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedCategory('all')}
                >
                  Limpiar filtros
                </Button>
              )}
            </div>

            {/* Products Grid */}
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {sortedProducts.map(product => (
                <ProductCard 
                  product={product} 
                  key={product.id}
                  viewMode={viewMode}
                />
              ))}
            </div>

            {/* No Results */}
            {sortedProducts.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No se encontraron productos
            </h3>
            <p className="text-gray-600 mb-4">
              Intenta ajustar tus filtros de búsqueda
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSortBy('name');
            }}>
              Limpiar todos los filtros
            </Button>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}
