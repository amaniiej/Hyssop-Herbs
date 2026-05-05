import { FaMicroscope, FaMagic, FaLeaf } from "react-icons/fa";

export default function Story() {
  return (
    <section id="story" className="relative pt-12 pb-20 px-6 overflow-hidden bg-[#0b1f1a]">
      
      {/* --- REFINED BACKGROUND DYNAMICS --- */}
      <div className="absolute top-0 left-[-5%] w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none opacity-60" />
      <div className="absolute bottom-0 right-[-5%] w-[400px] h-[400px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none opacity-60" />

      {/* Ghost Leaf Silhouettes (Smaller & more subtle) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <svg className="absolute top-0 left-4 w-64 h-64 rotate-12" viewBox="0 0 100 100" fill="white">
          <path d="M50,0 C60,30 90,40 100,70 C100,100 70,100 50,85 C30,100 0,100 0,70 C10,40 40,30 50,0" />
        </svg>
        <svg className="absolute bottom-4 right-4 w-80 h-80 -rotate-12" viewBox="0 0 100 100" fill="white">
          <path d="M10,90 Q30,10 90,10 M30,70 Q50,30 80,20 M15,85 Q40,50 70,40" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        
        {/* --- COMPACT HEADER --- */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-3">
            <div className="h-[1px] w-6 bg-amber-500/50" />
            <span className="text-[10px] tracking-[0.4em] uppercase text-amber-400 font-bold">The Hyssop Ethos</span>
            <div className="h-[1px] w-6 bg-amber-500/50" />
          </div>
          <h3 className="text-3xl md:text-5xl font-serif text-white leading-tight">
            The Journey to <br />
            <span className="italic bg-gradient-to-r from-green-300 via-emerald-400 to-amber-200 bg-clip-text text-transparent">
              Wellness is:
            </span>
          </h3>
        </div>

        {/* --- PILLARS (30% More Compact) --- */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: <FaMicroscope />,
              title: "Science & Spirit",
              desc: "Evidence-based research meets intentional energy."
            },
            {
              icon: <FaMagic />,
              title: "Ancient Healing",
              desc: "Modern medicine returning to ancestral wisdom."
            },
            {
              icon: <FaLeaf />,
              title: "Sacred Remedy",
              desc: "A remembering for body, mind, and spirit."
            }
          ].map((item, idx) => (
            <div key={idx} className="group relative p-6 rounded-[2rem] bg-white/[0.02] backdrop-blur-sm border border-white/5 hover:border-amber-500/30 transition-all duration-500">
              <div className="text-2xl text-amber-400 mb-4 transition-transform duration-500 group-hover:scale-110">
                {item.icon}
              </div>
              <h4 className="text-lg font-serif text-white mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed font-light opacity-80">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* --- COMPACT STATS --- */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          {/* Stat 1 */}
          <div className="relative group p-8 rounded-[2rem] bg-emerald-950/20 border border-green-500/10 overflow-hidden text-center">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <div className="relative z-10">
              <div className="text-5xl md:text-6xl font-bold text-white mb-1 tracking-tighter">
                98<span className="text-xl text-amber-400 ml-1">%</span>
              </div>
              <h5 className="text-green-400/80 tracking-[0.3em] uppercase text-[9px] font-black mb-1">Herbal Purity</h5>
              <p className="text-gray-500 text-xs italic">100% Herbs & Roots</p>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="relative group p-8 rounded-[2rem] bg-emerald-950/20 border border-green-500/10 overflow-hidden text-center">
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-shimmer" />
            <div className="relative z-10">
              <div className="text-5xl md:text-6xl font-bold text-white mb-1 tracking-tighter">
                100<span className="text-xl text-amber-400 ml-1">%</span>
              </div>
              <h5 className="text-green-400/80 tracking-[0.3em] uppercase text-[9px] font-black mb-1">Purely Natural</h5>
              <p className="text-gray-500 text-xs italic">Straight from the Earth</p>
            </div>
          </div>

        </div>

        {/* Footer Signature */}
        <div className="mt-12 text-center">
          <p className="text-white/20 font-serif italic text-xs tracking-widest">
            Crafted with intention • Delivered with love
          </p>
        </div>

      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
      `}</style>
    </section>
  );
}