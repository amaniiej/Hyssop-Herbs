import { useEffect, useState } from "react";

export default function Hero() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#0b1f1a]"
    >
      {/* Background Decorative Glows */}
      <div className="absolute w-150 h-150 bg-green-500/10 blur-[120px] rounded-full -top-48 -left-24" />
      <div className="absolute w-100 h-100 bg-green-900/20 blur-[100px] rounded-full bottom-0 right-0" />

      <div className="container mx-auto px-6 md:px-12 z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* LEFT SIDE: Content */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-green-400 text-sm tracking-[0.2em] uppercase mb-4 font-semibold">
              Premium Herbal Solutions
            </p>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight mb-6 font-serif">
              Hyssop Herbs <br />
              <span className="text-green-500">& Wellness</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg italic">
              "Healing Begins With Nature." Discover our hand-crafted organic 
              remedies designed to restore your body's natural balance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="/shop">
                <button className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-lg shadow-green-900/20 transition-all">
                  Shop Catalog
                </button>
              </a>
              <a href="/about">
                <button className="border border-green-500/30 hover:bg-green-500/10 px-10 py-4 rounded-full font-bold text-lg transition-all">
                  Our Story
                </button>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-12 flex flex-wrap gap-6 justify-center md:justify-start opacity-70">
              <div className="flex items-center gap-2">
                <span className="text-green-400">✔</span>
                <span className="text-xs uppercase tracking-widest">Fast Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✔</span>
                <span className="text-xs uppercase tracking-widest">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-400">✔</span>
                <span className="text-xs uppercase tracking-widest">Delivered with Care</span>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Image */}
          <div className="flex-1 relative">
            <div 
              className="relative z-10 w-full max-w-lg mx-auto"
              style={{ transform: `translateY(${offset * -0.05}px)` }} // Subtle parallax
            >
              {/* Main Image */}
              <img
                src="/images/hero-img.jpeg" 
                alt="Hyssop Herbal Products"
                className="rounded-2xl shadow-2xl border border-white/5 object-cover w-full h-125"
              />
              
              {/* Floating Decorative Card */}
              <div className="absolute -bottom-6 -left-6 bg-[#0f3d2e]/90 backdrop-blur-md p-4 rounded-xl border border-green-500/20 shadow-xl hidden md:block">
                <p className="text-green-400 font-bold text-sm">Customer Choice</p>
                <p className="text-white text-xs">Pure Hyssop Extract</p>
              </div>
            </div>
            
            {/* Background Circle behind image */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-500/5 rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
}