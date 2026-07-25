import React, { useEffect } from 'react';
import { Award, GraduationCap, Building2, CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';
import { siteData } from '../data/siteData';

export default function Grantees({ onOpenJnsModal }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const granteesList = [
    { name: "University of Zimbabwe", focus: "STEM & Medicine Scholarships", country: "Zimbabwe", beneficiaries: "12,000+ Scholars" },
    { name: "National University of Lesotho", focus: "Agricultural Research & Science", country: "Lesotho", beneficiaries: "4,500+ Scholars" },
    { name: "African Leadership University", focus: "Leadership & Global Challenges", country: "Pan-African", beneficiaries: "1,200+ Scholars" },
    { name: "Ministry of Health & Child Care", focus: "Maternal Health Training & EOCs", country: "Zimbabwe", beneficiaries: "6,000 Nurses & Midwives" },
    { name: "Foundational E-Learning Hubs", focus: "Digital Literacy & Content", country: "Burundi & Rwanda", beneficiaries: "2 Million Learners" }
  ];

  return (
    <div className="pt-28 pb-20 space-y-16">
      
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Partners & Scholars</span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-white">Our Grantees</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Empowering educational institutions, healthcare centers, and local civil society networks to deliver sustainable community transformation.
        </p>

        <div className="pt-4 flex justify-center">
          <button
            onClick={onOpenJnsModal}
            className="px-8 py-3.5 rounded-full bg-brand-lime hover:bg-[#b0f065] text-slate-950 font-extrabold text-xs transition-all shadow-glow-lime flex items-center gap-2"
          >
            <Award className="w-4 h-4" />
            <span>2026 JNS Scholarship Awardee Portal</span>
          </button>
        </div>
      </section>

      {/* Grantees Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-lime">Institutional Collaborators</span>
          <h2 className="text-3xl font-black font-display text-white">Featured Grantee Partners</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {granteesList.map((g, idx) => (
            <div key={idx} className="glass-card glass-card-hover bg-slate-900/60 rounded-3xl p-6 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-brand-gold uppercase">{g.country}</span>
                <Building2 className="w-4 h-4 text-slate-400" />
              </div>
              <h3 className="text-xl font-bold font-display text-white">{g.name}</h3>
              <p className="text-xs text-brand-lime font-medium">{g.focus}</p>
              <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-lime" />
                <span>Scope: {g.beneficiaries}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
