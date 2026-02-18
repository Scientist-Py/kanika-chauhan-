
import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { getDiscountedPrice, IS_REPUBLIC_DAY_OFFER_ACTIVE } from '../utils';

interface PaymentModalProps {
  product: Product | null;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ product, onClose }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'verifying' | 'failed'>('details');
  const [verificationProgress, setVerificationProgress] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setSelectedPrice(product.price);
      setStep('details');
    }
  }, [product]);

  if (!product) return null;

  const handleBuy = () => {
    setStep('payment');
  };

  const handlePaid = () => {
    setStep('verifying');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 1;
      setVerificationProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setStep('failed');
      }
    }, 80); // ~8 seconds total
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Request submitted! I will reply under 2 hours.');
    onClose();
  };

  const currentPrice = getDiscountedPrice(selectedPrice);

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-2xl animate-in fade-in duration-500 p-4">
      <div className="w-full max-w-md glass rounded-[3rem] p-8 relative overflow-hidden border border-white/10 shadow-[0_32px_128px_-16px_rgba(212,175,55,0.15)] slide-in-from-bottom-[20px] duration-700">

        {/* Top Accent Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gold-gradient opacity-60"></div>
        <div className="absolute top-0 right-0 p-12 bg-premium-gold/5 rounded-full blur-3xl"></div>

        {step !== 'verifying' && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-premium-gold border border-white/10 z-10 hover:bg-white/10 transition-all"
          >
            ✕
          </button>
        )}

        {step === 'payment' && (
          <button
            onClick={() => setStep('details')}
            className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-premium-gold border border-white/10 z-10 hover:bg-white/10 transition-all"
          >
            ←
          </button>
        )}

        {step === 'details' && (
          <div className="space-y-8">
            <div className="text-center space-y-4 pt-4">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gold-gradient flex items-center justify-center text-black text-4xl mb-6 shadow-[0_10px_40px_rgba(212,175,55,0.3)] animate-float">
                {product.category === 'call' ? '📞' : product.category === 'chat' ? '💬' : '⚜️'}
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-premium-gold uppercase tracking-[0.4em]">Premium Access</p>
                <h3 className="text-3xl font-display italic text-neutral-100">{product.title}</h3>
              </div>

              <div className="flex flex-col items-center pt-2">
                <p className="text-4xl font-black text-gradient-gold leading-none">₹{currentPrice.toLocaleString()}</p>
                {IS_REPUBLIC_DAY_OFFER_ACTIVE() && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-neutral-500 line-through">₹{selectedPrice.toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">-{getDiscountPercentage(selectedPrice)}% OFF</span>
                  </div>
                )}
              </div>
            </div>

            <div className="glass p-6 rounded-[2rem] border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gold-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity"></div>
              <p className="text-[9px] font-black text-premium-gold uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-premium-gold animate-pulse"></span>
                Description
              </p>
              <p className="text-neutral-400 leading-relaxed text-sm font-medium">
                {product.description || "Secure your exclusive access to this premium curated experience. Handled with absolute discretion and artistic excellence."}
              </p>
            </div>

            {product.priceOptions && product.priceOptions.length > 0 && (
              <div className="grid grid-cols-1 gap-3">
                {product.priceOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPrice(opt.price)}
                    className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all group ${selectedPrice === opt.price ? 'border-premium-gold/50 bg-premium-gold/10 shadow-[0_8px_32px_rgba(212,175,55,0.1)]' : 'border-white/5 bg-white/[0.02] hover:border-white/20'}`}
                  >
                    <span className={`font-bold text-sm ${selectedPrice === opt.price ? 'text-white' : 'text-neutral-500'}`}>{opt.label}</span>
                    <span className={`font-black ${selectedPrice === opt.price ? 'text-premium-gold' : 'text-neutral-400'}`}>₹{getDiscountedPrice(opt.price).toLocaleString()}</span>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handleBuy}
              className="w-full py-5 bg-gold-gradient text-black font-black text-sm rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(212,175,55,0.2)] uppercase tracking-widest"
            >
              Secure Checkout
            </button>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500 text-center">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-premium-gold uppercase tracking-[0.4em]">Payment Gateway</p>
              <h3 className="text-2xl font-display italic">Complete Transaction</h3>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gold-gradient rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="bg-white p-6 rounded-[3rem] inline-block mx-auto relative z-10 shadow-2xl">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=kanikachauhan@airtel&pn=KanikaChauhan&am=${currentPrice}&cu=INR`} alt="Payment QR" className="w-56 h-56 mix-blend-multiply" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-3xl font-black text-gradient-gold">₹{currentPrice.toLocaleString()}</p>
              <div className="flex items-center justify-center gap-4 text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> GPay</span>
                <span>•</span>
                <span>PhonePe</span>
                <span>•</span>
                <span>Paytm</span>
              </div>
            </div>

            <button
              onClick={handlePaid}
              className="w-full py-5 bg-gold-gradient text-black font-black text-sm rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl animate-shimmer-bg uppercase tracking-widest"
            >
              Confirm Payment
            </button>
            <p className="text-[10px] text-neutral-500 font-medium">Auto-verification in progress after click.</p>
          </div>
        )}

        {step === 'verifying' && (
          <div className="py-20 flex flex-col items-center justify-center space-y-8 text-center animate-in fade-in duration-700">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 border-[6px] border-premium-gold/10 rounded-full"></div>
              <div className="absolute inset-0 border-[6px] border-t-premium-gold rounded-full animate-spin"></div>
              <div className="absolute inset-4 bg-gold-gradient rounded-full opacity-10 blur-xl animate-pulse"></div>
              <span className="text-5xl animate-bounce">⚜️</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-display italic text-gradient-gold">Authenticating...</h3>
              <p className="text-neutral-500 text-sm font-medium tracking-wide">Securing your premium connection.</p>
            </div>

            <div className="w-full max-w-xs bg-white/5 h-1.5 rounded-full overflow-hidden border border-white/10">
              <div className="bg-gold-gradient h-full transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(212,175,55,0.5)]" style={{ width: `${verificationProgress}%` }}></div>
            </div>
          </div>
        )}

        {step === 'failed' && (
          <div className="space-y-8 text-center animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-3xl flex items-center justify-center text-5xl mx-auto border border-red-500/20 rotate-12">
              ✕
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-display italic">Verification Pending</h3>
              <p className="text-neutral-500 text-sm font-medium leading-relaxed">System couldn't verify automatically. Please provide your handle for manual clearance.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5 text-left pt-4">
              <div className="space-y-2">
                <label className="text-[10px] text-premium-gold uppercase font-black tracking-widest ml-1">Identity (Instagram/Twitter)</label>
                <input required type="text" placeholder="@premium_user" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-premium-gold transition-all font-medium placeholder:text-neutral-600" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-premium-gold uppercase font-black tracking-widest ml-1">Payment Reference / UTR</label>
                <input required type="text" placeholder="Transaction ID" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:outline-none focus:border-premium-gold transition-all font-medium placeholder:text-neutral-600" />
              </div>

              <button type="submit" className="w-full py-5 bg-gold-gradient text-black font-black rounded-2xl hover:scale-105 transition-all shadow-2xl uppercase tracking-widest text-sm">
                Request Manual Clear
              </button>
            </form>

            <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Personal approval typically under 120 minutes.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default PaymentModal;
