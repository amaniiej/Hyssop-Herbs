import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="py-10 text-center bg-[#0f3d2e]">

      {/* Copyright */}
      <p className="text-sm text-gray-300">
        © 2026 Hyssop Wellness
      </p>

      <div className="w-20 h-[1px] bg-green-400/30 mx-auto my-6" />

      {/* Social Section */}
      <div className="text-center mt-6">

        <p className="mb-4 text-gray-400">Follow us</p>

        <div className="flex justify-center gap-6 text-2xl">

          <a href="https://www.facebook.com/share/17KVuWgHUN/?mibextid=wwXIfr" target="_blank" className="hover:text-green-400 transition duration-300 hover:scale-110"><FaFacebook /></a>
          <a href="https://www.instagram.com/hyssop_herbs_and_wellness?igsh=MW5reTZzbHBqMzA2eQ%3D%3D&utm_source=qr" target="_blank" className="hover:text-green-400 transition duration-300 hover:scale-110"><FaInstagram /></a>
          <a href="https://www.youtube.com/@addissinanatural" target="_blank" className="hover:text-green-400 transition duration-300 hover:scale-110"><FaYoutube /></a>
          <a href="https://www.tiktok.com/@addissinanaturalbeauty?_t=ZT-8zNulhbu54H" target="_blank" className="hover:text-green-400 transition duration-300 hover:scale-110"><FaTiktok /></a>

        </div>

      </div>

    </footer>
  );
}