import type { MenuResponse, ApiError } from '@/types/menu';

/**
 * API Client for restaurant menu platform
 * 
 * Centralized fetch layer with error handling and type safety
 * Future: Add offline caching, retry logic, request deduplication
 */

class ApiClient {
    private baseUrl: string;

    constructor(baseUrl: string = '/api') {
        this.baseUrl = baseUrl;
    }

    /**
     * Fetch restaurant menu data
     * 
     * @param restaurantId - Restaurant identifier
     * @param tableId - Optional table number for analytics
     * @returns Promise<MenuResponse>
     * @throws Error if request fails
     */
    async fetchRestaurantMenu(
        restaurantId: string,
        tableId?: string
    ): Promise<MenuResponse> {
        try {
            const params = new URLSearchParams();
            if (tableId) {
                params.append('table', tableId);
            }

            const url = `${this.baseUrl}/menu/${restaurantId}${params.toString() ? `?${params.toString()}` : ''}`;

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            // Handle error responses
            if (!response.ok) {
                const errorData: ApiError = await response.json();
                throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
            }

            const data: MenuResponse = await response.json();

            // Future: Store in cache for offline support
            // await this.cacheMenuData(restaurantId, data);

            return data;

        } catch (error) {
            console.error('[API Client Error]', error);

            // Future: Try to load from offline cache
            // const cachedData = await this.getCachedMenuData(restaurantId);
            // if (cachedData) return cachedData;

            throw error;
        }
    }

    /**
     * Future: Cache menu data for offline support
     * @private
     */
    private async cacheMenuData(restaurantId: string, data: MenuResponse): Promise<void> {
        // TODO: Implement IndexedDB caching
        // const db = await openDB('menu-cache');
        // await db.put('menus', data, restaurantId);
    }

    /**
     * Future: Retrieve cached menu data
     * @private
     */
    private async getCachedMenuData(restaurantId: string): Promise<MenuResponse | null> {
        // TODO: Implement IndexedDB retrieval
        // const db = await openDB('menu-cache');
        // return await db.get('menus', restaurantId);
        return null;
    }
}

// Export singleton instance
export const apiClient = new ApiClient();

// Export convenience function
export async function fetchRestaurantMenu(
    restaurantId: string,
    tableId?: string
): Promise<MenuResponse> {
    return apiClient.fetchRestaurantMenu(restaurantId, tableId);
}
