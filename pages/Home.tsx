
import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { TRUST_ITEMS } from '../constants';
import { useAdmin } from '../context/AdminContext';
import PaymentModal from '../components/PaymentModal';
import Notification from '../components/Notification';
import heroImage from '../images/main.png';

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

    const handleLeakClick = (index: number) => {
        const photos = Math.floor(Math.random() * 10) + 13; // 13+ photos
        const videos = Math.floor(Math.random() * 4) + 1;  // 1-4 videos

        const membershipProduct: Product = {
            id: `leak-membership-${index}`,
            title: `Unlock Leak #${index + 1}`,
            price: 789,
            image: '', // Modal will use default icon
            category: 'subscription',
            description: `This leak contains ${photos} private photos and ${videos} exclusive videos. Subscribe to my Full Membership to unlock ALL hidden leaks and personal posts instantly! 🔓🫦`
        };
        setSelectedProduct(membershipProduct);
    };

    const scrollNewCollection = (direction: 'left' | 'right') => {
        if (newCollectionRef.current) {
            const { current } = newCollectionRef;
            const scrollAmount = direction === 'left' ? -300 : 300;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-[#FFF5F7] overflow-x-hidden select-none relative">
            {/* Decorative background elements */}
            <div className="fixed top-20 -left-20 w-80 h-80 bg-rose-200/30 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="fixed bottom-40 -right-20 w-96 h-96 bg-amber-100/30 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Global Notification */}
            <Notification />

            {/* Header */}
            <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-2 shadow-sm' : 'bg-transparent py-4'}`}>
                <div className="max-w-2xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-500 shadow-rose-500/20 shadow-lg">
                            <img src={heroImage} alt="Kanika Chauhan" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-neutral-900 tracking-tight hidden xs:block">Kanika C.</span>
                    </div>
                </div>
            </header>

            {/* Hero Section - Redesigned for Professionalism */}
            <section className="relative pt-24 pb-12 flex flex-col items-center justify-center overflow-hidden bg-white">
                {/* Text Content - Separate from Image */}
                <div className="w-full max-w-2xl px-6 text-center space-y-8 mb-12 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-100 text-rose-500 text-[10px] font-black uppercase tracking-[0.2em]">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                            </span>
                            Official Personal App
                        </div>

                        <h1 className="text-5xl md:text-7xl font-display italic text-neutral-900 leading-tight">
                            Kanika <span className="text-rose-500">Chauhan</span>
                        </h1>

                        <p className="text-neutral-500 text-lg md:text-xl max-w-lg mx-auto font-medium leading-relaxed">
                            Welcome to my private digital space. Connect with me directly for 1-on-1 experiences and exclusive daily updates.
                        </p>

                        <div className="inline-block px-6 py-2 bg-rose-500/5 rounded-full border border-rose-100">
                            <p className="text-rose-500 font-bold italic text-sm">
                                "I post things here I don’t post anywhere else."
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                        <button
                            onClick={() => scrollToSection('services')}
                            className="py-4 bg-neutral-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-neutral-200"
                        >
                            💬 CHAT ME
                        </button>
                        <button
                            onClick={() => scrollToSection('services')}
                            className="py-4 bg-rose-500 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-rose-200"
                        >
                            📞 BOOK CALL
                        </button>
                    </div>
                </div>

                {/* Main Hero Image - Clean & Professional (No Text Overlay) */}
                <div className="w-full max-w-2xl px-4 animate-in fade-in zoom-in duration-1000 delay-300">
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl shadow-rose-200/50 border-8 border-white ring-1 ring-rose-100">
                        <img
                            src={heroImage}
                            alt="Kanika Chauhan"
                            className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-1000"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
                    </div>
                </div>
            </section>

            <main className="max-w-2xl mx-auto space-y-16 py-12">

                {/* New Collection Slider */}
                <section className="space-y-6 relative group/slider px-0">
                    <div className="px-6 flex items-center justify-between">
                        <h2 className="text-2xl font-display text-neutral-900 italic">✨ New Arrivals</h2>
                        <div className="px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-bold tracking-wider uppercase">Fresh</div>
                    </div>

                    <div className="relative">
                        {/* Left navigation arrow */}
                        <button
                            onClick={() => scrollNewCollection('left')}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-500 border border-rose-100 shadow-lg hover:bg-white active:scale-90 transition-all opacity-0 group-hover/slider:opacity-100"
                            aria-label="Scroll left"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                            </svg>
                        </button>

                        {/* Right navigation arrow */}
                        <button
                            onClick={() => scrollNewCollection('right')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white/70 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-500 border border-rose-100 shadow-lg hover:bg-white active:scale-90 transition-all opacity-0 group-hover/slider:opacity-100"
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
                                    <div className="relative aspect-[3/4.5] rounded-3xl overflow-hidden group border border-rose-100 ring-1 ring-rose-100 shadow-xl shadow-rose-200/20">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover blur-[2px] brightness-105 transition-all group-hover:scale-105" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent"></div>

                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                            <span className="text-3xl filter grayscale opacity-50">🔒</span>
                                        </div>

                                        <div className="absolute bottom-0 inset-x-0 p-4 space-y-3">
                                            <div className="space-y-0.5">
                                                <p className="text-neutral-900 font-bold leading-tight">{item.title}</p>
                                                <p className="text-rose-500 font-bold">₹{item.price.toLocaleString()}</p>
                                            </div>
                                            <button
                                                onClick={() => handlePurchase(item)}
                                                className="w-full py-3 bg-rose-500 text-white text-sm font-black rounded-xl active:scale-95 transition-transform shadow-lg shadow-rose-500/20"
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
                    <h2 className="text-2xl font-display text-neutral-900 italic">🔐 Most Unlocked</h2>
                    <div className="grid gap-4">
                        {mostUnlocked.map((item) => (
                            <div key={item.id} className="bg-white rounded-3xl overflow-hidden flex border border-rose-100 shadow-xl shadow-rose-200/20">
                                <div className="w-1/3 relative overflow-hidden bg-rose-50">
                                    <img src={item.image} className="w-full h-full object-cover blur-[2px] opacity-90 scale-110" />
                                    <div className="absolute inset-0 flex items-center justify-center text-2xl drop-shadow-md">🔒</div>
                                </div>
                                <div className="w-2/3 p-5 flex flex-col justify-center space-y-2">
                                    <h3 className="text-lg font-bold text-neutral-900 leading-tight">{item.title}</h3>
                                    <p className="text-xs text-neutral-500">{item.description}</p>
                                    <div className="flex items-center justify-between pt-2">
                                        <span className="text-rose-600 font-bold">₹{item.price.toLocaleString()}</span>
                                        <button
                                            onClick={() => handlePurchase(item)}
                                            className="px-5 py-2 bg-rose-500 text-white text-xs font-bold rounded-full active:scale-95 transition-all shadow-lg shadow-rose-500/30 hover:bg-rose-600"
                                        >
                                            SUBSCRIBE
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Exclusives Gallery */}
                <section className="space-y-6 px-6">
                    <h2 className="text-2xl font-display text-neutral-900 italic">🖼️ Exclusives Gallery</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {exclusives.map((item) => (
                            <div key={item.id} className="relative aspect-square rounded-2xl overflow-hidden border border-rose-100 shadow-md group">
                                <img src={item.image} className="w-full h-full object-cover blur-md grayscale-[50%] opacity-80" />
                                <div className="absolute inset-0 bg-white/40 flex flex-col items-center justify-center text-center p-4">
                                    <span className="text-2xl mb-1 drop-shadow-md">🔒</span>
                                    <p className="text-xs font-bold text-neutral-900">{item.title}</p>
                                    <p className="text-[10px] text-neutral-600 font-medium">{item.itemsCount}</p>
                                </div>
                                <button
                                    onClick={() => handlePurchase(item)}
                                    className="absolute bottom-2 inset-x-2 py-2 bg-white/80 backdrop-blur-md text-rose-600 text-[10px] font-black rounded-lg border border-rose-200 active:scale-95 transition-transform shadow-sm"
                                >
                                    UNLOCK ₹{item.price.toLocaleString()}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="space-y-6 px-6">
                    <h2 className="text-2xl font-display text-neutral-900 italic">📞 My Services</h2>
                    <div className="bg-white rounded-3xl overflow-hidden border border-rose-100 shadow-xl shadow-rose-200/20">
                        <div className="divide-y divide-rose-50">
                            {services.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-5 hover:bg-rose-50/50 transition-colors">
                                    <div className="space-y-0.5">
                                        <p className="text-neutral-900 font-semibold">{item.title}</p>
                                        <p className="text-rose-500 font-bold">₹{item.price.toLocaleString()}</p>
                                    </div>
                                    <button
                                        onClick={() => handlePurchase(item)}
                                        className="px-6 py-2.5 bg-rose-500 text-white text-xs font-black rounded-xl active:scale-95 transition-transform shadow-md shadow-rose-200 hover:bg-rose-600"
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
                        <h2 className="text-2xl font-display text-neutral-900 italic">💎 VIP Services</h2>
                        <span className="px-3 py-1 bg-amber-100 border border-amber-200 text-amber-600 text-[10px] font-bold tracking-wider uppercase rounded-full shadow-sm">Premium</span>
                    </div>
                    <div className="grid gap-4">
                        {vipServices.map((item) => (
                            <div key={item.id} className="relative group overflow-hidden bg-white rounded-3xl border border-rose-100 hover:border-amber-300 hover:shadow-xl hover:shadow-rose-200/30 transition-all shadow-lg shadow-rose-100/10">
                                <div className="p-6 flex flex-col justify-center gap-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-amber-500 text-sm">👑</span>
                                        <h3 className="text-neutral-900 font-bold">{item.title}</h3>
                                    </div>
                                    <p className="text-xs text-neutral-500 font-medium">{item.description}</p>
                                    <div className="flex items-center justify-between mt-4">
                                        <span className="text-rose-600 font-black text-lg">₹{item.price.toLocaleString()}</span>
                                        <button
                                            onClick={() => handlePurchase(item)}
                                            className="px-8 py-2.5 bg-neutral-900 text-white text-xs font-black rounded-xl active:scale-95 transition-transform shadow-lg shadow-neutral-400"
                                        >
                                            RESERVE NOW
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Secret Stories Section - Much More */}
                <section className="px-6 space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="h-0.5 flex-grow bg-rose-100"></div>
                        <h2 className="text-xl font-display italic text-rose-500">Secret Files</h2>
                        <div className="h-0.5 flex-grow bg-rose-100"></div>
                    </div>
                    <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-3 max-h-[500px] overflow-y-auto px-1 py-1 hide-scrollbar">
                        {Array.from({ length: 73 }).map((_, i) => (
                            <div key={i} className="aspect-[2/3] rounded-2xl bg-white border border-rose-50 shadow-sm flex flex-col items-center justify-center p-2 text-center space-y-2 opacity-60 hover:opacity-100 transition-all hover:scale-105 grayscale hover:grayscale-0 cursor-pointer group" onClick={() => handleLeakClick(i)}>
                                <span className="text-xl group-hover:scale-125 transition-transform duration-500">
                                    {i % 4 === 0 ? '🍑' : i % 4 === 1 ? '🍒' : i % 4 === 2 ? '🔒' : '🔞'}
                                </span>
                                <p className="text-[8px] font-black text-rose-300 uppercase tracking-tighter">Leak #{i + 1}</p>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-[10px] font-black text-rose-400/60 uppercase tracking-widest mt-2 animate-pulse">
                        Scroll to see all 70+ hidden leaks
                    </p>
                </section>

                {/* Trust & Safety */}
                <section className="px-6 pb-12">
                    <div className="bg-white rounded-3xl p-8 border border-rose-100 shadow-2xl shadow-rose-200/20 space-y-8 text-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">✨</div>
                        <div className="space-y-2">
                            <h3 className="text-xl font-display italic text-rose-500">Trust & Safety</h3>
                            <p className="text-sm text-neutral-500">Your privacy is my top priority. Every transaction is 100% secure.</p>
                        </div>

                        <div className="grid grid-cols-2 xs:grid-cols-3 gap-6">
                            {TRUST_ITEMS.map((item, idx) => (
                                <div key={idx} className="space-y-2 flex flex-col items-center">
                                    <span className="text-2xl drop-shadow-sm">{item.icon}</span>
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{item.label}</span>
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
            <footer className="bg-white border-t border-rose-50 py-12 px-6 text-center space-y-4">
                <p className="text-2xl font-display italic text-neutral-900">Kanika Chauhan</p>
                <p className="text-neutral-400 text-xs font-medium">© 2026 All Rights Reserved. Official App powered by CreatorClub.</p>
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
