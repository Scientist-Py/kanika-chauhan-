
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product } from '../types';
import { MOST_UNLOCKED as INITIAL_MOST_UNLOCKED, NEW_COLLECTION as INITIAL_NEW_COLLECTION, SERVICES as INITIAL_SERVICES, EXCLUSIVES as INITIAL_EXCLUSIVES, VIP_SERVICES as INITIAL_VIP_SERVICES } from '../constants';





interface AdminContextType {
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
                const updatedFromInitial = initial;
                const uniqueStored = stored.filter(p => !initialMap.has(p.id));
                return [...updatedFromInitial, ...uniqueStored];
            };

            if (parsed.mostUnlocked) setMostUnlocked(mergeProducts(INITIAL_MOST_UNLOCKED, parsed.mostUnlocked));
            if (parsed.newCollection) setNewCollection(mergeProducts(INITIAL_NEW_COLLECTION, parsed.newCollection));
            if (parsed.services) setServices(mergeProducts(INITIAL_SERVICES, parsed.services));
            if (parsed.exclusives) setExclusives(mergeProducts(INITIAL_EXCLUSIVES, parsed.exclusives));
            if (parsed.vipServices) setVipServices(mergeProducts(INITIAL_VIP_SERVICES, parsed.vipServices));


        }
    }, []);

    // Save to local storage whenever state changes
    useEffect(() => {
        localStorage.setItem('adminData', JSON.stringify({
            mostUnlocked,
            newCollection,
            services,
            exclusives,
            vipServices
        }));
    }, [mostUnlocked, newCollection, services, exclusives, vipServices]);

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
