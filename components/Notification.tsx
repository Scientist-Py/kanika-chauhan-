
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
        info: 'bg-blue-600',
        success: 'bg-green-600',
        alert: 'bg-red-600',
        promo: 'bg-gradient-to-r from-rose-600 to-purple-600'
    };

    return (
        <div className={`fixed top-4 left-4 right-4 z-[100] md:max-w-md md:left-1/2 md:-translate-x-1/2 rounded-2xl p-4 shadow-2xl shadow-black/50 text-white animate-in slide-in-from-top duration-500 ring-1 ring-white/20 backdrop-blur-md ${bgColors[notification.type]}`}>
            <div className="flex items-start gap-3">
                <div className="text-2xl">
                    {notification.type === 'alert' ? '🚨' : notification.type === 'success' ? '✅' : notification.type === 'promo' ? '💎' : 'ℹ️'}
                </div>
                <div className="flex-1 space-y-1">
                    <p className="font-bold text-sm tracking-wide uppercase opacity-90">{notification.type}</p>
                    <p className="font-medium text-white text-sm leading-relaxed">
                        {notification.message}
                    </p>
                    {notification.link && (
                        <a
                            href={notification.link}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block mt-2 px-4 py-1.5 bg-white text-black text-xs font-bold rounded-full hover:bg-neutral-200 transition-colors"
                        >
                            {notification.buttonText || "Check it out"}
                        </a>
                    )}
                </div>
                <button
                    onClick={hideNotification}
                    className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};

export default Notification;
