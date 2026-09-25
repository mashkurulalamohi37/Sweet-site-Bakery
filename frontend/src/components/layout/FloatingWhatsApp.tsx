import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { getWhatsAppLink } from '../../utils/formatters';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const defaultMsg = "Hi Sweet Site Bakery! 👋 I would like to inquire about ordering a fresh cake in Rangpur.";

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const url = getWhatsAppLink(customMsg.trim() || defaultMsg);
    window.open(url, '_blank');
    setIsOpen(false);
    setCustomMsg('');
  };

  return (
    <aside aria-label="WhatsApp Assistant" className="fixed bottom-20 md:bottom-8 right-5 z-40">
      {isOpen && (
        <div className="mb-3 w-80 bg-white rounded-2xl shadow-2xl border border-brand-brown/10 overflow-hidden animate-slide-up">
          <div className="bg-brand-whatsapp text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-serif font-bold text-lg">
                SS
              </div>
              <div>
                <h4 className="font-semibold text-sm">Sweet Site Bakery</h4>
                <p className="text-[11px] text-green-100 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></span>
                  Rangpur • Active on WhatsApp
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-full transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-brand-cream/40 text-xs space-y-3">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-brand-brown border border-brand-brown/5 max-w-[90%]">
              <p className="font-medium">Assalamu Alaikum! 🎂✨</p>
              <p className="mt-1 text-brand-muted leading-relaxed">
                Welcome to Sweet Site Bakery. How can we make your celebration unforgettable today?
              </p>
              <span className="block text-[10px] text-brand-muted/60 text-right mt-1">Just now</span>
            </div>
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-brand-brown/5 flex gap-2">
            <input
              type="text"
              value={customMsg}
              onChange={(e) => setCustomMsg(e.target.value)}
              placeholder="Ask about flavours, custom designs..."
              className="flex-1 text-xs px-3 py-2 rounded-xl bg-brand-cream/50 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-whatsapp"
            />
            <button
              type="submit"
              className="bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white p-2 rounded-xl transition-all hover:scale-105"
              aria-label="Send WhatsApp message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2 bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white px-4 py-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 hover:shadow-brand-whatsapp/40"
        aria-label="Direct WhatsApp Ordering"
      >
        <MessageCircle className="w-6 h-6 fill-white" />
        <span className="hidden md:inline-block text-xs font-semibold tracking-wide">
          Order via WhatsApp
        </span>
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-green-400"></span>
        </span>
      </button>
    </aside>
  );
};
