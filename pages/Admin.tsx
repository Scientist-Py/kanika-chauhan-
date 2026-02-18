
import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Product } from '../types';

const Admin: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { orders, stats } = useAdmin();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === '1234') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid Credentials!');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0A0A0B] flex items-center justify-center p-4 relative overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-premium-gold/5 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-amber-900/10 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="glass p-12 rounded-[3.5rem] w-full max-w-md border border-white/5 shadow-3xl space-y-10 relative z-10 transition-all">
                    <div className="text-center space-y-3">
                        <div className="w-16 h-16 mx-auto bg-gold-gradient rounded-2xl flex items-center justify-center text-black text-2xl font-black shadow-2xl mb-6">KC</div>
                        <h1 className="text-3xl font-display italic text-gradient-gold">Inner Sanctuary</h1>
                        <p className="text-neutral-500 font-bold text-[10px] uppercase tracking-[0.4em]">Proprietary Command Center</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-premium-gold uppercase tracking-[0.2em] ml-1">Universal Identity</label>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-premium-gold outline-none font-medium transition-all placeholder:text-neutral-600"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-premium-gold uppercase tracking-[0.2em] ml-1">Access Key</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-premium-gold outline-none font-medium transition-all placeholder:text-neutral-600"
                            />
                        </div>
                        <button className="w-full bg-gold-gradient text-black font-black py-5 rounded-2xl hover:scale-105 shadow-2xl transition-all active:scale-[0.98] uppercase tracking-[0.2em] text-[10px]">
                            Authorize Entry
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0A0A0B] text-white font-sans selection:bg-premium-gold/30">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-gold-gradient rounded-[2rem] flex items-center justify-center text-black text-3xl font-black shadow-[0_10px_40px_rgba(212,175,55,0.3)]">
                            KC
                        </div>
                        <div>
                            <h1 className="text-4xl font-display italic text-gradient-gold">Management Console</h1>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                <p className="text-neutral-500 font-bold text-[10px] uppercase tracking-widest">Administrator Portal • Real-time Active</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="glass px-8 py-4 rounded-2xl border border-white/5 bg-white/[0.02]">
                            <p className="text-[10px] font-black text-premium-gold uppercase tracking-widest mb-1 opacity-60">Gross Revenue</p>
                            <p className="text-2xl font-black text-neutral-100 italic">₹{stats.totalRevenue.toLocaleString()}</p>
                        </div>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="bg-white/5 hover:bg-red-500/10 text-neutral-600 hover:text-red-500 p-5 rounded-2xl border border-white/5 transition-all group shadow-xl"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </header>

                <main className="space-y-12">
                    {/* Metrics Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Daily Average Card */}
                        <div className="relative group overflow-hidden bg-white/[0.02] rounded-[3rem] border border-white/10 p-10 hover:border-premium-gold/30 transition-all duration-700">
                            <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:scale-125 transition-transform duration-1000">
                                <svg className="w-32 h-32 text-premium-gold" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M13 3h-2v10h2V3zm4 8h-2v2h2v-2zm-8 0H7v2h2v-2zm3 9c-4.97 0-9-4.03-9-9h2c0 3.87 3.13 7 7 7s7-3.13 7-7h2c0 4.97-4.03 9-9 9z" />
                                </svg>
                            </div>
                            <p className="text-premium-gold text-[10px] font-black uppercase tracking-[0.3em] mb-6">Daily Throughput</p>
                            <div className="flex items-end gap-3">
                                <h3 className="text-6xl font-black text-neutral-100 italic">{stats.averageSalesPerDay}</h3>
                                <span className="text-neutral-500 text-xs font-bold mb-3 uppercase tracking-widest">Units / Day</span>
                            </div>
                            <div className="mt-10 flex items-center gap-3">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-7 h-7 rounded-full border-2 border-[#0A0A0B] bg-premium-gold/20" />
                                    ))}
                                </div>
                                <span className="text-[9px] font-black text-green-500 uppercase tracking-widest">+12 Global Hits</span>
                            </div>
                        </div>

                        {/* Retention Metric */}
                        <div className="relative glass rounded-[3rem] p-10 border border-white/5 flex flex-col justify-between hover:border-premium-gold/30 transition-all duration-700 bg-white/[0.01]">
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <div className="bg-premium-gold/10 p-4 rounded-2xl border border-premium-gold/20 shadow-lg shadow-premium-gold/5">
                                        <svg className="w-6 h-6 text-premium-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                    </div>
                                    <span className="text-green-500 font-black text-xs">A+ QUALITY</span>
                                </div>
                                <p className="text-neutral-500 text-[10px] font-black uppercase tracking-[0.3em] mb-3">Retention Index</p>
                                <h3 className="text-5xl font-black text-neutral-100">{stats.repeatedCustomerRate}%</h3>
                            </div>
                            <div className="mt-8">
                                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                    <div
                                        className="h-full bg-gold-gradient rounded-full transition-all duration-1000 shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                                        style={{ width: `${stats.repeatedCustomerRate}%` }}
                                    />
                                </div>
                                <p className="text-[9px] font-bold text-neutral-600 uppercase tracking-widest mt-4 flex justify-between">
                                    <span>Loyalty Score</span>
                                    <span>EXCEPTIONAL</span>
                                </p>
                            </div>
                        </div>

                        {/* Top Product Graphical */}
                        <div className="relative overflow-hidden bg-gold-gradient rounded-[3rem] px-10 py-12 text-black shadow-[0_20px_50px_rgba(212,175,55,0.2)] group transition-all hover:scale-[1.02]">
                            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-20 transition-opacity" />
                            <div className="relative z-10 flex flex-col h-full justify-between">
                                <div className="space-y-4">
                                    <p className="text-black/60 text-[10px] font-black uppercase tracking-[0.3em]">Royal Favorite</p>
                                    <h3 className="text-3xl font-display italic leading-tight underline decoration-black/10">"{stats.mostSellingProduct}"</h3>
                                </div>
                                <div className="bg-black/10 backdrop-blur-md rounded-2xl p-6 border border-black/5 mt-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-[9px] font-black uppercase tracking-widest">Market Pressure</span>
                                        <span className="text-[9px] font-black uppercase bg-black/80 text-white px-2 py-0.5 rounded tracking-widest">PEAK 🔥</span>
                                    </div>
                                    <div className="flex gap-1.5 h-12 items-end">
                                        {[40, 70, 45, 90, 65, 80, 50, 95].map((h, i) => (
                                            <div key={i} className="flex-1 bg-black rounded-t-lg transition-all duration-700 hover:scale-110" style={{ height: `${h}%` }} />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Ledger */}
                    <div className="glass rounded-[3.5rem] border border-white/5 overflow-hidden shadow-3xl bg-white/[0.01]">
                        <div className="p-10 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white/[0.02]">
                            <div className="space-y-1">
                                <h2 className="text-3xl font-display italic text-gradient-gold">Intake Ledger</h2>
                                <p className="text-neutral-500 text-[10px] font-black uppercase tracking-widest">Active Client Transactions • End-to-End Encrypted</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex flex-col items-end">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-premium-gold">Daily Goal</span>
                                    <p className="text-xl font-black italic">89% Achieved</p>
                                </div>
                                <div className="h-10 w-px bg-white/10" />
                                <button className="px-6 py-3 bg-white/5 text-[9px] font-black text-neutral-400 hover:text-premium-gold border border-white/10 rounded-xl uppercase tracking-widest transition-all shadow-xl">Audit Report</button>
                            </div>
                        </div>

                        <div className="overflow-x-auto overflow-y-auto max-h-[800px] hide-scrollbar">
                            <table className="w-full text-left">
                                <thead className="bg-[#0A0A0B] sticky top-0 z-20 border-b border-white/5 shadow-xl">
                                    <tr>
                                        <th className="px-12 py-8 text-[10px] font-black text-premium-gold uppercase tracking-[0.3em] whitespace-nowrap">Distinguished Guest</th>
                                        <th className="px-8 py-8 text-[10px] font-black text-premium-gold uppercase tracking-[0.3em] whitespace-nowrap">Selection Title</th>
                                        <th className="px-8 py-8 text-[10px] font-black text-premium-gold uppercase tracking-[0.3em] text-center whitespace-nowrap">Prestige</th>
                                        <th className="px-8 py-8 text-[10px] font-black text-premium-gold uppercase tracking-[0.3em] text-center whitespace-nowrap">Loyalty Score</th>
                                        <th className="px-12 py-8 text-[10px] font-black text-premium-gold uppercase tracking-[0.3em] text-right whitespace-nowrap">Value / Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-white/[0.03] transition-colors group relative">
                                            <td className="px-12 py-10">
                                                <div className="flex items-center gap-6">
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black shadow-2xl relative transition-transform group-hover:scale-110 ${order.isRepeated ? 'bg-gold-gradient text-black' : 'bg-white/5 text-neutral-400 border border-white/10'}`}>
                                                        {order.customerName.charAt(0)}
                                                        {order.isRepeated && <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-4 border-[#0A0A0B] animate-pulse"></div>}
                                                    </div>
                                                    <div className="space-y-1">
                                                        <div className="flex items-center gap-3">
                                                            <p className="font-bold text-xl text-neutral-100">{order.customerName}</p>
                                                            {order.isRepeated && (
                                                                <span className="bg-premium-gold text-black text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">Elite member</span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs font-bold text-neutral-500 tabular-nums">{order.customerPhone}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-10 whitespace-nowrap">
                                                <p className="font-bold text-neutral-100 text-lg italic underline decoration-premium-gold/20">{order.productTitle}</p>
                                                <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-widest mt-1 tabular-nums">{order.date}</p>
                                            </td>
                                            <td className="px-8 py-10">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-2xl font-black text-neutral-100 tabular-nums">{order.customerTotalOrders}</span>
                                                    <span className="text-[8px] font-black text-neutral-600 uppercase tracking-widest">Orders</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-10">
                                                <div className="flex flex-col items-center group/engagement">
                                                    <div className="flex items-center gap-1.5 transition-transform group-hover/engagement:scale-125">
                                                        <span className="text-premium-gold">⚜️</span>
                                                        <span className="text-2xl font-black text-neutral-100 tabular-nums">{order.customerTotalLikes}</span>
                                                    </div>
                                                    <span className="text-[8px] font-black text-neutral-600 uppercase tracking-widest mt-1">Status Lvl</span>
                                                </div>
                                            </td>
                                            <td className="px-12 py-10 text-right">
                                                <div className="inline-flex flex-col items-end gap-3">
                                                    <div className="bg-green-500/10 text-green-500 text-[9px] font-black px-5 py-2 rounded-full uppercase tracking-[0.2em] border border-green-500/20 shadow-xl shadow-green-500/5">
                                                        Success
                                                    </div>
                                                    <p className="text-3xl font-black text-gradient-gold tabular-nums">₹{order.amount}</p>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="p-10 bg-white/[0.02] flex items-center justify-between border-t border-white/5">
                            <p className="text-[9px] font-black text-neutral-600 uppercase tracking-[0.3em]">Vault containing {orders.length} active records from curated stream</p>
                            <div className="flex gap-4">
                                <button className="w-12 h-12 rounded-2xl glass border border-white/5 text-neutral-400 hover:text-premium-gold transition-all flex items-center justify-center shadow-xl">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                </button>
                                <button className="w-12 h-12 rounded-2xl glass border border-white/5 text-neutral-400 hover:text-premium-gold transition-all flex items-center justify-center shadow-xl">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>

            <footer className="max-w-7xl mx-auto px-12 py-16 border-t border-white/5 mt-20 text-center space-y-4">
                <p className="text-3xl font-display italic text-gradient-gold opacity-60">Kanika Chauhan</p>
                <p className="text-[9px] font-black text-neutral-700 uppercase tracking-[0.5em]">
                    Command Suite V4.2 • Secure Cryptography Enabled • © 2026 Privilege Group
                </p>
            </footer>
        </div>
    );
};

export default Admin;
