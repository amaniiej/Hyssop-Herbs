import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaInstagram, FaTiktok } from "react-icons/fa";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // --- 1. SCROLL-SPY (Only on Home Page) ---
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
        // Standalone page active state
        const path = location.pathname.split("/")[1];
        setActive(path || "home");
      }
    };

    // --- 2. CROSS-PAGE SCROLL HANDLER ---
    // If we just landed on "/" and there is a hash (e.g., #faq)
    if (location.pathname === "/" && window.location.hash) {
      const targetId = window.location.hash.replace("#", "");
      // Wait a split second for the Home component to mount fully
      setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300); 
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); 

    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname, location.hash]); // Added hash to dependencies

  // --- 3. NAVIGATION LOGIC ---
  const handleNav = (target: string, isPage: boolean) => {
    if (isPage) {
      // Direct page navigation
      navigate(`/${target === "home" ? "" : target}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Section navigation
      if (location.pathname !== "/") {
        // If on another page, navigate to home with the hash
        navigate(`/#${target}`);
      } else {
        // If already on home, just scroll
        document.getElementById(target)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <div className={`fixed w-full z-[5000] transition-all duration-500 px-6 ${isScrolled ? "top-4" : "top-0"}`}>
      <nav 
        className={`max-w-7xl mx-auto flex justify-between items-center px-8 py-4 transition-all duration-500 rounded-full border 
          ${isScrolled 
            ? "bg-[#0b1f1a]/70 backdrop-blur-2xl border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)]" 
            : "bg-transparent border-transparent"
          }`}
      >
        {/* LOGO AREA */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => handleNav("home", true)}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-400 blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
            <img src="/logo.png" className="w-9 h-9 relative z-10 brightness-110" alt="Hyssop" />
          </div>
          <div className="leading-none">
            <h1 className="text-xl font-bold tracking-tighter text-white">Hyssop</h1>
            <p className="text-[9px] text-green-400 uppercase tracking-[0.2em] font-black">Wellness</p>
          </div>
        </div>

        {/* NAVIGATION LINKS */}
        <div className="hidden md:flex items-center gap-10">
          {[
            { name: "Home", id: "home", type: 'scroll' },
            { name: "About Us", id: "about", type: 'page' },
            { name: "Services", id: "services", type: 'scroll' },
            { name: "Shop", id: "shop", type: 'page' },
            { name: "FAQs", id: "faq", type: 'scroll' },
            { name: "Contact Us", id: "contact", type: 'page' }
          ].map((item) => {
            const isActive = active === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNav(item.id, item.type === 'page')}
                className={`relative text-[11px] uppercase tracking-[0.3em] font-black transition-all duration-300 cursor-pointer
                  ${isActive ? "text-green-400" : "text-gray-400 hover:text-white"}`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-400 rounded-full shadow-[0_0_10px_#4ade80]" />
                )}
              </button>
            );
          })}
        </div>

        {/* SOCIAL & CTA AREA */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex gap-4 text-gray-500 border-r border-white/10 pr-6">
            <a href="https://www.instagram.com/hyssop_herbs_and_wellness" target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors cursor-pointer"><FaInstagram /></a>
            <a href="https://www.tiktok.com/@addissinanaturalbeauty" target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors cursor-pointer"><FaTiktok /></a>
          </div>
          
          <button 
            onClick={() => handleNav("shop", true)}
            className="px-5 py-2 bg-green-500 hover:bg-green-600 text-[#0b1f1a] text-[10px] font-black uppercase tracking-widest rounded-full transition-all active:scale-95 shadow-lg shadow-green-500/20 cursor-pointer"
          >
            Shop Now
          </button>
        </div>
      </nav>
      
      {/* Visual Line Progress */}
      <div className={`max-w-7xl mx-auto h-[1px] mt-2 overflow-hidden px-10 transition-opacity duration-700 ${isScrolled ? "opacity-20" : "opacity-0"}`}>
        <div className="h-full bg-gradient-to-r from-transparent via-green-400 to-transparent animate-shimmer" style={{ width: '100%' }} />
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite;
        }
      `}</style>
    </div>
  );
}