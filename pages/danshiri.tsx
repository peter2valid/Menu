import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';

export default function DanshiriHome() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <>
            <Head>
                <title>Danshiri - Fresh Food Delivered</title>
                <meta name="description" content="The best fresh food delivered straight to your door" />
            </Head>

            <div className="min-h-screen bg-[#1a1a1a] overflow-hidden relative">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-neutral-900 to-black opacity-90" />

                {/* Floating Food Animation - Hero */}
                <div className="absolute top-20 right-1/4 animate-float">
                    <div className="w-96 h-96 relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-green-500/20 rounded-full blur-3xl" />
                    </div>
                </div>

                {/* Main Content Container */}
                <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
                    <div className="grid grid-cols-2 gap-12 items-center min-h-screen">
                        {/* Left Column - Branding & CTA */}
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <h1 className="text-8xl font-bold text-white tracking-tight">
                                    Danshiri
                                </h1>
                                <p className="text-xl text-gray-300 max-w-md">
                                    The Best Fresh Food delivered straight to your door
                                </p>
                            </div>

                            <button
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                className="group relative px-12 py-5 bg-white text-black text-lg font-semibold rounded-full overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-orange-500/50"
                            >
                                <span className="relative z-10">Get Started</span>
                                <div className={`absolute inset-0 bg-gradient-to-r from-orange-500 to-red-500 transition-transform duration-500 ${isHovered ? 'scale-100' : 'scale-0'}`} />
                            </button>

                            {/* Floating decorative elements */}
                            <div className="flex gap-6 mt-12">
                                <div className="animate-bounce-slow">
                                    <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl rotate-12 opacity-80" />
                                </div>
                                <div className="animate-bounce-delayed">
                                    <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl -rotate-6 opacity-80" />
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Animated Food Display */}
                        <div className="relative h-[600px]">
                            {/* Floating Food with Chopsticks Animation */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="relative w-full h-full">
                                    {/* Background Plate Circle */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full shadow-2xl blur-sm opacity-50" />

                                    {/* Animated Food Items */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-float-gentle">
                                        <div className="relative w-80 h-80">
                                            {/* Food Emojis as placeholders - replace with actual images */}
                                            <div className="absolute top-0 left-1/4 text-6xl animate-spin-slow">🍤</div>
                                            <div className="absolute top-1/4 right-1/4 text-6xl animate-bounce-gentle delay-100">🥕</div>
                                            <div className="absolute bottom-1/4 left-1/3 text-6xl animate-float delay-200">🥦</div>
                                            <div className="absolute bottom-1/3 right-1/3 text-5xl animate-pulse delay-300">🌶️</div>
                                        </div>
                                    </div>

                                    {/* Chopsticks Animation */}
                                    <div className="absolute top-1/3 left-1/3 animate-chopstick-left">
                                        <div className="w-2 h-48 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full rotate-45 shadow-lg" />
                                    </div>
                                    <div className="absolute top-1/3 right-1/3 animate-chopstick-right">
                                        <div className="w-2 h-48 bg-gradient-to-b from-amber-700 to-amber-900 rounded-full -rotate-45 shadow-lg" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Navigation Hint */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="text-white/40 text-sm">Scroll to explore menu</div>
                    <div className="text-4xl text-center mt-2">↓</div>
                </div>

                <style jsx>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }
          
          @keyframes float-gentle {
            0%, 100% { transform: translate(-50%, -50%) translateY(0px) rotate(0deg); }
            50% { transform: translate(-50%, -50%) translateY(-15px) rotate(5deg); }
          }

          @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }

          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes chopstick-left {
            0%, 100% { transform: rotate(45deg) translateX(0); }
            50% { transform: rotate(50deg) translateX(-10px); }
          }

          @keyframes chopstick-right {
            0%, 100% { transform: rotate(-45deg) translateX(0); }
            50% { transform: rotate(-50deg) translateX(10px); }
          }

          @keyframes bounce-slow {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          .animate-float-gentle {
            animation: float-gentle 8s ease-in-out infinite;
          }

          .animate-bounce-gentle {
            animation: bounce-gentle 4s ease-in-out infinite;
          }

          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }

          .animate-chopstick-left {
            animation: chopstick-left 3s ease-in-out infinite;
          }

          .animate-chopstick-right {
            animation: chopstick-right 3s ease-in-out infinite 0.5s;
          }

          .animate-bounce-slow {
            animation: bounce-slow 3s ease-in-out infinite;
          }

          .animate-bounce-delayed {
            animation: bounce-slow 3s ease-in-out infinite 1s;
          }

          .delay-100 {
            animation-delay: 0.1s;
          }

          .delay-200 {
            animation-delay: 0.2s;
          }

          .delay-300 {
            animation-delay: 0.3s;
          }
        `}</style>
            </div>
        </>
    );
}
