import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Products from "../components/Products";
import Story from "../components/Story";
import Reviews from "../components/Reviews";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {

useEffect(() => {
  const elements = document.querySelectorAll(".fade-in");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  });

  elements.forEach((el) => observer.observe(el));

  return () => observer.disconnect(); //cleanup
}, []);

  return (
    <div className="bg-[#0b1f1a] text-white">
      <Navbar />
      <div id="home">
        <Hero />
      </div>
      
      <div id ="about" className="fade-in"><About /></div>
      <div id="products" className="fade-in"><Products /></div>
      <div id="story" className="fade-in"><Story /></div>
      <div id="reviews" className="fade-in"><Reviews /></div>
      <div id="contact" className="fade-in"><Contact /></div>

      <Footer />
    </div>
  );
}