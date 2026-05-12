import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaEnvelope, FaGlobeAfrica, FaGlobeAmericas, FaPaperPlane } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="bg-[#0b1f1a] text-white min-h-screen flex flex-col font-sans selection:bg-green-500/30 overflow-x-hidden relative">
      <Navbar />

      {/* --- DYNAMIC GLOWING BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Multidimensional Color grading */}
        <div className="absolute top-[5%] left-[-5%] w-[600px] h-[600px] bg-emerald-600/20 blur-[130px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-green-500/10 blur-[100px] rounded-full" />
        <div className="absolute top-[40%] right-[15%] w-[400px] h-[400px] bg-amber-500/10 blur-[110px] rounded-full animate-bounce-slow" />

        {/* Animated Curly Flows */}
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <path d="M-100,500 C150,300 350,700 500,500 C650,300 850,700 1100,500" stroke="white" strokeWidth="0.5" fill="none" className="animate-draw" />
          <path d="M500,-100 C300,150 700,350 500,500 C300,650 700,850 500,1100" stroke="rgba(34,197,94,0.3)" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      {/* --- MAIN CONTENT --- */}
      <main className="relative z-10 flex-grow flex items-center pt-32 pb-12 px-6">
        {/* 🔥 Shifting content up by 13% using translate-y */}
        <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-x-12 gap-y-16 items-center transform -translate-y-[13%]">
          
          {/* --- LEFT SIDE: THE INFO --- */}
          <div className="space-y-10 lg:pr-12">
            <header>
              <h2 className="text-6xl md:text-8xl font-serif leading-tight text-white mb-6">
                Contact <span className="italic text-green-400">Us</span>
              </h2>
              <p className="text-gray-300 text-lg font-light max-w-md leading-relaxed border-l-2 border-green-500/30 pl-6">
                Connect with our global branches for expert guidance on your healing journey.
              </p>
            </header>

            <div className="space-y-10 max-w-sm">
              {/* Branch: Ethiopia */}
              <div className="group">
                <div className="flex items-center gap-3 text-emerald-400 mb-2">
                  <FaGlobeAfrica className="text-base group-hover:rotate-12 transition-transform duration-500" />
                  <span className="text-[10px] tracking-[0.4em] uppercase font-black opacity-70 group-hover:opacity-100 transition-opacity">Addis Ababa HQ</span>
                </div>
                <div className="pl-8 border-l border-white/10 group-hover:border-green-500 transition-all">
                  <p className="text-white text-lg font-serif leading-tight">Bole kekere 1st floor # 1-012/5</p>
                  <p className="text-green-400 font-bold mt-2 text-sm tracking-widest">+251 952 161 260</p>
                </div>
              </div>

              {/* Branch: USA */}
              <div className="group">
                <div className="flex items-center gap-3 text-amber-500 mb-2">
                  <FaGlobeAmericas className="text-base group-hover:rotate-12 transition-transform duration-500" />
                  <span className="text-[10px] tracking-[0.4em] uppercase font-black opacity-70 group-hover:opacity-100 transition-opacity">Texas Office</span>
                </div>
                <div className="pl-8 border-l border-white/10 group-hover:border-amber-500 transition-all">
                  <p className="text-white text-lg font-serif leading-tight">Dallas, Texas 75038</p>
                  <p className="text-amber-500 font-bold mt-2 text-sm tracking-widest">+1 214 756 7361</p>
                </div>
              </div>
            </div>

            {/* Email Contact */}
            <div className="pt-2">
              <a href="mailto:Hyssopherbswelness@gmail.com" className="group flex items-center gap-4 hover:translate-x-2 transition-transform">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-white/5 group-hover:bg-green-500 group-hover:border-green-500 transition-all">
                  <FaEnvelope className="text-xs text-green-300 group-hover:text-white" />
                </div>
                <span className="text-sm font-bold tracking-tight text-gray-200 group-hover:text-white border-b border-white/10 pb-1">
                  Hyssopherbswelness@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* --- RIGHT SIDE: COMPACT FORM --- */}
          <div className="w-full max-w-md lg:ml-auto">
            <form className="space-y-12 relative">
              <div className="grid md:grid-cols-2 gap-10">
                {/* Name */}
                <div className="relative group">
                  <input type="text" required className="peer w-full bg-transparent border-b border-white/20 py-3 text-sm focus:outline-none transition-all placeholder-transparent" id="name" />
                  <label htmlFor="name" className="absolute left-0 top-3 text-[11px] font-bold tracking-[0.4em] text-gray-200 uppercase transition-all peer-focus:-top-6 peer-focus:text-green-400 peer-valid:-top-6 peer-valid:text-green-400">FullName</label>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-green-500 w-0 peer-focus:w-full transition-all duration-700" />
                </div>
                
                {/* Email */}
                <div className="relative group">
                  <input type="email" required className="peer w-full bg-transparent border-b border-white/20 py-3 text-sm focus:outline-none transition-all placeholder-transparent" id="email" />
                  <label htmlFor="email" className="absolute left-0 top-3 text-[11px] font-bold tracking-[0.4em] text-gray-200 uppercase transition-all peer-focus:-top-6 peer-focus:text-green-400 peer-valid:-top-6 peer-valid:text-green-400">Email</label>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-green-500 w-0 peer-focus:w-full transition-all duration-700" />
                </div>
              </div>

              {/* Message */}
              <div className="relative group pt-4">
                <textarea rows={4} required className="peer w-full bg-transparent border-b border-white/20 py-3 text-sm focus:outline-none transition-all placeholder-transparent resize-none" id="msg" />
                <label htmlFor="msg" className="absolute left-0 top-3 text-[11px] font-bold tracking-[0.4em] text-gray-200 uppercase transition-all peer-focus:-top-6 peer-focus:text-green-400 peer-valid:-top-6 peer-valid:text-green-400">Your Message</label>
                <div className="absolute bottom-0 left-0 h-[2px] bg-green-500 w-0 peer-focus:w-full transition-all duration-700" />
              </div>

              <div className="pt-6">
                <button type="submit" className="group flex items-center gap-10 bg-transparent text-white uppercase tracking-[0.5em] text-[11px] font-black hover:text-green-400 transition-all cursor-pointer">
                  <span>Send Ritual Inquiry</span>
                  <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-green-600 group-hover:border-green-600 group-hover:text-white transition-all shadow-[0_0_30px_rgba(34,197,94,0.15)]">
                    <FaPaperPlane className="text-xs" />
                  </div>
                </button>
              </div>
            </form>
          </div>

        </div>
      </main>

      <Footer />

      <style>{`
        @keyframes draw { 
          0% { stroke-dashoffset: 1000; stroke-dasharray: 1000; opacity: 0; } 
          50% { opacity: 0.5; }
          100% { stroke-dashoffset: 0; stroke-dasharray: 1000; opacity: 0.15; } 
        }
        .animate-draw { animation: draw 12s linear infinite; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce-slow { animation: bounce-slow 8s ease-in-out infinite; }
      `}</style>
    </div>
  );
}