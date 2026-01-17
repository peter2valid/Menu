import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
    return (
        <>
            <Head>
                <title>QR Menu Platform</title>
                <meta name="description" content="QR-based restaurant menu platform" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
                <div className="max-w-2xl w-full">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
                        <h1 className="text-4xl font-bold text-white mb-4">QR Menu Platform</h1>
                        <p className="text-white/80 mb-6">
                            Scan a QR code at your table to view the restaurant menu.
                        </p>

                        <div className="space-y-4">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <h2 className="text-xl font-semibold text-white mb-2">Demo Links:</h2>
                                <div className="space-y-2">
                                    <Link
                                        href="/r/cafe-central?table=5"
                                        className="block bg-purple-500/30 hover:bg-purple-500/50 px-4 py-3 rounded-lg border border-purple-400/50 text-white transition-all"
                                    >
                                        → Cafe Central (Table 5)
                                    </Link>
                                    <Link
                                        href="/r/pizza-house?table=12"
                                        className="block bg-blue-500/30 hover:bg-blue-500/50 px-4 py-3 rounded-lg border border-blue-400/50 text-white transition-all"
                                    >
                                        → Pizza House (Table 12)
                                    </Link>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                <h3 className="text-sm font-semibold text-purple-300 mb-2">URL Format:</h3>
                                <code className="text-xs text-white/70 font-mono">
                                    /r/{'{'}restaurantId{'}'}{'}'}?table={'{'}tableId{'}'}
                                </code>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
