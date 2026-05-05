import Navbar from "../components/Navbar";

export default function Shop() {
  return (
    <div className="bg-[#0b1f1a] text-white min-h-screen">
      
      <Navbar />

      <div className="px-10 py-24">

        <h1 className="text-4xl mb-10 text-center">Shop</h1>

        <div className="grid md:grid-cols-3 gap-8">

          {[1,2,3,4,5,6].map((i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:scale-105 transition"
            >
              <div className="h-40 bg-linear-to-br from-green-400/20 to-black rounded-lg mb-4 flex items-center justify-center">
                <img
  src="/images/111.png"
  className="h-40 w-full object-cover rounded-lg"
/>
              </div>

              <h3 className="font-semibold">Herbal Product</h3>
              <p className="text-gray-400">$20</p>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}