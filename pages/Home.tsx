import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { TRUST_ITEMS } from '../constants';
import { useAdmin } from '../context/AdminContext';
import PaymentModal from '../components/PaymentModal';
import RepublicDayPoster from '../components/RepublicDayPoster';
import { IS_REPUBLIC_DAY_OFFER_ACTIVE, getDiscountedPrice } from '../utils';

type CategoryType = 'new' | 'calls' | 'vip' | 'archives';

const Home: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const [activeCategory, setActiveCategory] = useState<CategoryType>('new');

    const { mostUnlocked, newCollection, services, exclusives, vipServices } = useAdmin();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handlePurchase = (p: Product) => {
        setSelectedProduct(p);
    };

    const getFilteredProducts = () => {
        switch (activeCategory) {
            case 'new': return newCollection;
            case 'calls': return services;
            case 'vip': return vipServices;
            case 'archives': return [...exclusives, ...mostUnlocked];
            default: return newCollection;
        }
    };

    const categories: { id: CategoryType; label: string; icon: string }[] = [
        { id: 'new', label: "What's New", icon: '✨' },
        { id: 'calls', label: 'Video Calls', icon: '📹' },
        { id: 'vip', label: 'VIP Club', icon: '👑' },
        { id: 'archives', label: 'The Vault', icon: '💎' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-500/30">
            {/* Minimal Ambient Effect */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[500px] bg-gradient-to-b from-teal-500/10 via-purple-500/5 to-transparent blur-[120px]"></div>
            </div>

            {/* Ultra-Simple Top Bar */}
            <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 py-4 border-b border-black/5 shadow-sm backdrop-blur-md' : 'bg-transparent py-8'}`}>
                <div className="max-w-xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-teal-500/20 bg-gradient-to-tr from-teal-500 to-purple-500 flex items-center justify-center shadow-lg">
                            <span className="text-white font-bold text-xs font-display">KC</span>
                        </div>
                        <span className="font-display italic text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-purple-600">Kanika Chauhan</span>
                    </div>
                    {IS_REPUBLIC_DAY_OFFER_ACTIVE() && (
                        <div className="px-4 py-1.5 bg-gradient-to-r from-teal-500 to-purple-500 rounded-full text-[9px] font-black text-white shadow-md shadow-teal-500/20">
                            LIMITED OFFER
                        </div>
                    )}
                </div>
            </header>

            {/* Clean Hero */}
            <section className="relative pt-36 pb-12 px-6 z-10 text-center space-y-4">
                <h2 className="text-4xl xs:text-5xl font-display italic leading-tight text-slate-800">Premium <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-500 to-purple-500">Selection</span></h2>
                <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium">Choose your personal experience. Fast, private, and unforgettable.</p>
            </section>

            {/* High-Usability Category Nav */}
            <nav className="sticky top-[73px] z-40 bg-white/90 backdrop-blur-2xl py-6 border-y border-black/5 shadow-sm">
                <div className="max-w-xl mx-auto flex items-center justify-center gap-4 px-6 overflow-x-auto hide-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex flex-col items-center gap-3 min-w-[70px] transition-all ${activeCategory === cat.id ? 'opacity-100 scale-105' : 'opacity-50 hover:opacity-80'}`}
                        >
                            <span className="text-2xl">{cat.icon}</span>
                            <span className={`text-[9px] font-bold uppercase tracking-widest ${activeCategory === cat.id ? 'text-teal-600' : 'text-slate-500'}`}>{cat.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Clean, Easy Selection Feed without images */}
            <main className="relative z-10 max-w-xl mx-auto px-6 py-12 space-y-8">
                {getFilteredProducts().map((item, idx) => (
                    <div
                        key={`${item.id}-${idx}`}
                        className="group relative bg-white rounded-[2rem] overflow-hidden border border-slate-200 transition-all duration-300 hover:border-teal-400 shadow-md hover:shadow-xl hover:-translate-y-1"
                    >
                        {/* Status Tags */}
                        <div className="absolute top-6 left-6 z-20 flex gap-2">
                            {item.isHot && <span className="bg-red-500 text-white text-[8px] font-black px-3 py-1.5 rounded-full shadow-md">HOT</span>}
                            {item.isNew && <span className="bg-teal-500 text-white text-[8px] font-black px-3 py-1.5 rounded-full shadow-md">NEW</span>}
                        </div>

                        {/* Text Only Content block */}
                        <div className="p-8 pt-16 space-y-6">
                            {/* Header Info */}
                            <div className="space-y-4">
                                <h3 className="text-2xl font-display font-medium italic text-slate-800 tracking-tight leading-snug">{item.title}</h3>

                                <p className="text-slate-600 text-sm font-medium leading-relaxed italic border-l-4 border-purple-400 pl-4 py-1 bg-slate-50 rounded-r-xl shadow-inner">
                                    "{item.description}"
                                </p>
                            </div>

                            {/* Tags / Meta Info */}
                            <div className="flex flex-wrap items-center gap-3">
                                {item.timing && (
                                    <div className="flex items-center gap-1.5 bg-teal-50 text-teal-700 px-3 py-1.5 rounded-xl text-xs font-bold border border-teal-100">
                                        ⏱️ {item.timing}
                                    </div>
                                )}
                                {item.ordersPerWeek && (
                                    <div className="flex items-center gap-1.5 bg-red-50 text-red-600 px-3 py-1.5 rounded-xl text-xs font-bold border border-red-100">
                                        🔥 {item.ordersPerWeek} orders this week
                                    </div>
                                )}
                            </div>

                            {/* Price & Action */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                                <div className="text-left">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Access Rate</p>
                                    <p className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-purple-600">
                                        ₹{getDiscountedPrice(item.price).toLocaleString()}
                                    </p>
                                </div>

                                <button
                                    onClick={() => handlePurchase(item)}
                                    className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-teal-500 to-purple-600 text-white text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-105 active:scale-[0.98] transition-all shadow-lg hover:shadow-teal-500/30"
                                >
                                    Get Access ⚡
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Simplified Trust Strip */}
                <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 px-2">
                    {TRUST_ITEMS.slice(0, 4).map((t, i) => (
                        <div key={i} className="text-center space-y-2 py-4 border border-slate-200 rounded-[2rem] bg-white shadow-sm">
                            <span className="text-xl block">{t.icon}</span>
                            <p className="text-[7px] font-black text-slate-500 uppercase tracking-widest leading-tight">{t.label}</p>
                        </div>
                    ))}
                </div>
            </main>

            {/* Clean Footer */}
            <footer className="mt-20 py-16 px-6 border-t border-slate-200 bg-white/40 backdrop-blur-md text-center space-y-8">
                <h2 className="text-2xl font-display italic font-bold text-slate-300">Kanika Chauhan</h2>
                <div className="flex items-center justify-center gap-6 text-[9px] font-black text-slate-500 uppercase tracking-widest">
                    <button className="hover:text-teal-500 transition-colors">Privacy</button>
                    <button className="hover:text-teal-500 transition-colors">Digital Content</button>
                    <button className="hover:text-teal-500 transition-colors">Contact</button>
                </div>
                <p className="text-[7px] text-slate-400 font-bold uppercase tracking-[0.4em]">© 2026 Privilege Group • Secure Access</p>
            </footer>

            {/* Modals */}
            <PaymentModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
            <RepublicDayPoster />
        </div>
    );
};

export default Home;
