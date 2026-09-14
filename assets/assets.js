import { Clock, ShieldCheck, Sparkles, Store, Cpu, Shirt, Home, Watch } from "lucide-react"

export const assets = {
    upload_area: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
}

// User Avatars (CDN URLs)
export const dummyAvatarAdmin = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
export const dummyAvatarUser1 = "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80"
export const dummyAvatarUser2 = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80"

export const dummyUserData = {
    id: "usr_admin_01",
    name: "Platform Administrator",
    email: "admin@jadechamber.io",
    image: dummyAvatarAdmin,
    role: "admin",
}

export const dummyStoreData = {
    id: "str_apex_01",
    userId: "usr_seller_01",
    name: "Apex Electronics Hub",
    description: "Certified retailer of premium audio, computing equipment, and developer workstations.",
    username: "apex-electronics",
    address: "Block 4, Tech Park Sector, Bangalore, India",
    status: "approved",
    isActive: true,
    logo: "",
    email: "support@apexelectronics.io",
    contact: "+91 80 4122 8899",
    createdAt: "2026-07-20T08:30:00.000Z",
    updatedAt: "2026-07-20T08:30:00.000Z",
    user: dummyUserData,
}

export const addressDummyData = {
    id: "addr_sample_01",
    userId: "usr_customer_01",
    name: "Rohan Sharma",
    email: "rohan.sharma@example.com",
    street: "42 Orchid Residency, 100 Feet Road",
    city: "Bangalore",
    state: "Karnataka",
    zip: "560038",
    country: "India",
    phone: "+91 98800 12345",
}

export const dummyStoreDashboardData = {
    totalRevenue: 44480,
    totalOrders: 14,
    totalProducts: 8,
    ratings: 4.9,
    recentOrders: [],
}

export const dummyAdminDashboardData = {
    totalRevenue: 284900,
    totalStores: 4,
    totalOrders: 62,
    totalUsers: 148,
    activeCanaryVersion: "v1.0.0",
}

export const storesDummyData = [
    {
        id: "str_apex_01",
        userId: "usr_seller_01",
        name: "Apex Electronics Hub",
        description: "Certified retailer of premium audio, computing equipment, and developer workstations.",
        username: "apex-electronics",
        address: "Block 4, Tech Park Sector, Bangalore, India",
        status: "approved",
        isActive: true,
        logo: "",
        email: "support@apexelectronics.io",
        contact: "+91 80 4122 8899",
        createdAt: "2026-07-20T08:30:00.000Z",
        updatedAt: "2026-07-20T08:30:00.000Z",
        user: dummyUserData,
    },
    {
        id: "str_urban_01",
        userId: "usr_seller_02",
        name: "Urban Aura Studio",
        description: "Designer minimalist apparel, organic cotton basics, and tailored streetwear.",
        username: "urban-aura",
        address: "Design District, Indiranagar, Bangalore, India",
        status: "approved",
        isActive: true,
        logo: "",
        email: "contact@urbanaura.io",
        contact: "+91 80 4155 7711",
        createdAt: "2026-07-22T08:32:00.000Z",
        updatedAt: "2026-07-22T08:32:00.000Z",
        user: dummyUserData,
    },
    {
        id: "str_nordic_01",
        userId: "usr_seller_03",
        name: "Nordic Living Co.",
        description: "Ergonomic home office furniture, artisan ceramic homeware, and ambient lighting.",
        username: "nordic-living",
        address: "Koramangala 5th Block, Bangalore, India",
        status: "approved",
        isActive: true,
        logo: "",
        email: "hello@nordicliving.io",
        contact: "+91 80 4188 3344",
        createdAt: "2026-07-25T08:34:00.000Z",
        updatedAt: "2026-07-25T08:34:00.000Z",
        user: dummyUserData,
    },
    {
        id: "str_velocity_01",
        userId: "usr_seller_04",
        name: "Velocity Athletic Gear",
        description: "Performance smart wearables, biometric trackers, and lightweight training equipment.",
        username: "velocity-gear",
        address: "Outer Ring Road, HSR Layout, Bangalore, India",
        status: "approved",
        isActive: true,
        logo: "",
        email: "sales@velocitygear.io",
        contact: "+91 80 4199 2200",
        createdAt: "2026-07-28T09:15:00.000Z",
        updatedAt: "2026-07-28T09:15:00.000Z",
        user: dummyUserData,
    },
]

