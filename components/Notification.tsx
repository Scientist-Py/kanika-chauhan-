
import React, { useEffect, useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { X } from 'lucide-react';

const Notification: React.FC = () => {
    const { notification, hideNotification } = useAdmin();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (notification.isVisible) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [notification.isVisible]);

    if (!show) return null;

    const bgColors = {
        info: 'bg-white border-blue-100',
        success: 'bg-white border-green-100',
        alert: 'bg-white border-red-100',
        promo: 'bg-white border-rose-100'
    };

    const textColors = {
        info: 'text-blue-600',
        success: 'text-green-600',
        alert: 'text-red-500',
        promo: 'text-rose-500'
    }

    return (
        <div className={`fixed top-4 left-4 right-4 z-[100] md:max-w-md md:left-1/2 md:-translate-x-1/2 rounded-2xl p-5 shadow-2xl shadow-rose-200/50 border animate-in slide-in-from-top duration-500 backdrop-blur-md ${bgColors[notification.type]}`}>
            <div className="flex items-start gap-4">
                <div className="text-2xl drop-shadow-sm">
                    {notification.type === 'alert' ? '🚨' : notification.type === 'success' ? '✅' : notification.type === 'promo' ? '🎀' : '✨'}
                </div>
                <div className="flex-1 space-y-1">
                    <p className={`font-black text-[10px] tracking-widest uppercase ${textColors[notification.type]}`}>{notification.type}</p>
                    <p className="font-bold text-neutral-800 text-sm leading-relaxed">
                        {notification.message}
                    </p>
                    {notification.link && (
                        <a
                            href={notification.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-3 px-6 py-2 bg-rose-500 text-white text-xs font-black rounded-full hover:bg-rose-600 transition-all shadow-lg shadow-rose-200"
                        >
                            {notification.buttonText || "Check it out"}
                        </a>
                    )}
                </div>
                <button
                    onClick={hideNotification}
                    className="p-1.5 hover:bg-rose-50 text-neutral-400 rounded-full transition-colors"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};

export default Notification;
