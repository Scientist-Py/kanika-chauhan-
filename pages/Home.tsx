
import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { TRUST_ITEMS } from '../constants';
import { useAdmin } from '../context/AdminContext';
import PaymentModal from '../components/PaymentModal';
import RepublicDayPoster from '../components/RepublicDayPoster';
import { IS_REPUBLIC_DAY_OFFER_ACTIVE, getDiscountedPrice, getDiscountPercentage } from '../utils';

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
            {/* Decorative background elements - enhanced */}
            <div className="fixed top-20 -left-20 w-80 h-80 bg-rose-200/40 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
            <div className="fixed bottom-40 -right-20 w-96 h-96 bg-amber-100/40 rounded-full blur-[120px] pointer-events-none animate-pulse delay-700"></div>
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(255,245,247,0.5)_0%,rgba(255,255,255,0)_70%)] pointer-events-none"></div>

            {/* Header */}
            <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 backdrop-blur-md py-2 shadow-sm' : 'bg-transparent py-4'}`}>
                <div className="max-w-2xl mx-auto px-4 flex items-center justify-between">
                    <div className="flex items-center gap-2" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-rose-50 shadow-rose-50/20 shadow-lg">
                            <img src={heroImage} alt="Kanika Chauhan" className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-neutral-900 tracking-tight hidden xs:block">Kanika C.</span>
                            {IS_REPUBLIC_DAY_OFFER_ACTIVE() && (
                                <span className="text-[8px] font-black text-orange-500 uppercase tracking-widest hidden xs:block">
                                    🇮🇳 Republic Day Offer
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Section - Redesigned for Professionalism */}
            <section className="relative pt-24 pb-12 flex flex-col items-center justify-center overflow-hidden bg-white">
                {/* Text Content - Separate from Image */}
                <div className="w-full max-w-2xl px-6 text-center space-y-6 mb-8 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="space-y-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-rose-500 text-[9px] font-black uppercase tracking-[0.2em]">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                            </span>
                            Official Personal App
                        </div>

                        <h1 className="text-4xl md:text-7xl font-display italic text-neutral-900 leading-[1.1] drop-shadow-sm">
                            Kanika <span className="text-rose-500 relative inline-block">
                                Chauhan
                                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-rose-200/50 rounded-full"></span>
                            </span>
                        </h1>

                        <p className="text-neutral-500 text-base md:text-xl max-w-sm mx-auto font-medium leading-[1.5]">
                            Experience my most intimate moments. Connect with me directly for 1-on-1 calls and exclusive updates.
                        </p>

                        <div className="inline-block px-4 py-2 bg-rose-500/10 rounded-xl border border-rose-100/50 backdrop-blur-sm">
                            <p className="text-rose-600 font-bold italic text-[11px] tracking-wide">
                                "Exclusive content you won't find anywhere else."
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
                        <button
                            onClick={() => scrollToSection('services')}
                            className="py-3.5 bg-neutral-900 text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
                        >
                            💬 CHAT
                        </button>
                        <button
                            onClick={() => scrollToSection('services')}
                            className="py-3.5 bg-rose-500 text-white rounded-xl font-black text-xs flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg"
                        >
                            📞 CALL
                        </button>
                    </div>
                </div>

                {/* Main Hero Image - Clean & Professional */}
                <div className="w-full max-w-2xl px-6 animate-in fade-in zoom-in duration-1000 delay-300">
                    <div className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white ring-1 ring-rose-100 group">
                        <img
                            src={heroImage}
                            alt="Kanika Chauhan"
                            className="w-full h-full object-cover object-top hover:scale-110 transition-transform duration-[2000ms]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
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
                                <div key={item.id} className="min-w-[220px] sm:min-w-[260px] snap-center py-4">
                                    <div className="relative aspect-[3/4.5] rounded-[2.5rem] overflow-hidden group border border-rose-100 ring-1 ring-rose-100 shadow-xl shadow-rose-200/20 hover:shadow-2xl hover:shadow-rose-300/30 hover:-translate-y-2 transition-all duration-500">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className={`w-full h-full object-cover brightness-105 transition-all duration-700 group-hover:scale-110 ${item.blur ? 'blur-sm' : 'blur-[1px]'}`}
                                        />

                                        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                                            {item.isNew && (
                                                <div className="px-3 py-1 bg-red-600 text-white text-[10px] font-black rounded-full shadow-lg shadow-red-500/40 animate-pulse uppercase tracking-wider">
                                                    NEWArrival
                                                </div>
                                            )}
                                            {item.isHot && (
                                                <div className="px-3 py-1 bg-amber-500 text-white text-[10px] font-black rounded-full shadow-lg shadow-amber-500/40 animate-bounce uppercase tracking-wider">
                                                    🔥 HOT SELLING
                                                </div>
                                            )}
                                        </div>

                                        <div className="absolute inset-0 bg-gradient-to-t from-white/95 via-transparent to-transparent group-hover:from-white/100 transition-colors"></div>

                                        <div className="absolute bottom-0 inset-x-0 p-5 space-y-3">
                                            <div className="space-y-0.5">
                                                <p className="text-neutral-900 font-bold text-base leading-tight line-clamp-1">{item.title}</p>
                                                <div className="flex items-center gap-1.5">
                                                    <p className="text-rose-500 font-black text-lg">₹{getDiscountedPrice(item.price).toLocaleString()}</p>
                                                    {IS_REPUBLIC_DAY_OFFER_ACTIVE() && (
                                                        <>
                                                            <p className="text-neutral-400 text-[10px] line-through decoration-rose-400/50">₹{item.price.toLocaleString()}</p>
                                                            <span className="text-[8px] font-black text-green-500 bg-green-50 px-1.5 py-0.5 rounded-full border border-green-100">
                                                                -{getDiscountPercentage(item.price)}%
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handlePurchase(item)}
                                                className="w-full py-3.5 bg-rose-500 text-white text-[10px] font-black rounded-xl active:scale-95 transition-all shadow-lg shadow-rose-500/20 hover:bg-rose-600 hover:shadow-rose-500/40 uppercase tracking-widest"
                                            >
                                                Unlock Now
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
                            <div key={item.id} className="bg-white rounded-[2.5rem] overflow-hidden flex border border-rose-100 shadow-xl shadow-rose-200/10 hover:shadow-2xl hover:shadow-rose-300/20 hover:-translate-y-1 transition-all duration-500 group">
                                <div className="w-1/3 relative overflow-hidden bg-rose-50">
                                    <img src={item.image} className="w-full h-full object-cover blur-[2px] opacity-90 scale-110 group-hover:scale-125 transition-transform duration-[2000ms]" />
                                    <div className="absolute inset-0 flex items-center justify-center text-3xl group-hover:scale-125 transition-transform">💎</div>
                                </div>
                                <div className="w-2/3 p-6 flex flex-col justify-center space-y-3">
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-bold text-neutral-900 leading-tight">{item.title}</h3>
                                        <p className="text-sm text-neutral-500 line-clamp-2 leading-relaxed">{item.description}</p>
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex flex-col">
                                            <div className="flex items-center gap-2">
                                                <span className="text-2xl font-black text-rose-600">₹{getDiscountedPrice(item.price).toLocaleString()}</span>
                                                {IS_REPUBLIC_DAY_OFFER_ACTIVE() && (
                                                    <span className="text-xs font-black text-green-500 bg-green-50 px-2 py-0.5 rounded-full border border-green-100">
                                                        -{getDiscountPercentage(item.price)}% OFF
                                                    </span>
                                                )}
                                            </div>
                                            {IS_REPUBLIC_DAY_OFFER_ACTIVE() && (
                                                <span className="text-xs text-neutral-400 line-through">₹{item.price.toLocaleString()}</span>
                                            )}
                                        </div>
                                        <button
                                            onClick={() => handlePurchase(item)}
                                            className="px-6 py-3 bg-neutral-900 text-white text-xs font-black rounded-xl active:scale-95 transition-all shadow-lg hover:bg-black uppercase tracking-widest"
                                        >
                                            Get Access
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
                            <div key={item.id} className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-rose-100 shadow-lg group hover:-translate-y-2 transition-all duration-500">
                                <img src={item.image} className="w-full h-full object-cover blur-md grayscale-[20%] opacity-80 group-hover:scale-110 transition-transform duration-[2000ms]" />
                                <div className="absolute inset-0 bg-white/40 group-hover:bg-white/10 transition-colors flex flex-col items-center justify-center text-center p-6">
                                    <div className="w-12 h-12 rounded-full bg-white/50 backdrop-blur-md flex items-center justify-center text-2xl mb-2 border border-white shadow-sm group-hover:scale-110 transition-transform">📸</div>
                                    <p className="text-sm font-bold text-neutral-900">{item.title}</p>
                                    <p className="text-[10px] text-neutral-600 font-black uppercase tracking-widest mt-1">{item.itemsCount}</p>
                                </div>
                                <button
                                    onClick={() => handlePurchase(item)}
                                    className="absolute bottom-4 inset-x-4 py-3 bg-white/90 backdrop-blur-md text-rose-600 text-xs font-black rounded-xl border border-rose-100 active:scale-95 transition-all shadow-xl hover:bg-rose-500 hover:text-white"
                                >
                                    {IS_REPUBLIC_DAY_OFFER_ACTIVE() ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <span>UNLOCK ₹{getDiscountedPrice(item.price).toLocaleString()}</span>
                                            <span className="text-[10px] line-through opacity-60">₹{item.price.toLocaleString()}</span>
                                        </div>
                                    ) : (
                                        `UNLOCK ₹${item.price.toLocaleString()}`
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="space-y-6 px-6">
                    <h2 className="text-2xl font-display text-neutral-900 italic">📞 My Services</h2>
                    <div className="bg-white rounded-[2.5rem] overflow-hidden border border-rose-100 shadow-2xl shadow-rose-200/20">
                        <div className="divide-y divide-rose-50">
                            {services.map((item) => (
                                <div key={item.id} className="flex items-center justify-between p-6 hover:bg-rose-50/50 transition-all group">
                                    <div className="space-y-1">
                                        <p className="text-neutral-900 font-bold text-lg group-hover:text-rose-600 transition-colors">{item.title}</p>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                            <p className="text-rose-500 font-black text-xl">₹{getDiscountedPrice(item.price).toLocaleString()}</p>
                                            {IS_REPUBLIC_DAY_OFFER_ACTIVE() && (
                                                <>
                                                    <p className="text-xs text-neutral-400 line-through decoration-rose-300">₹{item.price.toLocaleString()}</p>
                                                    <span className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                                        -{getDiscountPercentage(item.price)}%
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handlePurchase(item)}
                                        className="px-8 py-3.5 bg-rose-500 text-white text-xs font-black rounded-2xl active:scale-95 transition-all shadow-lg shadow-rose-200 hover:bg-rose-600 hover:shadow-rose-400/40 uppercase tracking-widest"
                                    >
                                        Book Now
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
                            <div key={item.id} className="relative group overflow-hidden bg-white rounded-[2.5rem] border-2 border-rose-50 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-200/40 transition-all duration-700 shadow-xl shadow-rose-100/50">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-amber-100 transition-colors"></div>
                                <div className="p-8 flex flex-col justify-center gap-2 relative z-10">
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-10 h-10 rounded-2xl bg-amber-500 flex items-center justify-center text-xl shadow-lg shadow-amber-200 group-hover:rotate-12 transition-transform">👑</div>
                                        <h3 className="text-2xl font-display italic text-neutral-900">{item.title}</h3>
                                    </div>
                                    <p className="text-neutral-500 font-medium leading-relaxed">{item.description}</p>
                                    <div className="flex items-center justify-between mt-8">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                                                {IS_REPUBLIC_DAY_OFFER_ACTIVE() ? 'Republic Day Offer' : 'Premium Rate'}
                                            </span>
                                            <div className="flex items-end gap-2">
                                                <span className="text-3xl font-black text-neutral-900">₹{getDiscountedPrice(item.price).toLocaleString()}</span>
                                                {IS_REPUBLIC_DAY_OFFER_ACTIVE() && (
                                                    <div className="flex flex-col">
                                                        <span className="text-[10px] font-black text-green-500 uppercase">Save {getDiscountPercentage(item.price)}%</span>
                                                        <span className="text-sm text-neutral-400 line-through decoration-amber-400/50 mb-1">₹{item.price.toLocaleString()}</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handlePurchase(item)}
                                            className="px-10 py-4 bg-neutral-900 text-white text-xs font-black rounded-2xl active:scale-95 transition-all shadow-xl shadow-neutral-300 hover:bg-black uppercase tracking-widest"
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
                    <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 gap-4 max-h-[600px] overflow-y-auto px-2 py-4 hide-scrollbar">
                        {Array.from({ length: 73 }).map((_, i) => (
                            <div key={i} className={`aspect-[2/3] rounded-3xl bg-white border border-rose-50 shadow-sm flex flex-col items-center justify-center p-3 text-center space-y-2 transition-all duration-500 hover:scale-110 hover:shadow-xl hover:shadow-rose-200/50 cursor-pointer group ${i % 7 === 0 ? 'bg-gradient-to-br from-amber-50 to-white border-amber-100' : ''}`} onClick={() => handleLeakClick(i)}>
                                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-sm group-hover:scale-125 transition-transform duration-500 ${i % 7 === 0 ? 'bg-amber-100 shadow-amber-100' : 'bg-rose-50 shadow-rose-50'}`}>
                                    {i % 7 === 0 ? '🌟' : i % 4 === 0 ? '🍑' : i % 4 === 1 ? '🍒' : i % 4 === 2 ? '🔒' : '🔞'}
                                </div>
                                <div className="space-y-0.5">
                                    <p className={`text-[9px] font-black uppercase tracking-tighter ${i % 7 === 0 ? 'text-amber-500' : 'text-rose-400'}`}>Leak #{i + 1}</p>
                                    <p className="text-[7px] text-neutral-400 font-bold uppercase">Locked</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center text-[10px] font-black text-rose-500/40 uppercase tracking-[0.2em] mt-2 animate-bounce">
                        Explore all 70+ hidden archives
                    </p>
                </section>

                <section className="px-6 pb-24">
                    <div className="bg-white rounded-[3rem] p-12 border border-rose-100 shadow-[0_32px_64px_-16px_rgba(244,63,94,0.1)] space-y-12 text-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:rotate-45 transition-transform duration-1000">✨</div>
                        <div className="absolute bottom-0 left-0 p-8 opacity-20 group-hover:-rotate-45 transition-transform duration-1000">💫</div>

                        <div className="space-y-4">
                            <h3 className="text-3xl font-display italic text-rose-500">Experience Excellence</h3>
                            <p className="text-neutral-500 max-w-sm mx-auto font-medium leading-relaxed">Your privacy and satisfaction are my top priorities. Every interaction is 100% secure.</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8">
                            {TRUST_ITEMS.map((item, idx) => (
                                <div key={idx} className="space-y-3 flex flex-col items-center group/item hover:-translate-y-1 transition-transform">
                                    <div className="w-16 h-16 rounded-[2rem] bg-rose-50 flex items-center justify-center text-3xl shadow-sm group-hover/item:bg-rose-100 group-hover/item:rotate-6 transition-all">{item.icon}</div>
                                    <span className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.15em]">{item.label}</span>
                                </div>
                            ))}
                        </div>

                        <div className="pt-8 border-t border-rose-50">
                            <p className="text-sm text-neutral-400 italic">
                                “Official personal application. Discreet and verified.”
                            </p>
                        </div>
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

            {/* Republic Day Offer Poster */}
            <RepublicDayPoster />
        </div>
    );
};

export default Home;