export const dummyRatingsData = [
    {
        id: "rat_01",
        rating: 5,
        review: "Exceptional build quality and active noise cancellation. Essential for long remote work sessions.",
        user: { name: "Rohan Sharma", image: dummyAvatarUser1 },
        productId: "prod_1",
        createdAt: "2026-08-01T10:00:00.000Z",
    },
    {
        id: "rat_02",
        rating: 5,
        review: "Lightning-fast shipping via the multi-vendor dispatch pipeline. Product matches description completely.",
        user: { name: "Priya Nair", image: dummyAvatarUser2 },
        productId: "prod_1",
        createdAt: "2026-08-05T14:30:00.000Z",
    },
]

// Consumer Products (Electronics, Fashion, Ergonomics, Audio - NO WEAPONS)
export const productDummyData = [
    {
        id: "prod_1",
        name: "Sony WH-1000XM5 Wireless Noise-Cancelling Headphones",
        description: "Industry-leading noise canceling with two processors, 8 microphones, and Auto NC Optimizer. High-resolution audio with 30-hour battery life.",
        mrp: 34990,
        price: 28990,
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80",
        ],
        category: "Audio",
        inStock: true,
        storeId: "str_apex_01",
        rating: dummyRatingsData,
        createdAt: "2026-07-29T10:00:00.000Z",
        updatedAt: "2026-07-29T10:00:00.000Z",
        store: storesDummyData[0],
    },
    {
        id: "prod_2",
        name: "Apple MacBook Pro 16-inch M3 Max (36GB Unified RAM, 1TB SSD)",
        description: "Liquid Retina XDR display with ProMotion 120Hz, 14-core CPU, 30-core GPU, up to 22 hours battery life. Built for heavy software engineering and machine learning workflows.",
        mrp: 299900,
        price: 279900,
        images: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80",
        ],
        category: "Computing",
        inStock: true,
        storeId: "str_apex_01",
        rating: dummyRatingsData,
        createdAt: "2026-07-29T11:00:00.000Z",
        updatedAt: "2026-07-29T11:00:00.000Z",
        store: storesDummyData[0],
    },
    {
        id: "prod_3",
        name: "Keychron Q1 Pro Wireless Custom Mechanical Keyboard",
        description: "Full CNC aluminum body, double-gasket acoustic mount, hot-swappable switches, PBT keycaps, and QMK/VIA programmable firmware for developers.",
        mrp: 18990,
        price: 15490,
        images: [
            "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80",
        ],
        category: "Accessories",
        inStock: true,
        storeId: "str_apex_01",
        rating: dummyRatingsData,
        createdAt: "2026-07-29T12:00:00.000Z",
        updatedAt: "2026-07-29T12:00:00.000Z",
        store: storesDummyData[0],
    },
    {
        id: "prod_4",
        name: "Ultra-Soft Merino Wool Minimalist Heavyweight Hoodie",
        description: "100% sustainably sourced 380gsm New Zealand Merino wool. Naturally odor-resistant, thermo-regulating, and tailored with double-needle ribbed cuffs.",
        mrp: 8990,
        price: 6490,
        images: [
            "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80",
        ],
        category: "Fashion",
        inStock: true,
        storeId: "str_urban_01",
        rating: dummyRatingsData,
        createdAt: "2026-07-30T09:00:00.000Z",
        updatedAt: "2026-07-30T09:00:00.000Z",
        store: storesDummyData[1],
    },
    {
        id: "prod_5",
        name: "Garmin Fenix 7 Pro Sapphire Solar Multisport GPS Watch",
        description: "Power Sapphire solar charging lens, built-in LED flashlight, endurance score metrics, wrist-based heart rate, pulse ox, and topographical multi-continent maps.",
        mrp: 89990,
        price: 76990,
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80",
        ],
        category: "Wearables",
        inStock: true,
        storeId: "str_velocity_01",
        rating: dummyRatingsData,
        createdAt: "2026-07-30T10:30:00.000Z",
        updatedAt: "2026-07-30T10:30:00.000Z",
        store: storesDummyData[3],
    },
    {
        id: "prod_6",
        name: "Herman Miller Embody Ergonomic Office Desk Chair",
        description: "Engineered with biometric Pixelated Support that dynamically conforms to your micro-movements, relieving spine pressure and enhancing long sitting comfort.",
        mrp: 145000,
        price: 128000,
        images: [
            "https://images.unsplash.com/photo-1580481077197-046603a11e13?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1505797149-43b0069ec26b?w=800&auto=format&fit=crop&q=80",
        ],
        category: "Ergonomics",
        inStock: true,
        storeId: "str_nordic_01",
        rating: dummyRatingsData,
        createdAt: "2026-07-30T14:00:00.000Z",
        updatedAt: "2026-07-30T14:00:00.000Z",
        store: storesDummyData[2],
    },
    {
        id: "prod_7",
        name: "Fellow Ode Gen 2 Precision Conical Burr Coffee Grinder",
        description: "64mm professional-grade flat burrs with 31 grind settings, anti-static ionizer, auto-stop sensor, and single-dose hopper for clean specialty espresso and pour-over brewing.",
        mrp: 32990,
        price: 27490,
        images: [
            "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&auto=format&fit=crop&q=80",
        ],
        category: "Living",
        inStock: true,
        storeId: "str_nordic_01",
        rating: dummyRatingsData,
        createdAt: "2026-07-31T08:00:00.000Z",
        updatedAt: "2026-07-31T08:00:00.000Z",
        store: storesDummyData[2],
    },
    {
        id: "prod_8",
        name: "DJI Mini 4 Pro Drone with RC-2 Remote & 4K/60fps HDR",
        description: "Ultra-lightweight under 249g foldable design with omnidirectional obstacle sensing, 34-minute flight time, 20km FHD video transmission, and true vertical shooting.",
        mrp: 84990,
        price: 72990,
        images: [
            "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&auto=format&fit=crop&q=80",
            "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=800&auto=format&fit=crop&q=80",
        ],
        category: "Electronics",
        inStock: true,
        storeId: "str_apex_01",
        rating: dummyRatingsData,
        createdAt: "2026-07-31T11:30:00.000Z",
        updatedAt: "2026-07-31T11:30:00.000Z",
        store: storesDummyData[0],
    },
]

