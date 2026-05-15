import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaChevronLeft, FaChevronRight, FaShoppingBag, FaTrash, FaMinus, FaPlus, FaCheckCircle } from "react-icons/fa";
import { createClient } from "@supabase/supabase-js";

// ─────────────────────────────────────────────────────────
// SUPABASE CLIENT
// Replace these two values with your actual Supabase project
// credentials from: https://supabase.com/dashboard → project → Settings → API
// ─────────────────────────────────────────────────────────
const SUPABASE_URL  = import.meta.env.VITE_SUPABASE_URL  ?? "";
const SUPABASE_ANON = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";

// Guard: only initialise if real credentials are present — prevents white-screen crash
// during development before you have filled in your .env file
const supabase = (SUPABASE_URL && SUPABASE_URL !== "YOUR_SUPABASE_PROJECT_URL")
  ? createClient(SUPABASE_URL, SUPABASE_ANON)
  : null;

// ─────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────
interface Product {
  id: number;
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface OrderForm {
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  notes: string;
}

const emptyForm: OrderForm = {
  name: "", email: "", phone: "", country: "", city: "", notes: "",
};

// ─────────────────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────────────────
export default function Shop() {
  // Product / pagination
  const [selectedProduct, setSelectedProduct]   = useState<Product | null>(null);
  const [modalStep, setModalStep]               = useState<"info" | "order">("info");
  const [currentPage, setCurrentPage]           = useState(1);
  const productsPerPage = 12;

  // Cart — persisted to localStorage so it survives page refresh
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem("hyssop_cart");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [cartOpen, setCartOpen]     = useState(false);
  const [cartSource, setCartSource] = useState<"cart" | "direct">("cart"); // who triggered order form

  // Order form
  const [form, setForm]           = useState<OrderForm>(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [formError, setFormError]   = useState("");

  // Scroll lock ref
  const savedScrollY = useRef(0);

  // ── Mock product data (replace with your real Supabase products query later) ──
  const allProducts: Product[] = Array.from({ length: 40 }).map((_, i) => ({
    id: i + 1,
    title:    i % 3 === 0 ? "Soursop Leaves"   : i % 3 === 1 ? "Passion Flower"    : "Calendula Flower",
    category: "Medicinal Herbs",
    price:    "$12.00",
    image:    i % 3 === 0 ? "/images/herb-face-mask.jpg" : i % 3 === 1 ? "/images/passion-flower.jpg" : "/images/Calendula-flower.jpg",
    description: "Our hand-selected herbs are ethically sourced and sun-cured to maintain maximum vibrational potency. This specific remedy supports deep cellular restoration and helps align your body's natural rhythm with the healing power of the earth.",
  }));

  // Pagination
  const indexOfFirst   = (currentPage - 1) * productsPerPage;
  const currentProducts = allProducts.slice(indexOfFirst, indexOfFirst + productsPerPage);
  const totalPages      = Math.ceil(allProducts.length / productsPerPage);

  const paginate = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Scroll lock when modal or cart is open ──
  const anyOverlayOpen = !!(selectedProduct || cartOpen);
  useEffect(() => {
    if (anyOverlayOpen) {
      savedScrollY.current = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top      = `-${savedScrollY.current}px`;
      document.body.style.left     = "0";
      document.body.style.right    = "0";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.position = "";
      document.body.style.top      = "";
      document.body.style.left     = "";
      document.body.style.right    = "";
      document.body.style.overflow = "";
      window.scrollTo({ top: savedScrollY.current, behavior: "instant" as ScrollBehavior });
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top      = "";
      document.body.style.left     = "";
      document.body.style.right    = "";
      document.body.style.overflow = "";
    };
  }, [anyOverlayOpen]);

  // ── Cart helpers ──
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const cartTotal = cart.reduce((s, i) => s + parseFloat(i.price.replace("$", "")) * i.quantity, 0);

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try { localStorage.setItem("hyssop_cart", JSON.stringify(cart)); } catch {}
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) return prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) =>
    setCart(prev => prev.filter(i => i.id !== id));

