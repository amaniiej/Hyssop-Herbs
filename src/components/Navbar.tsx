import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (location.pathname === "/") {
        const sections = ["home", "about", "products", "story", "services", "reviews", "faq", "contact"];
        let current = "home";
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top <= 200 && rect.bottom >= 200) {
              current = section;
              break;
            }
          }
        }
        setActive(current);
      } else {
        const path = location.pathname.split("/")[1];
        setActive(path || "home");
      }
    };

    if (location.pathname === "/" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300); 
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, location.hash]);

  const handleNav = (target: string, isPage: boolean) => {
    setIsMobileMenuOpen(false); 
    if (isPage) {
      navigate(`/${target === "home" ? "" : target}`);
      window.scrollTo(0, 0); 
    } else {
      if (location.pathname !== "/") {
        navigate(`/#${target}`);
      } else {
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navLinks = [
    { name: "Home", id: "home", type: 'scroll' },
    { name: "About Us", id: "about", type: 'page' },
    { name: "Services", id: "services", type: 'scroll' },
    { name: "Shop", id: "shop", type: 'page' },
    { name: "FAQs", id: "faq", type: 'scroll' },
    { name: "Contact", id: "contact", type: 'page' }
  ];

  return (
    <div className={`fixed w-full z-[5000] transition-all duration-500 px-4 md:px-6 ${isScrolled ? "top-4" : "top-0"}`}>
      <nav className={`max-w-7xl mx-auto flex justify-between items-center px-6 py-3 transition-all duration-500 rounded-full border ${isScrolled ? "bg-[#0b1f1a]/80 backdrop-blur-2xl border-white/10 shadow-2xl" : "bg-transparent border-transparent"}`}>
        
        {/* LOGO */}
        <div className="flex items-center gap-3 cursor-pointer z-[6000]" onClick={() => handleNav("home", true)}>
          <img src="/logo.png" className="w-8 h-8 brightness-110" alt="Hyssop" />
          <div className="leading-none">
            <h1 className="text-lg font-bold text-white tracking-tighter">Hyssop</h1>
            <p className="text-[8px] text-green-400 uppercase font-black tracking-widest">Wellness</p>
          </div>
        </div>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <button key={item.id} onClick={() => handleNav(item.id, item.type === 'page')} className={`text-[10px] uppercase tracking-[0.3em] font-black transition-all cursor-pointer ${active === item.id ? "text-green-400" : "text-gray-400 hover:text-white"}`}>
              {item.name}
              {active === item.id && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full shadow-[0_0_8px_#4ade80]" />}
            </button>
          ))}
        </div>

        {/* RIGHT AREA */}
        <div className="flex items-center gap-4">
          <div onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="relative w-10 h-10 flex items-center justify-center cursor-pointer z-[6000] group">
            <div className={`absolute w-6 h-[2px] bg-white transition-all duration-500 ${isMobileMenuOpen ? "rotate-45 translate-y-0" : "-translate-y-1.5"}`} />
            <div className={`absolute w-6 h-[2px] bg-white transition-all duration-500 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
            <div className={`absolute w-6 h-[2px] bg-white transition-all duration-500 ${isMobileMenuOpen ? "-rotate-45 translate-y-0" : "translate-y-1.5"}`} />
          </div>
        </div>
      </nav>

      {/* --- UNBELIEVABLE MOBILE OVERLAY --- */}
      <div className={`fixed inset-0 h-screen w-screen bg-[#0b1f1a]/95 backdrop-blur-[40px] z-[5500] transition-all duration-700 ease-in-out flex flex-col items-center justify-center overflow-hidden ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}>
        
        {/* Background "Living" Glows inside menu */}
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-green-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-amber-500/5 blur-[100px] rounded-full" />
        
        {/* Staggered Links */}
        <div className="relative z-10 flex flex-col items-center gap-8">
          {navLinks.map((item, idx) => (
            <button 
              key={item.id} 
              onClick={() => handleNav(item.id, item.type === 'page')} 
              className={`text-4xl md:text-5xl font-serif transition-all duration-500 transform hover:scale-110 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
              style={{ transitionDelay: `${idx * 100}ms`, fontStyle: 'italic' }}
            >
              <span className={active === item.id ? "text-green-400" : "text-white/80 hover:text-white"}>
                {item.name}
              </span>
            </button>
          ))}
        </div>

        {/* Footer Info inside Menu */}
        <div className={`absolute bottom-20 left-0 w-full flex flex-col items-center gap-8 transition-all duration-1000 ${isMobileMenuOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`} style={{ transitionDelay: '600ms' }}>
          <div className="flex gap-8 text-2xl text-gray-400">
             <a href="https://www.instagram.com/hyssop_herbs_and_wellness" target="_blank" className="hover:text-green-400 transition-colors"><FaInstagram /></a>
             <a href="https://www.youtube.com/@addissinanatural" target="_blank" className="hover:text-green-400 transition-colors"><FaYoutube /></a>
             <a href="https://www.tiktok.com/@addissinanaturalbeauty" target="_blank" className="hover:text-green-400 transition-colors"><FaTiktok /></a>
          </div>
          <div className="h-px w-20 bg-white/10" />
          <p className="text-[10px] tracking-[0.6em] uppercase text-white/20 font-serif italic text-center">
            Handcrafted Healing <br /> Addis • Dallas
          </p>
        </div>

        {/* Moving Watermark Background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40vw] font-black text-white/[0.02] select-none pointer-events-none uppercase tracking-tighter">
          Hyssop
        </div>
      </div>

      {/* Visual Line Progress */}
      <div className={`max-w-7xl mx-auto h-[1px] mt-2 overflow-hidden px-10 transition-opacity duration-700 ${isScrolled ? "opacity-20" : "opacity-0"}`}>
        <div className="h-full bg-gradient-to-r from-transparent via-green-400 to-transparent animate-shimmer-line" style={{ width: '100%' }} />
      </div>

      <style>{`
        @keyframes shimmer-line {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer-line {
          animation: shimmer-line 3s infinite;
        }
      `}</style>
    </div>
  );
}
