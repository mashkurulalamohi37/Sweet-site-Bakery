import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle2 } from 'lucide-react';
import { getWhatsAppLink } from '../../utils/formatters';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppDirect = () => {
    const text = `Assalamu Alaikum Sweet Site Bakery! My name is ${name || 'Customer'}. Message: ${message || 'I have an inquiry.'}`;
    window.open(getWhatsAppLink(text), '_blank');
  };

  return (
    <div className="bg-brand-cream/30 min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-muted">
            Get in Touch
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-brand-brown">
            Contact Sweet Site Bakery
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted">
            We are always happy to discuss cake designs, large corporate orders, and urgent event deliveries in Rangpur.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Contact Details Card */}
          <div className="md:col-span-5 bg-brand-brown text-white p-6 sm:p-10 rounded-3xl shadow-xl flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="font-serif text-2xl font-bold">Bakery Information</h3>
              <p className="text-xs text-brand-lavender leading-relaxed">
                Connect with our head bakers or send reference designs directly over WhatsApp.
              </p>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Phone / WhatsApp</p>
                    <p className="text-brand-lavender">+880 1852-668468</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Bakery Location</p>
                    <p className="text-brand-lavender">Rangpur City, Rangpur, Bangladesh</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-brand-accent shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-white">Baking & Delivery Hours</p>
                    <p className="text-brand-lavender">9:00 AM – 10:00 PM (Everyday)</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <a
                href={getWhatsAppLink("Assalamu Alaikum! I'd like to get in touch with Sweet Site Bakery.")}
                target="_blank"
                rel="noreferrer"
                className="w-full py-3.5 bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white font-semibold text-xs tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Instantly on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="md:col-span-7 bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-brand-brown/10">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-brand-brown">Message Received!</h3>
                <p className="text-xs text-brand-muted max-w-sm mx-auto">
                  Thank you for reaching out to Sweet Site Bakery. We will get back to you within 30 minutes!
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-brand-cream text-brand-brown text-xs font-semibold hover:bg-brand-brown hover:text-white transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-serif text-2xl font-bold text-brand-brown">Send Us an Inquiry</h3>
                <p className="text-xs text-brand-muted">
                  Have a question about cake sizing or allergen requirements? Drop us a note!
                </p>

                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Shakil Ahmed"
                    className="w-full text-xs px-4 py-3 rounded-2xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1">
                    Mobile Phone (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 01852668468"
                    className="w-full text-xs px-4 py-3 rounded-2xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-brand-brown mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your event, preferred flavours, or questions..."
                    className="w-full text-xs px-4 py-3 rounded-2xl bg-brand-cream/40 border border-brand-brown/10 focus:outline-none focus:ring-1 focus:ring-brand-brown"
                  />
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-brand-brown hover:bg-brand-brown-light text-white font-bold text-xs uppercase tracking-wider rounded-2xl flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleWhatsAppDirect}
                    className="py-3.5 px-5 bg-brand-whatsapp hover:bg-brand-whatsapp-hover text-white font-semibold text-xs tracking-wider rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send on WhatsApp</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
