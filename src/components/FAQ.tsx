import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Where do the herbs originate?",
      a: "Our herbs are ethically wild-harvested at peak lunar potency. We source directly from the highlands of Ethiopia and organic estates in the Americas, ensuring every leaf carries its original healing vibration."
    },
    {
      q: "How do I prepare the traditional infusions?",
      a: "Preparation is a ritual. For infusions, steep 1-2 teaspoons in 85°C water for 12 minutes. For roots, a slow 20-minute decoction is best. A detailed guide is included with every order."
    },
    {
      q: "Do you provide global shipping?",
      a: "Yes. From our hubs in Addis Ababa and Dallas, we bridge the globe. We use eco-conscious, light-blocking packaging to ensure the herbs reach your doorstep fresh and potent."
    },
    {
      q: "Are these safe to use with medication?",
      a: "Nature is powerful. While our herbs are pure, they are potent. We strongly advise a consultation with your healthcare provider if you are on prescription protocols."
    }
  ];

  const isAnyOpen = openIndex !== null;

  return (
    <section id="faq" className="relative py-24 px-6 bg-[#0b1f1a] overflow-hidden">
      
      {/* --- ALIVE BACKGROUND: CURLY LINES & GLOWING MOTION --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Radiating Gradients */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 blur-[160px] rounded-full animate-pulse-slow" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full animate-bounce-slow" />
        
        {/* Animated Curly Lines */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000">
          <path 
            d="M-100,200 C150,50 350,450 500,200 C650,50 850,450 1100,200" 
            stroke="white" strokeWidth="0.5" fill="none" 
            className="animate-draw-path" 
          />
          <path 
            d="M1100,800 C850,600 650,1000 500,800 C350,600 150,1000 -100,800" 
            stroke="rgba(34,197,94,0.3)" strokeWidth="1" fill="none" 
            className="animate-draw-path-reverse" 
          />
          <path 
            d="M500,-100 Q700,500 500,1100" 
            stroke="rgba(251,191,36,0.1)" strokeWidth="1" fill="none" 
          />
        </svg>

        {/* Grainy Finish */}
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay" 
             style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/asfalt-light.png')` }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-16 items-center">
          
          {/* --- LEFT SIDE: COMPACT QUESTIONS (75%) --- */}
          <div className="lg:col-span-9">
            <header className="mb-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-[2px] w-8 bg-amber-500" />
                <span className="text-[10px] tracking-[0.5em] uppercase text-amber-500 font-black">Botanical Inquiries</span>
              </div>
              <h3 className="text-5xl md:text-7xl font-serif text-white leading-tight">
                Common <span className="italic text-green-400 font-light">Wisdom</span>
              </h3>
            </header>

            <div className="space-y-1">
              {faqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`transition-all duration-500 border-b border-white/5 ${openIndex === i ? "bg-white/[0.03] backdrop-blur-sm" : ""}`}
                >
                  <button 
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full flex items-center justify-between py-6 px-4 text-left cursor-pointer group"
                  >
                    <span className={`text-base md:text-lg font-bold tracking-wide transition-all duration-500 ${openIndex === i ? "text-green-400" : "text-gray-300 group-hover:text-white"}`}>
                      {faq.q}
                    </span>
                    <div className={`w-8 h-8 rounded-full border transition-all duration-500 flex items-center justify-center ${openIndex === i ? "rotate-90 bg-green-500 border-green-500 text-[#0b1f1a]" : "border-white/10 text-white/40 group-hover:border-white"}`}>
                      {openIndex === i ? <FaMinus className="text-[10px]" /> : <FaPlus className="text-[10px]" />}
                    </div>
                  </button>
                  
                  <div className={`overflow-hidden transition-all duration-700 ease-in-out ${openIndex === i ? "max-h-[250px] opacity-100" : "max-h-0 opacity-0"}`}>
                    <p className="px-4 pb-8 text-gray-400 leading-relaxed text-base font-light max-w-2xl italic">
                      {faq.a}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT SIDE: THE FAQs STACK (25%) --- */}
          <div className="lg:col-span-3 flex justify-center pt-16 lg:pt-0">
            <div 
              className={`flex flex-col items-center transition-all duration-1000 ease-in-out ${isAnyOpen ? "gap-y-12" : "gap-y-4"}`}
            >
              {[
                { char: 'F', rot: '-rotate-12', delay: '0s' },
                { char: 'A', rot: 'rotate-6', delay: '0.2s' },
                { char: 'Q', rot: '-rotate-6', delay: '0.4s' },
                { char: 'S', rot: 'rotate-12', delay: '0.6s' }
              ].map((item, idx) => (
                <span 
                  key={idx} 
                  className={`text-[9rem] md:text-[12rem] font-black leading-[0.8] text-amber-500/90 select-none ${item.rot} transition-all duration-700`}
                  style={{ 
                    textShadow: '0 0 30px rgba(245,158,11,0.5)',
                    animation: `float-letter 6s ease-in-out infinite ${item.delay}`
                  }}
                >
                  {item.char}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes float-letter {
          0%, 100% { transform: translateY(0) scale(1); filter: brightness(1); }
          50% { transform: translateY(-15px) scale(1.05); filter: brightness(1.2); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.2; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-30px); }
        }
        @keyframes draw-path {
          0% { stroke-dashoffset: 2000; stroke-dasharray: 2000; }
          100% { stroke-dashoffset: 0; stroke-dasharray: 2000; }
        }
        .animate-draw-path { animation: draw-path 20s linear infinite; }
        .animate-draw-path-reverse { animation: draw-path 30s linear infinite reverse; }
        .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 12s ease-in-out infinite; }
      `}</style>
    </section>
  );
}