
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, Order, AdminStats } from '../types';
import { MOST_UNLOCKED as INITIAL_MOST_UNLOCKED, NEW_COLLECTION as INITIAL_NEW_COLLECTION, SERVICES as INITIAL_SERVICES, EXCLUSIVES as INITIAL_EXCLUSIVES, VIP_SERVICES as INITIAL_VIP_SERVICES } from '../constants';

const MOCK_ORDERS: Order[] = [
    {
        id: 'ord1',
        customerName: 'Rahul Sharma',
        customerPhone: '+91 98765 43210',
        productId: 'nc-roleplay-1',
        productTitle: 'Secretary & Boss Roleplay',
        amount: 1899,
        date: '2024-02-01 10:30',
        status: 'completed',
        customerTotalOrders: 5,
        customerTotalLikes: 124,
        isRepeated: true
    },
    {
        id: 'ord2',
        customerName: 'Amit Patel',
        customerPhone: '+91 87654 32109',
        productId: 'nc-new-1',
        productTitle: 'Stripping Black Saree',
        amount: 899,
        date: '2024-02-01 11:15',
        status: 'completed',
        customerTotalOrders: 1,
        customerTotalLikes: 45,
        isRepeated: false
    },
    {
        id: 'ord3',
        customerName: 'Vikram Singh',
        customerPhone: '+91 76543 21098',
        productId: 'nc-new-4',
        productTitle: 'Full 30 Min Extreme Play',
        amount: 1999,
        date: '2024-02-01 12:00',
        status: 'completed',
        customerTotalOrders: 12,
        customerTotalLikes: 890,
        isRepeated: true
    },
    {
        id: 'ord4',
        customerName: 'Sanjay Kumar',
        customerPhone: '+91 65432 10987',
        productId: 'ex4',
        productTitle: 'Black Lace Bodysuit',
        amount: 1299,
        date: '2024-02-01 12:45',
        status: 'completed',
        customerTotalOrders: 3,
        customerTotalLikes: 67,
        isRepeated: true
    }
];

interface AdminContextType {
    // Product Data
    mostUnlocked: Product[];
    newCollection: Product[];
    services: Product[];
    exclusives: Product[];
    vipServices: Product[];
    orders: Order[];
    stats: AdminStats;

    addProduct: (section: 'mostUnlocked' | 'newCollection' | 'services' | 'exclusives' | 'vipServices', product: Product) => void;
    deleteProduct: (section: 'mostUnlocked' | 'newCollection' | 'services' | 'exclusives' | 'vipServices', id: string) => void;
    addOrder: (order: Order) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Product State (Initialized from constants)
    const [mostUnlocked, setMostUnlocked] = useState<Product[]>(INITIAL_MOST_UNLOCKED);
    const [newCollection, setNewCollection] = useState<Product[]>(INITIAL_NEW_COLLECTION);
    const [services, setServices] = useState<Product[]>(INITIAL_SERVICES);
    const [exclusives, setExclusives] = useState<Product[]>(INITIAL_EXCLUSIVES);
    const [vipServices, setVipServices] = useState<Product[]>(INITIAL_VIP_SERVICES);
    const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);

    // Boss Stats
    const stats: AdminStats = {
        totalOrdersToday: 890,
        averageSalesPerDay: 890,
        repeatedCustomerRate: 34.67,
        mostSellingProduct: 'Secretary & Boss Roleplay',
        totalRevenue: 154780
    };

    // Load from local storage if available (mock persistence)
    useEffect(() => {
        const storedData = localStorage.getItem('adminData');
        if (storedData) {
            const parsed = JSON.parse(storedData);

            // Helper to merge: Use initial constants for items with same ID, keep stored items for new ones
            const mergeProducts = (initial: Product[], stored: Product[]) => {
                const initialMap = new Map(initial.map(p => [p.id, p]));
                const updatedFromInitial = initial;
                const uniqueStored = stored.filter(p => !initialMap.has(p.id));
                return [...updatedFromInitial, ...uniqueStored];
            };

            if (parsed.mostUnlocked) setMostUnlocked(mergeProducts(INITIAL_MOST_UNLOCKED, parsed.mostUnlocked));
            if (parsed.newCollection) setNewCollection(mergeProducts(INITIAL_NEW_COLLECTION, parsed.newCollection));
            if (parsed.services) setServices(mergeProducts(INITIAL_SERVICES, parsed.services));
            if (parsed.exclusives) setExclusives(mergeProducts(INITIAL_EXCLUSIVES, parsed.exclusives));
            if (parsed.vipServices) setVipServices(mergeProducts(INITIAL_VIP_SERVICES, parsed.vipServices));
            if (parsed.orders) setOrders(parsed.orders);
        }
    }, []);

    // Save to local storage whenever state changes
    useEffect(() => {
        localStorage.setItem('adminData', JSON.stringify({
            mostUnlocked,
            newCollection,
            services,
            exclusives,
            vipServices,
            orders
        }));
    }, [mostUnlocked, newCollection, services, exclusives, vipServices, orders]);

    const addProduct = (section: 'mostUnlocked' | 'newCollection' | 'services' | 'exclusives' | 'vipServices', product: Product) => {
        switch (section) {
            case 'mostUnlocked': setMostUnlocked(prev => [...prev, product]); break;
            case 'newCollection': setNewCollection(prev => [...prev, product]); break;
            case 'services': setServices(prev => [...prev, product]); break;
            case 'exclusives': setExclusives(prev => [...prev, product]); break;
            case 'vipServices': setVipServices(prev => [...prev, product]); break;
        }
    };

    const deleteProduct = (section: 'mostUnlocked' | 'newCollection' | 'services' | 'exclusives' | 'vipServices', id: string) => {
        switch (section) {
            case 'mostUnlocked': setMostUnlocked(prev => prev.filter(p => p.id !== id)); break;
            case 'newCollection': setNewCollection(prev => prev.filter(p => p.id !== id)); break;
            case 'services': setServices(prev => prev.filter(p => p.id !== id)); break;
            case 'exclusives': setExclusives(prev => prev.filter(p => p.id !== id)); break;
            case 'vipServices': setVipServices(prev => prev.filter(p => p.id !== id)); break;
        }
    };

    const addOrder = (order: Order) => {
        setOrders(prev => [order, ...prev]);
    };

    return (
        <AdminContext.Provider value={{
            mostUnlocked,
            newCollection,
            services,
            exclusives,
            vipServices,
            orders,
            stats,
            addProduct,
            deleteProduct,
            addOrder
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};
