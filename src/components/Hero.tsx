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
      className="h-screen flex items-center justify-center text-center relative overflow-hidden"
    >
      {/* Background (replace with image later if needed) */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${offset * 0.3}px)`,
          background:
            "linear-gradient(rgba(11,31,26,0.7), rgba(11,31,26,0.9)), url('/hero.jpg') center/cover no-repeat",
        }}
      />

      {/* Soft Glow */}
      <div className="absolute w-[500px] h-[500px] bg-green-500/20 blur-[120px] rounded-full top-[-120px]" />

      {/* Content */}
      <div className="relative z-10 px-6 max-w-3xl">

        {/* Tagline */}
        <p className="text-green-300 text-sm tracking-widest uppercase mb-3">
          Welcome to the Green Herbs Store
        </p>

        {/* Main Title */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Hyssop Herbs & Wellness
        </h1>

        {/* Subtitle */}
        <p className="italic text-lg md:text-xl text-gray-200 mb-8">
          Healing Begins With Nature
        </p>

        {/* Button */}
        <a href="/shop">
          <button className="bg-green-500 hover:bg-green-600 transition px-8 py-3 rounded-full font-medium">
            Shop Now
          </button>
        </a>

        {/* Features */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-sm text-gray-300">

          {[
            { text: "Secure Payment", icon: "🔒" },
            { text: "Free Shipping", icon: "🚚" },
            { text: "Delivered with Care", icon: "📦" },
            { text: "Excellent Service", icon: "⭐" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">

              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-lg">
                {item.icon}
              </div>

              <p>{item.text}</p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}