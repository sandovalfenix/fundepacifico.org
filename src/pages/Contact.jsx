import React, { useState, useEffect } from 'react';
import { siteData } from '../data/siteData';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe, Clock } from 'lucide-react';

export default function Contact() {
  const [selectedOffice, setSelectedOffice] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    country: 'Zimbabwe',
    message: ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="pt-28 pb-20 space-y-16">
      
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Reach Out</span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-white">Contact Us</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Connect with Higherlife Foundation / FundaPacífico country offices or send us a direct message.
        </p>
      </section>

      {/* Main Grid: Form + Office selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Contact Form */}
        <div className="glass-card bg-slate-900/60 rounded-3xl p-8 border border-slate-800 space-y-6">
          <div>
            <h2 className="text-2xl font-bold font-display text-white">Send Us a Direct Message</h2>
            <p className="text-xs text-slate-400">Fill in the details below and our team will get back to you.</p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. David Moyo"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-lime"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. david@example.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-lime"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-lime"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Scholarships">Scholarships & Education</option>
                    <option value="Partnership">Partnership & Grants</option>
                    <option value="Media">Media & Communications</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type your inquiry or message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-lime"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-brand-lime hover:bg-[#b0f065] text-slate-950 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-glow-lime"
              >
                <Send className="w-4 h-4" />
                <span>Send Message</span>
              </button>
            </form>
          ) : (
            <div className="py-12 text-center space-y-4">
              <div className="inline-flex p-4 bg-brand-lime/20 border border-brand-lime rounded-full text-brand-lime mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">Message Delivered!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your message has been sent to our Secretariat.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2 rounded-xl bg-slate-800 text-white font-semibold text-xs"
              >
                Send Another Message
              </button>
            </div>
          )}
        </div>

        {/* Global Offices Directory */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold font-display text-white">Global Offices Directory</h2>
            <p className="text-xs text-slate-400">Select a country office to view location details.</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {siteData.offices.map((office, idx) => (
              <button
                key={office.country}
                onClick={() => setSelectedOffice(idx)}
                className={`p-3 rounded-xl text-left text-xs font-bold transition-all ${
                  selectedOffice === idx
                    ? 'bg-brand-gold text-slate-950 shadow-md'
                    : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                }`}
              >
                <p className="font-extrabold">{office.country}</p>
                <p className="text-[11px] opacity-80 font-normal">{office.city}</p>
              </button>
            ))}
          </div>

          {/* Active Office Card */}
          <div className="glass-card bg-slate-950 p-6 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-brand-lime/10 border border-brand-lime/30 rounded-xl text-brand-lime">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white font-display">
                  {siteData.offices[selectedOffice].country} Secretariat
                </h3>
                <p className="text-xs text-brand-lime font-semibold">{siteData.offices[selectedOffice].city}</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{siteData.offices[selectedOffice].address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Phone: {siteData.offices[selectedOffice].phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Email: {siteData.offices[selectedOffice].email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Hours: Mon – Fri (08:00 – 17:00 CAT)</span>
              </div>
            </div>
          </div>

        </div>

      </section>

    </div>
  );
}
