import React, { useState, useEffect } from 'react';
import { BookOpen, Download, Search, FileText, ExternalLink, Tag } from 'lucide-react';

export default function Resources() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const articles = [
    { title: "2026 Higherlife Foundation Annual Impact Report", type: "Report", date: "July 2026", category: "Annual Reports", desc: "Comprehensive evaluation of our 5 pillars across 6 African nations." },
    { title: "Climate-Smart Agriculture: The Pfumvudza Model", type: "Policy Brief", date: "June 2026", category: "Livelihoods", desc: "How micro-plot conservation farming protects smallholders against drought." },
    { title: "Digital Learning Expansion in Rural Secondary Schools", type: "Case Study", date: "May 2026", category: "Education", desc: "Empirical analysis of e-learning hub rollouts across Zimbabwe and Lesotho." },
    { title: "Maternal Health Capacity Building in Referral Hospitals", type: "Health Brief", date: "April 2026", category: "Global Health", desc: "Training 6,000 maternity nurses to reduce infant mortality." },
    { title: "Emergency Operations Centres: Rapid Disaster Response", type: "Whitepaper", date: "March 2026", category: "Disaster Preparedness", desc: "Building national command hubs for disease outbreaks and climate shocks." }
  ];

  const filteredArticles = articles.filter(a => {
    const matchesCategory = activeFilter === 'All' || a.category === activeFilter;
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase()) || a.desc.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-28 pb-20 space-y-16">
      
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-lime">Knowledge Repository</span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-white">Insight & Resources</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Access our latest policy briefs, empirical research studies, annual reports, and field insights on human capital development.
        </p>

        {/* Search */}
        <div className="pt-4 max-w-md mx-auto relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search reports, whitepapers, topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-lime"
          />
        </div>
      </section>

      {/* Filter tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-2 flex-wrap pb-6 border-b border-slate-800">
          {['All', 'Annual Reports', 'Education', 'Global Health', 'Livelihoods', 'Disaster Preparedness'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === cat
                  ? 'bg-brand-lime text-slate-950 shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((art, idx) => (
            <div key={idx} className="glass-card glass-card-hover bg-slate-900/60 rounded-3xl p-6 border border-slate-800 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="px-2.5 py-0.5 rounded-full bg-brand-gold/10 text-brand-gold font-bold">{art.type}</span>
                  <span>{art.date}</span>
                </div>
                <h3 className="text-xl font-bold font-display text-white">{art.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{art.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-semibold">{art.category}</span>
                <button
                  onClick={() => alert(`Downloading "${art.title}" (PDF format)...`)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-brand-lime" />
                  <span>Download Document</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
