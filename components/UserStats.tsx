
import React, { useState, useEffect } from 'react';
import { useAdmin } from '../context/AdminContext';

const UserStats: React.FC = () => {
    const { stats, topSpenders } = useAdmin();
    const [isOpen, setIsOpen] = useState(false);
    const [displayTotal, setDisplayTotal] = useState(stats.totalUsers);

    // Dynamic increment for total users
    useEffect(() => {
        const START_COUNT = parseInt(stats.totalUsers.replace(/,/g, '')) || 87617;
        const START_TIME = new Date('2026-01-20T00:00:00Z').getTime();

        const updateCount = () => {
            const hoursPassed = (Date.now() - START_TIME) / (1000 * 60 * 60);
            const currentTotal = START_COUNT + Math.floor(hoursPassed / 1.5);
            setDisplayTotal(currentTotal.toLocaleString());
        };

        updateCount();
        const interval = setInterval(updateCount, 3600 * 1000);
        return () => clearInterval(interval);
    }, [stats.totalUsers]);

    return (
        <aside className="lg:fixed lg:right-8 lg:top-24 lg:w-80 w-full flex flex-col gap-6 lg:px-0 px-6 z-40 animate-in fade-in slide-in-from-right-8 duration-1000">

            {/* Ultra-Premium Glass Stats Card */}
            <div className="relative group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-transparent to-amber-500/10 rounded-[2.5rem] blur-2xl group-hover:opacity-100 opacity-50 transition-opacity duration-1000"></div>

                <div className="relative bg-white/70 backdrop-blur-2xl rounded-[2.5rem] border border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] overflow-hidden">
                    {/* Glowing Header */}
                    <div className="bg-neutral-900 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                            </div>
                            <span className="text-[10px] font-black text-white px-2 py-0.5 rounded-md bg-rose-500 tracking-[0.2em] uppercase">Private Live</span>
                        </div>
                        <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest italic">Official Feed</span>
                    </div>

                    <div className="p-8 space-y-8">
                        {/* Users Stat */}
                        <div className="relative">
                            <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                <span className="w-4 h-px bg-neutral-200"></span>
                                Verified Customers
                            </h3>
                            <div className="flex items-baseline gap-2">
                                <span className="text-4xl font-display italic text-neutral-900 tracking-tighter tabular-nums drop-shadow-sm">
                                    {displayTotal}
                                </span>
                                <div className="flex flex-col">
                                    <span className="text-[10px] font-black text-rose-500 leading-none">ACTIVE</span>
                                    <span className="text-[8px] font-bold text-neutral-300">LIVE</span>
                                </div>
                            </div>
                        </div>

                        {/* Monthly Stat */}
                        <div className="relative">
                            <h3 className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                                <span className="w-4 h-px bg-neutral-200"></span>
                                Monthly Access
                            </h3>
                            <div className="flex items-center gap-3">
                                <span className="text-3xl font-display italic text-neutral-900 tracking-tighter tabular-nums">
                                    {stats.monthlyUsers}
                                </span>
                                <div className="px-2 py-1 bg-green-500/10 border border-green-500/20 rounded-lg text-[10px] font-black text-green-600">
                                    ONLINE
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Label */}
                    <div className="bg-neutral-50/50 px-8 py-3 border-t border-neutral-100 text-center">
                        <p className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest italic">
                            Updated real-time • Private sessions
                        </p>
                    </div>
                </div>
            </div>

            {/* Exclusive Leaderboard Interaction */}
            <div className="relative group">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`relative w-full py-5 rounded-[2rem] flex items-center justify-center gap-4 transition-all duration-700 overflow-hidden group/btn ${isOpen
                        ? 'bg-white border border-neutral-200 text-neutral-900 shadow-xl'
                        : 'bg-neutral-900 text-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.3)] hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                >
                    {/* Hover Glow Effect */}
                    {!isOpen && <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-amber-500/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500"></div>}

                    <div className="relative z-10 flex items-center gap-3">
                        {isOpen ? (
                            <>
                                <span className="text-lg">✕</span>
                                <span className="text-xs font-black uppercase tracking-[0.2em]">Close Board</span>
                            </>
                        ) : (
                            <>
                                <span className="text-xl group-hover/btn:scale-125 transition-transform duration-500">👑</span>
                                <span className="text-xs font-black uppercase tracking-[0.2em]">Elite Leaderboard</span>
                            </>
                        )}
                    </div>
                </button>

                {/* Leaderboard Detail Reveal */}
                {isOpen && (
                    <div className="mt-4 bg-white rounded-[2.5rem] border border-neutral-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] overflow-hidden animate-in zoom-in-95 fade-in slide-in-from-top-6 duration-700 origin-top">
                        <div className="p-8 pb-4">
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="text-2xl font-display italic text-neutral-900">Weekly Top</h2>
                                <span className="text-[10px] font-black text-amber-500 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-widest border border-amber-100 shadow-sm">Verified</span>
                            </div>
                            <p className="text-neutral-400 text-[10px] font-medium leading-relaxed italic">
                                These special guests get priority direct access to me for 1-on-1 calls and private content.
                            </p>
                        </div>

                        <div className="px-4 pb-8 space-y-2">
                            {topSpenders.map((spender, index) => (
                                <div
                                    key={index}
                                    className={`group/item flex items-center justify-between p-5 rounded-[1.5rem] transition-all duration-500 ${index === 0
                                        ? 'bg-gradient-to-r from-amber-50 to-white border border-amber-100/50 shadow-md scale-105 mb-2 relative z-10'
                                        : 'bg-transparent hover:bg-neutral-50 border border-transparent'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-9 h-9 rounded-2xl flex items-center justify-center font-black text-xs transition-transform duration-500 group-hover/item:rotate-12 ${index === 0 ? 'bg-amber-400 text-neutral-900 shadow-lg shadow-amber-400/30' :
                                            index === 1 ? 'bg-neutral-100 text-neutral-400' :
                                                index === 2 ? 'bg-neutral-50 text-neutral-300' :
                                                    'bg-transparent border border-neutral-100 text-neutral-200'
                                            }`}>
                                            {index + 1}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className={`font-bold text-sm tracking-tight ${index === 0 ? 'text-neutral-900' : 'text-neutral-600'}`}>
                                                {spender.name}
                                            </span>
                                            {index === 0 && (
                                                <span className="text-[8px] font-black text-amber-500 uppercase tracking-widest flex items-center gap-1">
                                                    <span className="w-1 h-1 rounded-full bg-amber-500"></span> TOP SUPPORTER
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className={`block font-black text-sm ${index === 0 ? 'text-amber-500' : 'text-neutral-900'}`}>
                                            {spender.amount}
                                        </span>
                                        <span className="text-[8px] font-black text-neutral-300 uppercase tracking-tighter">Contribution</span>
                                    </div>
                                </div>
                            ))}


                            <div className="pt-4 px-2">
                                <button
                                    onClick={() => {
                                        const el = document.getElementById('vip');
                                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                                        setIsOpen(false);
                                    }}
                                    className="w-full py-4 bg-neutral-900 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-xl shadow-neutral-200 hover:-translate-y-1"
                                >
                                    CLIMB THE RANKS
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <p className="text-[9px] text-center text-neutral-300 font-bold uppercase tracking-[0.3em] px-8 animate-pulse">
                Private • Secure • Verified
            </p>
        </aside>
    );
};

export default UserStats;
