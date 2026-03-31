import React, { useState, useEffect } from 'react';
import { IS_REPUBLIC_DAY_OFFER_ACTIVE } from '../utils';

const RepublicDayPoster: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (IS_REPUBLIC_DAY_OFFER_ACTIVE()) {
            const hasSeenPoster = sessionStorage.getItem('hasSeenRepublicDayPoster');
            if (!hasSeenPoster) setIsVisible(true);
        }
    }, []);

    const closePoster = () => {
        setIsVisible(false);
        sessionStorage.setItem('hasSeenRepublicDayPoster', 'true');
    };

    if (!isVisible) return null;

    return (
        <div
            className="animate-in fade-in duration-700"
            style={{
                position: 'fixed', inset: 0, zIndex: 300,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '24px',
                background: 'rgba(4,10,17,0.92)',
                backdropFilter: 'blur(22px)',
                WebkitBackdropFilter: 'blur(22px)',
            }}
        >
            <div
                className="animate-in zoom-in slide-in-from-bottom-10 duration-700"
                style={{
                    position: 'relative',
                    width: '100%', maxWidth: '380px',
                    borderRadius: '32px',
                    background: 'linear-gradient(160deg, rgba(10,28,46,0.99) 0%, rgba(5,14,22,0.97) 100%)',
                    border: '1px solid rgba(20,184,166,0.28)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.8), 0 0 60px rgba(20,184,166,0.08), inset 0 1px 0 rgba(255,255,255,0.07)',
                    overflow: 'hidden',
                }}
            >
                {/* Top accent */}
                <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.7), rgba(59,130,246,0.6), transparent)' }} />
                {/* Side accent bar */}
                <div style={{ position: 'absolute', left: 0, top: '15%', bottom: '15%', width: '3px', background: 'linear-gradient(180deg, #14b8a6, #3b82f6, #6366f1)', borderRadius: '0 3px 3px 0' }} />

                {/* Ambient glows */}
                <div style={{ position: 'absolute', top: '-30px', right: '-30px', width: '220px', height: '220px', borderRadius: '50%', background: 'rgba(59,130,246,0.1)', filter: 'blur(50px)', pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(20,184,166,0.1)', filter: 'blur(40px)', pointerEvents: 'none' }} />

                {/* Grid dot bg */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(56,189,248,0.055) 1px, transparent 1px)', backgroundSize: '24px 24px', pointerEvents: 'none' }} />

                {/* Close */}
                <button
                    onClick={closePoster}
                    style={{
                        position: 'absolute', top: '18px', right: '18px',
                        width: '38px', height: '38px', borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(56,189,248,0.2)',
                        color: 'rgba(147,197,253,0.8)', fontSize: '15px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', zIndex: 10,
                    }}
                >✕</button>

                {/* Icon */}
                <div style={{ paddingTop: '48px', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ position: 'relative' }}>
                        <div className="pulse-ring" style={{
                            position: 'absolute', inset: '-10px', borderRadius: '50%',
                            background: 'radial-gradient(circle, rgba(20,184,166,0.18), transparent)',
                            filter: 'blur(10px)',
                        }} />
                        <div style={{
                            position: 'relative',
                            width: '90px', height: '90px', borderRadius: '50%',
                            background: 'linear-gradient(135deg, rgba(20,184,166,0.2) 0%, rgba(59,130,246,0.16) 100%)',
                            border: '1px solid rgba(20,184,166,0.38)',
                            boxShadow: '0 0 30px rgba(20,184,166,0.28)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '32px',
                        }}>🎆</div>
                    </div>
                </div>

                {/* Content */}
                <div style={{ padding: '28px 32px 36px', textAlign: 'center' }}>
                    <p style={{
                        fontSize: '9px', fontWeight: 800, letterSpacing: '0.4em', textTransform: 'uppercase', margin: '0 0 8px',
                        background: 'linear-gradient(135deg, #5eead4, #38bdf8)',
                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}>Limited Time</p>

                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 700, fontStyle: 'italic', color: '#f0f9ff', lineHeight: 1.2, margin: '0 0 18px' }}>
                        Special Offer
                    </h3>

                    {/* Divider */}
                    <div style={{ width: '60%', height: '1px', margin: '0 auto 20px', background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.4), rgba(59,130,246,0.35), transparent)' }} />

                    {/* Discount cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ padding: '18px 12px', borderRadius: '18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(56,189,248,0.14)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(186,230,253,0.5)' }}>Standard</span>
                            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, fontStyle: 'italic', color: '#93c5fd' }}>30% <span style={{ fontSize: '13px' }}>OFF</span></span>
                        </div>
                        <div style={{ padding: '18px 12px', borderRadius: '18px', background: 'linear-gradient(135deg, rgba(20,184,166,0.12), rgba(59,130,246,0.09))', border: '1px solid rgba(20,184,166,0.3)', boxShadow: '0 0 20px rgba(20,184,166,0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                            <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5eead4' }}>Premium</span>
                            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, fontStyle: 'italic', background: 'linear-gradient(135deg, #5eead4, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>50% <span style={{ fontSize: '13px' }}>OFF</span></span>
                        </div>
                    </div>

                    <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '14px', lineHeight: 1.7, color: 'rgba(186,230,253,0.55)', margin: '0 0 20px' }}>
                        "Unlock unparalleled access tonight at exceptional value. Purely intimate." ✨
                    </p>

                    {/* CTA Button */}
                    <button
                        onClick={closePoster}
                        style={{
                            width: '100%', padding: '17px 20px', borderRadius: '16px',
                            background: 'linear-gradient(135deg, #14b8a6 0%, #0ea5e9 50%, #6366f1 100%)',
                            border: 'none', color: '#fff',
                            fontSize: '11px', fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase',
                            cursor: 'pointer',
                            boxShadow: '0 12px 40px rgba(20,184,166,0.4)',
                            transition: 'all 0.3s ease',
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 18px 50px rgba(20,184,166,0.5)';
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.transform = 'none';
                            (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(20,184,166,0.4)';
                        }}
                    >
                        Reveal Privileges 💎
                    </button>

                    {/* Timer */}
                    <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '10px 18px', borderRadius: '999px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(56,189,248,0.1)' }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#14b8a6', boxShadow: '0 0 8px rgba(20,184,166,0.9)', flexShrink: 0, animation: 'pulse 2s ease-in-out infinite' }} />
                        <p style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(186,230,253,0.5)', margin: 0 }}>
                            Offer Finalizes At 11:50 PM
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepublicDayPoster;
