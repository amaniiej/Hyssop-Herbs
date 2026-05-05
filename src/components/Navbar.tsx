import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const location = useLocation();

  // 🔥 Scroll tracking (ONLY for home page)
  useEffect(() => {
    if (location.pathname !== "/") return;

    const handleScroll = () => {
      const sections = document.querySelectorAll("section");
      let current = "home";

      sections.forEach((section) => {
        const top = section.offsetTop - 120;
        const height = section.clientHeight;

        if (window.scrollY >= top && window.scrollY < top + height) {
          current = section.id;
        }
      });

      setActive(current);

      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      setProgress((scrollTop / docHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // 🔥 Scroll to section (HOME ONLY)
  const scrollToSection = (section: string) => {
    document.getElementById(section)?.scrollIntoView({ behavior: "smooth" });
  };

  // 🔥 Hybrid navigation handler
  const handleHomeClick = () => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToSection("home"), 100);
    } else {
      scrollToSection("home");
    }
  };

  // 🎨 Navbar style
  const getNavbarStyle = () => {
    if (location.pathname !== "/") {
      return "bg-[#0b1f1a]/90 backdrop-blur-lg shadow-lg";
    }

    switch (active) {
      case "home":
        return "bg-transparent";
      case "about":
        return "bg-[#0b1f1a]/80 backdrop-blur";
      case "products":
        return "bg-[#0f3d2e]/80 backdrop-blur";
      case "contact":
        return "bg-black/80 backdrop-blur";
      default:
        return "bg-[#0b1f1a]/90";
    }
  };

  return (
    <>
      {/* 🔥 Scroll Progress (ONLY HOME) */}
      {location.pathname === "/" && (
        <div
          className="fixed top-0 left-0 h-[3px] bg-green-400 z-[999]"
          style={{ width: `${progress}%` }}
        />
      )}

      <nav
        className={`fixed w-full z-50 flex justify-between items-center px-10 py-4 transition-all duration-300 ${getNavbarStyle()}`}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleHomeClick}
        >
          <img src="/logo.png" className="w-9 h-9" />
          <div className="leading-tight">
            <h1 className="font-bold text-white">Hyssop</h1>
            <p className="text-[11px] text-green-300/80 italic">
              Natural Herbal Wellness
            </p>
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm">

          <div className="space-x-6">

            {/* HOME (SCROLL) */}
            <button
              onClick={handleHomeClick}
              className={
                location.pathname === "/" && active === "home"
                  ? "text-green-400"
                  : "hover:text-green-400 transition"
              }
            >
              Home
            </button>

            {/* PAGES */}
            <button
              onClick={() => navigate("/about")}
              className="hover:text-green-400 transition"
            >
              About
            </button>

            <button
              onClick={() => navigate("/shop")}
              className="hover:text-green-400 transition"
            >
              Shop
            </button>

            <button
              onClick={() => navigate("/contact")}
              className="hover:text-green-400 transition"
            >
              Contact
            </button>

          </div>

          {/* Social Icons */}
          <div className="flex gap-3 text-lg">
            <a href="https://www.facebook.com/share/17KVuWgHUN" target="_blank" className="hover:text-green-400 transition">
              <FaFacebook />
            </a>
            <a href="https://www.instagram.com/hyssop_herbs_and_wellness" target="_blank" className="hover:text-green-400 transition">
              <FaInstagram />
            </a>
            <a href="https://www.youtube.com/@addissinanatural" target="_blank" className="hover:text-green-400 transition">
              <FaYoutube />
            </a>
            <a href="https://www.tiktok.com/@addissinanaturalbeauty" target="_blank" className="hover:text-green-400 transition">
              <FaTiktok />
            </a>
          </div>

        </div>
      </nav>
    </>
  );
}