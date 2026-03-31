import React, { useMemo, useState } from 'react';
import { Product } from '../types';
import { TRUST_ITEMS } from '../constants';
import { useAdmin } from '../context/AdminContext';
import PaymentModal from '../components/PaymentModal';
import RepublicDayPoster from '../components/RepublicDayPoster';
import { IS_REPUBLIC_DAY_OFFER_ACTIVE, getDiscountedPrice } from '../utils';

type CategoryType = 'new' | 'vip';

const TRUST_ICONS: Record<string, string> = {
    'Lock': '🔒', 'Card': '💳', 'Shield': '🛡️', 'Privacy': '👁️', 'Direct': '⚡',
};

/* ── Teal/Blue/White CSS variables ── */
const C = {
    bg: '#050d14',
    deep: '#071525',
    card: 'rgba(10,30,46,0.88)',
    cardHover: 'rgba(14,38,58,0.92)',
    border: 'rgba(56,189,248,0.16)',
    borderHover: 'rgba(20,184,166,0.4)',
    teal: '#14b8a6',
    tealLight: '#5eead4',
    blue: '#3b82f6',
    blueLight: '#93c5fd',
    indigo: '#6366f1',
    white: '#f0f9ff',
    text: '#e0f2fe',
    muted: 'rgba(186,230,253,0.6)',
    dim: 'rgba(186,230,253,0.38)',
};

