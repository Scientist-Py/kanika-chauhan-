
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../types';
import { MOST_UNLOCKED as INITIAL_MOST_UNLOCKED, NEW_COLLECTION as INITIAL_NEW_COLLECTION, SERVICES as INITIAL_SERVICES, EXCLUSIVES as INITIAL_EXCLUSIVES, VIP_SERVICES as INITIAL_VIP_SERVICES } from '../constants';

type NotificationType = 'info' | 'success' | 'alert' | 'promo';

interface NotificationState {
    message: string;
    type: NotificationType;
    isVisible: boolean;
    link?: string;
    buttonText?: string;
}

interface AdminContextType {
    notification: NotificationState;
    showNotification: (message: string, type?: NotificationType, link?: string, buttonText?: string) => void;
    hideNotification: () => void;

    // Product Data
    mostUnlocked: Product[];
    newCollection: Product[];
    services: Product[];
    exclusives: Product[];
    vipServices: Product[];

    addProduct: (section: 'mostUnlocked' | 'newCollection' | 'services' | 'exclusives' | 'vipServices', product: Product) => void;
    deleteProduct: (section: 'mostUnlocked' | 'newCollection' | 'services' | 'exclusives' | 'vipServices', id: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // Notification State
    const [notification, setNotification] = useState<NotificationState>({
        message: 'Welcome to my official app! 💋',
        type: 'promo',
        isVisible: true,
    });

    // Product State (Initialized from constants)
    const [mostUnlocked, setMostUnlocked] = useState<Product[]>(INITIAL_MOST_UNLOCKED);
    const [newCollection, setNewCollection] = useState<Product[]>(INITIAL_NEW_COLLECTION);
    const [services, setServices] = useState<Product[]>(INITIAL_SERVICES);
    const [exclusives, setExclusives] = useState<Product[]>(INITIAL_EXCLUSIVES);
    const [vipServices, setVipServices] = useState<Product[]>(INITIAL_VIP_SERVICES);

    // Load from local storage if available (mock persistence)
    useEffect(() => {
        const storedData = localStorage.getItem('adminData');
        if (storedData) {
            const parsed = JSON.parse(storedData);

            // Helper to merge: Use initial constants for items with same ID, keep stored items for new ones
            const mergeProducts = (initial: Product[], stored: Product[]) => {
                const initialMap = new Map(initial.map(p => [p.id, p]));
                const storedMap = new Map(stored.map(p => [p.id, p]));

                // For items in initial constants, we want the UPDATED version from code
                const updatedFromInitial = initial;

                // For items in stored that aren't in initial (dynamic items), we keep them
                const uniqueStored = stored.filter(p => !initialMap.has(p.id));

                return [...updatedFromInitial, ...uniqueStored];
            };

            if (parsed.mostUnlocked) setMostUnlocked(mergeProducts(INITIAL_MOST_UNLOCKED, parsed.mostUnlocked));
            if (parsed.newCollection) setNewCollection(mergeProducts(INITIAL_NEW_COLLECTION, parsed.newCollection));
            if (parsed.services) setServices(mergeProducts(INITIAL_SERVICES, parsed.services));
            if (parsed.exclusives) setExclusives(mergeProducts(INITIAL_EXCLUSIVES, parsed.exclusives));
            if (parsed.vipServices) setVipServices(mergeProducts(INITIAL_VIP_SERVICES, parsed.vipServices));
            if (parsed.notification) setNotification(parsed.notification);
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
            notification
        }));
    }, [mostUnlocked, newCollection, services, exclusives, vipServices, notification]);

    const showNotification = (message: string, type: NotificationType = 'info', link?: string, buttonText?: string) => {
        setNotification({
            message,
            type,
            isVisible: true,
            link,
            buttonText
        });
    };

    const hideNotification = () => {
        setNotification(prev => ({ ...prev, isVisible: false }));
    };

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

    return (
        <AdminContext.Provider value={{
            notification,
            showNotification,
            hideNotification,
            mostUnlocked,
            newCollection,
            services,
            exclusives,
            vipServices,
            addProduct,
            deleteProduct
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
