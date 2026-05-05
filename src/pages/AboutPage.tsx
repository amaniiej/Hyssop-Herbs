import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <div className="bg-[#0b1f1a] text-white min-h-screen">

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="px-10 py-24 max-w-5xl mx-auto">

        {/* Title */}
        <h1 className="text-4xl text-center mb-10">
          About Hyssop Herb
        </h1>

        {/* Intro */}
        <div className="text-gray-300 text-center mb-12 max-w-3xl mx-auto">
          <p>
            Hyssop Herb is dedicated to providing high-quality herbal
            products that support natural healing and overall wellness.
          </p>
        </div>

        {/* Section 1 */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">

          {/* Image Placeholder */}
          <div className="h-64 bg-gradient-to-br from-green-400/20 to-black rounded-xl flex items-center justify-center">
            Image
          </div>

          {/* Text */}
          <div>
            <h2 className="text-2xl mb-4">Our Mission</h2>
            <p className="text-gray-300">
              Our mission is to empower individuals to embrace natural
              wellness through trusted herbal solutions. We believe in
              the healing power of nature and aim to bring it closer to you.
            </p>
          </div>

        </div>

        {/* Section 2 */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">

          {/* Text */}
          <div>
            <h2 className="text-2xl mb-4">Our Approach</h2>
            <p className="text-gray-300">
              We carefully source our ingredients and ensure that every
              product is crafted with the highest standards of quality,
              safety, and effectiveness.
            </p>
          </div>

          {/* Image Placeholder */}
          <div className="h-64 bg-gradient-to-br from-green-400/20 to-black rounded-xl flex items-center justify-center">
            Image
          </div>

        </div>

        {/* Closing */}
        <div className="text-center text-gray-300 max-w-3xl mx-auto">
          <p>
            At Hyssop Herb, we are committed to helping you live a healthier,
            more balanced life through natural solutions you can trust.
          </p>
        </div>

      </div>
    </div>
  );
}