export const categories = [
    "All",
    "Audio",
    "Computing",
    "Accessories",
    "Fashion",
    "Wearables",
    "Ergonomics",
    "Living",
    "Electronics",
];

export const categoriesData = [
    { name: "Audio", icon: "Headphones" },
    { name: "Computing", icon: "Laptop" },
    { name: "Accessories", icon: "Keyboard" },
    { name: "Fashion", icon: "Shirt" },
    { name: "Wearables", icon: "Watch" },
    { name: "Ergonomics", icon: "Armchair" },
    { name: "Living", icon: "Coffee" },
    { name: "Electronics", icon: "Camera" },
]

export const couponDummyData = [
    {
        code: "JADE20",
        discount: 20,
        description: "20% off all catalog items",
    },
]

export const dummyOrders = [
    {
        id: "ord_1001",
        total: 44480,
        status: "DELIVERED",
        createdAt: "2026-08-01T10:00:00.000Z",
        orderItems: [
            {
                productId: "prod_1",
                quantity: 1,
                price: 28990,
            },
            {
                productId: "prod_3",
                quantity: 1,
                price: 15490,
            },
        ],
        address: {
            name: "Rohan Sharma",
            street: "42 Orchid Residency, 100 Feet Road",
            city: "Bangalore",
            phone: "+91 98800 12345",
        },
    },
]

export const orderDummyData = dummyOrders;

export const ourSpecsData = [
    {
        title: "Verified Vendor Network",
        description: "Every merchant storefront is authenticated and monitored with automated quality audits.",
        icon: ShieldCheck,
    },
    {
        title: "Sub-5ms Redis Caching",
        description: "Catalog and inventory queries are accelerated through distributed in-memory Redis caching.",
        icon: Cpu,
    },
    {
        title: "Real-Time Order Tracking",
        description: "Live package fulfillment telemetry with instant automated order dispatch and digital invoices.",
        icon: Clock,
    },
]