const Home: React.FC = () => {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [activeCategory, setActiveCategory] = useState<CategoryType>('new');
    const { newCollection, vipServices } = useAdmin();

    const products = useMemo(() => {
        return activeCategory === 'vip' ? vipServices : newCollection;
    }, [activeCategory, newCollection, vipServices]);

    const categories: { id: CategoryType; label: string; subtitle: string }[] = [
        { id: 'new', label: "What's New", subtitle: 'Fresh Drops' },
        { id: 'vip', label: 'VIP Club', subtitle: 'Inner Circle' },
    ];

    return (
        <div style={{ minHeight: '100vh', background: C.bg, color: C.text }}>

            {/* ── Background ── */}
            <div style={{ position: 'fixed', inset: 0, zIndex: -1, overflow: 'hidden', pointerEvents: 'none' }}>
                {/* Base */}
                <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(ellipse at 15% 25%, rgba(20,184,166,0.13) 0%, transparent 50%), radial-gradient(ellipse at 85% 15%, rgba(59,130,246,0.12) 0%, transparent 45%), radial-gradient(ellipse at 50% 90%, rgba(99,102,241,0.1) 0%, transparent 50%), ${C.bg}` }} />

                {/* Grid dots */}
                <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'radial-gradient(circle, rgba(56,189,248,0.07) 1px, transparent 1px)',
                    backgroundSize: '30px 30px',
                }} />

                {/* Corner accent lines */}
                <div style={{
                    position: 'absolute', top: 0, left: 0, width: '35%', height: '1px',
                    background: 'linear-gradient(90deg, rgba(20,184,166,0.6), transparent)',
                }} />
                <div style={{
                    position: 'absolute', top: 0, right: 0, width: '35%', height: '1px',
                    background: 'linear-gradient(270deg, rgba(59,130,246,0.6), transparent)',
                }} />

                {/* Floating orbs */}
                <div className="orb-drift" style={{
                    position: 'absolute', left: '-100px', top: '10%',
                    width: '500px', height: '500px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(20,184,166,0.14) 0%, transparent 70%)',
                    filter: 'blur(40px)',
                }} />
                <div className="orb-drift-rev" style={{
                    position: 'absolute', right: '-120px', top: '20%',
                    width: '560px', height: '560px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(59,130,246,0.13) 0%, transparent 70%)',
                    filter: 'blur(50px)',
                }} />
                <div className="float" style={{
                    position: 'absolute', bottom: '-60px', left: '30%',
                    width: '600px', height: '400px', borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                }} />
            </div>

            {/* ── Header ── */}
            <header style={{
                position: 'sticky', top: 0, zIndex: 50,
                borderBottom: '1px solid rgba(56,189,248,0.1)',
                background: 'rgba(5,13,20,0.82)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
            }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        {/* Logo mark */}
                        <div style={{
                            width: '44px', height: '44px', borderRadius: '12px',
                            background: 'linear-gradient(135deg, rgba(20,184,166,0.25) 0%, rgba(59,130,246,0.2) 100%)',
                            border: '1px solid rgba(94,234,212,0.35)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 20px rgba(20,184,166,0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                        }}>
                            <span style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: '13px', fontWeight: 700,
                                letterSpacing: '0.1em',
                                background: 'linear-gradient(135deg, #5eead4, #93c5fd)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                            }}>KC</span>
                        </div>
                        <div>
                            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 700, color: '#f0f9ff', lineHeight: 1.1 }}>
                                Kanika Chauhan
                            </p>
                            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.dim, marginTop: '2px' }}>
                                Official Private Room
                            </p>
                        </div>
                    </div>

                    {/* Verified */}
                    <div className="verified-badge" style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '7px 18px', borderRadius: '999px',
                        background: 'rgba(20,184,166,0.1)',
                        border: '1px solid rgba(20,184,166,0.3)',
                    }}>
                        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: C.teal, boxShadow: '0 0 8px rgba(20,184,166,0.9)', display: 'inline-block', flexShrink: 0 }} />
                        <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.26em', textTransform: 'uppercase', color: C.tealLight }}>Verified</span>
                    </div>
                </div>
            </header>

            {/* ── Hero ── */}
            <section style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 32px 20px' }}>
                <div className="grid-overlay" style={{
                    borderRadius: '28px',
                    border: '1px solid rgba(56,189,248,0.18)',
                    background: 'linear-gradient(135deg, rgba(10,28,44,0.97) 0%, rgba(7,21,37,0.94) 60%, rgba(12,30,48,0.96) 100%)',
                    boxShadow: '0 40px 100px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 0 1px rgba(0,0,0,0.2)',
                    padding: '48px',
                    position: 'relative',
                    overflow: 'hidden',
                }}>
                    {/* Accent glows inside hero */}
                    <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />
                    <div style={{ position: 'absolute', bottom: '-40px', left: '-40px', width: '280px', height: '280px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(20,184,166,0.14) 0%, transparent 70%)', filter: 'blur(40px)', pointerEvents: 'none' }} />

                    {/* Top edge accent */}
                    <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.6), rgba(59,130,246,0.5), transparent)' }} />

                    <div style={{ position: 'relative', zIndex: 1, display: 'grid', alignItems: 'center', gap: '40px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))' }}>
                        {/* Left */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                                <span style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                                    padding: '6px 16px', borderRadius: '999px',
                                    background: 'rgba(20,184,166,0.12)',
                                    border: '1px solid rgba(20,184,166,0.3)',
                                    fontSize: '9px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase',
                                    color: C.tealLight,
                                }}>
                                    <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: C.teal, boxShadow: '0 0 6px rgba(20,184,166,0.9)', display: 'inline-block' }} />
                                    Intimacy Collection
                                </span>
                                {IS_REPUBLIC_DAY_OFFER_ACTIVE() && (
                                    <span style={{
                                        padding: '6px 14px', borderRadius: '999px',
                                        background: 'rgba(59,130,246,0.15)',
                                        border: '1px solid rgba(59,130,246,0.3)',
                                        fontSize: '9px', fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase',
                                        color: C.blueLight,
                                    }}>✦ Limited Offer Active</span>
                                )}
                            </div>

                            <h1 style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 'clamp(2.1rem,5vw,3.7rem)',
                                fontWeight: 700, lineHeight: 1.2,
                                color: '#f0f9ff', letterSpacing: '-0.01em', margin: 0,
                            }}>
                                Bold, beautiful{' '}
                                <em style={{
                                    fontStyle: 'italic',
                                    background: 'linear-gradient(135deg, #5eead4 0%, #38bdf8 50%, #818cf8 100%)',
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                }}>and deeply private</em>{' '}
                                premium access.
                            </h1>

                            <p style={{ fontSize: '15px', lineHeight: 1.8, color: C.muted, maxWidth: '480px', margin: 0 }}>
                                A fully curated space with rich visuals, secure flow, and direct access. Choose your vibe and unlock instantly.
                            </p>

                            {/* Teal line accent */}
                            <div style={{ width: '100px', height: '2px', background: 'linear-gradient(90deg, #14b8a6, transparent)', borderRadius: '999px' }} />
                        </div>

                        {/* Right stat grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            {[
                                { label: 'Experience', value: 'Sensual', icon: '✨' },
                                { label: 'Privacy', value: 'Protected', icon: '🔒' },
                                { label: 'Style', value: 'Luxury', icon: '💎' },
                                { label: 'Support', value: 'Direct', icon: '⚡' },
                            ].map((stat) => (
                                <div key={stat.label} style={{
                                    padding: '18px',
                                    borderRadius: '16px',
                                    background: 'rgba(255,255,255,0.04)',
                                    border: '1px solid rgba(56,189,248,0.13)',
                                    backdropFilter: 'blur(10px)',
                                    transition: 'all 0.3s ease',
                                }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(20,184,166,0.08)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(20,184,166,0.3)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                                        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(56,189,248,0.13)';
                                    }}
                                >
                                    <span style={{ fontSize: '18px', display: 'block', marginBottom: '8px' }}>{stat.icon}</span>
                                    <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dim, margin: 0 }}>{stat.label}</p>
                                    <p style={{ marginTop: '5px', fontFamily: "'Playfair Display', serif", fontSize: '19px', fontWeight: 700, color: '#f0f9ff', margin: '5px 0 0' }}>{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Category Nav ── */}
                <nav style={{
                    marginTop: '14px',
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px',
                    padding: '10px',
                    borderRadius: '20px',
                    background: 'rgba(7,21,37,0.78)',
                    border: '1px solid rgba(56,189,248,0.1)',
                    backdropFilter: 'blur(16px)',
                }}>
                    {categories.map((cat) => {
                        const isActive = activeCategory === cat.id;
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                style={{
                                    borderRadius: '14px', padding: '16px 20px', textAlign: 'left',
                                    border: '1px solid',
                                    transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                                    cursor: 'pointer',
                                    background: isActive
                                        ? 'linear-gradient(135deg, rgba(20,184,166,0.2) 0%, rgba(59,130,246,0.14) 100%)'
                                        : 'rgba(255,255,255,0)',
                                    borderColor: isActive ? 'rgba(20,184,166,0.45)' : 'rgba(56,189,248,0.1)',
                                    boxShadow: isActive ? '0 8px 28px rgba(20,184,166,0.18), inset 0 1px 0 rgba(255,255,255,0.07)' : 'none',
                                    transform: isActive ? 'translateY(-1px)' : 'none',
                                }}
                            >
                                <p style={{ fontSize: '14px', fontWeight: 700, color: isActive ? C.tealLight : '#f0f9ff', margin: 0 }}>{cat.label}</p>
                                <p style={{ marginTop: '3px', fontSize: '10px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: isActive ? 'rgba(94,234,212,0.75)' : C.dim, margin: '3px 0 0' }}>
                                    {cat.subtitle}
                                </p>
                            </button>
                        );
                    })}
                </nav>
            </section>

            {/* ── Main Content ── */}
            <main style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 32px 80px', display: 'grid', gap: '28px', gridTemplateColumns: '1fr' }}>
                <div style={{ display: 'grid', gap: '28px', gridTemplateColumns: 'repeat(auto-fit,minmax(600px,1fr))' }}>

                    {/* ── Products ── */}
                    <section style={{ display: 'grid', gap: '16px', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}>
                        {products.map((item, idx) => (
                            <article
                                key={`${item.id}-${idx}`}
                                className="card-hover"
                                style={{
                                    borderRadius: '24px',
                                    border: '1px solid rgba(56,189,248,0.14)',
                                    background: 'linear-gradient(145deg, rgba(10,28,44,0.95) 0%, rgba(7,19,32,0.9) 100%)',
                                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                                    padding: '26px',
                                    position: 'relative', overflow: 'hidden',
                                }}
                            >
                                {/* Card inner gradient accent */}
                                <div style={{ position: 'absolute', top: 0, right: 0, width: '55%', height: '45%', background: 'radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
                                <div style={{ position: 'absolute', top: 0, left: '25%', right: '25%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.35), transparent)' }} />

                                {/* Badges */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                                    {item.isHot && <span className="badge-hot" style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '9px', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>🔥 Hot</span>}
                                    {item.isNew && <span className="badge-new" style={{ padding: '4px 10px', borderRadius: '999px', fontSize: '9px', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase' }}>✦ New</span>}
                                    {item.timing && (
                                        <span style={{ padding: '4px 10px', borderRadius: '999px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(56,189,248,0.16)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.dim }}>
                                            ⏱ {item.timing}
                                        </span>
                                    )}
                                </div>

                                {/* Title & desc */}
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '21px', fontWeight: 700, lineHeight: 1.3, color: '#f0f9ff', margin: '0 0 10px', letterSpacing: '-0.01em' }}>
                                    {item.title}
                                </h3>
                                <p style={{ fontSize: '13.5px', lineHeight: 1.7, color: C.muted, margin: 0 }}>{item.description}</p>

                                {/* Price */}
                                <div style={{ marginTop: '20px', paddingTop: '18px', borderTop: '1px solid rgba(56,189,248,0.1)' }}>
                                    <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dim, margin: '0 0 6px' }}>Access Rate</p>
                                    <p className="price-glow" style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: '28px', fontWeight: 700, margin: '0 0 14px',
                                        background: 'linear-gradient(135deg, #5eead4 0%, #38bdf8 60%, #818cf8 100%)',
                                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                    }}>
                                        ₹{getDiscountedPrice(item.price).toLocaleString()}
                                    </p>
                                    <button
                                        onClick={() => setSelectedProduct(item)}
                                        className="btn-premium"
                                        style={{
                                            width: '100%', padding: '12px 20px', borderRadius: '12px',
                                            fontSize: '11px', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        ▶ Get Access
                                    </button>
                                </div>
                            </article>
                        ))}
                    </section>

                    {/* ── Sidebar ── */}
                    <aside style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                        {/* Trust Signals */}
                        <div style={{
                            padding: '26px', borderRadius: '24px',
                            background: 'linear-gradient(145deg, rgba(10,28,44,0.95) 0%, rgba(7,19,32,0.9) 100%)',
                            border: '1px solid rgba(56,189,248,0.14)',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.4), rgba(59,130,246,0.35), transparent)' }} />

                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}>
                                <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'rgba(20,184,166,0.15)', border: '1px solid rgba(20,184,166,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px' }}>🔐</div>
                                <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.tealLight, margin: 0 }}>Trust Signals</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {TRUST_ITEMS.map((item, index) => (
                                    <div key={index} className="trust-pill" style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px', borderRadius: '12px' }}>
                                        <span style={{ fontSize: '16px', flexShrink: 0 }}>{TRUST_ICONS[item.icon] || '✦'}</span>
                                        <span style={{ fontSize: '13px', fontWeight: 600, color: '#e0f2fe' }}>{item.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Telegram Fast Lane */}
                        <div style={{
                            padding: '28px', borderRadius: '24px',
                            background: 'linear-gradient(145deg, rgba(12,30,50,0.96) 0%, rgba(7,20,36,0.94) 100%)',
                            border: '1px solid rgba(20,184,166,0.22)',
                            boxShadow: '0 20px 50px rgba(0,0,0,0.45), 0 0 40px rgba(20,184,166,0.06)',
                            position: 'relative', overflow: 'hidden',
                        }}>
                            {/* Top teal glow */}
                            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(20,184,166,0.12)', filter: 'blur(50px)', pointerEvents: 'none' }} />
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.55), rgba(59,130,246,0.45), transparent)' }} />

                            {/* Teal accent bar on left */}
                            <div style={{ position: 'absolute', left: 0, top: '20%', bottom: '20%', width: '3px', background: 'linear-gradient(180deg, #14b8a6, #3b82f6)', borderRadius: '0 3px 3px 0' }} />

                            <div style={{ paddingLeft: '12px' }}>
                                <p style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.24em', textTransform: 'uppercase', color: C.tealLight, margin: '0 0 10px' }}>Private Shortcut</p>
                                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#f0f9ff', lineHeight: 1.2, margin: '0 0 12px' }}>
                                    Telegram<br />Fast Lane
                                </h3>
                                <p style={{ fontSize: '13px', lineHeight: 1.75, color: C.muted, margin: '0 0 20px' }}>
                                    When checkout is busy, use Telegram for quick manual support.
                                </p>
                                <a
                                    href="https://t.me/Your_Kanika"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-premium"
                                    style={{
                                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                                        padding: '12px 22px', borderRadius: '12px',
                                        fontSize: '11px', fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
                                        textDecoration: 'none', cursor: 'pointer',
                                    }}
                                >
                                    <span>✈</span> Open Telegram
                                </a>
                            </div>
                        </div>

                        {/* Quote card */}
                        <div style={{
                            padding: '24px', borderRadius: '20px',
                            background: 'rgba(255,255,255,0.025)',
                            border: '1px solid rgba(56,189,248,0.1)',
                            textAlign: 'center',
                        }}>
                            <div style={{ fontSize: '22px', marginBottom: '12px' }}>💫</div>
                            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '15px', lineHeight: 1.75, color: C.muted, margin: '0 0 12px' }}>
                                "Pleasure is always in the details. Yours are safe with me."
                            </p>
                            <div style={{ width: '50px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.5), transparent)', margin: '0 auto 10px' }} />
                            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(20,184,166,0.5)', margin: 0 }}>— Kanika</p>
                        </div>
                    </aside>
                </div>
            </main>

            {/* ── Footer ── */}
            <footer style={{
                borderTop: '1px solid rgba(56,189,248,0.1)',
                background: 'rgba(4,10,17,0.95)',
                padding: '48px 32px',
                textAlign: 'center',
                position: 'relative', overflow: 'hidden',
            }}>
                <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '50%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.4), rgba(59,130,246,0.35), transparent)' }} />
                <div style={{ position: 'absolute', left: 0, top: 0, width: '200px', height: '100px', background: 'radial-gradient(ellipse, rgba(20,184,166,0.06) 0%, transparent 70%)', filter: 'blur(20px)' }} />
                <div style={{ position: 'absolute', right: 0, bottom: 0, width: '200px', height: '100px', background: 'radial-gradient(ellipse, rgba(59,130,246,0.06) 0%, transparent 70%)', filter: 'blur(20px)' }} />

                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, margin: '0 0 14px', background: 'linear-gradient(135deg, #5eead4 0%, #38bdf8 50%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Kanika Chauhan
                </p>

                <div style={{ display: 'flex', gap: '18px', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', flexWrap: 'wrap' }}>
                    {['Privacy', 'Digital Content', 'Contact'].map((item, i, arr) => (
                        <React.Fragment key={item}>
                            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: C.dim }}>{item}</span>
                            {i < arr.length - 1 && <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: 'rgba(20,184,166,0.45)', display: 'inline-block' }} />}
                        </React.Fragment>
                    ))}
                </div>

                <p style={{ fontSize: '11px', color: 'rgba(20,184,166,0.28)', letterSpacing: '0.06em', margin: 0 }}>
                    © 2026 Privilege Group &nbsp;·&nbsp; Secure Access
                </p>
            </footer>

            <PaymentModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
            <RepublicDayPoster />
        </div>
    );
};

export default Home;
