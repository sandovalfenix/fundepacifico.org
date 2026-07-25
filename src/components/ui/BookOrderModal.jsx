import React, { useState } from 'react';
import { X, BookOpen, ExternalLink, ShoppingCart, Star, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BookOrderModal({ isOpen, onClose }) {
  const [ordered, setOrdered] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-[#0f172a] border border-slate-700/80 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {!ordered ? (
            <div className="space-y-6">
              
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <img
                  src="/assets/9f4ab50d0dbb44ef00607adfcd25edb685d63cb1-928x1240.jpeg"
                  alt="And Still We Rise Book Cover"
                  className="w-36 h-48 object-cover rounded-xl shadow-2xl border border-slate-700 shrink-0"
                />

                <div className="space-y-2 text-center sm:text-left">
                  <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-brand-gold" /> Official Foundation Publication
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">And Still We Rise</h3>
                  <p className="text-xs text-slate-400 font-medium">Honouring Decades of Lives Transformed</p>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">
                    A powerful reflection on decades of transformative impact led by Higherlife Foundation across Africa, capturing the vision, faith, resilience, and commitment of Tsitsi and Strive Masiyiwa.
                  </p>
                </div>
              </div>

              {/* Format selection */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Available Formats</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <a
                    href="https://www.amazon.co.uk"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-900 border border-slate-700 hover:border-brand-lime rounded-xl text-left transition-colors group block"
                  >
                    <p className="text-xs font-bold text-white group-hover:text-brand-lime">Hardcover Edition</p>
                    <p className="text-[11px] text-slate-400">$24.99 • Amazon</p>
                  </a>

                  <a
                    href="https://www.amazon.co.uk"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-900 border border-slate-700 hover:border-brand-lime rounded-xl text-left transition-colors group block"
                  >
                    <p className="text-xs font-bold text-white group-hover:text-brand-lime">Kindle / eBook</p>
                    <p className="text-[11px] text-slate-400">$9.99 • Immediate</p>
                  </a>

                  <a
                    href="https://www.audible.com"
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-slate-900 border border-slate-700 hover:border-brand-lime rounded-xl text-left transition-colors group block"
                  >
                    <p className="text-xs font-bold text-white group-hover:text-brand-lime">Audible Audiobook</p>
                    <p className="text-[11px] text-slate-400">$14.99 • Narrated</p>
                  </a>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <span className="text-xs text-slate-400">All proceeds support foundation scholarships.</span>
                <button
                  onClick={() => setOrdered(true)}
                  className="px-6 py-2.5 rounded-xl bg-brand-lime hover:bg-[#b0f065] text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-glow-lime"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Reserve Copy</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="py-8 text-center space-y-4">
              <div className="inline-flex p-4 bg-brand-lime/20 border border-brand-lime rounded-full text-brand-lime mb-2">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-bold text-white font-display">Reservation Confirmed!</h3>
              <p className="text-sm text-slate-300 max-w-md mx-auto">
                Thank you for supporting Higherlife Foundation. Details regarding your book reservation and dispatch schedule have been logged.
              </p>
              <button
                onClick={() => { setOrdered(false); onClose(); }}
                className="mt-4 px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm transition-colors"
              >
                Done
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
