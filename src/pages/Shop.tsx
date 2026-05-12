import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
}

export default function Shop() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // --- MOCK DATA FOR 40 PRODUCTS ---
  // You can replace these with your client's real data later
  const allProducts: Product[] = Array.from({ length: 40 }).map((_, i) => ({
    id: i + 1,
    title: i % 3 === 0 ? "Soursop Leaves" : i % 3 === 1 ? "Passion Flower" : "Calendula Flower",
    category: "Medicinal Herbs",
    price: "$12.00",
    image: i % 3 === 0 ? "/images/herb-face-mask.jpg" : i % 3 === 1 ? "/images/passion-flower.jpg" : "/images/Calendula-flower.jpg",
    description: "Our hand-selected herbs are ethically sourced and sun-cured to maintain maximum vibrational potency. This specific remedy supports deep cellular restoration and helps align your body's natural rhythm with the healing power of the earth."
  }));

  // Pagination Logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(allProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (selectedProduct) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [selectedProduct]);

  return (
    <div className="bg-[#0b1f1a] text-white min-h-screen font-sans selection:bg-green-500/30">
      <Navbar />

      {/* --- LIVING BACKGROUND (Logo Watermarks & Curly Lines) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-emerald-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-500/5 blur-[130px] rounded-full" />
        
        {/* logo watermarks grid */}
        <div className="absolute inset-0 opacity-[0.05]">
          {[5, 25, 45, 65, 85].map(t => [10, 50, 90].map(l => (
            <img key={`${t}-${l}`} src="/images/hysspo-bg-preview.png" className="absolute w-48 -rotate-[15deg]" style={{ top: `${t}%`, left: `${l}%`, transform: 'translate(-50%, -50%) rotate(-15deg)' }} alt="" />
          )))}
        </div>

        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <path d="M-100,400 C150,200 350,600 500,400 S850,200 1100,400" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-[0.6em] uppercase text-amber-500 font-black block mb-4">The Complete Collection</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight">
            Sacred <span className="italic text-green-400">Catalog</span>
          </h1>
        </div>

        {/* --- PRODUCT GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {currentProducts.map((product) => (
            <div key={product.id} className="group w-full max-w-[280px] [perspective:1200px]">
              <div
                onClick={() => setSelectedProduct(product)}
                className="relative h-[300px] rounded-[35px] overflow-hidden cursor-pointer transition-all duration-700 ease-out transform-gpu [transform-style:preserve-3d] [transform:rotateY(-8deg)] group-hover:[transform:rotateY(10deg)_rotateX(2deg)] group-hover:shadow-[rgba(34,197,94,0.15)_-15px_30px_40px_0px]"
                style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="absolute inset-[8px] rounded-[28px] bg-white/[0.02] backdrop-blur-[3px] overflow-hidden [transform:translateZ(25px)]">
                  <div className="relative h-[55%] w-full overflow-hidden">
                    <img src={product.image} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" alt={product.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f1a] to-transparent opacity-40" />
                  </div>
                  <div className="px-5 py-4">
                    <h3 className="text-lg font-serif text-white mb-0.5 truncate">{product.title}</h3>
                    <p className="text-[8px] tracking-[0.3em] uppercase text-gray-500 mb-3">{product.category}</p>
                    <div className="flex items-center justify-between">
                      <p className="text-base font-bold text-green-400">{product.price}</p>
                      <div className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-white/40 group-hover:text-green-400 group-hover:border-green-400 transition-all">→</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- PAGINATION NAVIGATION --- */}
        <div className="mt-24 flex justify-center items-center gap-4">
          <button 
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-[#0b1f1a] transition-all disabled:opacity-20 cursor-pointer"
          >
       
          </button>
          
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={`w-12 h-12 rounded-full border transition-all cursor-pointer font-bold text-xs
                  ${currentPage === i + 1 ? "bg-green-500 border-green-500 text-[#0b1f1a] shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "border-white/10 hover:border-white/30 text-white"}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-[#0b1f1a] transition-all disabled:opacity-20 cursor-pointer"
          >
           
          </button>
        </div>

      </main>

      {/* --- PRODUCT MODAL --- */}
      {selectedProduct && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-xl animate-fadeIn px-4 pb-[8vh]" onClick={() => setSelectedProduct(null)}>
          <div className="relative w-full max-w-5xl max-h-[85vh] bg-[#061411]/95 backdrop-blur-[50px] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedProduct(null)} className="absolute top-6 right-6 z-30 bg-white/5 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center text-white/50 hover:text-white border border-white/10 transition-all cursor-pointer">✕</button>
            <div className="md:w-5/12 h-56 md:h-auto relative shrink-0">
              <img src={selectedProduct.image} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b1f1a]/40" />
            </div>
            <div className="relative z-10 md:w-7/12 p-10 md:p-14 flex flex-col justify-between overflow-y-auto">
              <div className="mb-8">
                <span className="text-green-400 text-[10px] tracking-[0.5em] uppercase mb-2 block font-black">{selectedProduct.category}</span>
                <h2 className="text-4xl md:text-5xl font-serif mb-3 text-white leading-tight">{selectedProduct.title}</h2>
                <p className="text-2xl font-bold text-white/90 mb-6">{selectedProduct.price}</p>
                <div className="h-[1px] w-12 bg-green-500/40 mb-8" />
                <p className="text-gray-300 leading-relaxed font-light text-base italic">{selectedProduct.description}</p>
              </div>
              
              {/* --- ACTION BUTTON WITH TANIADOU DNA --- */}
              <div className="relative inline-block group w-full">
                <button className="relative w-full py-4 bg-transparent border-none text-white font-black uppercase tracking-[0.2em] text-[11px] cursor-pointer z-10 transition-transform active:scale-95">
                  Order to Sanctuary
                  <div className="absolute inset-0 -z-10 rounded-2xl border border-white/10 bg-green-500/20 shadow-[inset_0_0_12px_rgba(74,222,128,0.4)] transition-all duration-300 group-hover:bg-green-500/40" />
                  <div className="absolute inset-0 -z-10 rounded-2xl p-[1px]" style={{ background: 'linear-gradient(180deg, rgba(134,239,172,0.4) 0%, rgba(134,239,172,0) 100%)', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor' }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
}