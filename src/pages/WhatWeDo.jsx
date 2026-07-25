import React, { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, GraduationCap, HeartPulse, Sprout, ShieldAlert, Sparkles } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function WhatWeDo({ onOpenGetInvolved }) {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const elem = document.querySelector(hash);
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const pillarIcons = {
    education: GraduationCap,
    'global-health': HeartPulse,
    'sustainable-livelihoods': Sprout,
    'disaster-relief': ShieldAlert,
    legacy: Sparkles
  };

  return (
    <div className="pt-28 pb-20 space-y-16">
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-lime">Our Strategic Pillars</span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-white">What We Do</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Higherlife Foundation addresses systemic challenges across Africa through five core interconnected pillars—driving sustainable human capital development.
        </p>
      </section>

      {/* Pillars Detail List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {siteData.pillars.map((pillar, idx) => {
          const Icon = pillarIcons[pillar.id] || GraduationCap;
          const isEven = idx % 2 === 0;

          return (
            <div
              key={pillar.id}
              id={pillar.id}
              className="glass-card bg-slate-900/60 rounded-3xl p-8 lg:p-12 border border-slate-800 scroll-mt-32 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              <div className={`space-y-6 ${!isEven ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-brand-lime/10 border border-brand-lime/30 rounded-2xl text-brand-lime">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Pillar 0{idx + 1}</span>
                    <h2 className="text-3xl font-extrabold font-display text-white">{pillar.title}</h2>
                  </div>
                </div>

                <p className="text-sm font-semibold text-brand-lime">{pillar.subtitle}</p>
                <p className="text-sm text-slate-300 leading-relaxed">{pillar.description}</p>

                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Impact Metrics</h4>
                  {pillar.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-brand-lime shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    onClick={onOpenGetInvolved}
                    className="px-6 py-3 rounded-full bg-brand-lime hover:bg-[#b0f065] text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-glow-lime"
                  >
                    <span>Partner in {pillar.title}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-80 sm:h-96 object-cover rounded-2xl border border-slate-700 shadow-2xl"
                />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
