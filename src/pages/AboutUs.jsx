import React, { useEffect } from 'react';
import { Linkedin, Heart, ShieldCheck, Sparkles } from 'lucide-react';

export default function AboutUs() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const founder = {
    firstName: "Orlando",
    lastName: "Arrechea Orobio",
    role: "CEO · Founder · Executive Director",
  };
  const founderSummary =
    "CEO, fundador y director ejecutivo de Fundepacifico ONG Internacional. Administrador de empresas, magister en Alta Gerencia y MBA en Administracion de Empresas, con amplia formacion profesional continua.";
  const founderLinkedIn =
    "https://www.linkedin.com/in/orlando-arrechea-orobio-4a4a911b5/";

  const timeline = [
    { year: '2010', title: 'Inicio de labor social', desc: 'FUNDEPACIFICO inicia su trabajo comunitario en Buenaventura, ciudad puerto, biodiversa, industrial y ecoturistica.' },
    { year: '2018', title: 'Reconocimiento institucional', desc: 'RESOLUCIÓN MINISTERIO DEL INTERIOR / DIRECCIÓN DE ASUNTOS ÉTNICOS N° 1319 DEL 15 DE NOVIEMBRE DE 2018.' },
    { year: '2023', title: 'Registro ESAL DIAN', desc: 'RESOLUCIÓN DIAN – ESAL No. 2023035272639302634 del 30 de AGOSTO del 2023.' },
    { year: '2026', title: 'Portafolio de servicios', desc: 'Consolidacion de programas de vivienda digna, educacion, salud, seguridad alimentaria, cultura, deporte, agroindustria e innovacion.' },
    { year: '2030', title: 'Vision institucional', desc: 'Ser una organizacion reconocida nacional e internacionalmente por proyectos de calidad, transparencia y compromiso ambiental.' }
  ];

  return (
    <div className="pt-28 pb-20 space-y-20">
      
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Nuestra fundacion</span>
        <h1 className="text-4xl sm:text-6xl font-black font-display text-white">Historia y proposito</h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          FUNDEPACIFICO ONG Internacional reivindica y promueve los derechos humanos, territoriales, sociales, economicos, culturales, ambientales y politicos de comunidades negras, afrocolombianas, raizales y palenqueras.
        </p>
      </section>

      {/* Vision & Mission Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card bg-slate-900/60 rounded-3xl p-8 border border-slate-800 space-y-3">
          <div className="p-3 bg-brand-lime/10 border border-brand-lime/30 rounded-2xl text-brand-lime w-fit">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-display text-white">Vision</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            En 2030, ser una organizacion reconocida nacional e internacionalmente por proyectos de calidad, personal competente, compromiso ambiental, buen manejo de recursos y transparencia.
          </p>
        </div>

        <div className="glass-card bg-slate-900/60 rounded-3xl p-8 border border-slate-800 space-y-3">
          <div className="p-3 bg-brand-gold/10 border border-brand-gold/30 rounded-2xl text-brand-gold w-fit">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold font-display text-white">Misión</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Contribuir desde los territorios con proyectos humanitarios, vivienda digna, educacion, salud, seguridad alimentaria, recreacion, deporte, cultura y agroindustria para mejorar la calidad de vida.
          </p>
        </div>

        <div className="glass-card bg-slate-900/60 rounded-3xl p-8 border border-slate-800 space-y-3">
          <div className="p-3 bg-brand-blue/20 border border-brand-blue/40 rounded-2xl text-brand-blue w-fit">
            <ShieldCheck className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold font-display text-white">Valores</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            Solidaridad, compromiso, excelencia, participacion, transparencia y unidad guian nuestro trabajo con comunidades, aliados, donantes y beneficiarios.
          </p>
        </div>
      </section>

      {/* Founders Focus */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card bg-slate-900/60 rounded-3xl p-8 lg:p-12 border border-slate-800 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Liderazgo</span>
            <h2 className="text-3xl font-black font-display text-white">Fundador y director</h2>
          </div>

          <div className="grid grid-cols-1 gap-8">
            <div className="glass-card bg-slate-950/80 rounded-2xl p-6 border border-slate-800 flex flex-col sm:flex-row gap-6 items-center w-full max-w-3xl mx-auto">
              <img
                src="/branding/orlando-arrechea-orobio.png"
                alt={`${founder.firstName} ${founder.lastName}`}
                className="w-36 h-48 sm:w-40 sm:h-52 object-cover rounded-xl border border-slate-700 shadow-xl"
              />
              <div className="space-y-3 text-center sm:text-left">
                <h3 className="text-xl font-bold text-white font-display">{founder.firstName} {founder.lastName}</h3>
                <p className="text-xs text-brand-lime font-semibold uppercase">{founder.role}</p>
                <p className="text-xs text-slate-300 leading-relaxed">{founderSummary}</p>
                <a
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white hover:text-brand-lime transition-colors"
                  href={founderLinkedIn}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-lime">Hitos</span>
          <h2 className="text-3xl font-black font-display text-white">Trayectoria institucional</h2>
        </div>

        <div className="space-y-6 relative border-l-2 border-slate-800 ml-4 sm:ml-8 pl-6 sm:pl-10">
          {timeline.map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-brand-lime ring-4 ring-slate-950" />
              <div className="glass-card bg-slate-900/60 p-6 rounded-2xl border border-slate-800 space-y-1">
                <span className="text-xs font-mono font-bold text-brand-gold">{item.year}</span>
                <h4 className="text-lg font-bold text-white font-display">{item.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
