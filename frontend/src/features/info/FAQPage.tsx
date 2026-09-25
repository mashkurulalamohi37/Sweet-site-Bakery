import React, { useState } from 'react';
import { ChevronDown, Sparkles, HelpCircle, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../../utils/formatters';

export const FAQPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the minimum order amount for delivery in Rangpur?',
      a: 'The minimum order amount is ৳499 for delivery anywhere across Rangpur city. We ensure all cakes are baked fresh per order and handled with strict refrigerated delivery boxes.',
    },
    {
      q: 'What makes Sweet Site Bakery cakes 100% royal & premium?',
      a: 'All our cakes are made with 100% pure homemade churned butter (never margarine or vegetable dalda) and finished with signature Ever-Whipped frosting blended with melted white chocolate and imported Belgian cocoa.',
    },
    {
      q: 'How many Pound Cake flavours do you offer?',
      a: 'We have 28 distinct royal pound cake flavours starting from ৳599 (Standard Vanilla/Orange) up to ৳1,999 (our signature Chocolate Over Loaded Cake). In addition, we offer 17 artisanal bakery items including Korean Bento Box Cakes, Basque Cheesecakes, Cupcakes, and Jar Cakes.',
    },
    {
      q: 'How far in advance should I place my cake order?',
      a: 'For standard pound cakes and bento cakes, ordering 4 to 6 hours in advance is sufficient. For bespoke 2-tier celebration cakes or custom photo designs from our Custom Studio, we recommend placing orders 24 hours prior to your event.',
    },
    {
      q: 'Which payment methods do you accept in Rangpur?',
      a: 'We accept Cash on Delivery (COD) for most standard orders, as well as bKash and Nagad Send Money payments to our official number (+880 1852-668468).',
    },
    {
      q: 'Can I customize the flavor, colors, and writing on the cake?',
      a: 'Absolutely! You can add custom piping text right on any product page for free, or launch our 6-Step Custom Studio to design sponges, frostings, tiered heights, and upload reference photos.',
    },
    {
      q: 'Do you deliver to all areas of Rangpur?',
      a: 'Yes, we deliver across Dhap, Medical Mor, Jahaj Company Mor, RK Road, Modern Mor, Lalbagh, Carmichael College area, and surrounding Rangpur regions.',
    },
  ];

  return (
    <div className="bg-brand-cream/30 min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">
            Got Questions?
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-brand-brown">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted">
            Everything you need to know about our homemade bakes, delivery zones, and custom ordering.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-brand-brown/10 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 text-brand-brown hover:bg-brand-cream/30 transition-colors"
                >
                  <span className="font-serif font-bold text-base sm:text-lg">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-brand-muted transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-brand-brown' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-brand-muted leading-relaxed border-t border-brand-brown/5 animate-fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still have questions */}
        <div className="bg-brand-brown text-white p-6 sm:p-8 rounded-3xl text-center space-y-4 shadow-lg">
          <HelpCircle className="w-8 h-8 text-brand-accent mx-auto" />
          <h3 className="font-serif text-2xl font-bold">Still have a question?</h3>
          <p className="text-xs text-brand-lavender max-w-md mx-auto">
            Our bakery team is online on WhatsApp to answer your custom cake questions immediately.
          </p>
          <a
            href={getWhatsAppLink("Assalamu Alaikum! I have a question regarding cake ordering in Rangpur.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white text-xs font-semibold shadow-md transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp (+880 1852-668468)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
