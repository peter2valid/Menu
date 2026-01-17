import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

const menuItems = [
    {
        id: 'seafood-salad',
        name: 'Seafood Salad',
        description: 'Fresh seafood salad with lettuce green mix, vegetable tomatoes, herbs and olive oil, tasty healthy food.',
        price: 12.00,
        image: '/brain/b17b0ec9-545d-4bf0-a80f-001eecd4779b/seafood_salad_hero_1768587520429.png',
        category: 'Salads',
        rating: 4.5,
        calories: 100,
        prepTime: '8-10 Min',
    },
    {
        id: 'ramen-bowl',
        name: 'Tonkotsu Ramen',
        description: 'Rich pork broth ramen with chashu, soft egg, and fresh noodles',
        price: 14.50,
        image: '/brain/b17b0ec9-545d-4bf0-a80f-001eecd4779b/asian_noodles_bowl_1768587540491.png',
        category: 'Noodles',
        rating: 4.8,
        calories: 520,
        prepTime: '12-15 Min',
    },
    {
        id: 'sushi-platter',
        name: 'Premium Sushi Platter',
        description: 'Assorted nigiri and maki rolls with fresh fish and vegetables',
        price: 24.00,
        image: '/brain/b17b0ec9-545d-4bf0-a80f-001eecd4779b/sushi_platter_1768587560222.png',
        category: 'Sushi',
        rating: 4.9,
        calories: 350,
        prepTime: '15-20 Min',
    },
    {
        id: 'poke-bowl',
        name: 'Tuna Poke Bowl',
        description: 'Hawaiian-style poke with fresh tuna, avocado, and edamame',
        price: 16.00,
        image: '/brain/b17b0ec9-545d-4bf0-a80f-001eecd4779b/poke_bowl_1768587597265.png',
        category: 'Bowls',
        rating: 4.7,
        calories: 420,
        prepTime: '10-12 Min',
    },
    {
        id: 'pad-thai',
        name: 'Pad Thai',
        description: 'Traditional Thai rice noodles with shrimp, peanuts, and lime',
        price: 13.00,
        image: '/brain/b17b0ec9-545d-4bf0-a80f-001eecd4779b/pad_thai_1768587616191.png',
        category: 'Noodles',
        rating: 4.6,
        calories: 480,
        prepTime: '10-15 Min',
    },
    {
        id: 'spring-rolls',
        name: 'Vietnamese Spring Rolls',
        description: 'Fresh rice paper rolls with shrimp, vegetables, and peanut sauce',
        price: 9.50,
        image: '/brain/b17b0ec9-545d-4bf0-a80f-001eecd4779b/spring_rolls_1768587636292.png',
        category: 'Appetizers',
        rating: 4.4,
        calories: 180,
        prepTime: '5-8 Min',
    },
];

export default function DanshiriMenu() {
    const { items: cartItems, addItem, totalItems, totalPrice } = useCart();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const categories = ['All', 'Salads', 'Noodles', 'Sushi', 'Bowls', 'Appetizers'];
    const filteredItems = selectedCategory === 'All'
        ? menuItems
        : menuItems.filter(item => item.category === selectedCategory);

    const handleAddToCart = (item: typeof menuItems[0]) => {
        addItem({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
        });
    };

    return (
        <>
            <Head>
                <title>Menu - Danshiri</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="min-h-screen bg-[#0a0a0a]">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                        <Link href="/danshiri" className="text-2xl font-bold text-white hover:text-orange-400 transition-colors">
                            Danshiri
                        </Link>

                        <Link
                            href="/danshiri/cart"
                            className="relative group px-6 py-3 bg-white/10 hover:bg-orange-500 text-white rounded-full transition-all duration-300 hover:scale-105"
                        >
                            <span className="flex items-center gap-2">
                                🛒 Cart
                                {totalItems > 0 && (
                                    <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full text-xs flex items-center justify-center animate-bounce">
                                        {totalItems}
                                    </span>
                                )}
                            </span>
                        </Link>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-8 py-12">
                    {/* Category Filter */}
                    <div className="mb-12">
                        <h2 className="text-white text-2xl font-bold mb-6">Our Menu</h2>
                        <div className="flex gap-4 overflow-x-auto pb-4">
                            {categories.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 ${selectedCategory === cat
                                            ? 'bg-orange-500 text-white scale-105'
                                            : 'bg-white/10 text-white/60 hover:bg-white/20 hover:text-white'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Menu Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredItems.map((item, index) => (
                            <div
                                key={item.id}
                                onMouseEnter={() => setHoveredItem(item.id)}
                                onMouseLeave={() => setHoveredItem(null)}
                                className="group relative bg-gradient-to-br from-zinc-900 to-black rounded-3xl overflow-hidden border border-white/10 hover:border-orange-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/20"
                                style={{
                                    animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`
                                }}
                            >
                                {/* Image Container */}
                                <div className="relative h-64 overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />

                                    {/* Floating Badge */}
                                    <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                                        ★ {item.rating}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <h3 className="text-white text-xl font-bold mb-1 group-hover:text-orange-400 transition-colors">
                                                {item.name}
                                            </h3>
                                            <p className="text-white/40 text-sm">{item.category}</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-orange-400">${item.price.toFixed(2)}</div>
                                        </div>
                                    </div>

                                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                                        {item.description}
                                    </p>

                                    {/* Meta Info */}
                                    <div className="flex gap-4 text-xs text-white/40 mb-4">
                                        <span>🔥 {item.calories} kcal</span>
                                        <span>⏱️ {item.prepTime}</span>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => handleAddToCart(item)}
                                        className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
                                    >
                                        Add to Cart
                                    </button>
                                </div>

                                {/* Hover Glow Effect */}
                                {hoveredItem === item.id && (
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
            </div>
        </>
    );
}
