import React, { useState, useEffect } from 'react';
import { siteData } from '../data/siteData';
import { Award, Download, TrendingUp, Users, HeartPulse, Sprout, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function OurImpact() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Historia', 'Legal', 'Vision', 'Programas', 'Territorio'];

  const filteredStats = selectedCategory === 'All'
    ? siteData.stats
    : siteData.stats.filter(s => s.category === selectedCategory);

  return (
    <div className="pt-28 pb-20 space-y-16">
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-lime">Impacto institucional</span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-white">Indicadores clave</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Una lectura simple de la trayectoria, reconocimiento legal, lineas de accion y proyeccion de FUNDEPACIFICO.
        </p>

        <div className="pt-2">
          <button
            onClick={() => alert("Consultando Portafolio de Servicios FUNDEPACIFICO 2026...")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-brand-gold hover:bg-[#f5c253] text-slate-950 font-bold text-xs transition-colors shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>Portafolio de Servicios 2026</span>
          </button>
        </div>
      </section>

      {/* Category selector */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 flex-wrap pb-8 border-b border-slate-800">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-brand-lime text-slate-950 shadow-glow-lime'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Impact Stats Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.04 }}
              className="glass-card glass-card-hover bg-slate-900/60 rounded-3xl p-6 md:p-8 border border-slate-800 space-y-4 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-gold uppercase tracking-wider">{stat.category}</span>
                <TrendingUp className="w-4 h-4 text-brand-lime" />
              </div>

              <p className="text-4xl sm:text-5xl font-black font-display text-white">{stat.number}</p>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">{stat.label}</p>

              {/* Progress visual bar */}
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden pt-1">
                <div className="bg-gradient-to-r from-brand-lime to-brand-gold h-full rounded-full w-4/5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

    </div>
  );
}
