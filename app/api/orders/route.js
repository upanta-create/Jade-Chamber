import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

const fallbackOrders = [
  {
    id: 'ord_sample_01',
    total: 279.99,
    status: 'DELIVERED',
    userId: 'usr_cust_01',
    storeId: 'str_aurora_01',
    isPaid: true,
    paymentMethod: 'STRIPE',
    createdAt: new Date().toISOString(),
    store: { name: 'Aurora Tech Boutique' },
  },
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const storeId = searchParams.get('storeId');

    try {
      const where = {};
      if (userId) where.userId = userId;
      if (storeId) where.storeId = storeId;

      const orders = await prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        include: {
          orderItems: {
            include: { product: true },
          },
          address: true,
          store: {
            select: { name: true, logo: true },
          },
        },
      });

      if (orders && orders.length > 0) {
        return NextResponse.json({ success: true, source: 'postgres', data: orders });
      }
    } catch (dbError) {
      console.warn('Prisma orders query failed, using dummy fallback:', dbError.message);
    }

    return NextResponse.json({ success: true, source: 'fallback', data: fallbackOrders });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch orders', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { userId, storeId, addressId, total, paymentMethod, items } = body;

    if (!userId || !storeId || !addressId || !total) {
      return NextResponse.json(
        { success: false, error: 'Missing required order fields' },
        { status: 400 }
      );
    }

    try {
      const newOrder = await prisma.order.create({
        data: {
          userId,
          storeId,
          addressId,
          total: parseFloat(total),
          paymentMethod: paymentMethod || 'COD',
          status: 'ORDER_PLACED',
          isPaid: paymentMethod === 'STRIPE',
          orderItems: {
            create: (items || []).map((item) => ({
              productId: item.productId,
              quantity: item.quantity || 1,
              price: parseFloat(item.price),
            })),
          },
        },
        include: {
          orderItems: true,
        },
      });

      return NextResponse.json({ success: true, data: newOrder }, { status: 201 });
    } catch (dbError) {
      // Mock order response for testing without live DB
      const mockOrder = {
        id: `ord_${Date.now()}`,
        userId,
        storeId,
        total,
        status: 'ORDER_PLACED',
        createdAt: new Date().toISOString(),
      };
      return NextResponse.json({ success: true, mock: true, data: mockOrder }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process order', details: error.message },
      { status: 500 }
    );
  }
}
