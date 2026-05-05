import Navbar from "../components/Navbar";

export default function ContactPage() {
  return (
    <div className="bg-[#0b1f1a] text-white min-h-screen">

      <Navbar />

      <div className="px-10 py-24">

        <h1 className="text-4xl mb-6 text-center">Contact Us</h1>

        <p className="text-gray-300 text-center mb-10">
          We would love to hear from you.
        </p>

        <form className="max-w-xl mx-auto space-y-4 bg-white/5 p-8 rounded-2xl border border-white/10">

          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-3 rounded bg-white/10"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-3 rounded bg-white/10"
          />

          <textarea
            placeholder="Your Message"
            className="w-full p-3 rounded bg-white/10 h-32"
          />

          <button className="bg-green-500 px-6 py-3 rounded w-full">
            Send Message
          </button>

        </form>

      </div>
    </div>
  );
}