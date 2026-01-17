
import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { TRUST_ITEMS } from '../constants';
import { useAdmin } from '../context/AdminContext';
import PaymentModal from '../components/PaymentModal';
import Notification from '../components/Notification';
import heroImage from '../images/mdoel.png';

const Home: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [scrolled, setScrolled] = useState(false);
    const newCollectionRef = useRef<HTMLDivElement>(null);

    // Get dynamic data from AdminContext
    const { mostUnlocked, newCollection, services, exclusives, vipServices } = useAdmin();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    const handlePurchase = (p: Product) => {
        setSelectedProduct(p);
    };

    const scrollNewCollection = (direction: 'left' | 'right') => {
        if (newCollectionRef.current) {
            const { current } = newCollectionRef;
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-black overflow-x-hidden select-none">
            {/* Global Notification */}
            <Notification />

            {/* Header */}
            <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md py-2 shadow-lg' : 'bg-transparent py-4'}`}>
                <div className="max-w-2xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-500 shadow-rose-500/20 shadow-lg">
                            <img src={heroImage} alt="Kanika Chauhan" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-white tracking-tight hidden xs:block">Kanika C.</span>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative h-[90vh] flex items-end justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={heroImage}
                        alt="Hero"
                        className="w-full h-full object-contain object-center brightness-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
                </div>

                <div className="relative z-10 w-full max-w-2xl px-6 pb-12 text-center space-y-6 animate-in fade-in slide-in-from-bottom duration-1000">
                    <div className="space-y-2">
                        <h1 className="text-4xl md:text-5xl font-display italic text-white leading-tight">
                            Hi, I’m <span className="text-rose-400">Kanika Chauhan</span>
                        </h1>
                        <p className="text-neutral-300 text-lg max-w-sm mx-auto font-light">
                            Welcome to my official app. Connect with me 1-on-1 and join my private fan club.
                        </p>
                        <p className="text-rose-400/80 text-sm italic">
                            "I post things here I don’t post anywhere else."
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => scrollToSection('services')}
                            className="py-4 bg-white text-black rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                        >
                            💬 Chat With Me
                        </button>
                        <button
                            onClick={() => scrollToSection('services')}
                            className="py-4 bg-neutral-800/80 backdrop-blur text-white rounded-2xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform border border-white/10"
                        >
                            📞 Book a Call
                        </button>
                    </div>
                </div>
            </section>

            <main className="max-w-2xl mx-auto space-y-16 py-12">

                {/* New Collection Slider */}
                <section className="space-y-6 relative group/slider px-0">
                    <div className="px-6 flex items-center justify-between">
                        <h2 className="text-2xl font-display text-white italic">✨ New Arrivals</h2>
                        <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold tracking-wider uppercase">Fresh</div>
                    </div>

                    <div className="relative">
                        {/* Left navigation arrow */}
                        <button
                            onClick={() => scrollNewCollection('left')}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg hover:bg-black/70 active:scale-90 transition-all opacity-0 group-hover/slider:opacity-100"
                            aria-label="Scroll left"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/* Right navigation arrow */}
                        <button
                            onClick={() => scrollNewCollection('right')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white border border-white/20 shadow-lg hover:bg-black/70 active:scale-90 transition-all opacity-0 group-hover/slider:opacity-100"
                            aria-label="Scroll right"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                            </svg>
                        </button>

                        <div
                            ref={newCollectionRef}
                            className="flex gap-4 overflow-x-auto px-6 pb-6 hide-scrollbar snap-x snap-mandatory scroll-smooth"
                        >
                            {newCollection.map((item) => (
                                <div key={item.id} className="min-w-[200px] sm:min-w-[240px] snap-center">
                                    <div className="relative aspect-[3/4.5] rounded-3xl overflow-hidden group border border-white/5 ring-1 ring-white/5 rose-glow">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover blur-sm brightness-75 transition-all group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>

                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                            <span className="text-3xl filter grayscale opacity-50">🔒</span>
                                        </div>

                                        <div className="absolute bottom-0 inset-x-0 p-4 space-y-3">
                                            <div className="space-y-0.5">
                                                <p className="text-white font-bold leading-tight">{item.title}</p>
                                                <p className="text-rose-400 font-bold">₹{item.price.toLocaleString()}</p>
                                            </div>
                                            <button
                                                onClick={() => handlePurchase(item)}
                                                className="w-full py-3 bg-white text-black text-sm font-black rounded-xl active:scale-95 transition-transform"
                                            >
                                                UNLOCK NOW
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Most Unlocked */}
                <section id="unlocked" className="space-y-6 px-6">
                    <h2 className="text-2xl font-display text-white italic">🔐 Most Unlocked</h2>
                    <div className="grid gap-4">
                        {mostUnlocked.map((item) => (
                            <div key={item.id} className="bg-neutral-900 rounded-3xl overflow-hidden flex ring-1 ring-white/5 gold-glow">
                                <div className="w-1/3 relative overflow-hidden">
                                    <img src={item.image} className="w-full h-full object-cover blur-sm scale-110" />
                                    <div className="absolute inset-0 flex items-center justify-center text-2xl">🔒</div>
                                </div>
                                <div className="w-2/3 p-5 flex flex-col justify-center space-y-2">
                                    <h3 className="text-lg font-bold text-white leading-tight">{item.title}</h3>
                                    <p className="text-xs text-neutral-500">{item.description}</p>
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-rose-400 font-bold">₹{item.price.toLocaleString()}</span>
                                        <button
                                            onClick={() => handlePurchase(item)}
                                            className="px-5 py-2 bg-rose-500 text-white text-xs font-bold rounded-full active:scale-95 transition-transform"
                                        >
                                            SUBSCRIBE NOW
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Exclusives Gallery */}
                <section className="space-y-6 px-6">
                    <h2 className="text-2xl font-display text-white italic">🖼️ Exclusives Gallery</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {exclusives.map((item) => (
                            <div key={item.id} className="relative aspect-square rounded-2xl overflow-hidden ring-1 ring-white/10 group">
                                <img src={item.image} className="w-full h-full object-cover blur-xl grayscale opacity-60" />
                                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
                                    <span className="text-2xl mb-1">🔒</span>
                                    <p className="text-xs font-bold text-white">{item.title}</p>
                                    <p className="text-[10px] text-neutral-400">{item.itemsCount}</p>
                                </div>
                                <button
                                    onClick={() => handlePurchase(item)}
                                    className="absolute bottom-2 inset-x-2 py-2 bg-white/10 backdrop-blur-md text-white text-[10px] font-bold rounded-lg border border-white/10 active:scale-95 transition-transform"
                                >
                                    UNLOCK ₹{item.price.toLocaleString()}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="space-y-6 px-6">
                    <h2 className="text-2xl font-display text-white italic">📞 My Services</h2>
                    <div className="bg-neutral-900 rounded-3xl overflow-hidden ring-1 ring-white/5">
                        <div className="divide-y divide-white/5">
                            {services.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-5 hover:bg-white/5 transition-colors">
                                    <div className="space-y-0.5">
                                        <p className="text-white font-medium">{item.title}</p>
                                        <p className="text-rose-400 font-bold">₹{item.price.toLocaleString()}</p>
                                    </div>
                                    <button
                                        onClick={() => handlePurchase(item)}
                                        className="px-6 py-2.5 bg-white text-black text-xs font-black rounded-xl active:scale-95 transition-transform"
                                    >
                                        BUY NOW
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* VIP Services section */}
                <section id="vip" className="space-y-6 px-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-display text-white italic">💎 VIP Services</h2>
                        <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[10px] font-bold tracking-wider uppercase rounded-full">Premium</span>
                    </div>
                    <div className="grid gap-4">
                        {vipServices.map((item) => (
                            <div key={item.id} className="relative group overflow-hidden bg-neutral-900 rounded-3xl ring-1 ring-white/10 hover:ring-rose-500/30 transition-all">
                                <div className="p-6 flex flex-col justify-center gap-1">
                                    <h3 className="text-white font-bold">{item.title}</h3>
                                    <p className="text-xs text-neutral-500">{item.description}</p>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-rose-400 font-bold text-sm">₹{item.price.toLocaleString()}</span>
                                        <button
                                            onClick={() => handlePurchase(item)}
                                            className="px-6 py-2 bg-white text-black text-xs font-black rounded-xl active:scale-95 transition-transform"
                                        >
                                            BOOK NOW
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Trust & Safety */}
                <section className="px-6 pb-12">
                    <div className="bg-rose-500/5 rounded-3xl p-8 ring-1 ring-rose-500/10 space-y-8 text-center">
                        <div className="space-y-2">
                            <h3 className="text-xl font-display italic text-rose-400">Trust & Safety</h3>
                            <p className="text-sm text-neutral-400">Your privacy is my top priority. Every transaction is 100% secure.</p>
                        </div>

                        <div className="grid grid-cols-2 xs:grid-cols-3 gap-6">
                            {TRUST_ITEMS.map((item, idx) => (
                                <div key={idx} className="space-y-2 flex flex-col items-center">
                                    <span className="text-2xl">{item.icon}</span>
                                    <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-widest">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <p className="text-xs text-neutral-500 italic">
                            “Connect with me directly. No middlemen, no fake profiles.”
                        </p>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-neutral-950 border-t border-white/5 py-12 px-6 text-center space-y-4">
                <p className="text-2xl font-display italic text-white">Kanika Chauhan</p>
                <p className="text-neutral-500 text-xs">© 2024 All Rights Reserved. Official App powered by CreatorClub.</p>
                <div className="flex items-center justify-center gap-4 text-[10px] font-bold text-neutral-600 uppercase tracking-widest">
                    <button>Terms</button>
                    <span>•</span>
                    <button>Privacy</button>
                    <span>•</span>
                    <button>Contact</button>
                </div>
            </footer>

            {/* Payment Modal */}
            <PaymentModal
                product={selectedProduct}
                onClose={() => setSelectedProduct(null)}
            />
        </div>
    );
};

export default Home;
