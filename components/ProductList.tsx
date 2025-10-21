
'use client'

import { ProductCard } from '../components/ProductCard'
import { useEffect, useState } from 'react'
import type { Product } from '../type'

export function ProductList() {
    const [products, setProducts] = useState<Product[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products')
                if (!response.ok) {
                    throw new Error('Error al cargar productos')
                }
                const data = await response.json()
                setProducts(data)
            } catch (error) {
                console.error('Error fetching products:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchProducts()
    }, [])

    if (loading) {
        return <div className="text-center py-10">Cargando productos...</div>
    }

    if (products.length === 0) {
        return <div className="text-center py-10">No se encontraron productos.</div>
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductCard product={product} key={product.id} />
            ))}
        </div>
    )
}