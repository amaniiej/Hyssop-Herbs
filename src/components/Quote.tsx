export default function About() {
  return (
    <section id="about" className="relative pt-32 pb-10 px-6 overflow-hidden bg-[#0b1f1a]">
      {/* 
        Google Font Import for the curly font 
        Note: In a production app, you'd ideally put this in index.html, 
        but placing it here works perfectly for immediate results.
      */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap');
          
          .curly-font {
            font-family: 'Dancing Script', cursive;
          }

          @keyframes drift {
            0% { transform: translate(0, 0) rotate(0deg); }
            50% { transform: translate(10px, -10px) rotate(2deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          .animate-drift {
            animation: drift 10s ease-in-out infinite;
          }
        `}
      </style>
      
      {/* --- CREATIVE ARTISTIC ELEMENTS --- */}
      <svg 
        className="absolute top-0 left-0 w-[400px] h-auto opacity-20 pointer-events-none animate-drift" 
        viewBox="0 0 400 400" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M-50 100C50 150 150 50 250 120C350 190 400 300 500 250" stroke="white" strokeWidth="1" strokeDasharray="4 4" />
        <path d="M-60 120C60 180 180 80 280 150C380 220 420 350 520 300" stroke="white" strokeWidth="0.5" />
      </svg>

      <div className="absolute bottom-0 right-0 opacity-15 pointer-events-none rotate-[-15deg]">
        <svg width="200" height="200" viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 280C20 200 80 150 100 80C110 40 90 10 70 20C50 30 60 70 100 90C140 110 180 150 180 220" stroke="white" strokeWidth="1" />
        </svg>
      </div>

      {/* --- CONTENT --- */}
      {/* max-w-7xl allows the text to fill much more of the screen width */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[1px] w-8 bg-green-500/50" />
          <span className="text-xs tracking-[0.4em] uppercase text-green-400 font-bold">
            The Hyssop Way
          </span>
          <div className="h-[1px] w-8 bg-green-500/50" />
        </div>

        <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
          A Sacred Return <span className="italic font-light opacity-80 text-3xl">to Wellness</span>
        </h2>

        {/* The Quote Block */}
        <div className="relative">
          <p className="curly-font text-3xl md:text-5xl text-gray-100 leading-[1.4] px-4 md:px-10">
            "The Journey to Wellness is a cycle of transformation where we remember 
            what we have always known to be true: <span className="text-green-400">we know how to heal ourselves</span>, 
            plants and food are sacred remedies, and deep nourishment supports us to 
            be the fullest version of ourselves."
          </p>
        </div>

        <div className="mt-8 opacity-40">
          <span className="text-2xl">🌿</span>
        </div>

      </div>
    </section>
  );
}