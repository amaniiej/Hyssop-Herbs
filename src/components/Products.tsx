export default function Products() {
  return (
    <section id="products" className="py-24 px-10">

      <h2 className="text-3xl text-center mb-12">
        Our Herbal Products
      </h2>

      <div className="grid md:grid-cols-3 gap-8">

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl hover:scale-105 transition hover:shadow-green-500/20"
          >
            <div className="h-40 bg-gradient-to-br from-green-400/20 to-black rounded-lg mb-4 flex items-center justify-center">
              Image
            </div>

            <h3 className="text-xl font-semibold mb-2">
              Herbal Product
            </h3>

            <p className="text-gray-300 text-sm mb-4">
              Natural herbal solution for better wellness.
            </p>

            <button className="text-green-400 text-sm">
              View Details →
            </button>
          </div>
        ))}

      </div>
    </section>
  );
}