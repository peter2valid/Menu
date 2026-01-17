import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import type { MenuResponse, MenuItem } from '@/types/menu';
import { fetchRestaurantMenu } from '@/lib/api';

export default function ARViewPage() {
    const router = useRouter();
    const { restaurantId, itemId, table } = router.query;

    const [menuData, setMenuData] = useState<MenuResponse | null>(null);
    const [item, setItem] = useState<MenuItem | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (restaurantId && typeof restaurantId === 'string' && itemId && typeof itemId === 'string') {
            loadMenuItem(restaurantId, itemId);
        }
    }, [restaurantId, itemId]);

    async function loadMenuItem(restaurantId: string, itemId: string) {
        try {
            setIsLoading(true);
            setError(null);

            const data = await fetchRestaurantMenu(restaurantId, table as string);
            setMenuData(data);

            // Find the item across all categories
            let foundItem: MenuItem | null = null;
            for (const category of data.menu.categories) {
                const item = category.items.find(i => i.id === itemId);
                if (item) {
                    foundItem = item;
                    break;
                }
            }

            if (!foundItem) {
                setError(`Item '${itemId}' not found in menu`);
            } else if (!foundItem.hasAR) {
                setError(`Item '${foundItem.name}' does not support AR preview`);
            } else {
                setItem(foundItem);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load AR preview');
        } finally {
            setIsLoading(false);
        }
    }

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-white text-xl animate-pulse mb-2">Loading AR preview...</div>
                    <div className="text-white/60 text-sm">Preparing 3D model</div>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !item || !menuData) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
                <div className="bg-red-500/10 backdrop-blur-lg rounded-2xl p-8 border border-red-500/30 max-w-md">
                    <h1 className="text-2xl font-bold text-red-400 mb-4">AR Preview Error</h1>
                    <p className="text-white/80 mb-4">{error || 'Unknown error occurred'}</p>
                    <Link
                        href={`/r/${restaurantId}${table ? `?table=${table}` : ''}`}
                        className="inline-block bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                        Back to Menu
                    </Link>
                </div>
            </div>
        );
    }

    const { restaurant } = menuData;

    return (
        <>
            <Head>
                <title>AR Preview: {item.name} - {restaurant.name}</title>
                <meta name="description" content={`View ${item.name} in augmented reality`} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Header */}
                <div className="p-4">
                    <Link
                        href={`/r/${restaurantId}${table ? `?table=${table}` : ''}`}
                        className="inline-flex items-center text-white/80 hover:text-white transition-colors"
                    >
                        <span className="mr-2">←</span> Back to Menu
                    </Link>
                </div>

                {/* AR Preview Area */}
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* Item Info */}
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20 shadow-2xl">
                        <div className="flex items-start justify-between mb-4">
                            <div>
                                <h1 className="text-3xl font-bold text-white mb-2">{item.name}</h1>
                                {item.description && (
                                    <p className="text-white/70 text-sm mb-3">{item.description}</p>
                                )}
                                <div className="flex gap-3 flex-wrap text-sm">
                                    <div className="bg-purple-500/30 px-3 py-1.5 rounded-lg border border-purple-400/50">
                                        <span className="text-purple-200 font-semibold">Restaurant:</span>
                                        <span className="text-white ml-2">{restaurant.name}</span>
                                    </div>
                                    {table && (
                                        <div className="bg-blue-500/30 px-3 py-1.5 rounded-lg border border-blue-400/50">
                                            <span className="text-blue-200 font-semibold">Table:</span>
                                            <span className="text-white ml-2">{table}</span>
                                        </div>
                                    )}
                                    <div className="bg-green-500/30 px-3 py-1.5 rounded-lg border border-green-400/50">
                                        <span className="text-green-200 font-semibold">AR Ready</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold text-purple-400">
                                    {restaurant.currency === 'USD' && '$'}
                                    {restaurant.currency === 'KES' && 'KSh'}
                                    {item.price.toFixed(2)}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AR Placeholder (Camera will go here) */}
                    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 shadow-2xl">
                        <div className="aspect-[4/3] bg-slate-900/50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed border-white/20">
                            <div className="text-center mb-6">
                                <div className="text-6xl mb-4">📸</div>
                                <h2 className="text-2xl font-bold text-white mb-2">AR Camera Preview</h2>
                                <p className="text-white/60 text-sm mb-4">
                                    WebXR integration coming in next step
                                </p>
                            </div>

                            <div className="bg-white/10 rounded-lg p-6 max-w-md">
                                <h3 className="text-white font-semibold mb-3">Preview Info:</h3>
                                <div className="space-y-2 text-sm text-white/70">
                                    <p><span className="text-purple-400">Model Path:</span> {item.arModelUrl || 'N/A'}</p>
                                    <p><span className="text-purple-400">Item ID:</span> {item.id}</p>
                                    <p><span className="text-purple-400">Restaurant:</span> {restaurantId}</p>
                                    {table && <p><span className="text-purple-400">Table:</span> {table}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-white/40 text-xs">
                                ✅ Routing validated • ✅ Item data loaded • ✅ Context preserved
                            </p>
                        </div>
                    </div>

                    {/* Additional Item Details */}
                    {(item.tags && item.tags.length > 0) || item.calories ? (
                        <div className="mt-6 bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                            <div className="flex gap-6 text-sm">
                                {item.tags && item.tags.length > 0 && (
                                    <div>
                                        <span className="text-white/60">Tags:</span>
                                        <div className="flex gap-2 mt-1">
                                            {item.tags.map(tag => (
                                                <span key={tag} className="bg-white/10 text-white/80 px-2 py-1 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {item.calories && (
                                    <div>
                                        <span className="text-white/60">Calories:</span>
                                        <span className="text-white ml-2">{item.calories}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : null}
                </div>
            </div>
        </>
    );
}
