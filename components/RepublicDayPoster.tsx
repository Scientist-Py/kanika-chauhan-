
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-2xl animate-in fade-in duration-700">
            {/* Dark Premium Mobile-First Card */}
            <div className="relative w-full max-w-[380px] glass rounded-[3.5rem] overflow-hidden shadow-[0_40px_100px_rgba(255,153,51,0.15)] border border-white/10 flex flex-col animate-in zoom-in slide-in-from-bottom-10 duration-700">

                {/* Decorative Glows */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-[#FF9933]/10 blur-[60px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#128807]/10 blur-[60px] rounded-full"></div>

                {/* Close Button */}
                <button
                    onClick={closePoster}
                    className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-neutral-500 z-20 hover:text-white hover:bg-white/10 transition-all border border-white/10"
                >
                    ✕
                </button>

                {/* Top Section with Circular Image */}
                <div className="pt-12 pb-6 flex flex-col items-center">
                    <div className="relative group">
                        <div className="absolute inset-[-8px] bg-gradient-to-r from-[#FF9933] via-white to-[#128807] rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
                        <div className="relative w-36 h-36 rounded-full p-1.5 bg-gradient-to-tr from-[#FF9933] via-white/40 to-[#128807] shadow-2xl">
                            <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#0A0A0A]">
                                <img src={offerImage} alt="Exclusive Offer" className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="px-10 pb-12 space-y-8 text-center">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-white uppercase tracking-[0.4em]">Republic Honor</p>
                        <h3 className="text-4xl font-display italic text-gradient-gold">Gilded Liberty</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="group relative p-5 rounded-[2rem] bg-white/[0.03] border border-white/5 flex flex-col items-center justify-center space-y-1 hover:bg-white/5 transition-all">
                            <span className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Standard</span>
                            <span className="text-2xl font-black text-white italic">30% <span className="text-xs">OFF</span></span>
                        </div>
                        <div className="group relative p-5 rounded-[2rem] bg-[#FF9933]/5 border border-[#FF9933]/10 flex flex-col items-center justify-center space-y-1 hover:bg-[#FF9933]/10 transition-all">
                            <span className="text-[9px] font-black text-[#FF9933] uppercase tracking-widest">Premium</span>
                            <span className="text-2xl font-black text-[#FF9933] italic">50% <span className="text-xs">OFF</span></span>
                        </div>
                    </div>

                    <p className="text-neutral-500 text-sm font-medium leading-relaxed italic px-2">
                        "As the nation celebrates, I invite you to explore my sanctuary... Unlock unparalleled access tonight at exceptional value." ⚜️
                    </p>

                    <button
                        onClick={closePoster}
                        className="w-full py-6 bg-gold-gradient text-black rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-[0_15px_40px_rgba(212,175,55,0.2)]"
                    >
                        Reveal Privileges 💎
                    </button>

                    {/* Expiry Timer */}
                    <div className="flex items-center justify-center gap-3 bg-white/[0.02] py-3 rounded-full border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                        <p className="text-[9px] text-neutral-500 font-black uppercase tracking-[0.3em]">
                            Offer Finalizes At 11:50 PM
                        </p>
                    </div>
                </div>

                {/* Gilded Bottom Accent */}
                <div className="flex h-1.5 w-full opacity-60">
                    <div className="w-1/3 bg-[#FF9933]"></div>
                    <div className="w-1/3 bg-white"></div>
                    <div className="w-1/3 bg-[#128807]"></div>
                </div>
            </div>
        </div>
    );
};

export default RepublicDayPoster;
