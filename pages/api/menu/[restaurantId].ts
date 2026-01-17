import type { NextApiRequest, NextApiResponse } from 'next';
import type { MenuResponse, ApiError } from '@/types/menu';
import { getRestaurant, getMenu, logAnalyticsEvent } from '@/lib/mockData';

/**
 * API Endpoint: GET /api/menu/[restaurantId]
 * 
 * Returns complete menu data for a restaurant
 * 
 * Query Parameters:
 *   - table: (optional) table number for analytics tracking
 */
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MenuResponse | ApiError>
) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({
            error: 'Method Not Allowed',
            message: 'Only GET requests are supported',
            statusCode: 405,
            timestamp: new Date().toISOString(),
        });
    }

    try {
        const { restaurantId } = req.query;
        const tableId = req.query.table as string | undefined;

        // Validate restaurantId
        if (!restaurantId || typeof restaurantId !== 'string') {
            return res.status(400).json({
                error: 'Bad Request',
                message: 'restaurantId is required',
                statusCode: 400,
                timestamp: new Date().toISOString(),
            });
        }

        // Fetch restaurant and menu
        const restaurant = getRestaurant(restaurantId);
        const menu = getMenu(restaurantId);

        if (!restaurant || !menu) {
            return res.status(404).json({
                error: 'Not Found',
                message: `Restaurant '${restaurantId}' not found`,
                statusCode: 404,
                timestamp: new Date().toISOString(),
            });
        }

        // Log analytics event
        logAnalyticsEvent({
            type: 'menu_view',
            restaurantId,
            tableId,
            timestamp: new Date().toISOString(),
        });

        // Build response
        const response: MenuResponse = {
            restaurant,
            menu,
        };

        // Set cache headers (5 minutes)
        res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=600');

        return res.status(200).json(response);

    } catch (error) {
        console.error('[API Error]', error);

        return res.status(500).json({
            error: 'Internal Server Error',
            message: 'An unexpected error occurred',
            statusCode: 500,
            timestamp: new Date().toISOString(),
        });
    }
}
