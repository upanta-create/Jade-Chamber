const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🏛️ Initializing Jade Chamber Multi-Vendor Database Seeding...');

  // Clean existing tables (in proper order for foreign keys)
  await prisma.orderItem.deleteMany();
  await prisma.rating.deleteMany();
  await prisma.order.deleteMany();
  await prisma.address.deleteMany();
  await prisma.product.deleteMany();
  await prisma.store.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.user.deleteMany();

  console.log('🧹 Cleaned existing records.');

  // 1. Seed Users
  const userAdmin = await prisma.user.create({
    data: {
      id: 'usr_admin_01',
      name: 'Aditi Rao (Platform Lead)',
      email: 'admin@jadechamber.io',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      cart: {},
    },
  });

  const userSeller1 = await prisma.user.create({
    data: {
      id: 'usr_seller_01',
      name: 'Arjun Mehta (Apex Electronics)',
      email: 'arjun@apexelectronics.io',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      cart: {},
    },
  });

  const userSeller2 = await prisma.user.create({
    data: {
      id: 'usr_seller_02',
      name: 'Sneha Kapoor (Urban Aura)',
      email: 'sneha@urbanaura.io',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      cart: {},
    },
  });

  const userCustomer1 = await prisma.user.create({
    data: {
      id: 'usr_customer_01',
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150',
      cart: {},
    },
  });

  const userCustomer2 = await prisma.user.create({
    data: {
      id: 'usr_customer_02',
      name: 'Priya Nair',
      email: 'priya.nair@example.com',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150',
      cart: {},
    },
  });

  console.log('✅ Seeded Platform Users.');

  // 2. Seed Stores (Text-Only Brand Presentation, No Store Images Needed)
  const storeApex = await prisma.store.create({
    data: {
      id: 'str_apex_01',
      userId: userSeller1.id,
      name: 'Apex Electronics Hub',
      username: 'apex-electronics',
      description: 'Authorized retailer of high-performance audio systems, professional developer workstations, and computing gear.',
      address: 'Tech Park Sector, Bangalore, India',
      status: 'approved',
      isActive: true,
      logo: '',
      email: 'support@apexelectronics.io',
      contact: '+91 80 4122 8899',
    },
  });

  const storeUrban = await prisma.store.create({
    data: {
      id: 'str_urban_01',
      userId: userSeller2.id,
      name: 'Urban Aura Studio',
      username: 'urban-aura',
      description: 'Contemporary minimalist fashion, organic Merino wool essentials, and urban lifestyle apparel.',
      address: 'Design District, Indiranagar, Bangalore, India',
      status: 'approved',
      isActive: true,
      logo: '',
      email: 'contact@urbanaura.io',
      contact: '+91 80 4155 7711',
    },
  });

  const storeNordic = await prisma.store.create({
    data: {
      id: 'str_nordic_01',
      userId: userAdmin.id,
      name: 'Nordic Living Co.',
      username: 'nordic-living',
      description: 'Ergonomic workspace seating, precision coffee brewers, and Scandinavian home interiors.',
      address: 'Koramangala 5th Block, Bangalore, India',
      status: 'approved',
      isActive: true,
      logo: '',
      email: 'hello@nordicliving.io',
      contact: '+91 80 4188 3344',
    },
  });

  const storeVelocity = await prisma.store.create({
    data: {
      id: 'str_velocity_01',
      userId: userCustomer1.id,
      name: 'Velocity Athletic Gear',
      username: 'velocity-gear',
      description: 'Biometric sports watches, performance trackers, and durable endurance equipment.',
      address: 'Outer Ring Road, HSR Layout, Bangalore, India',
      status: 'approved',
      isActive: true,
      logo: '',
      email: 'sales@velocitygear.io',
      contact: '+91 80 4199 2200',
    },
  });

  console.log('✅ Seeded 4 Multi-Vendor Stores (Text Badges).');

  // 3. Seed Consumer Products (NO WEAPONS / GUNS)
  const productsData = [
    {
      id: 'prod_1',
      name: 'Sony WH-1000XM5 Wireless Noise-Cancelling Headphones',
      description: 'Industry-leading active noise cancellation powered by two processors and 8 microphones. 30-hour battery life with ultra-comfortable lightweight fit.',
      mrp: 34990,
      price: 28990,
      images: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800',
        'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800',
      ],
      category: 'Audio',
      inStock: true,
      storeId: storeApex.id,
    },
    {
      id: 'prod_2',
      name: 'Apple MacBook Pro 16-inch M3 Max (36GB RAM, 1TB SSD)',
      description: 'Liquid Retina XDR display with ProMotion 120Hz, 14-core CPU, 30-core GPU, up to 22 hours battery life. Built for heavy software engineering and machine learning.',
      mrp: 299900,
      price: 279900,
      images: [
        'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
        'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800',
      ],
      category: 'Computing',
      inStock: true,
      storeId: storeApex.id,
    },
    {
      id: 'prod_3',
      name: 'Keychron Q1 Pro Wireless Custom Mechanical Keyboard',
      description: 'Full CNC aluminum body, double-gasket acoustic mount, hot-swappable switches, PBT keycaps, and QMK/VIA programmable firmware for developers.',
      mrp: 18990,
      price: 15490,
      images: [
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800',
        'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800',
      ],
      category: 'Accessories',
      inStock: true,
      storeId: storeApex.id,
    },
    {
      id: 'prod_4',
      name: 'Ultra-Soft Merino Wool Minimalist Heavyweight Hoodie',
      description: '100% sustainably sourced 380gsm New Zealand Merino wool. Naturally odor-resistant, thermo-regulating, and tailored with double-needle ribbed cuffs.',
      mrp: 8990,
      price: 6490,
      images: [
        'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800',
        'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800',
      ],
      category: 'Fashion',
      inStock: true,
      storeId: storeUrban.id,
    },
    {
      id: 'prod_5',
      name: 'Garmin Fenix 7 Pro Sapphire Solar Multisport GPS Watch',
      description: 'Power Sapphire solar charging lens, built-in LED flashlight, endurance score metrics, wrist-based heart rate, pulse ox, and topographical multi-continent maps.',
      mrp: 89990,
      price: 76990,
      images: [
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800',
        'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800',
      ],
      category: 'Wearables',
      inStock: true,
      storeId: storeVelocity.id,
    },
    {
      id: 'prod_6',
      name: 'Herman Miller Embody Ergonomic Office Desk Chair',
      description: 'Engineered with biometric Pixelated Support that dynamically conforms to your micro-movements, relieving spine pressure and enhancing long sitting comfort.',
      mrp: 145000,
      price: 128000,
      images: [
        'https://images.unsplash.com/photo-1580481077197-046603a11e13?w=800',
        'https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800',
      ],
      category: 'Ergonomics',
      inStock: true,
      storeId: storeNordic.id,
    },
    {
      id: 'prod_7',
      name: 'Fellow Ode Gen 2 Precision Conical Burr Coffee Grinder',
      description: '64mm professional-grade flat burrs with 31 grind settings, anti-static ionizer, auto-stop sensor, and single-dose hopper for clean specialty espresso and pour-over brewing.',
      mrp: 32990,
      price: 27490,
      images: [
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800',
        'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      ],
      category: 'Living',
      inStock: true,
      storeId: storeNordic.id,
    },
    {
      id: 'prod_8',
      name: 'DJI Mini 4 Pro Drone with RC-2 Remote & 4K/60fps HDR',
      description: 'Ultra-lightweight under 249g foldable design with omnidirectional obstacle sensing, 34-minute flight time, 20km FHD video transmission, and true vertical shooting.',
      mrp: 84990,
      price: 72990,
      images: [
        'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800',
        'https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800',
      ],
      category: 'Electronics',
      inStock: true,
      storeId: storeApex.id,
    },
  ];

  for (const p of productsData) {
    await prisma.product.create({ data: p });
  }

  console.log('✅ Seeded 8 Real-World Consumer Products.');

  // 4. Seed Address & Sample Order
  const address = await prisma.address.create({
    data: {
      userId: userCustomer1.id,
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      street: '42 Orchid Residency, 100 Feet Road',
      city: 'Bangalore',
      state: 'Karnataka',
      zip: '560038',
      country: 'India',
      phone: '+91 98800 12345',
    },
  });

  const order = await prisma.order.create({
    data: {
      userId: userCustomer1.id,
      storeId: storeApex.id,
      total: 44480,
      status: 'DELIVERED',
      addressId: address.id,
      isPaid: true,
      paymentMethod: 'STRIPE',
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order.id,
      productId: 'prod_1',
      quantity: 1,
      price: 28990,
    },
  });

  await prisma.orderItem.create({
    data: {
      orderId: order.id,
      productId: 'prod_3',
      quantity: 1,
      price: 15490,
    },
  });

  // 5. Seed Ratings (attached to order)
  await prisma.rating.create({
    data: {
      rating: 5,
      review: 'Exceptional sound staging and active noise isolation. Must-have for developers in noisy open offices.',
      userId: userCustomer1.id,
      productId: 'prod_1',
      orderId: order.id,
    },
  });

  await prisma.rating.create({
    data: {
      rating: 5,
      review: 'Fast delivery from Apex Electronics! The M3 Max handles multiple Docker containers and Next.js builds effortlessly.',
      userId: userCustomer2.id,
      productId: 'prod_2',
      orderId: order.id,
    },
  });

  // 6. Seed Promotional Coupon
  await prisma.coupon.create({
    data: {
      code: 'JADE20',
      description: 'Summer Multi-Vendor Expo: 20% discount on all catalog items',
      discount: 20,
      forNewUser: false,
      forMember: false,
      isPublic: true,
      expiresAt: new Date('2027-12-31T23:59:59Z'),
    },
  });

  console.log('✅ Seeded Orders, Ratings, Address & JADE20 Coupon.');
  console.log('🎉 Jade Chamber Multi-Vendor Seeding Completed Successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
