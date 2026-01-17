
import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface PaymentModalProps {
  product: Product | null;
  onClose: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ product, onClose }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'verifying' | 'failed'>('details');
  const [verificationProgress, setVerificationProgress] = useState(0);

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

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-rose-500/20 backdrop-blur-md animate-in fade-in duration-300">
      <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 relative overflow-hidden ring-1 ring-rose-100 shadow-2xl slide-in-from-bottom duration-300">

        {step !== 'verifying' && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-rose-50 text-rose-500 z-10 hover:bg-rose-100 transition-colors"
          >
            ✕
          </button>
        )}

        {step === 'payment' && (
          <button
            onClick={() => setStep('details')}
            className="absolute top-4 left-4 w-8 h-8 flex items-center justify-center rounded-full bg-rose-50 text-rose-500 z-10 hover:bg-rose-100 transition-colors"
          >
            ←
          </button>
        )}

        {step === 'details' && (
          <div className="space-y-6">
            <div className="text-center space-y-2 pt-2">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-500/20 flex items-center justify-center text-rose-400 text-3xl mb-4 ring-1 ring-rose-500/20 shadow-lg shadow-rose-500/10">
                {product.category === 'call' ? '📞' : product.category === 'chat' ? '💬' : '🔥'}
              </div>
              <h3 className="text-xl font-bold text-neutral-900">{product.title}</h3>
              <p className="text-2xl font-black text-rose-600">₹{product.price.toLocaleString()}</p>
            </div>

            <div className="bg-rose-50/50 rounded-2xl p-5 border border-rose-100">
              <p className="text-sm font-medium text-rose-400 uppercase tracking-widest mb-2 text-xs">Description</p>
              <p className="text-neutral-700 leading-relaxed font-medium">
                {product.description || "Unlock exclusive access to this premium content. Experience the best quality and personal attention."}
              </p>
            </div>

            <button
              onClick={handleBuy}
              className="w-full py-4 bg-rose-600 text-white font-black text-lg rounded-2xl hover:bg-rose-700 active:scale-95 transition-all shadow-xl shadow-rose-200"
            >
              PROCEED TO BUY
            </button>
          </div>
        )}

        {step === 'payment' && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300 text-center">
            <h3 className="text-lg font-bold text-white">Scan to Pay</h3>

            <div className="bg-white p-4 rounded-xl inline-block mx-auto mx-auto">
              <img src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=kanikachauhan@airtel&pn=KanikaChauhan&am=${product.price}&cu=INR`} alt="Payment QR" className="w-48 h-48 mix-blend-multiply" />
            </div>

            <p className="text-neutral-400 text-sm">Scan with any UPI App<br />(GPay, PhonePe, Paytm)</p>

            <button
              onClick={handlePaid}
              className="w-full py-4 bg-rose-600 text-white font-bold text-lg rounded-2xl hover:bg-rose-700 active:scale-95 transition-all shadow-lg shadow-rose-500/20 animate-pulse"
            >
              I HAVE PAID
            </button>
          </div>
        )}

        {step === 'verifying' && (
          <div className="py-12 flex flex-col items-center justify-center space-y-6 text-center">
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 border-4 border-rose-500/30 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-rose-500 rounded-full animate-spin"></div>
              <span className="text-2xl animate-bounce">💋</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-bold text-neutral-900 animate-pulse">Verifying Payment...</h3>
              <p className="text-rose-600 text-sm font-bold italic">"Checking if you were naughty enough..." 😈</p>
            </div>

            <div className="w-full bg-neutral-800 h-2 rounded-full overflow-hidden">
              <div className="bg-rose-500 h-full transition-all duration-100 ease-linear" style={{ width: `${verificationProgress}%` }}></div>
            </div>
          </div>
        )}

        {step === 'failed' && (
          <div className="space-y-6 text-center animate-in zoom-in duration-300">
            <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center text-4xl mx-auto ring-4 ring-red-500/10">
              ✕
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-neutral-900">Payment Not Detected 😢</h3>
              <p className="text-neutral-500 text-sm font-medium">We couldn't verify your payment automatically.</p>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-left">
              <div className="space-y-2">
                <label className="text-xs text-rose-400 uppercase font-black">Your Name / Instagram ID</label>
                <input required type="text" placeholder="@yourname" className="w-full bg-rose-50 border border-rose-100 rounded-xl p-3 text-neutral-900 focus:outline-none focus:border-rose-500 font-medium" />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-rose-400 uppercase font-black">Transaction ID / Screenshot</label>
                <input required type="text" placeholder="Enter Reference No." className="w-full bg-rose-50 border border-rose-100 rounded-xl p-3 text-neutral-900 focus:outline-none focus:border-rose-500 font-medium" />
              </div>

              <button type="submit" className="w-full py-4 bg-rose-600 text-white font-black rounded-2xl hover:bg-rose-700 transition-colors shadow-lg shadow-rose-200">
                Submit for Manual Check
              </button>
            </form>

            <p className="text-[10px] text-rose-400 font-bold uppercase tracking-wider">I will personally check and reply under 2 hours. ❤️</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default PaymentModal;
