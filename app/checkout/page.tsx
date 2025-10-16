
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCartStore } from '@/lib/store/cart-store';
import type { CheckoutFormData } from '@/type';

// Esquema de validación con Zod
const checkoutSchema = z.object({
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  correo: z.string().email('Ingresa un correo electrónico válido'),
  telefono: z.string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .regex(/^[0-9+\-\s()]+$/, 'Formato de teléfono inválido'),
});

export default function CheckoutPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      // Obtener items del carrito
      const { items, getTotalPrice } = useCartStore.getState();
      
      if (items.length === 0) {
        alert('Tu carrito está vacío. Agrega algunos productos antes de proceder.');
        return;
      }

      // Preparar datos para la orden
      const orderData = {
        customerName: data.nombre,
        customerEmail: data.correo,
        customerPhone: data.telefono,
        items: items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity
        }))
      };

      // Crear la orden
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        const order = await response.json();
        
        // Limpiar carrito después de la orden exitosa
        useCartStore.getState().clearCart();
        
        // Limpiar formulario
        reset();
        
        // Mostrar mensaje de éxito con número de orden
        alert(`¡Orden creada exitosamente!\n\nNúmero de orden: #${order.id.slice(-8)}\nTotal: $${order.total.toFixed(2)}\n\nRevisa tu historial de pedidos para más detalles.`);
        
        // Redirigir al historial de órdenes
        window.location.href = '/orders';
      } else {
        const error = await response.json();
        alert(`Error al crear la orden: ${error.error}`);
      }
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Hubo un error al procesar tu orden. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h2 className="text-4xl font-bold mb-8 text-center">Checkout</h2>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Información de Contacto</CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Campo Nombre */}
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre Completo</Label>
              <Input
                id="nombre"
                type="text"
                placeholder="Ingresa tu nombre completo"
                {...register('nombre')}
                className={errors.nombre ? 'border-red-500' : ''}
              />
              {errors.nombre && (
                <p className="text-sm text-red-500">{errors.nombre.message}</p>
              )}
            </div>

            {/* Campo Correo */}
            <div className="space-y-2">
              <Label htmlFor="correo">Correo Electrónico</Label>
              <Input
                id="correo"
                type="email"
                placeholder="tu@email.com"
                {...register('correo')}
                className={errors.correo ? 'border-red-500' : ''}
              />
              {errors.correo && (
                <p className="text-sm text-red-500">{errors.correo.message}</p>
              )}
            </div>

            {/* Campo Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono</Label>
              <Input
                id="telefono"
                type="tel"
                placeholder="+1 (555) 123-4567"
                {...register('telefono')}
                className={errors.telefono ? 'border-red-500' : ''}
              />
              {errors.telefono && (
                <p className="text-sm text-red-500">{errors.telefono.message}</p>
              )}
            </div>

            {/* Botón de Envío */}
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Procesar Pedido'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
