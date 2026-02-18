
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { TRUST_ITEMS } from '../constants';
import { useAdmin } from '../context/AdminContext';
import PaymentModal from '../components/PaymentModal';
import RepublicDayPoster from '../components/RepublicDayPoster';
import { IS_REPUBLIC_DAY_OFFER_ACTIVE, getDiscountedPrice } from '../utils';

import heroImage from '../images/main.png';

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

    // simplified selection logic
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
        <div className="min-h-screen bg-[#0A0A0B] text-white selection:bg-premium-gold/30">
            {/* Minimal Ambient Effect */}
            <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-96 bg-gradient-to-b from-premium-gold/10 to-transparent blur-[120px]"></div>
            </div>

            {/* Ultra-Simple Top Bar */}
            <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/95 py-4 border-b border-white/5 shadow-xl' : 'bg-transparent py-8'}`}>
                <div className="max-w-xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full border border-premium-gold/20 overflow-hidden">
                            <img src={heroImage} alt="Kanika" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-display italic text-lg text-gradient-gold">Kanika Chauhan</span>
                    </div>
                    {IS_REPUBLIC_DAY_OFFER_ACTIVE() && (
                        <div className="px-4 py-1.5 bg-gold-gradient rounded-full text-[9px] font-black text-black">
                            LIMITED OFFER
                        </div>
                    )}
                </div>
            </header>

            {/* Clean Hero */}
            <section className="relative pt-36 pb-12 px-6 z-10 text-center space-y-4">
                <h2 className="text-4xl xs:text-5xl font-display italic leading-tight">Official <span className="text-gradient-gold">Selection</span></h2>
                <p className="text-neutral-500 text-sm max-w-xs mx-auto font-medium">Choose your preferred experience from my official categories below.</p>
            </section>

            {/* High-Usability Category Nav */}
            <nav className="sticky top-[73px] z-40 bg-black/80 backdrop-blur-2xl py-6 border-y border-white/5">
                <div className="max-w-xl mx-auto flex items-center justify-center gap-4 px-6 overflow-x-auto hide-scrollbar">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex flex-col items-center gap-3 min-w-[70px] transition-all ${activeCategory === cat.id ? 'opacity-100 scale-105' : 'opacity-30 hover:opacity-50'}`}
                        >
                            <span className="text-2xl">{cat.icon}</span>
                            <span className={`text-[8px] font-black uppercase tracking-widest ${activeCategory === cat.id ? 'text-premium-gold' : 'text-white'}`}>{cat.label}</span>
                        </button>
                    ))}
                </div>
            </nav>

            {/* Clean, Easy Selection Feed */}
            <main className="relative z-10 max-w-xl mx-auto px-6 py-12 space-y-8">

                {getFilteredProducts().map((item, idx) => (
                    <div
                        key={`${item.id}-${idx}`}
                        className="group relative bg-[#0F0F11] rounded-[2.5rem] overflow-hidden border border-white/[0.05] transition-all duration-300 hover:border-premium-gold/30"
                    >
                        {/* Status Tags */}
                        <div className="absolute top-6 left-6 z-20 flex gap-2">
                            {item.isHot && <span className="bg-red-500 text-white text-[7px] font-black px-3 py-1.5 rounded-full shadow-lg">HOT</span>}
                            {item.isNew && <span className="bg-premium-gold text-black text-[7px] font-black px-3 py-1.5 rounded-full shadow-lg">NEW</span>}
                        </div>

                        <div className="flex flex-col">
                            {/* Visual Top */}
                            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-900">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        className={`w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105 ${item.blur ? 'blur-md opacity-60' : 'blur-[2px] opacity-70'}`}
                                        alt={item.title}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-10">⚜️</div>
                                )}
                                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#0F0F11] to-transparent"></div>
                            </div>

                            {/* Content Bottom */}
                            <div className="px-8 pb-8 pt-2 space-y-6">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="space-y-2">
                                        <h3 className="text-2xl font-display italic text-neutral-100">{item.title}</h3>
                                        <p className="text-neutral-500 text-[11px] font-medium leading-relaxed line-clamp-2">{item.description}</p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-2xl font-black text-gradient-gold">₹{getDiscountedPrice(item.price).toLocaleString()}</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handlePurchase(item)}
                                    className="w-full py-5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-gold-gradient transition-all active:scale-[0.98] shadow-2xl"
                                >
                                    Unlock Now 💎
                                </button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Simplified Trust Strip */}
                <div className="pt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 px-2">
                    {TRUST_ITEMS.slice(0, 4).map((t, i) => (
                        <div key={i} className="text-center space-y-2 py-4 border border-white/[0.03] rounded-[2rem] bg-white/[0.01]">
                            <span className="text-xl block">{t.icon}</span>
                            <p className="text-[7px] font-black text-neutral-600 uppercase tracking-widest leading-tight">{t.label}</p>
                        </div>
                    ))}
                </div>
            </main>

            {/* Clean Footer */}
            <footer className="mt-20 py-16 px-6 border-t border-white/5 bg-black/40 backdrop-blur-md text-center space-y-8">
                <h2 className="text-2xl font-display italic text-gradient-gold opacity-40">Kanika Chauhan</h2>
                <div className="flex items-center justify-center gap-6 text-[9px] font-black text-neutral-600 uppercase tracking-widest">
                    <button className="hover:text-premium-gold transition-colors">Privacy</button>
                    <button className="hover:text-premium-gold transition-colors">Digital Content</button>
                    <button className="hover:text-premium-gold transition-colors">Contact</button>
                </div>
                <p className="text-[7px] text-neutral-800 font-bold uppercase tracking-[0.4em]">© 2026 Privilege Group • Secure Access</p>
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
