import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CTA() {
  const navigate = useNavigate();
  const [rotation, setRotation] = useState(0);

  // Rotate the "Seal" based on scroll for a premium interactive feel
  useEffect(() => {
    const handleScroll = () => setRotation(window.scrollY * 0.2);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative py-32 px-6 bg-[#0b1f1a] overflow-hidden">
      
      {/* --- SURPRISE GRAPHIC: GIANT HOLLOW TYPOGRAPHY --- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h2 
          className="text-[20vw] font-black leading-none opacity-[0.03] uppercase tracking-tighter"
          style={{ 
            WebkitTextStroke: "2px white", 
            color: "transparent",
            transform: 'rotate(-5deg)'
          }}
        >
          Transform
        </h2>
      </div>

      {/* --- CINEMATIC LIGHTING --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-green-500/10 blur-[160px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left Side: Bold Statement */}
        <div className="flex-1 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
            <span className="w-12 h-[1px] bg-amber-400/50"></span>
            <span className="text-amber-400 text-xs tracking-[0.5em] uppercase font-bold">Your Sanctuary Awaits</span>
          </div>
          
          <h3 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-8">
            Ready to Begin <br />
            <span className="italic">Your Sacred Return?</span>
          </h3>
          
          <p className="text-gray-400 text-lg md:text-xl max-w-lg mb-10 font-light leading-relaxed">
            Step away from the noise of modern living and rediscover the 
            healing rhythm of the earth. Your journey to wellness is one click away.
          </p>

          {/* THE BUTTON: HIGH CONTRAST */}
          <button 
            onClick={() => navigate('/shop')}
            className="group relative px-12 py-5 bg-white text-[#0b1f1a] font-bold text-lg rounded-full transition-all duration-500 hover:scale-105 hover:bg-green-400 hover:text-white shadow-2xl shadow-white/5"
          >
            Enter The Shop
            <div className="absolute -inset-1 bg-white/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>

        {/* Right Side: THE ROTATING SEAL */}
        <div className="relative flex-1 flex justify-center items-center">
          
          {/* Outer Rotating Text */}
          <div 
            className="w-64 h-64 md:w-80 md:h-80 relative flex items-center justify-center"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                fill="none"
              />
              <text className="text-[7.5px] uppercase tracking-[0.6em] fill-white/20 font-bold">
                <textPath xlinkHref="#circlePath">
                  • SACRED • ORGANIC • POTENT • REMEMBERED • 
                </textPath>
              </text>
            </svg>
          </div>

          {/* Central Icon */}
          <div className="absolute w-24 h-24 md:w-32 md:h-32 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-center">
            <span className="text-4xl md:text-5xl">🌿</span>
            {/* Inner Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-green-500/20 to-transparent animate-pulse" />
          </div>
          
        </div>

      </div>

      {/* Background grain texture for that "Paper" feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url('https://www.transparenttextures.com/patterns/carbon-fibre.png')` }}></div>

    </section>
  );
}