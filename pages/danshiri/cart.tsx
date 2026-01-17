import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

export default function DanshiriCart() {
    const { items, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
    const [promoCode, setPromoCode] = useState('');
    const [removingId, setRemovingId] = useState<string | null>(null);

    const deliveryFee = 3.50;
    const subtotal = totalPrice;
    const total = subtotal + deliveryFee;

    const handleRemove = (id: string) => {
        setRemovingId(id);
        setTimeout(() => {
            removeItem(id);
            setRemovingId(null);
        }, 300);
    };

    if (items.length === 0) {
        return (
            <>
                <Head>
                    <title>Cart - Danshiri</title>
                </Head>
                <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-8xl mb-6 animate-bounce">🛒</div>
                        <h2 className="text-white text-3xl font-bold mb-4">Your cart is empty</h2>
                        <p className="text-white/60 mb-8">Add some delicious items to get started!</p>
                        <Link
                            href="/danshiri/menu"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:scale-105 transition-transform"
                        >
                            Browse Menu
                        </Link>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Head>
                <title>Cart - Danshiri</title>
            </Head>

            <div className="min-h-screen bg-[#0a0a0a]">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-lg border-b border-white/10">
                    <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
                        <Link href="/danshiri" className="text-2xl font-bold text-white hover:text-orange-400 transition-colors">
                            Danshiri
                        </Link>
                        <Link
                            href="/danshiri/menu"
                            className="text-white/60 hover:text-white transition-colors"
                        >
                            ← Back to Menu
                        </Link>
                    </div>
                </header>

                <div className="max-w-7xl mx-auto px-8 py-12">
                    <h1 className="text-white text-4xl font-bold mb-12">Shopping Cart</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Cart Items - Left Column */}
                        <div className="lg:col-span-2 space-y-4">
                            {items.map(item => (
                                <div
                                    key={item.id}
                                    className={`group bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-6 border border-white/10 hover:border-orange-500/50 transition-all duration-500 ${removingId === item.id ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                                        }`}
                                >
                                    <div className="flex gap-6">
                                        {/* Image */}
                                        <div className="relative w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                                            <Image
                                                src={item.image}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>

                                        {/* Details */}
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-4">
                                                <div>
                                                    <h3 className="text-white text-xl font-bold mb-1">{item.name}</h3>
                                                    <p className="text-white/40 text-sm">${item.price.toFixed(2)} each</p>
                                                </div>
                                                <button
                                                    onClick={() => handleRemove(item.id)}
                                                    className="text-white/40 hover:text-red-500 transition-colors"
                                                >
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                    </svg>
                                                </button>
                                            </div>

                                            {/* Quantity Controls */}
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-3 bg-white/5 rounded-lg p-2">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                                                        className="w-8 h-8 flex items-center justify-center text-white bg-white/10 rounded hover:bg-orange-500 transition-colors"
                                                    >
                                                        −
                                                    </button>
                                                    <span className="text-white font-semibold w-8 text-center">{item.quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 flex items-center justify-center text-white bg-white/10 rounded hover:bg-orange-500 transition-colors"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                <div className="text-2xl font-bold text-orange-400">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary - Right Column (Sticky) */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24 bg-gradient-to-br from-zinc-900 to-black rounded-3xl p-8 border border-white/10">
                                <h2 className="text-white text-2xl font-bold mb-6">Order Summary</h2>

                                {/* Promo Code */}
                                <div className="mb-6">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="Promo Code"
                                            value={promoCode}
                                            onChange={(e) => setPromoCode(e.target.value)}
                                            className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-orange-500"
                                        />
                                        <button className="px-6 py-3 bg-white/10 hover:bg-orange-500 text-white rounded-lg transition-colors">
                                            Apply
                                        </button>
                                    </div>
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-4 mb-6 pb-6 border-b border-white/10">
                                    <div className="flex justify-between text-white/60">
                                        <span>Subtotal</span>
                                        <span>${subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-white/60">
                                        <span>Delivery</span>
                                        <span>${deliveryFee.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Total */}
                                <div className="flex justify-between items-center mb-8">
                                    <span className="text-white text-xl font-bold">Total</span>
                                    <span className="text-orange-400 text-3xl   font-bold">${total.toFixed(2)}</span>
                                </div>

                                {/* Checkout Button */}
                                <button className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold rounded-xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 active:scale-95 mb-4">
                                    CHECKOUT
                                </button>

                                {/* Clear Cart */}
                                <button
                                    onClick={clearCart}
                                    className="w-full py-3 text-white/40 hover:text-red-500 transition-colors text-sm"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <style jsx>{`
          @keyframes slideOut {
            to {
              opacity: 0;
              transform: translateX(-100px);
            }
          }
        `}</style>
            </div>
        </>
    );
}
