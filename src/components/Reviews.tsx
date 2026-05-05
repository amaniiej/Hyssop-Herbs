export default function Reviews() {
  const testimonials = [
    {
      name: "Sarah J.",
      product: "Agrimony Herb",
      text: "The Agrimony infusion has been a game-changer for my digestion. I feel much lighter and more balanced throughout the day."
    },
    {
      name: "Marcus T.",
      product: "Artemisia Abyssinica",
      text: "Incredible quality. The Artemisia has a profound energy. It helped clear my respiratory paths like nothing else."
    },
    {
      name: "Elena R.",
      product: "Ashwagandha",
      text: "Finally, a natural way to manage my stress. This Ashwagandha is pure potency. My sleep quality has doubled."
    },
    {
      name: "Amara W.",
      product: "Calendula Flower",
      text: "The Calendula flowers make the most soothing oil for my skin. It’s like a warm hug from nature."
    },
    {
      name: "David K.",
      product: "Blood Purifier Blend",
      text: "I noticed a difference in my skin clarity within two weeks. Truly healing from the inside out."
    },
    {
      name: "Jordan P.",
      product: "Castor Oil",
      text: "This cold-pressed castor oil is liquid gold. My hair feels thicker and my skin is glowing. Exceptional purity."
    },
    {
      name: "Sophia L.",
      product: "Chasteberry",
      text: "For the first time in years, my cycle feels regulated. Chasteberry is a sacred gift for women's wellness."
    },
    {
      name: "Michael B.",
      product: "Colon Cleanser",
      text: "Gentle yet effective. It helped me reset my system after months of feeling sluggish. A must-have."
    }
  ];

  // Double the array to ensure seamless infinite looping
  const scrollItems = [...testimonials, ...testimonials];

  return (
    <section id="reviews" className="relative py-20 bg-[#0b1f1a] overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center mb-12 px-6">
        <h2 className="text-xs tracking-[0.4em] uppercase text-green-400 font-bold mb-3">
          Voices of Healing
        </h2>
        <h3 className="text-3xl md:text-4xl font-serif text-white">
          Witnessed <span className="italic opacity-80">Benefits</span>
        </h3>
      </div>

      {/* Marquee Container */}
      <div className="relative flex overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-4">
          {scrollItems.map((review, idx) => (
            <div 
              key={idx} 
              className="inline-block w-[350px] mx-4 p-8 rounded-[2rem] bg-white/[0.02] backdrop-blur-lg border border-white/5 whitespace-normal transition-all duration-500 hover:bg-white/[0.05] hover:border-green-500/20"
            >
              {/* Star Rating (Decorative) */}
              <div className="flex gap-1 mb-4 text-amber-400 text-xs">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              </div>

              <p className="text-gray-300 italic font-light leading-relaxed mb-6">
                "{review.text}"
              </p>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-900 flex items-center justify-center text-[10px] font-bold text-green-300">
                  {review.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-white text-sm font-semibold">{review.name}</h4>
                  <p className="text-green-400/60 text-[10px] uppercase tracking-widest">{review.product}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Fades for Smoothness */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-[#0b1f1a] to-transparent z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-[#0b1f1a] to-transparent z-10" />

      {/* CSS for the Infinite Animation */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        /* Pause on hover for readability */
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}