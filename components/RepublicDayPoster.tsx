import React, { useState, useEffect } from 'react';
import { IS_REPUBLIC_DAY_OFFER_ACTIVE } from '../utils';

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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm animate-in fade-in duration-700">
            {/* Light Premium Mobile-First Card */}
            <div className="relative w-full max-w-[380px] bg-white rounded-[3.5rem] overflow-hidden shadow-2xl border border-slate-200 flex flex-col animate-in zoom-in slide-in-from-bottom-10 duration-700">

                {/* Decorative Glows */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-teal-500/10 blur-[60px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 blur-[60px] rounded-full"></div>

                {/* Close Button */}
                <button
                    onClick={closePoster}
                    className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 z-20 hover:text-slate-800 hover:bg-slate-200 transition-all border border-slate-200"
                >
                    ✕
                </button>

                {/* Top Section */}
                <div className="pt-12 pb-6 flex flex-col items-center">
                    <div className="relative group">
                        <div className="absolute inset-[-8px] bg-gradient-to-r from-teal-500 via-white to-purple-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse"></div>
                        <div className="relative w-28 h-28 rounded-full p-1.5 bg-gradient-to-tr from-teal-500 to-purple-600 shadow-md flex items-center justify-center">
                            <span className="text-white text-4xl">🎆</span>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="px-10 pb-12 space-y-8 text-center">
                    <div className="space-y-2">
                        <p className="text-[10px] font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-purple-600 uppercase tracking-[0.4em]">Limited Time</p>
                        <h3 className="text-4xl font-display italic text-slate-800">Special Offer</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="group relative p-5 rounded-[2rem] bg-slate-50 border border-slate-100 flex flex-col items-center justify-center space-y-1 hover:bg-slate-100 transition-all">
                            <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Standard</span>
                            <span className="text-2xl font-black text-slate-800 italic">30% <span className="text-xs">OFF</span></span>
                        </div>
                        <div className="group relative p-5 rounded-[2rem] bg-teal-50 border border-teal-100 flex flex-col items-center justify-center space-y-1 hover:bg-teal-100 transition-all">
                            <span className="text-[9px] font-black text-teal-600 uppercase tracking-widest">Premium</span>
                            <span className="text-2xl font-black text-teal-600 italic">50% <span className="text-xs">OFF</span></span>
                        </div>
                    </div>

                    <p className="text-slate-500 text-sm font-medium leading-relaxed italic px-2">
                        "Unlock unparalleled access tonight at exceptional value. Purely intimate." ✨
                    </p>

                    <button
                        onClick={closePoster}
                        className="w-full py-6 bg-gradient-to-r from-teal-500 to-purple-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-lg"
                    >
                        Reveal Privileges 💎
                    </button>

                    {/* Expiry Timer */}
                    <div className="flex items-center justify-center gap-3 bg-slate-50 py-3 rounded-full border border-slate-100">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_rgba(20,184,166,0.5)]"></div>
                        <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.3em]">
                            Offer Finalizes At 11:50 PM
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepublicDayPoster;
