import React, { useState } from 'react';
import { X, Search, Award, CheckCircle2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteData } from '../../data/siteData';

const defaultStudents = [
  { id: "JNS-2026-1042", name: "Tendai Mukamuri", school: "University of Zimbabwe", program: "BSc Computer Science", status: "Awarded", year: "2026" },
  { id: "JNS-2026-2189", name: "Amina Ndlovu", school: "National University of Science and Technology", program: "MBChB Medicine & Surgery", status: "Awarded", year: "2026" },
  { id: "JNS-2026-3401", name: "Kudzai Chitembwe", school: "African Leadership University", program: "Global Challenges", status: "Awarded", year: "2026" },
  { id: "JNS-2026-5912", name: "Thabo Motsamai", school: "National University of Lesotho", program: "BSc Agriculture Science", status: "Awarded", year: "2026" }
];

export default function JNSOfferLetterModal({ isOpen, onClose }) {
  const studentsList = siteData?.sampleStudents || defaultStudents;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(studentsList[0]);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    setErrorMsg('');
    const query = searchQuery.trim().toLowerCase();
    if (!query) return;

    const found = studentsList.find(
      s => s.id.toLowerCase().includes(query) || s.name.toLowerCase().includes(query)
    );

    if (found) {
      setSelectedStudent(found);
    } else {
      setErrorMsg('No match found for this ID or name. Try searching "Tendai", "Amina", or "JNS-2026-1042"');
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#0f172a] border border-slate-700/80 rounded-2xl p-6 md:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-6 shrink-0">
            <div className="p-3 bg-brand-gold/10 border border-brand-gold/30 rounded-xl text-brand-gold">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white font-display">Joshua Nkomo Scholarship 2026 Portal</h3>
              <p className="text-xs text-slate-400">Search and access your official scholarship award offer letter.</p>
            </div>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="mb-6 shrink-0">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Enter Student Reference ID (e.g. JNS-2026-1042) or Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-brand-gold"
              />
              <button
                type="submit"
                className="absolute right-1.5 px-4 py-1.5 bg-brand-gold text-slate-950 rounded-lg font-bold text-xs hover:bg-[#f5c253] transition-colors"
              >
                Verify
              </button>
            </div>
            {errorMsg && <p className="text-xs text-brand-red mt-2">{errorMsg}</p>}
          </form>

          {/* Sample quick buttons */}
          <div className="mb-6 flex items-center gap-2 flex-wrap shrink-0">
            <span className="text-xs text-slate-400 font-medium">Sample Awardees:</span>
            {studentsList.map((s) => (
              <button
                key={s.id}
                onClick={() => { setSelectedStudent(s); setErrorMsg(''); }}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedStudent?.id === s.id
                    ? 'bg-brand-gold text-slate-950'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {s.name} ({s.id})
              </button>
            ))}
          </div>

          {/* Offer Letter Document Preview */}
          {selectedStudent && (
            <div className="flex-1 overflow-y-auto bg-slate-950 p-6 rounded-xl border border-slate-800 text-slate-200 space-y-4 font-serif text-sm relative shadow-inner">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <h4 className="font-sans font-extrabold text-lg text-white tracking-wide">HIGHERLIFE FOUNDATION</h4>
                  <p className="font-sans text-xs text-brand-gold font-bold uppercase tracking-widest">Joshua Nkomo Scholarship Scheme</p>
                </div>
                <div className="text-right font-sans text-xs text-slate-400">
                  <p>Ref: <span className="text-white font-mono">{selectedStudent.id}</span></p>
                  <p>Date: July 2026</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="font-sans text-xs uppercase tracking-wider text-slate-400 font-semibold">Scholarship Offer & Acceptance Notice</p>
                <h5 className="font-sans text-xl font-bold text-white">{selectedStudent.name}</h5>
                <p className="font-sans text-xs text-slate-300">
                  <span className="text-slate-400">Institution:</span> {selectedStudent.school} &nbsp;|&nbsp; 
                  <span className="text-slate-400"> Program:</span> {selectedStudent.program}
                </p>
              </div>

              <div className="font-sans text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-4 rounded-lg border border-slate-800 space-y-2">
                <p>
                  We are pleased to inform you that the Board of Trustees of Higherlife Foundation has approved your selection as a <strong>Joshua Nkomo Scholar</strong> for the 2026/2027 Academic Year.
                </p>
                <p>
                  This merit-based award covers full tuition fees, academic learning materials, leadership mentorship modules, and access to the Higherlife Alumni Network.
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800 font-sans text-xs">
                <div className="flex items-center gap-2 text-brand-lime font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Status: OFFICIAL AWARD CONFIRMED</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => alert(`Downloading official offer letter PDF for ${selectedStudent.name} (${selectedStudent.id})...`)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-gold text-slate-950 font-bold hover:bg-[#f5c253] transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
