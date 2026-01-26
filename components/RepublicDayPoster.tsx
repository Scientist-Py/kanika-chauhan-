
import React, { useState, useEffect } from 'react';
import { IS_REPUBLIC_DAY_OFFER_ACTIVE } from '../utils';
import offerImage from '../images/offer.png';

const RepublicDayPoster: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (IS_REPUBLIC_DAY_OFFER_ACTIVE()) {
            const hasSeenPoster = sessionStorage.getItem('hasSeenRepublicDayPoster');
            if (!hasSeenPoster) {
                setIsVisible(true);
            }
        }
    }, []);

    const closePoster = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenRepublicDayPoster', 'true');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-500">
            {/* Dark Premium Mobile-First Card */}
            <div className="relative w-full max-w-[360px] bg-[#0A0A0A] rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(255,100,0,0.3)] border border-white/10 flex flex-col animate-in zoom-in duration-500">

                {/* Close Button - More discreet for premium look */}
                <button
                    onClick={closePoster}
                    className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-white/40 z-20 hover:text-white"
                >
                    ✕
                </button>

                {/* Top Section with Circular Image */}
                <div className="pt-10 pb-6 flex flex-col items-center">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-white to-green-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
                        <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-[#FF9933] via-white to-[#128807]">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/10">
                                <img src={offerImage} alt="Kanika" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section - Compact for Mobile */}
                <div className="px-8 pb-10 space-y-6 text-center">
                    <div className="space-y-1">
                        <h2 className="text-[10px] font-black text-orange-400 uppercase tracking-[0.3em]">Republic Day Glow</h2>
                        <h3 className="text-3xl font-display italic text-white">Seductive Savings</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-3xl bg-white/5 border border-white/10 flex flex-col items-center justify-center space-y-1">
                            <span className="text-[9px] font-bold text-neutral-500 uppercase">Below ₹1000</span>
                            <span className="text-2xl font-black text-white">30% OFF</span>
                        </div>
                        <div className="p-4 rounded-3xl bg-orange-500/10 border border-orange-500/20 flex flex-col items-center justify-center space-y-1">
                            <span className="text-[9px] font-bold text-orange-400 uppercase">Above ₹1000</span>
                            <span className="text-2xl font-black text-orange-500">50% OFF</span>
                        </div>
                    </div>

                    <p className="text-neutral-400 text-sm italic font-medium">
                        "Come closer... Unlock my most intimate secrets tonight at half the price." 🫦
                    </p>

                    <button
                        onClick={closePoster}
                        className="w-full py-5 bg-white text-black rounded-2xl font-black text-sm tracking-[0.1em] transition-all active:scale-95 shadow-lg shadow-white/5"
                    >
                        CLAIM MY OFFER NOW 💎
                    </button>

                    {/* Expiry Timer Text */}
                    <div className="flex items-center justify-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-green-500 animate-ping"></div>
                        <p className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">
                            Expires at 11:50 PM Tonight
                        </p>
                    </div>
                </div>

                {/* Aesthetic Bottom Trim */}
                <div className="flex h-1.5 w-full">
                    <div className="w-1/3 bg-[#FF9933]"></div>
                    <div className="w-1/3 bg-white"></div>
                    <div className="w-1/3 bg-[#128807]"></div>
                </div>
            </div>
        </div>
    );
};

export default RepublicDayPoster;
