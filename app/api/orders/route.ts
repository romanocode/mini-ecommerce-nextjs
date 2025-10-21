import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { OrderStatus } from '@prisma/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    let whereClause = {};
    if (email) {
      whereClause = { customerEmail: email };
    }

    const orders = await prisma.order.findMany({
      where: whereClause,
      include: {
        items: {
          include: {
            product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, customerEmail, customerPhone, items } = body;

    // Validar que hay items en la orden
    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'La orden debe contener al menos un producto' },
        { status: 400 }
      );
    }

    // Calcular el total de la orden
    let total = 0;
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId }
      });

      if (!product) {
        return NextResponse.json(
          { error: `Producto con ID ${item.productId} no encontrado` },
          { status: 400 }
        );
      }

      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Stock insuficiente para el producto ${product.name}` },
          { status: 400 }
        );
      }

      const price = product.salePrice || product.price;
      total += price * item.quantity;
    }

    

    // Crear la orden con sus items usando una transacción
    const order = await prisma.$transaction(async (tx) => {

      // Crear la orden
      const newOrder = await tx.order.create({
        data: {
          customerName,
          customerEmail,
          customerPhone,
          total,
          status: OrderStatus.PENDING
        }
      });

      // Crear los items de la orden y actualizar el stock
      const orderItems = await Promise.all(
        items.map(async (item: any) => {
          const product = await tx.product.findUnique({
            where: { id: item.productId }
          });

          if (!product) {
            throw new Error(`Producto con ID ${item.productId} no encontrado`);
          }

          const price = product.salePrice || product.price;

          // Crear el item de la orden
          const orderItem = await tx.orderItem.create({
            data: {
              orderId: newOrder.id,
              productId: item.productId,
              quantity: item.quantity,
              price
            }
          });

          // Actualizar el stock del producto
          await tx.product.update({
            where: { id: item.productId },
            data: {
              stock: product.stock - item.quantity
            }
          });

          return orderItem;
        })
      );

      return {
        ...newOrder,
        items: orderItems
      };
    });

    // Obtener la orden completa con los productos
    const orderWithProducts = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    });

    return NextResponse.json(orderWithProducts, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
   
    );
  }
}

