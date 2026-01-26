
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
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-3xl animate-in fade-in duration-700">
            {/* Background Glows for Depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-500/10 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="relative w-full max-w-lg bg-white rounded-[4rem] p-10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.4)] border border-white/20 animate-in zoom-in duration-500 flex flex-col items-center overflow-hidden">
                {/* Close Button */}
                <button
                    onClick={closePoster}
                    className="absolute top-8 right-8 w-10 h-10 flex items-center justify-center rounded-full bg-neutral-100 text-neutral-400 z-20 hover:bg-neutral-200 transition-all hover:rotate-90"
                >
                    ✕
                </button>

                {/* Decorative Republic Elements */}
                <div className="flex justify-center gap-1.5 mb-8">
                    <div className="w-12 h-1 bg-[#FF9933] rounded-full opacity-60"></div>
                    <div className="w-12 h-1 bg-neutral-200 rounded-full"></div>
                    <div className="w-12 h-1 bg-[#128807] rounded-full opacity-60"></div>
                </div>

                {/* Circular Profile Image with Glowing Border */}
                <div className="relative mb-10">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9933] via-white to-[#128807] rounded-full blur-2xl opacity-40 animate-pulse"></div>
                    <div className="relative w-48 h-48 rounded-full p-2 bg-gradient-to-tr from-[#FF9933] via-white to-[#128807] shadow-xl">
                        <div className="w-full h-full rounded-full overflow-hidden border-4 border-white">
                            <img src={offerImage} alt="Kanika's Offer" className="w-full h-full object-cover scale-110 hover:scale-125 transition-transform duration-1000" />
                        </div>
                    </div>
                    <div className="absolute -bottom-4 right-4 bg-rose-500 text-white text-[10px] font-black px-4 py-2 rounded-2xl shadow-lg border-2 border-white animate-bounce">
                        50% OFF 🫦
                    </div>
                </div>

                {/* Naughty Text Content */}
                <div className="text-center space-y-6 mb-10">
                    <div className="space-y-2">
                        <h2 className="text-sm font-black text-orange-500 uppercase tracking-[0.4em]">Republic Day Exclusive</h2>
                        <h3 className="text-5xl font-display italic text-neutral-900 leading-tight">
                            Ready to witness <br />
                            <span className="text-rose-500 relative">
                                everything?
                                <span className="absolute -bottom-1 left-0 w-full h-1 bg-rose-100/50"></span>
                            </span>
                        </h3>
                    </div>

                    <div className="space-y-4 max-w-sm mx-auto">
                        <p className="text-neutral-500 text-lg font-medium leading-relaxed italic">
                            "Freedom feels so much better when we're together. I'm feeling extra naughty today, so I've slashed my prices just for you."
                        </p>
                        <p className="text-neutral-900 font-bold text-base">
                            Unlock my most private archives, personal vids, and 1-on-1 calls at <span className="text-rose-600">HALF PRICE</span> tonight! 💦
                        </p>
                    </div>

                    {/* Quick Offer Recap */}
                    <div className="flex items-center justify-center gap-6 pt-4">
                        <div className="text-center">
                            <p className="text-[10px] text-neutral-400 font-black uppercase">Small Treats</p>
                            <p className="text-xl font-black text-orange-500">30% OFF</p>
                        </div>
                        <div className="w-px h-10 bg-neutral-100"></div>
                        <div className="text-center">
                            <p className="text-[10px] text-neutral-400 font-black uppercase">Full Access</p>
                            <p className="text-xl font-black text-green-600">50% OFF</p>
                        </div>
                    </div>
                </div>

                {/* Premium Claim Button */}
                <button
                    onClick={closePoster}
                    className="w-full h-20 bg-neutral-900 text-white rounded-[2rem] font-black text-xl tracking-[0.2em] relative overflow-hidden group active:scale-95 transition-all shadow-2xl shadow-neutral-200"
                >
                    <div className="absolute inset-0 shimmer pointer-events-none opacity-20"></div>
                    <span className="relative z-10 transition-transform duration-500 group-hover:scale-110 block">
                        CLAIM NOW 💎
                    </span>
                    <div className="absolute bottom-0 inset-x-0 h-1.5 flex transition-transform group-hover:h-3">
                        <div className="w-1/3 bg-[#FF9933]"></div>
                        <div className="w-1/3 bg-white"></div>
                        <div className="w-1/3 bg-[#128807]"></div>
                    </div>
                </button>

                <p className="mt-6 text-[11px] text-rose-400 font-black uppercase tracking-[0.2em] animate-pulse">
                    Deal expires at 11:50 PM Sharp
                </p>
            </div>
        </div>
    );
};

export default RepublicDayPoster;
