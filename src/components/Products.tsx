import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
}

export default function Products() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const navigate = useNavigate();

  // --- LOCK BACKGROUND SCROLL ---
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [selectedProduct]);

  const products: Product[] = [
    {
      id: 1,
      title: "Soursop Leaves",
      category: "Indoor Plants",
      price: "$12.00",
      image: "/images/herb-face-mask.jpg",
      description: "Soursop leaves are traditionally used in herbal medicine for their potential health benefits, including promoting relaxation, supporting the immune system, and aiding digestion. They are commonly consumed as a tea or infusion. Soursop leaves contain various compounds, including antioxidants. Soursop leaves have also been studied for their potential anti-cancer, anti-diabetic, and anti-inflammatory properties, but more research is needed to confirm these effects."
    },
    {
      id: 2,
      title: "Passion Flower",
      category: "Indoor Plants",
      price: "$12.00",
      image: "/images/passion-flower.jpg",
      description: "A passion flower is a typically fast-growing, climbing vine with showy, intricate flowers and tendrils. The genus Passiflora produces exotic flowers known for their central column called an androgynophore, to which the stamens and pistil are attached, and a distinctive corona of filaments. The appearance varies by species, but flowers often have five sepals, five petals, and prominent floral parts, attracting pollinators like bees and butterflies. Many species produce a fleshy, often edible fruit, and the plant itself has historical medicinal uses."
    },
    {
      id: 3,
      title: "Calendula Flower",
      category: "Indoor Plants",
      price: "$12.00",
      image: "/images/Calendula-flower.jpg",
      description: "Organic calendula flowers (Calendula officinalis) are yellow to bright orange, daisy-like blooms from an annual herb with a long history of use in herbal medicine, skincare, and as a culinary ingredient. Also known as pot marigold, these flowers are valued for their skin-soothing, anti-inflammatory properties and are typically infused into oils for balms and salves, steeped into a tea, or added to food. They are native to Southern Europe and the Mediterranean and can be grown in gardens worldwide."
    }
  ];

  return (
    <>
      <section id="products" className="relative py-24 px-6 bg-[#0b1f1a]">
        
        {/* --- BACKGROUND ELEMENTS --- */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.05] overflow-hidden">
          <div className="absolute top-1/2 left-1/4 text-white text-8xl select-none">🌿</div>
          <div className="absolute bottom-1/4 right-10 text-white text-6xl rotate-45 select-none">🍃</div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-center mb-16">
            Nature's <span className="text-green-400 italic">Pharmacy</span>
          </h2>

          {/* --- PRODUCTS GRID --- */}
          <div className="grid md:grid-cols-3 gap-10">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer relative bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-[2rem] hover:bg-white/10 transition-all duration-500 hover:-translate-y-2 scale-[0.98]"
              >
                <div className="relative h-64 w-full overflow-hidden rounded-[1.5rem] mb-6">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f1a]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
                    <span className="text-white text-[10px] tracking-[0.3em] uppercase font-bold">Quick View</span>
                  </div>
                </div>
                <div className="text-center pb-2">
                  <h3 className="text-xl font-serif mb-1">{product.title}</h3>
                  <p className="text-green-400/80 text-[10px] tracking-widest uppercase mb-2">{product.category}</p>
                  <p className="text-lg font-bold text-white/90">{product.price}</p>
                </div>
              </div>
            ))}
          </div>

          {/* --- BROWSE ALL BUTTON (Higher and Smaller) --- */}
          <div className="mt-12 text-center"> 
            <button 
              onClick={() => navigate('/shop')} 
              className="group relative px-9 py-3 bg-green-500 text-white font-bold rounded-full overflow-hidden shadow-[0_0_20px_rgba(34,197,94,0.3)] transition-all cursor-pointer"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-45 -translate-x-full group-hover:animate-shimmer" />
              <span className="relative z-10 text-base">Browse All Herbs</span>
            </button>
          </div>
        </div>
      </section>

      {/* --- THE STABLE FIXED POPUP --- */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 w-full h-full z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-md animate-fadeIn px-4 pb-[8vh]" 
          onClick={() => setSelectedProduct(null)}
        >
          {/* 
            - pb-[8vh] above pushes the modal up naturally without breaking the 'fixed' anchor.
            - Removed -translate-y-12 from the div below for stability.
          */}
          <div 
            className="relative w-full max-w-5xl max-h-[85vh] bg-white/[0.03] backdrop-blur-[45px] border border-white/20 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Inner Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />

            {/* Close Button */}
            <button 
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 z-30 bg-white/10 backdrop-blur-xl w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white border border-white/20 transition-all cursor-pointer"
            >
              ✕
            </button>

            {/* Image */}
            <div className="md:w-5/12 h-48 md:h-auto relative shrink-0">
              <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.title} />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b1f1a]/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 md:w-7/12 p-8 md:p-10 flex flex-col justify-between overflow-y-auto">
              <div>
                <span className="text-green-400 text-[10px] tracking-[0.4em] uppercase mb-2 block font-bold">
                  {selectedProduct.category}
                </span>
                <h2 className="text-3xl md:text-4xl font-serif mb-2 text-white">{selectedProduct.title}</h2>
                <p className="text-xl font-bold text-white/90 mb-6">{selectedProduct.price}</p>
                <div className="h-[1px] w-16 bg-green-500/40 mb-6" />
                <p className="text-gray-200 leading-relaxed font-light text-sm italic mb-8">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Action Buttons (10% smaller) */}
              <div className="flex flex-col sm:flex-row gap-3 mt-auto">
                <button className="flex-1 py-3 bg-green-600/80 backdrop-blur-md text-white font-bold rounded-xl text-sm border border-white/10 hover:bg-green-500 transition-all cursor-pointer">
                  Add to Sanctuary
                </button>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl text-sm hover:bg-white/10 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes shimmer { 100% { transform: translateX(300%) skewX(-45deg); } }
        .animate-shimmer { animation: shimmer 2s infinite; }
        
        @keyframes fadeIn { 
          from { opacity: 0; } 
          to { opacity: 1; } 
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }
      `}</style>
    </>
  );
}