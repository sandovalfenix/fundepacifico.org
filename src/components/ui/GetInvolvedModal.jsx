import React, { useState } from 'react';
import { X, Heart, Users, GraduationCap, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function GetInvolvedModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('partner');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    interest: 'education',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-700/80 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-brand-lime/10 border border-brand-lime/30 rounded-xl text-brand-lime">
                  <Heart className="w-6 h-6 fill-brand-lime text-brand-lime" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white font-display">Get Involved with Higherlife</h3>
                  <p className="text-xs text-slate-400">Join our movement to empower Africa’s next generation.</p>
                </div>
              </div>

              {/* Category tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6 p-1 bg-slate-900/80 rounded-xl border border-slate-800 text-xs font-semibold">
                <button
                  onClick={() => setActiveTab('partner')}
                  className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    activeTab === 'partner' ? 'bg-brand-lime text-slate-900 shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" /> Partner
                </button>
                <button
                  onClick={() => setActiveTab('volunteer')}
                  className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    activeTab === 'volunteer' ? 'bg-brand-lime text-slate-900 shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" /> Volunteer
                </button>
                <button
                  onClick={() => setActiveTab('scholar')}
                  className={`py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
                    activeTab === 'scholar' ? 'bg-brand-lime text-slate-900 shadow' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" /> Scholars
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Ndlovu"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-lime"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@example.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-lime"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Organization / Institution</label>
                    <input
                      type="text"
                      placeholder="e.g. Global Education Initiative"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-lime"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Pillar of Interest</label>
                    <select
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-lime"
                    >
                      <option value="education">Education & Scholarships</option>
                      <option value="health">Global Health</option>
                      <option value="livelihoods">Sustainable Livelihoods</option>
                      <option value="disaster">Disaster Preparedness</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">How would you like to collaborate?</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us about your organization or how you'd like to get involved..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-lime"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-brand-lime hover:bg-[#b0f065] text-slate-900 font-bold text-sm transition-colors flex items-center justify-center gap-2 shadow-glow-lime"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="inline-flex p-4 bg-brand-lime/20 border border-brand-lime rounded-full text-brand-lime mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">Inquiry Received!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you, <span className="text-white font-semibold">{formData.name}</span>. A representative from Higherlife Foundation / FundaPacífico will get in touch with you shortly.
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors"
              >
                Close Window
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
