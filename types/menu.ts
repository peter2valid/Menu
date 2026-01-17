/**
 * MENU DATA MODEL - Production Schema
 * 
 * Designed for:
 * - Multi-restaurant SaaS
 * - AR support
 * - Future ordering
 * - Offline caching
 * - Analytics
 */

// Restaurant entity
export type Restaurant = {
    id: string;                 // "cafe-central"
    name: string;               // "Cafe Central"
    currency: string;           // "KES", "USD", etc.
    isActive: boolean;
};

// Menu entity (contains all menu data for a restaurant)
export type Menu = {
    restaurantId: string;
    categories: Category[];
    lastUpdated: string;        // ISO timestamp
};

// Category entity
export type Category = {
    id: string;                 // "coffee"
    name: string;               // "Coffee"
    order: number;              // display order
    items: MenuItem[];
};

// MenuItem entity (MOST IMPORTANT)
export type MenuItem = {
    id: string;                 // "espresso"
    name: string;               // "Espresso"
    description?: string;
    price: number;
    available: boolean;

    // UX / business
    tags?: string[];            // ["hot", "vegan"]
    calories?: number;

    // AR support
    hasAR: boolean;
    arModelUrl?: string;        // "/models/espresso.glb"

    // Analytics (future-proof)
    views?: number;
    orders?: number;
};

// API Response contract
export type MenuResponse = {
    restaurant: Restaurant;
    menu: Menu;
};

// API Error contract
export type ApiError = {
    error: string;
    message: string;
    statusCode: number;
    timestamp: string;
};
