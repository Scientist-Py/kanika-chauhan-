
import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Product } from '../types';

const Admin: React.FC = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { notification, showNotification, addProduct } = useAdmin();

    // New Product Form State
    const [newProduct, setNewProduct] = useState<Partial<Product>>({
        category: 'content',
        price: 0,
        title: '',
        description: '',
        image: 'https://picsum.photos/400/500',
    });
    const [section, setSection] = useState<'mostUnlocked' | 'newCollection' | 'services' | 'exclusives'>('newCollection');

    // Notification Form State
    const [notifMsg, setNotifMsg] = useState(notification.message);
    const [notifType, setNotifType] = useState(notification.type);
    const [notifLink, setNotifLink] = useState(notification.link || '');
    const [notifBtn, setNotifBtn] = useState(notification.buttonText || '');

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
            image: 'https://picsum.photos/400/500',
        });
    };

    const handleUpdateNotification = (e: React.FormEvent) => {
        e.preventDefault();
        showNotification(notifMsg, notifType, notifLink, notifBtn);
        alert('Notification Updated!');
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center p-4">
                <div className="bg-neutral-900 p-8 rounded-3xl w-full max-w-sm ring-1 ring-white/10 space-y-6">
                    <h1 className="text-2xl font-bold text-white text-center">Admin Login</h1>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                        />
                        <button className="w-full bg-rose-600 text-white font-bold py-3 rounded-xl hover:bg-rose-700">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24">
            <div className="max-w-4xl mx-auto space-y-12">
                <header className="flex items-center justify-between border-b border-white/10 pb-6">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <button onClick={() => setIsAuthenticated(false)} className="text-sm text-neutral-400 hover:text-white">Logout</button>
                </header>

                {/* Global Notification Settings */}
                <section className="space-y-6 bg-neutral-900/50 p-6 rounded-3xl border border-white/5">
                    <h2 className="text-xl font-bold text-rose-400">🔔 Global Notification</h2>
                    <form onSubmit={handleUpdateNotification} className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs uppercase font-bold text-neutral-500">Message</label>
                            <textarea
                                value={notifMsg}
                                onChange={e => setNotifMsg(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-rose-500 outline-none h-24"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-neutral-500">Type</label>
                            <select
                                value={notifType}
                                onChange={e => setNotifType(e.target.value as any)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                            >
                                <option value="info">Info</option>
                                <option value="success">Success</option>
                                <option value="alert">Alert</option>
                                <option value="promo">Promo</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-neutral-500">Button Text (Optional)</label>
                            <input
                                type="text"
                                value={notifBtn}
                                onChange={e => setNotifBtn(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs uppercase font-bold text-neutral-500">Link URL (Optional)</label>
                            <input
                                type="text"
                                value={notifLink}
                                onChange={e => setNotifLink(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                            />
                        </div>
                        <button className="md:col-span-2 bg-white text-black font-bold py-3 rounded-xl hover:bg-neutral-200">
                            Update Notification
                        </button>
                    </form>
                </section>

                {/* Add Product */}
                <section className="space-y-6 bg-neutral-900/50 p-6 rounded-3xl border border-white/5">
                    <h2 className="text-xl font-bold text-rose-400">➕ Add New Content</h2>
                    <form onSubmit={handleAddProduct} className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs uppercase font-bold text-neutral-500">Section</label>
                            <select
                                value={section}
                                onChange={e => setSection(e.target.value as any)}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                            >
                                <option value="newCollection">New Arrivals</option>
                                <option value="mostUnlocked">Most Unlocked</option>
                                <option value="exclusives">Exclusives Gallery</option>
                                <option value="services">My Services</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-neutral-500">Title</label>
                            <input
                                required
                                type="text"
                                value={newProduct.title}
                                onChange={e => setNewProduct({ ...newProduct, title: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs uppercase font-bold text-neutral-500">Price (₹)</label>
                            <input
                                required
                                type="number"
                                value={newProduct.price}
                                onChange={e => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs uppercase font-bold text-neutral-500">Image URL</label>
                            <input
                                type="text"
                                value={newProduct.image}
                                onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-rose-500 outline-none"
                            />
                            <p className="text-[10px] text-neutral-500">Use an image URL or keep default placeholder.</p>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs uppercase font-bold text-neutral-500">Description</label>
                            <textarea
                                value={newProduct.description}
                                onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                                className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-white focus:border-rose-500 outline-none h-20"
                            />
                        </div>

                        <button className="md:col-span-2 bg-rose-600 text-white font-bold py-3 rounded-xl hover:bg-rose-700">
                            Add Content
                        </button>
                    </form>
                </section>
            </div>
        </div>
    );
};

export default Admin;
