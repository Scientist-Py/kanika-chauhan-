import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { getDiscountedPrice, IS_REPUBLIC_DAY_OFFER_ACTIVE, getDiscountPercentage } from '../utils';

interface PaymentModalProps {
  product: Product | null;
  onClose: () => void;
}

const C = {
  bg: '#050d14',
  card: 'linear-gradient(160deg, rgba(10,28,46,0.98) 0%, rgba(5,14,22,0.96) 100%)',
  border: 'rgba(56,189,248,0.2)',
  borderHover: 'rgba(20,184,166,0.4)',
  teal: '#14b8a6',
  tealLight: '#5eead4',
  blue: '#3b82f6',
  blueLight: '#93c5fd',
  text: '#e0f2fe',
  muted: 'rgba(186,230,253,0.6)',
  dim: 'rgba(186,230,253,0.38)',
};

const btnPrimary: React.CSSProperties = {
  width: '100%', padding: '15px 20px', borderRadius: '14px',
  background: 'linear-gradient(135deg, rgba(20,184,166,0.25) 0%, rgba(59,130,246,0.2) 100%)',
  border: '1px solid rgba(94,234,212,0.4)',
  color: '#e0f2fe',
  fontSize: '11px', fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase',
  cursor: 'pointer',
  boxShadow: '0 8px 24px rgba(20,184,166,0.18)',
  transition: 'all 0.25s ease',
};

