import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { getDiscountedPrice, IS_REPUBLIC_DAY_OFFER_ACTIVE, getDiscountPercentage } from '../utils';

interface PaymentModalProps {
  product: Product | null;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ product, onClose }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'verifying' | 'failed' | 'unavailable'>('details');
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
    setStep('unavailable');
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
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-500 p-4">
      <div className="w-full max-w-md bg-white rounded-[2rem] p-8 relative overflow-hidden shadow-2xl slide-in-from-bottom-[20px] duration-700">

        {/* Top Accent Line */}
        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-teal-500 to-purple-600 opacity-80"></div>
        <div className="absolute top-0 right-0 p-12 bg-teal-500/10 rounded-full blur-3xl"></div>

        {step !== 'verifying' && (
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 border border-slate-200 z-10 hover:bg-slate-200 transition-all"
          >
            ✕
          </button>
        )}

        {(step === 'payment' || step === 'unavailable') && (
          <button
            onClick={() => setStep('details')}
            className="absolute top-6 left-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 border border-slate-200 z-10 hover:bg-slate-200 transition-all"
          >
            ←
          </button>
        )}

        {step === 'details' && (
          <div className="space-y-8">
            <div className="text-center space-y-4 pt-4">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-teal-100 to-purple-100 flex items-center justify-center text-slate-800 text-4xl mb-6 shadow-sm border border-slate-200 animate-float">
                {product.category === 'call' ? '📞' : product.category === 'chat' ? '💬' : '✨'}
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em]">Premium Access</p>
                <h3 className="text-3xl font-display italic text-slate-800">{product.title}</h3>
              </div>

              <div className="flex flex-col items-center pt-2">
                <p className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-purple-600 leading-none">₹{currentPrice.toLocaleString()}</p>
                {IS_REPUBLIC_DAY_OFFER_ACTIVE() && (
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-slate-400 line-through">₹{selectedPrice.toLocaleString()}</span>
                    <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">-{getDiscountPercentage(selectedPrice)}% OFF</span>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-purple-600 opacity-0 group-hover:opacity-[0.03] transition-opacity"></div>
              <p className="text-[9px] font-black text-teal-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-teal-500 animate-pulse"></span>
                Description
              </p>
              <p className="text-slate-600 leading-relaxed text-sm font-medium">
                {product.description || "Secure your exclusive access to this premium curated experience. Handled with absolute discretion."}
              </p>
            </div>

            {product.priceOptions && product.priceOptions.length > 0 && (
              <div className="grid grid-cols-1 gap-3">
                {product.priceOptions.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedPrice(opt.price)}
                    className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all group ${selectedPrice === opt.price ? 'border-teal-400 bg-teal-50 shadow-[0_8px_32px_rgba(13,148,136,0.1)]' : 'border-slate-100 bg-white hover:border-slate-200'}`}
                  >
                    <span className={`font-bold text-sm ${selectedPrice === opt.price ? 'text-teal-800' : 'text-slate-500'}`}>{opt.label}</span>
                    <span className={`font-black ${selectedPrice === opt.price ? 'text-teal-600' : 'text-slate-400'}`}>₹{getDiscountedPrice(opt.price).toLocaleString()}</span>
                  </button>
                ))}
              </div>
            )}

            <button
              onClick={handleBuy}
              className="w-full py-5 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-black text-sm rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(13,148,136,0.2)] uppercase tracking-widest"
            >
              Secure Checkout
            </button>
          </div>
        )}

        {step === 'unavailable' && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500 text-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center text-4xl mx-auto border border-red-100">
              ⚠️
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-display italic text-slate-800">Kanika is not available right now</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">
                Message her on Telegram for a faster process, otherwise wait and come back later.
                <br /><br />
                Kanika is on a video call right now.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-200 relative overflow-hidden group">
              <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.2em] mb-2">Telegram Username</p>
              <p className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-purple-600 tracking-wider">Your_Kanika</p>
            </div>

            <a
              href="https://t.me/Your_Kanika"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-5 bg-[#0088cc] text-white font-black text-sm rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-[0_20px_40px_rgba(0,136,204,0.2)] uppercase tracking-widest"
            >
              Message on Telegram
            </a>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-8 animate-in slide-in-from-right duration-500 text-center">
            <div className="space-y-1">
              <p className="text-[10px] font-black text-teal-600 uppercase tracking-[0.4em]">Payment Gateway</p>
              <h3 className="text-2xl font-display italic text-slate-800">Complete Transaction</h3>
            </div>

            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-teal-500 to-purple-600 rounded-[3rem] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="bg-white p-6 rounded-[3rem] inline-block mx-auto relative z-10 shadow-lg border border-slate-100">
                <img src={`https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=upi://pay?pa=kanikachauhan@airtel&pn=KanikaChauhan&am=${currentPrice}&cu=INR`} alt="Payment QR" className="w-56 h-56" />
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-purple-600">₹{currentPrice.toLocaleString()}</p>
              <div className="flex items-center justify-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> GPay</span>
                <span>•</span>
                <span>PhonePe</span>
                <span>•</span>
                <span>Paytm</span>
              </div>
            </div>

            <button
              onClick={handlePaid}
              className="w-full py-5 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-black text-sm rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl uppercase tracking-widest"
            >
              Confirm Payment
            </button>
            <p className="text-[10px] text-slate-500 font-medium">Auto-verification in progress after click.</p>
          </div>
        )}

        {step === 'verifying' && (
          <div className="py-20 flex flex-col items-center justify-center space-y-8 text-center animate-in fade-in duration-700">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 border-[6px] border-teal-100 rounded-full"></div>
              <div className="absolute inset-0 border-[6px] border-t-teal-500 rounded-full animate-spin"></div>
              <div className="absolute inset-4 bg-gradient-to-r from-teal-500 to-purple-600 rounded-full opacity-10 blur-xl animate-pulse"></div>
              <span className="text-5xl animate-bounce">✨</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-display italic bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-purple-600">Authenticating...</h3>
              <p className="text-slate-500 text-sm font-medium tracking-wide">Securing your premium connection.</p>
            </div>

            <div className="w-full max-w-xs bg-slate-100 h-1.5 rounded-full overflow-hidden border border-slate-200">
              <div className="bg-gradient-to-r from-teal-500 to-purple-600 h-full transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(13,148,136,0.3)]" style={{ width: `${verificationProgress}%` }}></div>
            </div>
          </div>
        )}

        {step === 'failed' && (
          <div className="space-y-8 text-center animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-red-50 text-red-500 rounded-3xl flex items-center justify-center text-5xl mx-auto border border-red-100 rotate-12">
              ✕
            </div>

            <div className="space-y-2">
              <h3 className="text-3xl font-display italic text-slate-800">Verification Pending</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">System couldn't verify automatically. Please provide your handle for manual clearance.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-5 text-left pt-4">
              <div className="space-y-2">
                <label className="text-[10px] text-teal-600 uppercase font-black tracking-widest ml-1">Identity (Instagram/Twitter)</label>
                <input required type="text" placeholder="@premium_user" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 focus:outline-none focus:border-teal-500 transition-all font-medium placeholder:text-slate-400" />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-teal-600 uppercase font-black tracking-widest ml-1">Payment Reference / UTR</label>
                <input required type="text" placeholder="Transaction ID" className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-800 focus:outline-none focus:border-teal-500 transition-all font-medium placeholder:text-slate-400" />
              </div>

              <button type="submit" className="w-full py-5 bg-gradient-to-r from-teal-500 to-purple-600 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-lg uppercase tracking-widest text-sm">
                Request Manual Clear
              </button>
            </form>

            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Personal approval typically under 120 minutes.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default PaymentModal;
