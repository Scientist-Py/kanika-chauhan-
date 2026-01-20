
import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Product } from '../types';


const Admin: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { addProduct, stats, topSpenders, updateStats, updateSpenders } = useAdmin();

    // New Product Form State
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        category: 'content',
        price: 0,
        title: '',
        description: '',
        image: '/images/Picsart_26-01-15_13-45-50-370.jpg',
    });
    const [section, setSection] = useState<'mostUnlocked' | 'newCollection' | 'services' | 'exclusives' | 'vipServices'>('newCollection');

    // Stats Editing State
    const [editStats, setEditStats] = useState(stats);
    const [editSpenders, setEditSpenders] = useState(topSpenders);

    // Sync local edit state with context when context updates
    React.useEffect(() => {
        setEditStats(stats);
        setEditSpenders(topSpenders);
    }, [stats, topSpenders]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'admin' && password === '1234') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid Credentials!');
        }
    };

    const handleAddProduct = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProduct.title || !newProduct.price) return;

        addProduct(section, {
            ...newProduct,
            id: Math.random().toString(36).substr(2, 9),
        } as Product);

        alert('Product Added Successfully!');
        setNewProduct({
            category: 'content',
            price: 0,
            title: '',
            description: '',
            image: '/images/Picsart_26-01-15_13-45-50-370.jpg',
        });
    };

    const handleSaveStats = () => {
        updateStats(editStats.totalUsers, editStats.monthlyUsers);
        updateSpenders(editSpenders);
        alert('Statistics & Leaderboard Updated!');
    };

    const updateSpenderField = (index: number, field: 'name' | 'amount', value: string) => {
        const updated = [...editSpenders];
        updated[index] = { ...updated[index], [field]: value };
        setEditSpenders(updated);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#FFF5F7] flex items-center justify-center p-4">
                <div className="bg-white p-8 rounded-3xl w-full max-w-sm border border-rose-100 shadow-2xl shadow-rose-200/50 space-y-6">
                    <h1 className="text-2xl font-black text-neutral-900 text-center tracking-tight">Admin Portal</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-rose-400 uppercase tracking-widest px-1">Username</label>
                            <input
                                type="text"
                                placeholder="Admin"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="w-full bg-rose-50 border border-rose-100 rounded-xl p-3 text-neutral-900 focus:border-rose-500 outline-none font-medium"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[10px] font-black text-rose-400 uppercase tracking-widest px-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="w-full bg-rose-50 border border-rose-100 rounded-xl p-3 text-neutral-900 focus:border-rose-500 outline-none font-medium"
                            />
                        </div>
                        <button className="w-full bg-rose-600 text-white font-black py-4 rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all active:scale-95">
                            LOGIN NOW
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FFF5F7] text-neutral-900 p-6 pb-24">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="flex items-center justify-between border-b border-rose-100 pb-6">
                    <h1 className="text-3xl font-black tracking-tight text-neutral-900 italic">Admin Dashboard</h1>
                    <button onClick={() => setIsAuthenticated(false)} className="text-xs font-black text-rose-500 uppercase tracking-widest hover:text-rose-700 bg-rose-50 px-4 py-2 rounded-full border border-rose-100">Logout</button>
                </header>

                {/* Stats Summary (Live from context) */}
                <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-lg text-center">
                        <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Live Total</p>
                        <p className="text-2xl font-black text-neutral-900">{stats.totalUsers}</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-lg text-center">
                        <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Monthly Live</p>
                        <p className="text-2xl font-black text-neutral-900">{stats.monthlyUsers}</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-lg text-center">
                        <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Total Sales</p>
                        <p className="text-2xl font-black text-neutral-900">₹6.4M</p>
                    </div>
                    <div className="bg-white p-6 rounded-3xl border border-rose-100 shadow-lg text-center">
                        <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Conversion</p>
                        <p className="text-2xl font-black text-neutral-900">18.5%</p>
                    </div>
                </section>

                {/* Manage Metrics & Leaderboard */}
                <section className="bg-white p-8 rounded-[3rem] border border-rose-100 shadow-xl shadow-rose-200/20 space-y-8">
                    <h2 className="text-xl font-black text-rose-500 italic">📊 Live Metrics & Leaderboard</h2>

                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Metrics */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-neutral-400 uppercase tracking-widest">Live Metrics</h3>
                            <div className="space-y-4">
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-rose-400 uppercase">Total Users</label>
                                    <input
                                        type="text"
                                        value={editStats.totalUsers}
                                        onChange={e => setEditStats({ ...editStats, totalUsers: e.target.value })}
                                        className="w-full bg-rose-50 border border-rose-100 rounded-xl p-3 outline-none"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-[10px] font-black text-rose-400 uppercase">Monthly Active</label>
                                    <input
                                        type="text"
                                        value={editStats.monthlyUsers}
                                        onChange={e => setEditStats({ ...editStats, monthlyUsers: e.target.value })}
                                        className="w-full bg-rose-50 border border-rose-100 rounded-xl p-3 outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Leaderboard */}
                        <div className="space-y-4">
                            <h3 className="text-sm font-black text-neutral-400 uppercase tracking-widest">Top 5 Spenders</h3>
                            <div className="space-y-3">
                                {editSpenders.map((s, i) => (
                                    <div key={i} className="flex gap-2">
                                        <input
                                            placeholder="Name"
                                            value={s.name}
                                            onChange={e => updateSpenderField(i, 'name', e.target.value)}
                                            className="flex-grow bg-rose-50 border border-rose-100 rounded-xl p-2 text-xs outline-none"
                                        />
                                        <input
                                            placeholder="Amount"
                                            value={s.amount}
                                            onChange={e => updateSpenderField(i, 'amount', e.target.value)}
                                            className="w-24 bg-rose-50 border border-rose-100 rounded-xl p-2 text-xs outline-none"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleSaveStats}
                        className="w-full bg-neutral-900 text-white font-black py-4 rounded-2xl hover:bg-black shadow-xl shadow-neutral-200 active:scale-95 transition-all"
                    >
                        SAVE CHANGES
                    </button>
                </section>



                {/* Add Product */}
                <section className="space-y-6 bg-white p-8 rounded-3xl border border-rose-100 shadow-xl shadow-rose-200/20">
                    <h2 className="text-xl font-black text-rose-500 italic">➕ Add New Content</h2>
                    <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs uppercase font-black text-rose-400 px-1">Section</label>
                            <select
                                value={section}
                                onChange={e => setSection(e.target.value as any)}
                                className="w-full bg-rose-50 border border-rose-100 rounded-xl p-3 text-neutral-900 focus:border-rose-500 outline-none font-bold"
                            >
                                <option value="newCollection">New Arrivals</option>
                                <option value="mostUnlocked">Most Unlocked</option>
                                <option value="exclusives">Exclusives Gallery</option>
                                <option value="services">My Services</option>
                                <option value="vipServices">VIP Services</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-black text-rose-400 px-1">Title</label>
                            <input
                                required
                                type="text"
                                value={newProduct.title}
                                onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
                                className="w-full bg-rose-50 border border-rose-100 rounded-xl p-3 text-neutral-900 focus:border-rose-500 outline-none font-medium"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-black text-rose-400 px-1">Price (₹)</label>
                            <input
                                required
                                type="number"
                                value={newProduct.price}
                                onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                                className="w-full bg-rose-50 border border-rose-100 rounded-xl p-3 text-neutral-900 focus:border-rose-500 outline-none font-bold"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs uppercase font-black text-rose-400 px-1">Image URL</label>
                            <input
                                type="text"
                                value={newProduct.image}
                                onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                                className="w-full bg-rose-50 border border-rose-100 rounded-xl p-3 text-neutral-900 focus:border-rose-500 outline-none font-medium"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs uppercase font-black text-rose-400 px-1">Description</label>
                            <textarea
                                value={newProduct.description}
                                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                                className="w-full bg-rose-50 border border-rose-100 rounded-xl p-3 text-neutral-900 focus:border-rose-500 outline-none h-20 font-medium"
                            />
                        </div>

                        <button className="md:col-span-2 bg-rose-600 text-white font-black py-4 rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition-all active:scale-95">
                            ADD CONTENT NOW
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Admin;
