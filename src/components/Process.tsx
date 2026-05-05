import { FaSun, FaHandHoldingHeart, FaVial } from "react-icons/fa";

export default function Process() {
  const steps = [
    {
      icon: <FaHandHoldingHeart />,
      title: "Ethically Harvested",
      desc: "Every leaf and flower is hand-picked at peak potency, respecting the plant's life cycle and the earth's rhythm.",
      color: "from-emerald-500/20"
    },
    {
      icon: <FaSun />,
      title: "Sun-Dried & Raw",
      desc: "We avoid high-heat industrial drying. Our herbs are cured naturally to preserve the delicate volatile oils and enzymes.",
      color: "from-amber-500/20"
    },
    {
      icon: <FaVial />,
      title: "Small-Batch Tested",
      desc: "Science meets spirit. Each batch is inspected for purity and vibration, ensuring only the highest quality reaches your sanctuary.",
      color: "from-green-500/20"
    }
  ];

  return (
    <section id="process" className="relative py-24 px-6 bg-[#0b1f1a]">
      
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent -z-10" />

      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-xs tracking-[0.4em] uppercase text-amber-400 font-bold mb-4">
            Quality without Compromise
          </h2>
          <h3 className="text-4xl md:text-5xl font-serif text-white">
            From <span className="italic text-green-400">Seed</span> to <span className="italic text-green-400">Soul</span>
          </h3>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto font-light leading-relaxed">
            We don't just sell herbs; we steward a sacred process of transformation. 
            Discover the care that goes into every single ounce of Hyssop Wellness.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group text-center">
              
              {/* Connection Line (Desktop) */}
              {idx !== 2 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-[1px] border-t border-dashed border-white/20 -z-0" />
              )}

              {/* Icon Circle */}
              <div className={`relative z-10 w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br ${step.color} to-transparent border border-white/10 flex items-center justify-center text-3xl text-white transition-all duration-700 group-hover:scale-110 group-hover:border-amber-500/50`}>
                <div className="absolute inset-0 rounded-full bg-white/5 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
                {step.icon}
              </div>

              {/* Text */}
              <h4 className="text-2xl font-serif text-white mb-4">{step.title}</h4>
              <p className="text-gray-400 text-sm leading-relaxed px-4">
                {step.desc}
              </p>

              {/* Number Badge */}
              <div className="mt-6 inline-block text-[10px] tracking-widest uppercase text-white/20 border border-white/5 px-3 py-1 rounded-full group-hover:text-amber-400/50 group-hover:border-amber-400/20 transition-all">
                Phase 0{idx + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner - "The Promise" */}
        <div className="mt-20 p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm text-center overflow-hidden relative">
            <div className="absolute top-0 right-0 p-4 opacity-5 text-6xl">🌿</div>
            <p className="text-white/80 font-serif italic text-lg md:text-xl">
              "When you open a bag of Hyssop, you are opening a portal to the Earth's original medicine."
            </p>
        </div>

      </div>
    </section>
  );
}