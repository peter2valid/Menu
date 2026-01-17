import type { Restaurant, Menu } from '@/types/menu';

/**
 * Mock database - simulates database
 * Production: Replace with actual database queries
 */

// Restaurants
export const restaurants: Record<string, Restaurant> = {
    'cafe-central': {
        id: 'cafe-central',
        name: 'Cafe Central',
        currency: 'USD',
        isActive: true,
    },
    'pizza-house': {
        id: 'pizza-house',
        name: 'Pizza House',
        currency: 'USD',
        isActive: true,
    },
};

// Menus (hierarchical structure)
export const menus: Record<string, Menu> = {
    'cafe-central': {
        restaurantId: 'cafe-central',
        lastUpdated: new Date().toISOString(),
        categories: [
            {
                id: 'coffee',
                name: 'Coffee',
                order: 1,
                items: [
                    {
                        id: 'espresso',
                        name: 'Espresso',
                        description: 'Rich, bold single shot of espresso from our signature blend',
                        price: 2.50,
                        available: true,
                        hasAR: false,
                        tags: ['hot', 'popular', 'quick'],
                        views: 1247,
                        orders: 856,
                    },
                    {
                        id: 'cappuccino',
                        name: 'Cappuccino',
                        description: 'Creamy espresso with steamed milk and a perfect foam cap',
                        price: 3.80,
                        available: true,
                        hasAR: true,
                        arModelUrl: '/models/cappuccino.glb',
                        tags: ['hot', 'popular'],
                        views: 2103,
                        orders: 1542,
                    },
                    {
                        id: 'latte',
                        name: 'Latte',
                        description: 'Smooth espresso with steamed milk and delicate microfoam',
                        price: 4.20,
                        available: true,
                        hasAR: false,
                        tags: ['hot'],
                        views: 1876,
                        orders: 1204,
                    },
                ],
            },
            {
                id: 'pastries',
                name: 'Pastries',
                order: 2,
                items: [
                    {
                        id: 'croissant',
                        name: 'Butter Croissant',
                        description: 'Flaky, buttery French croissant baked fresh this morning',
                        price: 3.50,
                        available: true,
                        hasAR: true,
                        arModelUrl: '/models/croissant.glb',
                        tags: ['fresh-baked'],
                        calories: 231,
                        views: 923,
                        orders: 687,
                    },
                    {
                        id: 'blueberry-muffin',
                        name: 'Blueberry Muffin',
                        description: 'Moist muffin loaded with fresh blueberries',
                        price: 3.00,
                        available: true,
                        hasAR: false,
                        tags: [],
                        calories: 387,
                        views: 654,
                        orders: 432,
                    },
                ],
            },
            {
                id: 'breakfast',
                name: 'Breakfast',
                order: 3,
                items: [
                    {
                        id: 'avocado-toast',
                        name: 'Avocado Toast',
                        description: 'Smashed avocado on sourdough with cherry tomatoes, olive oil, and sea salt',
                        price: 8.50,
                        available: true,
                        hasAR: true,
                        arModelUrl: '/models/avocado-toast.glb',
                        tags: ['popular', 'vegan', 'healthy'],
                        calories: 312,
                        views: 1532,
                        orders: 892,
                    },
                ],
            },
        ],
    },

    'pizza-house': {
        restaurantId: 'pizza-house',
        lastUpdated: new Date().toISOString(),
        categories: [
            {
                id: 'pizza',
                name: 'Pizza',
                order: 1,
                items: [
                    {
                        id: 'margherita',
                        name: 'Margherita Pizza',
                        description: 'Classic pizza with San Marzano tomatoes, fresh mozzarella, and basil',
                        price: 12.99,
                        available: true,
                        hasAR: true,
                        arModelUrl: '/models/margherita.glb',
                        tags: ['popular', 'vegetarian', 'classic'],
                        calories: 1200,
                        views: 3421,
                        orders: 2104,
                    },
                    {
                        id: 'pepperoni',
                        name: 'Pepperoni Pizza',
                        description: 'Loaded with premium pepperoni and mozzarella cheese',
                        price: 14.99,
                        available: true,
                        hasAR: true,
                        arModelUrl: '/models/pepperoni.glb',
                        tags: ['popular', 'best-seller'],
                        calories: 1580,
                        views: 4102,
                        orders: 2876,
                    },
                    {
                        id: 'quattro-formaggi',
                        name: 'Quattro Formaggi',
                        description: 'Four cheese blend: mozzarella, gorgonzola, parmesan, and fontina',
                        price: 15.99,
                        available: true,
                        hasAR: false,
                        tags: ['vegetarian', 'premium'],
                        calories: 1450,
                        views: 1876,
                        orders: 1043,
                    },
                ],
            },
            {
                id: 'salads',
                name: 'Salads',
                order: 2,
                items: [
                    {
                        id: 'caesar-salad',
                        name: 'Caesar Salad',
                        description: 'Crisp romaine, parmesan, croutons, and house Caesar dressing',
                        price: 7.50,
                        available: true,
                        hasAR: false,
                        tags: ['classic'],
                        calories: 320,
                        views: 892,
                        orders: 543,
                    },
                ],
            },
            {
                id: 'desserts',
                name: 'Desserts',
                order: 3,
                items: [
                    {
                        id: 'tiramisu',
                        name: 'Tiramisu',
                        description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone',
                        price: 6.50,
                        available: true,
                        hasAR: true,
                        arModelUrl: '/models/tiramisu.glb',
                        tags: ['popular', 'signature'],
                        calories: 450,
                        views: 1234,
                        orders: 876,
                    },
                ],
            },
        ],
    },
};

/**
 * Get restaurant by ID
 */
export function getRestaurant(restaurantId: string): Restaurant | null {
    return restaurants[restaurantId] || null;
}

/**
 * Get menu for a restaurant
 */
export function getMenu(restaurantId: string): Menu | null {
    return menus[restaurantId] || null;
}

/**
 * Log analytics event (simulated)
 */
export function logAnalyticsEvent(event: {
    type: 'menu_view' | 'item_view' | 'qr_scan';
    restaurantId: string;
    tableId?: string;
    itemId?: string;
    timestamp: string;
}) {
    if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics]', event);
    }
    // Future: await db.analytics.create({ data: event });
}