const PaymentModal: React.FC<PaymentModalProps> = ({ product, onClose }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'verifying' | 'failed' | 'unavailable'>('details');
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);

  useEffect(() => {
    if (product) { setSelectedPrice(product.price); setStep('details'); }
  }, [product]);

  if (!product) return null;

  const handleBuy = () => setStep('unavailable');
  const handlePaid = () => {
    setStep('verifying');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setVerificationProgress(progress);
      if (progress >= 100) { clearInterval(interval); setStep('failed'); }
    }, 80);
  };
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Request submitted! I will reply under 2 hours.');
    onClose();
  };

  const currentPrice = getDiscountedPrice(selectedPrice);

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        padding: '16px',
        background: 'rgba(4,10,17,0.88)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div
        className="animate-in fade-in slide-in-from-bottom-6 duration-500"
        style={{
          position: 'relative',
          width: '100%', maxWidth: '440px',
          borderRadius: '28px',
          background: C.card,
          border: '1px solid rgba(56,189,248,0.2)',
          boxShadow: '0 40px 100px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06), 0 0 60px rgba(20,184,166,0.06)',
          padding: '32px',
          overflow: 'hidden',
        }}
      >
        {/* Top accent line */}
        <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(20,184,166,0.6), rgba(59,130,246,0.5), transparent)' }} />
        {/* Ambient glow */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(59,130,246,0.1)', filter: 'blur(50px)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-30px', left: '-20px', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(20,184,166,0.1)', filter: 'blur(40px)', pointerEvents: 'none' }} />

        {/* Close btn */}
        {step !== 'verifying' && (
          <button onClick={onClose} style={{ position: 'absolute', top: '18px', right: '18px', width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(56,189,248,0.18)', color: C.blueLight, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>✕</button>
        )}
        {(step === 'payment' || step === 'unavailable') && (
          <button onClick={() => setStep('details')} style={{ position: 'absolute', top: '18px', left: '18px', width: '38px', height: '38px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(56,189,248,0.18)', color: C.blueLight, fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>←</button>
        )}

        {/* ── DETAILS ── */}
        {step === 'details' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            <div style={{ textAlign: 'center', paddingTop: '8px' }}>
              <p style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.32em', textTransform: 'uppercase', color: C.tealLight, margin: '0 0 10px' }}>Premium Access</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: '#f0f9ff', lineHeight: 1.25, margin: '0 0 12px' }}>{product.title}</h3>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 700, margin: '0', background: 'linear-gradient(135deg, #5eead4, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                ₹{currentPrice.toLocaleString()}
              </p>
              {IS_REPUBLIC_DAY_OFFER_ACTIVE() && (
                <div style={{ marginTop: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '12px', color: C.dim, textDecoration: 'line-through' }}>₹{selectedPrice.toLocaleString()}</span>
                  <span style={{ padding: '3px 10px', borderRadius: '999px', background: 'rgba(20,184,166,0.15)', border: '1px solid rgba(20,184,166,0.3)', fontSize: '9px', fontWeight: 800, letterSpacing: '0.2em', color: C.tealLight }}>
                    -{getDiscountPercentage(selectedPrice)}% OFF
                  </span>
                </div>
              )}
            </div>

            <div style={{ padding: '18px', borderRadius: '16px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(56,189,248,0.12)' }}>
              <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dim, margin: '0 0 8px' }}>Description</p>
              <p style={{ fontSize: '13px', lineHeight: 1.75, color: C.muted, margin: 0 }}>
                {product.description || 'Secure your exclusive access to this premium curated experience. Handled with absolute discretion.'}
              </p>
            </div>

            {product.priceOptions && product.priceOptions.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {product.priceOptions.map((opt, idx) => {
                  const isSelected = selectedPrice === opt.price;
                  return (
                    <button key={idx} onClick={() => setSelectedPrice(opt.price)} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '14px 18px', borderRadius: '14px',
                      border: '1px solid',
                      borderColor: isSelected ? 'rgba(20,184,166,0.45)' : 'rgba(56,189,248,0.15)',
                      background: isSelected ? 'linear-gradient(135deg, rgba(20,184,166,0.18), rgba(59,130,246,0.12))' : 'rgba(255,255,255,0.03)',
                      cursor: 'pointer', transition: 'all 0.25s ease',
                      boxShadow: isSelected ? '0 0 20px rgba(20,184,166,0.14)' : 'none',
                    }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#f0f9ff' }}>{opt.label}</span>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '16px', fontWeight: 700, color: isSelected ? C.tealLight : C.muted }}>
                        ₹{getDiscountedPrice(opt.price).toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}

            <button onClick={handleBuy} style={btnPrimary}>▶ Secure Checkout</button>
          </div>
        )}

        {/* ── UNAVAILABLE ── */}
        {step === 'unavailable' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', textAlign: 'center' }}>
            <div style={{ margin: '8px auto 0', width: '72px', height: '72px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(20,184,166,0.18), rgba(59,130,246,0.14))', border: '1px solid rgba(20,184,166,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>⚡</div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#f0f9ff', margin: '0 0 12px' }}>Kanika is not available right now</h3>
              <p style={{ fontSize: '13px', lineHeight: 1.75, color: C.muted, margin: 0 }}>Message her on Telegram for a faster process, otherwise wait and come back later.<br /><br />Kanika is on a video call right now.</p>
            </div>
            <div style={{ padding: '16px 20px', borderRadius: '14px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(56,189,248,0.14)' }}>
              <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dim, margin: '0 0 8px' }}>Telegram Username</p>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 700, margin: 0, background: 'linear-gradient(135deg, #5eead4, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Your_Kanika</p>
            </div>
            <a href="https://t.me/Your_Kanika" target="_blank" rel="noopener noreferrer" style={{ ...btnPrimary, display: 'block', textDecoration: 'none' }}>✈ Message on Telegram</a>
          </div>
        )}

        {/* ── PAYMENT ── */}
        {step === 'payment' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', textAlign: 'center' }}>
            <div>
              <p style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.3em', textTransform: 'uppercase', color: C.tealLight, margin: '0 0 8px' }}>Payment Gateway</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#f0f9ff', margin: 0 }}>Complete Transaction</h3>
            </div>
            <div style={{ margin: '0 auto', padding: '14px', borderRadius: '18px', background: '#fff', boxShadow: '0 0 40px rgba(20,184,166,0.2), 0 12px 40px rgba(0,0,0,0.5)' }}>
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=240x240&data=upi://pay?pa=kanikachauhan@airtel&pn=KanikaChauhan&am=${currentPrice}&cu=INR`} alt="Payment QR" style={{ width: '220px', height: '220px', display: 'block' }} />
            </div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, margin: 0, background: 'linear-gradient(135deg, #5eead4, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>₹{currentPrice.toLocaleString()}</p>
            <button onClick={handlePaid} style={btnPrimary}>Confirm Payment</button>
            <p style={{ fontSize: '11px', color: C.dim, margin: 0 }}>Auto-verification in progress after click.</p>
          </div>
        )}

        {/* ── VERIFYING ── */}
        {step === 'verifying' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '24px', padding: '48px 0', textAlign: 'center' }}>
            <div style={{ position: 'relative', width: '72px', height: '72px' }}>
              <div style={{ width: '72px', height: '72px', borderRadius: '50%', border: '3px solid rgba(56,189,248,0.15)', borderTop: '3px solid #14b8a6', animation: 'spin 1s linear infinite' }} />
              <div style={{ position: 'absolute', inset: '8px', borderRadius: '50%', border: '2px solid rgba(59,130,246,0.12)', borderBottom: '2px solid #3b82f6', animation: 'spin 1.5s linear infinite reverse' }} />
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 700, color: '#f0f9ff', margin: '0 0 6px' }}>Authenticating...</h3>
              <p style={{ fontSize: '13px', color: C.muted, margin: 0 }}>Securing your premium connection.</p>
            </div>
            <div style={{ width: '100%', maxWidth: '280px', height: '6px', borderRadius: '999px', background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
              <div style={{ height: '100%', borderRadius: '999px', background: 'linear-gradient(90deg, #14b8a6, #3b82f6, #6366f1)', width: `${verificationProgress}%`, transition: 'width 0.1s linear', boxShadow: '0 0 12px rgba(20,184,166,0.6)' }} />
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* ── FAILED ── */}
        {step === 'failed' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px', textAlign: 'center' }}>
            <div style={{ margin: '8px auto 0', width: '72px', height: '72px', borderRadius: '20px', background: 'linear-gradient(135deg, rgba(239,68,68,0.2), rgba(251,146,60,0.15))', border: '1px solid rgba(239,68,68,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>✗</div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 700, color: '#f0f9ff', margin: '0 0 10px' }}>Verification Pending</h3>
              <p style={{ fontSize: '13px', lineHeight: 1.75, color: C.muted, margin: 0 }}>System couldn't verify automatically. Please provide your handle for manual clearance.</p>
            </div>
            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
              <div>
                <label style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dim, marginBottom: '8px', marginLeft: '4px' }}>Identity (Instagram/Twitter)</label>
                <input required type="text" placeholder="@premium_user" className="input-lux" style={{ width: '100%', padding: '13px 16px', borderRadius: '13px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '9px', fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: C.dim, marginBottom: '8px', marginLeft: '4px' }}>Payment Reference / UTR</label>
                <input required type="text" placeholder="Transaction ID" className="input-lux" style={{ width: '100%', padding: '13px 16px', borderRadius: '13px', fontSize: '14px', boxSizing: 'border-box' }} />
              </div>
              <button type="submit" style={btnPrimary}>Request Manual Clear</button>
            </form>
            <p style={{ fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(20,184,166,0.4)', margin: 0 }}>Personal approval typically under 120 minutes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
