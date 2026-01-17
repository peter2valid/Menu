import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type { MenuResponse } from '@/types/menu';
import { fetchRestaurantMenu } from '@/lib/api';

export default function RestaurantMenu() {
    const router = useRouter();
    const { restaurantId } = router.query;
    const tableId = router.query.table as string;

    const [menuData, setMenuData] = useState<MenuResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (restaurantId && typeof restaurantId === 'string') {
            loadMenu(restaurantId, tableId);
        }
    }, [restaurantId, tableId]);

    async function loadMenu(restaurantId: string, tableId?: string) {
        try {
            setIsLoading(true);
            setError(null);

            const data = await fetchRestaurantMenu(restaurantId, tableId);
            setMenuData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load menu');
        } finally {
            setIsLoading(false);
        }
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-white text-xl animate-pulse mb-2">Loading menu...</div>
                    <div className="text-white/60 text-sm">Fetching from API</div>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !menuData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
                <div className="bg-red-500/10 backdrop-blur-lg rounded-2xl p-8 border border-red-500/30 max-w-md">
                    <h1 className="text-2xl font-bold text-red-400 mb-4">Error Loading Menu</h1>
                    <p className="text-white/80 mb-4">{error || 'Unknown error occurred'}</p>
                    <button
                        onClick={() => router.push('/')}
                        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    const { restaurant, menu } = menuData;

    // Sort categories by order
    const sortedCategories = [...menu.categories].sort((a, b) => a.order - b.order);

    return (
        <>
            <Head>
                <title>{restaurant.name} - Menu</title>
                <meta name="description" content={`Digital menu for ${restaurant.name}`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20 shadow-2xl">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">
                                    {restaurant.name}
                                </h1>
                                <div className="flex gap-4 text-sm flex-wrap">
                                    <div className="bg-purple-500/30 px-4 py-2 rounded-lg border border-purple-400/50">
                                        <span className="text-purple-200 font-semibold">Restaurant:</span>
                                        <span className="text-white ml-2 font-mono">{restaurant.id}</span>
                                    </div>
                                    {tableId && (
                                        <div className="bg-blue-500/30 px-4 py-2 rounded-lg border border-blue-400/50">
                                            <span className="text-blue-200 font-semibold">Table:</span>
                                            <span className="text-white ml-2 font-mono">{tableId}</span>
                                        </div>
                                    )}
                                    <div className="bg-green-500/30 px-4 py-2 rounded-lg border border-green-400/50">
                                        <span className="text-green-200 font-semibold">Currency:</span>
                                        <span className="text-white ml-2 font-mono">{restaurant.currency}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm text-purple-300 mb-1">QR Menu</div>
                                <div className="text-xs text-white/60">Step 2: API</div>
                            </div>
                        </div>
                    </div>

                    {/* Menu Section */}
                    <div className="space-y-6">
                        {sortedCategories.map((category) => (
                            <div key={category.id} className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl">
                                <h2 className="text-2xl font-bold text-white mb-4 pb-2 border-b border-white/20">
                                    {category.name}
                                </h2>

                                <div className="space-y-3">
                                    {category.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="group bg-white/5 hover:bg-white/10 rounded-xl p-4 transition-all duration-300 border border-white/10 hover:border-white/30 cursor-pointer"
                                        >
                                            <div className="flex justify-between items-start gap-4">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                                                            {item.name}
                                                        </h3>
                                                        {item.hasAR && (
                                                            <span className="text-xs bg-purple-500/30 text-purple-200 px-2 py-1 rounded border border-purple-400/50">
                                                                AR
                                                            </span>
                                                        )}
                                                        {!item.available && (
                                                            <span className="text-xs bg-red-500/30 text-red-200 px-2 py-1 rounded border border-red-400/50">
                                                                Unavailable
                                                            </span>
                                                        )}
                                                    </div>

                                                    {item.description && (
                                                        <p className="text-sm text-white/70 mb-2">{item.description}</p>
                                                    )}

                                                    {/* Tags */}
                                                    {item.tags && item.tags.length > 0 && (
                                                        <div className="flex gap-2 flex-wrap mb-2">
                                                            {item.tags.map(tag => (
                                                                <span key={tag} className="text-xs bg-white/10 text-white/60 px-2 py-1 rounded">
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}

                                                    {/* Calories & Analytics */}
                                                    <div className="flex gap-4 text-xs text-white/40 mt-1">
                                                        {item.calories && <span>🔥 {item.calories} cal</span>}
                                                        {item.views && <span>👁️ {item.views.toLocaleString()} views</span>}
                                                    </div>

                                                    {/* AR Button */}
                                                    {item.hasAR && (
                                                        <Link
                                                            href={`/r/${restaurantId}/ar/${item.id}${tableId ? `?table=${tableId}` : ''}`}
                                                            className="inline-flex items-center gap-2 mt-3 bg-purple-500 hover:bg-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                                                        >
                                                            <span>🎯</span>
                                                            View in AR
                                                        </Link>
                                                    )}
                                                </div>

                                                <div className="text-right">
                                                    <div className="text-2xl font-bold text-purple-400">
                                                        {restaurant.currency === 'USD' && '$'}
                                                        {restaurant.currency === 'KES' && 'KSh'}
                                                        {item.price.toFixed(2)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Footer Info */}
                    <div className="mt-8 text-center">
                        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                            <p className="text-white/60 text-sm">
                                ✅ <span className="text-green-400 font-semibold">Hierarchical Schema:</span> Restaurant → Menu → Category → MenuItem
                                {' • '}
                                <span className="text-purple-400 font-semibold">Next:</span> AR Preview (Step 3)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
