
import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Product } from '../types';


const Admin: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { addProduct } = useAdmin();

    // New Product Form State
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        category: 'content',
        price: 0,
        title: '',
        description: '',
        image: '/images/Picsart_26-01-15_13-45-50-370.jpg',
    });
    const [section, setSection] = useState<'mostUnlocked' | 'newCollection' | 'services' | 'exclusives' | 'vipServices'>('newCollection');



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