  const updateQty = (id: number, delta: number) =>
    setCart(prev => prev
      .map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)
    );

  // ── Open modal helpers ──
  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setModalStep("info");
    setSubmitted(false);
    setForm(emptyForm);
    setFormError("");
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setModalStep("info");
    setSubmitted(false);
    setForm(emptyForm);
    setFormError("");
  };

  // ── "Order This Now" — direct single-product order ──
  const openDirectOrder = (product: Product) => {
    setCartSource("direct");
    setModalStep("order");
  };

  // ── "Proceed to Order" from cart ──
  const openCartOrder = () => {
    setCartOpen(false);
    // We need a dummy selectedProduct context for the modal portal
    // so we open modal with the first cart item as context (modal shows cart summary)
    setSelectedProduct(cart[0]);
    setCartSource("cart");
    setModalStep("order");
    setSubmitted(false);
    setForm(emptyForm);
    setFormError("");
  };

  // ── Build order items string for Supabase + email ──
  const buildOrderItems = () => {
    if (cartSource === "direct" && selectedProduct) {
      return `${selectedProduct.title} × 1 — ${selectedProduct.price}`;
    }
    return cart.map(i => `${i.title} × ${i.quantity} — $${(parseFloat(i.price.replace("$","")) * i.quantity).toFixed(2)}`).join("\n");
  };

  // ── Submit order ──
  const handleSubmit = async () => {
    const { name, email, phone, country, city } = form;
    if (!name || !email || !phone || !country || !city) {
      setFormError("Please fill in all required fields.");
      return;
    }
    setFormError("");
    setSubmitting(true);

    const orderItems = buildOrderItems();
    const totalAmount = cartSource === "direct" && selectedProduct
      ? selectedProduct.price
      : `$${cartTotal.toFixed(2)}`;

    try {
      // 1. Save to Supabase orders table
      if (!supabase) throw new Error("Supabase not configured — fill in VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file");
      const { error: dbError } = await supabase.from("orders").insert([{
        customer_name:    name,
        customer_email:   email,
        customer_phone:   phone,
        customer_country: country,
        customer_city:    city,
        order_items:      orderItems,
        total_amount:     totalAmount,
        notes:            form.notes || null,
        status:           "pending",
      }]);

      if (dbError) throw dbError;

      // "to" is NOT sent — hardcoded in the Edge Function (prevents open mail relay exploit)
      const { error: fnError } = await supabase.functions.invoke("send-order-email", {
        body: {
          customerName:  name,
          customerEmail: email,
          customerPhone: phone,
          location:      `${city}, ${country}`,
          orderItems,
          totalAmount,
          notes:         form.notes || "None",
        },
      });

      if (fnError) throw fnError;

      setSubmitted(true);
      if (cartSource === "cart") setCart([]); // clear cart after cart order
    } catch (err) {
      console.error(err);
      setFormError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // ─────────────────────────────────────────────────────────
  // SHARED FORM UI (used inside both modal and cart flow)
  // ─────────────────────────────────────────────────────────
  const inputClass =
    "w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-green-500/50 focus:bg-white/[0.07] transition-all duration-300";

  // FIX: This is JSX, NOT a component function.
  // Defining it as a component inside render (const Foo = () =>)
  // causes React to remount it from scratch on every state change,
  // which destroys focus — that's why the textarea lost focus after each keystroke.
  // Rendering it as a plain JSX expression avoids that entirely.
  const orderFormJSX = (
    <div className="flex flex-col h-full">
      {submitted ? (
        // ── SUCCESS STATE ──
        <div className="flex-1 flex flex-col items-center justify-center text-center gap-5 py-8">
          <FaCheckCircle className="text-green-400 text-5xl" />
          <h3 className="text-2xl font-serif text-white">Order Received!</h3>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs italic">
            Thank you, {form.name}. The Hyssop team will contact you at{" "}
            <span className="text-green-400">{form.email}</span> or{" "}
            <span className="text-green-400">{form.phone}</span> shortly to complete your order.
          </p>
          <button
            onClick={closeModal}
            className="mt-2 px-8 py-3 rounded-full border border-white/10 bg-white/5 text-white/70 text-xs uppercase tracking-widest hover:bg-white/10 transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      ) : (
        // ── FORM STATE ──
        <>
          <div className="mb-5">
            <h3 className="text-xl font-serif text-white mb-1">
              {cartSource === "cart" ? "Place Your Order" : `Order: ${selectedProduct?.title}`}
            </h3>
            {cartSource === "cart" && (
              <div className="mt-2 mb-4 rounded-xl bg-white/[0.03] border border-white/10 px-4 py-3">
                {cart.map(i => (
                  <div key={i.id} className="flex justify-between text-xs text-gray-400 py-0.5">
                    <span>{i.title} × {i.quantity}</span>
                    <span>${(parseFloat(i.price.replace("$","")) * i.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between text-xs text-green-400 font-bold border-t border-white/10 pt-2 mt-2">
                  <span>Total</span><span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            )}
            <p className="text-gray-500 text-xs italic">
              Fill in your details — we'll contact you to confirm & arrange delivery.
            </p>
          </div>

          <div className="flex flex-col gap-3 flex-1">
            <div className="grid grid-cols-2 gap-3">
              <input className={inputClass} placeholder="Full Name *" value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
              <input className={inputClass} placeholder="Email *" type="email" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input className={inputClass} placeholder="Phone / WhatsApp *" value={form.phone}
                onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
              <input className={inputClass} placeholder="Country *" value={form.country}
                onChange={e => setForm(f => ({ ...f, country: e.target.value }))} />
            </div>
            <input className={inputClass} placeholder="City *" value={form.city}
              onChange={e => setForm(f => ({ ...f, city: e.target.value }))} />
            <textarea
              className={`${inputClass} resize-none`} rows={2}
              placeholder="Notes (allergies, questions, special requests...)"
              value={form.notes}
              onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
            />

            {formError && (
              <p className="text-red-400/80 text-xs">{formError}</p>
            )}

            <div className="flex gap-3 mt-1">
              <button
                onClick={() => setModalStep("info")}
                className="px-5 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-white/50 text-xs uppercase tracking-widest hover:bg-white/[0.07] transition-all cursor-pointer"
              >
                ← Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="flex-1 relative py-3 rounded-xl text-white font-black text-xs uppercase tracking-[0.2em] cursor-pointer transition-all disabled:opacity-50"
                style={{
                  background: submitting ? "rgba(34,197,94,0.2)" : "rgba(34,197,94,0.25)",
                  border: "1px solid rgba(52,211,153,0.3)",
                  boxShadow: "inset 0 0 12px rgba(74,222,128,0.2)",
                }}
              >
                {submitting ? "Sending..." : "Confirm Order →"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );

  // ─────────────────────────────────────────────────────────
  // MODAL (portal — immune to parent transforms)
  // ─────────────────────────────────────────────────────────
  const modal = selectedProduct ? createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-xl animate-fadeIn px-4"
      onClick={closeModal}
    >
      <div
        className="relative w-full max-w-5xl bg-[#061411]/85 backdrop-blur-[60px] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row"
        style={{ boxShadow: "0 0 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.07)", maxHeight: "88vh" }}
        onClick={e => e.stopPropagation()}
        onWheel={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 z-30 bg-white/5 backdrop-blur-md w-9 h-9 rounded-full flex items-center justify-center text-white/40 hover:text-white border border-white/10 transition-all cursor-pointer text-sm"
        >✕</button>

        {/* Left — product image (always visible) */}
        <div className="md:w-5/12 h-48 md:h-auto relative shrink-0">
          <img src={selectedProduct.image} className="w-full h-full object-cover" alt="" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#061411]/60" />
          {/* Step indicator */}
          <div className="absolute bottom-4 left-4 flex gap-2">
            <div className={`h-1 w-6 rounded-full transition-all duration-500 ${modalStep === "info" ? "bg-green-400" : "bg-white/20"}`} />
            <div className={`h-1 w-6 rounded-full transition-all duration-500 ${modalStep === "order" ? "bg-green-400" : "bg-white/20"}`} />
          </div>
        </div>

        {/* Right — content panel
              Each step is a normal flow div (not absolute) inside a
              scroll container. overflow-y-auto lets it scroll when needed.
              The custom scrollbar CSS below makes it invisible when there
              is nothing to scroll, and a thin subtle bar when there is. */}
        <div className="relative md:w-7/12 flex flex-col min-h-0">

          {/* Step 1: Product Info */}
          {modalStep === "info" && (
            <div
              className="flex flex-col justify-between p-8 md:p-12 overflow-y-auto modal-scroll h-full"
              style={{ touchAction: "pan-y", overscrollBehavior: "contain" }}
              onWheel={e => { e.stopPropagation(); }}
            >
              <div>
                <span className="text-green-400 text-[10px] tracking-[0.5em] uppercase mb-2 block font-black">{selectedProduct.category}</span>
                <h2 className="text-3xl md:text-4xl font-serif mb-2 text-white leading-tight">{selectedProduct.title}</h2>
                <p className="text-xl font-bold text-white/80 mb-5">{selectedProduct.price}</p>
                <div className="h-px w-10 bg-green-500/30 mb-5" />
                <p className="text-gray-300/80 leading-relaxed font-light text-sm italic">{selectedProduct.description}</p>
              </div>

              <div className="flex gap-3 mt-6 shrink-0">
                {/* Add to Cart */}
                <button
                  onClick={() => { addToCart(selectedProduct); closeModal(); setCartOpen(true); }}
                  className="flex-1 py-3.5 rounded-2xl text-green-400 font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer transition-all"
                  style={{ border: "1px solid rgba(52,211,153,0.25)", background: "rgba(52,211,153,0.06)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(52,211,153,0.14)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(52,211,153,0.06)")}
                >
                  + Add to Cart
                </button>
                {/* Order Now */}
                <button
                  onClick={() => openDirectOrder(selectedProduct)}
                  className="flex-1 py-3.5 rounded-2xl text-white font-black text-[10px] uppercase tracking-[0.2em] cursor-pointer transition-all"
                  style={{ background: "rgba(34,197,94,0.22)", border: "1px solid rgba(52,211,153,0.3)", boxShadow: "inset 0 0 12px rgba(74,222,128,0.2)" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(34,197,94,0.38)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(34,197,94,0.22)")}
                >
                  Order Now →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Order Form */}
          {modalStep === "order" && (
            <div
              className="p-8 md:p-12 overflow-y-auto modal-scroll h-full"
              style={{ touchAction: "pan-y", overscrollBehavior: "contain" }}
              onWheel={e => { e.stopPropagation(); }}
            >
              {orderFormJSX}
            </div>
          )}

        </div>
      </div>
    </div>,
    document.body
  ) : null;

  // ─────────────────────────────────────────────────────────
  // CART DRAWER (portal — guarded so it never runs server-side or before mount)
  // ─────────────────────────────────────────────────────────
  const cartDrawer = typeof document === "undefined" ? null : createPortal(
    <>
      {/* Backdrop */}
      {cartOpen && (
        <div
          className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
          onClick={() => setCartOpen(false)}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[9999] w-full max-w-sm flex flex-col transition-transform duration-500"
        style={{
          transform: cartOpen ? "translateX(0)" : "translateX(100%)",
          background: "rgba(6,20,17,0.92)",
          backdropFilter: "blur(40px)",
          borderLeft: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "-20px 0 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-3">
            <FaShoppingBag className="text-green-400 text-sm" />
            <span className="text-white font-black text-sm uppercase tracking-[0.2em]">Your Cart</span>
            {cartCount > 0 && (
              <span className="bg-green-500 text-[#0b1f1a] text-[10px] font-black px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </div>
          <button onClick={() => setCartOpen(false)}
            className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all cursor-pointer text-xs">
            ✕
          </button>
        </div>

        {/* Drawer items */}
        <div
          className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3"
          style={{ touchAction: "pan-y", overscrollBehavior: "contain" }}
          onWheel={e => e.stopPropagation()}
        >
          {cart.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 py-16">
              <FaShoppingBag className="text-white/10 text-4xl" />
              <p className="text-white/20 text-sm italic">Your cart is empty</p>
              <button
                onClick={() => setCartOpen(false)}
                className="mt-2 text-green-400/60 text-xs uppercase tracking-widest hover:text-green-400 transition-colors cursor-pointer"
              >
                Continue browsing
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id}
                className="flex gap-3 p-3 rounded-2xl border border-white/8 bg-white/[0.02]">
                <img src={item.image} className="w-14 h-14 rounded-xl object-cover shrink-0" alt="" />
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-serif truncate">{item.title}</p>
                  <p className="text-green-400 text-xs font-bold mt-0.5">{item.price}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQty(item.id, -1)}
                      className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white cursor-pointer transition-all">
                      <FaMinus className="text-[8px]" />
                    </button>
                    <span className="text-white text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)}
                      className="w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white cursor-pointer transition-all">
                      <FaPlus className="text-[8px]" />
                    </button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)}
                  className="text-white/20 hover:text-red-400 transition-colors cursor-pointer self-start mt-1">
                  <FaTrash className="text-xs" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer footer */}
        {cart.length > 0 && (
          <div className="px-6 py-5 border-t border-white/8">
            <div className="flex justify-between text-sm mb-4">
              <span className="text-gray-400">Total</span>
              <span className="text-white font-bold">${cartTotal.toFixed(2)}</span>
            </div>
            <button
              onClick={openCartOrder}
              className="w-full py-4 rounded-2xl text-white font-black text-[11px] uppercase tracking-[0.2em] cursor-pointer transition-all"
              style={{
                background: "rgba(34,197,94,0.25)",
                border: "1px solid rgba(52,211,153,0.3)",
                boxShadow: "inset 0 0 14px rgba(74,222,128,0.2)",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(34,197,94,0.4)")}
              onMouseLeave={e => (e.currentTarget.style.background = "rgba(34,197,94,0.25)")}
            >
              Proceed to Order →
            </button>
          </div>
        )}
      </div>
    </>,
    document.body
  );

  // ─────────────────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────────────────
  return (
    <div className="bg-[#0b1f1a] text-white min-h-screen font-sans selection:bg-green-500/30">
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-emerald-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-amber-500/5 blur-[130px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.05]">
          {[5, 25, 45, 65, 85].map(t => [10, 50, 90].map(l => (
            <img key={`${t}-${l}`} src="/images/hysspo-bg-preview.png"
              className="absolute w-48" aria-hidden="true"
              style={{ top: `${t}%`, left: `${l}%`, transform: "translate(-50%,-50%) rotate(-15deg)" }} alt="" />
          )))}
        </div>
        <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000">
          <path d="M-100,400 C150,200 350,600 500,400 S850,200 1100,400" stroke="white" strokeWidth="0.5" fill="none" />
        </svg>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-[10px] tracking-[0.6em] uppercase text-amber-500 font-black block mb-4">The Complete Collection</span>
          <h1 className="text-5xl md:text-7xl font-serif leading-tight">
            Sacred <span className="italic text-green-400">Catalog</span>
          </h1>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
          {currentProducts.map(product => (
            <div key={product.id} className="group w-full max-w-[280px] [perspective:1200px]">
              <div
                className="relative h-[300px] rounded-[35px] overflow-hidden cursor-pointer transition-all duration-700 ease-out transform-gpu [transform-style:preserve-3d] [transform:rotateY(-8deg)] group-hover:[transform:rotateY(10deg)_rotateX(2deg)] group-hover:shadow-[rgba(34,197,94,0.15)_-15px_30px_40px_0px]"
                style={{ background: "linear-gradient(135deg,rgba(255,255,255,0.03),rgba(255,255,255,0.01))", border: "1px solid rgba(255,255,255,0.08)" }}
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
                      {/* Quick-add to cart */}
                      <button
                        onClick={e => { e.stopPropagation(); addToCart(product); setCartOpen(true); }}
                        className="w-7 h-7 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-white/40 hover:text-green-400 hover:border-green-400/50 transition-all cursor-pointer"
                        title="Add to cart"
                      >+</button>
                    </div>
                  </div>
                </div>
                {/* Tap whole card to open modal */}
                <div className="absolute inset-0 cursor-pointer" onClick={() => openProduct(product)} />
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-24 flex justify-center items-center gap-4">
          <button disabled={currentPage === 1} onClick={() => paginate(currentPage - 1)}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-[#0b1f1a] transition-all disabled:opacity-20 cursor-pointer">
            <FaChevronLeft className="text-xs" />
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => paginate(i + 1)}
                className={`w-12 h-12 rounded-full border transition-all cursor-pointer font-bold text-xs ${currentPage === i + 1 ? "bg-green-500 border-green-500 text-[#0b1f1a] shadow-[0_0_20px_rgba(34,197,94,0.4)]" : "border-white/10 hover:border-white/30 text-white"}`}>
                {i + 1}
              </button>
            ))}
          </div>
          <button disabled={currentPage === totalPages} onClick={() => paginate(currentPage + 1)}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-green-500 hover:text-[#0b1f1a] transition-all disabled:opacity-20 cursor-pointer">
            <FaChevronRight className="text-xs" />
          </button>
        </div>
      </main>

      {/* Floating cart button */}
      <button
        onClick={() => setCartOpen(true)}
        className="fixed bottom-8 right-8 z-[9990] w-14 h-14 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
        style={{
          background: "rgba(34,197,94,0.2)",
          border: "1px solid rgba(52,211,153,0.35)",
          boxShadow: "0 0 30px rgba(34,197,94,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
        }}
      >
        <FaShoppingBag className="text-green-400 text-lg" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 text-[#0b1f1a] text-[10px] font-black rounded-full flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </button>

      <Footer />

      {/* Portals */}
      {modal}
      {cartDrawer}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to   { opacity: 1; transform: scale(1);    }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out forwards; }

        /* Scrollbar is invisible by default — only shows when content overflows */
        .modal-scroll { scrollbar-width: thin; scrollbar-color: transparent transparent; }
        .modal-scroll:hover { scrollbar-color: rgba(52,211,153,0.25) transparent; }
        .modal-scroll::-webkit-scrollbar { width: 4px; }
        .modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .modal-scroll::-webkit-scrollbar-thumb { background: transparent; border-radius: 99px; }
        .modal-scroll:hover::-webkit-scrollbar-thumb { background: rgba(52,211,153,0.25); }
      `}</style>
    </div>
  );
}