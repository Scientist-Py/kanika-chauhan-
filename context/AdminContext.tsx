
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
            if (parsed.mostUnlocked) setMostUnlocked(parsed.mostUnlocked);
            if (parsed.newCollection) setNewCollection(parsed.newCollection);
            if (parsed.services) setServices(parsed.services);
            if (parsed.exclusives) setExclusives(parsed.exclusives);
            if (parsed.vipServices) setVipServices(parsed.vipServices);
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
