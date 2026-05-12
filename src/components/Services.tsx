import { useEffect, useRef } from "react";

export default function Services() {
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const mouseRef   = useRef({ x: 0.5, y: 0.5 });
  const targetRef  = useRef({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    { name: "100% Organic Herbs",     accent: "emerald", large: true  },
    { name: "Liver Health",           accent: "green",   large: false },
    { name: "Blood Sugar Balance",    accent: "teal",    large: false },
    { name: "Hypertension Care",      accent: "teal",    large: false },
    { name: "Gut & Intestine Healing",accent: "emerald", large: true  },
    { name: "Insomnia Relief",        accent: "indigo",  large: false },
    { name: "Anxiety & Stress Care",  accent: "indigo",  large: false },
    { name: "Labor Support",          accent: "amber",   large: false },
    { name: "Menstrual Wellness",     accent: "rose",    large: false },
    { name: "Hormonal Balance",       accent: "emerald", large: true  },
    { name: "Fertility Guidance",     accent: "amber",   large: false },
    { name: "Expert Consultations",   accent: "green",   large: false },
    { name: "Wellness Monitoring",    accent: "teal",    large: false },
  ];

  const accentMap: Record<string, { border: string; glow: string; dot: string }> = {
    emerald: { border: "rgba(52,211,153,0.30)",  glow: "rgba(52,211,153,0.08)",  dot: "#34d399" },
    green:   { border: "rgba(74,222,128,0.25)",  glow: "rgba(74,222,128,0.07)",  dot: "#4ade80" },
    teal:    { border: "rgba(45,212,191,0.25)",  glow: "rgba(45,212,191,0.07)",  dot: "#2dd4bf" },
    indigo:  { border: "rgba(129,140,248,0.20)", glow: "rgba(129,140,248,0.06)", dot: "#818cf8" },
    amber:   { border: "rgba(251,191,36,0.22)",  glow: "rgba(251,191,36,0.06)",  dot: "#fbbf24" },
    rose:    { border: "rgba(251,113,133,0.20)", glow: "rgba(251,113,133,0.06)", dot: "#fb7185" },
  };

  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext("2d")!;
    let raf: number;

    const resize = () => {
      canvas.width  = section.offsetWidth;
      canvas.height = section.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const onMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      targetRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top)  / rect.height,
      };
    };
    section.addEventListener("mousemove", onMove);

    const orbs = [
      { cx: 0.22, cy: 0.40, ax: 0.11, ay: 0.07, pX: 88,  pY: 72,  hue: 148, a: 0.12, r: 0.50 },
      { cx: 0.75, cy: 0.58, ax: 0.09, ay: 0.08, pX: 105, pY: 82,  hue: 158, a: 0.09, r: 0.46 },
      { cx: 0.50, cy: 0.80, ax: 0.07, ay: 0.05, pX: 68,  pY: 92,  hue: 140, a: 0.07, r: 0.38 },
    ];

    const draw = (now: number) => {
      const s = now / 1000;
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      for (const o of orbs) {
        const x = (o.cx + Math.sin((s / o.pX) * Math.PI * 2) * o.ax) * W;
        const y = (o.cy + Math.cos((s / o.pY) * Math.PI * 2) * o.ay) * H;
        const r = o.r * Math.max(W, H);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        g.addColorStop(0,    `hsla(${o.hue},68%,42%,${o.a})`);
        g.addColorStop(0.45, `hsla(${o.hue},62%,38%,${o.a * 0.3})`);
        g.addColorStop(1,    `hsla(${o.hue},55%,32%,0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const ease = 0.03;
      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * ease;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * ease;
      const mx = mouseRef.current.x * W;
      const my = mouseRef.current.y * H;
      const mo = ctx.createRadialGradient(mx, my, 0, mx, my, W * 0.30);
      mo.addColorStop(0,   "rgba(74,222,128,0.08)");
      mo.addColorStop(0.5, "rgba(52,211,153,0.03)");
      mo.addColorStop(1,   "rgba(52,211,153,0)");
      ctx.fillStyle = mo;
      ctx.beginPath();
      ctx.arc(mx, my, W * 0.30, 0, Math.PI * 2);
      ctx.fill();

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener("mousemove", onMove);
      ro.disconnect();
    };
  }, []);

  return (
    <section
      id="services"
      className="relative overflow-hidden flex flex-col justify-center"
      style={{ background: "#0b1f1a" }}
    >
      {/* Seam fades */}
      <div className="absolute top-0 left-0 right-0 h-36 pointer-events-none z-20"
        style={{ background: "linear-gradient(to bottom, #0b1f1a 0%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 h-36 pointer-events-none z-20"
        style={{ background: "linear-gradient(to top, #0b1f1a 0%, transparent 100%)" }} />

      {/* ─── HERO IMAGE ─── */}
      <div className="relative w-full z-10">
        <img
          src="/images/hyssop_shapes.png"
          className="w-full h-auto block"
          style={{ filter: "brightness(0.35) saturate(0.65) sepia(0.18)" }}
          alt="Hyssop botanical shapes"
        />

        <div className="absolute inset-0 pointer-events-none">
          {/* Dark tint with multiply blend — restores the cinematic depth over the image */}
          <div className="absolute inset-0" style={{ background: "rgba(11,31,26,0.35)", mixBlendMode: "multiply" }} />
          <div className="absolute top-0 left-0 right-0 h-1/4" style={{ background: "linear-gradient(to top, transparent, #0b1f1a)" }} />
          {/* Wide ellipse — only darkens the outer edges, leaves bottom-centre clear */}
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 55% at center, transparent 45%, #0b1f1a 100%)" }} />
          {/* Tiny bottom edge fade — only last 12%, well clear of the label */}
          <div className="absolute bottom-0 left-0 right-0 h-[12%]" style={{ background: "linear-gradient(to bottom, transparent, #0b1f1a)" }} />
        </div>
      </div>

      {/*
        Label is 100% OUTSIDE the image div — no overlay, no overflow-hidden,
        no stacking context can touch it. Pulled up visually with negative margin.
      */}
      <div className="relative z-30 flex justify-center" style={{ marginTop: "-2.5rem" }}>
        <div className="flex items-center gap-3">
          <div className="h-px w-10 bg-gradient-to-r from-transparent to-amber-400/80" />
          <span
            className="font-black tracking-[0.55em] uppercase"
            style={{
              fontSize: "11px",
              color: "#fde68a",
              textShadow: "0 0 8px rgba(251,191,36,1), 0 0 20px rgba(251,191,36,0.8), 0 0 45px rgba(251,191,36,0.4)",
            }}
          >
            Sacred Rituals
          </span>
          <div className="h-px w-10 bg-gradient-to-l from-transparent to-amber-400/80" />
        </div>
      </div>

      {/* ─── BODY ─── */}
      <div ref={sectionRef} className="relative px-4 pt-10 pb-20 flex flex-col justify-center z-10">

        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{ mixBlendMode: "screen" }}
        />

        <div className="absolute inset-0 z-0 pointer-events-none"
          style={{ background: "radial-gradient(circle at 50% 45%, rgba(34,197,94,0.05) 0%, transparent 65%)" }} />

        <div className="relative z-10 max-w-screen-xl mx-auto w-full">

          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-5xl md:text-7xl font-serif text-white mb-5 leading-tight">
              Healing{" "}
              <em className="text-green-400" style={{ fontStyle: "italic" }}>
                Offerings
              </em>
            </h2>
            <p className="text-gray-400/80 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed"
              style={{ fontStyle: "italic" }}>
              Ancient botanical wisdom meets modern wellness — each offering a pathway
              toward lasting balance and vitality.
            </p>
          </div>

          {/* Pill cloud */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 md:gap-x-10 gap-y-5 md:gap-y-6 w-full mb-16">
            {services.map((svc, i) => {
              const ac = accentMap[svc.accent];
              return (
                <div
                  key={i}
                  className="group relative cursor-default"
                  style={{
                    animation: `pill-float ${11 + (i % 6)}s ease-in-out infinite`,
                    animationDelay: `${i * 0.35}s`,
                  }}
                >
                  {/* Breathing halo */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      border: `1px solid ${ac.border}`,
                      animation: `halo-breathe ${7 + (i % 4)}s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`,
                      transform: "scale(1.22)",
                      filter: "blur(1.5px)",
                    }}
                  />

                  {/* Pill */}
                  <div
                    className="relative flex items-center gap-2.5 rounded-full backdrop-blur-md border transition-all duration-700"
                    style={{
                      padding: svc.large ? "12px 28px" : "9px 22px",
                      background: "rgba(255,255,255,0.028)",
                      borderColor: ac.border,
                      boxShadow: `0 0 24px ${ac.glow}, inset 0 1px 0 rgba(255,255,255,0.06)`,
                    }}
                  >
                    <span
                      className="shrink-0 rounded-full"
                      style={{
                        width: svc.large ? "6px" : "5px",
                        height: svc.large ? "6px" : "5px",
                        background: ac.dot,
                        boxShadow: `0 0 6px ${ac.dot}`,
                        opacity: 0.85,
                      }}
                    />
                    <span
                      className="font-serif text-white/85 group-hover:text-white whitespace-nowrap tracking-wide transition-colors duration-500"
                      style={{ fontSize: svc.large ? "17px" : "14px" }}
                    >
                      {svc.name}
                    </span>
                  </div>

                  {/* Hover bloom */}
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10"
                    style={{
                      background: ac.glow,
                      filter: "blur(12px)",
                      transform: "scale(1.5)",
                    }}
                  />
                </div>
              );
            })}
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-5 mb-10">
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-1 h-1 rounded-full bg-green-400/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-green-400/60" />
            <div className="w-1 h-1 rounded-full bg-green-400/40" />
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-l from-transparent to-white/10" />
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-gray-500/70 text-xs tracking-[0.25em] uppercase font-medium">
              Ready to begin your journey?
            </p>
            <a href="http://localhost:5173/contact" className="group relative inline-flex items-center gap-3 no-underline">
              <span
                className="relative flex items-center gap-3 px-10 py-4 rounded-full text-sm font-bold tracking-[0.22em] uppercase text-amber-200/90 transition-all duration-700 group-hover:text-amber-100"
                style={{
                  background: "rgba(251,191,36,0.07)",
                  border: "1px solid rgba(251,191,36,0.22)",
                  boxShadow: "0 0 0 0 rgba(251,191,36,0)",
                  transition: "box-shadow 0.7s ease, background 0.7s ease",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 32px rgba(251,191,36,0.14)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(251,191,36,0.12)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 rgba(251,191,36,0)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(251,191,36,0.07)";
                }}
              >
                Book a Consultation
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                  className="transition-transform duration-500 group-hover:translate-x-1">
                  <path d="M1 7h12M8 2l5 5-5 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </a>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes pill-float {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-8px); }
        }
        @keyframes halo-breathe {
          0%, 100% { opacity: 0.55; transform: scale(1.22); }
          50%       { opacity: 0;   transform: scale(1.60); }
        }
      `}</style>
    </section>
  );
}