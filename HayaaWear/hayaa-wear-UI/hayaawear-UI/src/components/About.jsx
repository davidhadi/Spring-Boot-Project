import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-[#1a1410] to-[#2b1d13] text-white">

      {/* Hero Section */}
      <section className="relative py-28 text-center border-b border-yellow-700/20">
        <div className="max-w-5xl mx-auto px-6">
          <h1 className="text-6xl md:text-7xl font-bold text-yellow-300 mb-6">
            About HayaaWear
          </h1>

          <div className="w-32 h-[2px] bg-yellow-500 mx-auto mb-8"></div>

          <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
            Luxury modest fashion crafted for women who value
            elegance, confidence, and timeless beauty.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-black/50 backdrop-blur-sm border border-yellow-700/20 rounded-3xl p-10 md:p-16 shadow-xl">

          <h2 className="text-4xl font-bold text-yellow-400 mb-8 text-center">
            Our Story
          </h2>

          <p className="text-gray-300 text-lg leading-9 text-center max-w-4xl mx-auto">
            HayaaWear was founded with a vision to redefine modest fashion
            by bringing together elegance, faith, and modern style.
            We provide a trusted platform where women can discover
            premium abayas, hijabs, naqabs, and occasion wear designed
            for every meaningful moment of life.
          </p>

        </div>
      </section>

      {/* Founder Section */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold text-yellow-400 text-center mb-14">
          Founder & CEO
        </h2>

        <div className="bg-black/50 border border-yellow-700/20 rounded-3xl p-10 md:p-14 shadow-xl">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <img
              src="/founder.jpg"
              alt="Founder"
              className="w-56 h-56 rounded-full object-cover border-4 border-yellow-500"
            />

            <div>
              <h3 className="text-3xl font-bold text-yellow-300">
                David Ansari
              </h3>

              <p className="text-yellow-500 font-medium mb-6">
                Founder & CEO, HayaaWear
              </p>

              <p className="text-gray-300 text-lg leading-8">
                "HayaaWear was created to make modest fashion more
                accessible, stylish, and empowering. Our mission is
                to help women embrace elegance without compromising
                their values while creating opportunities for sellers
                across India."
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-14">
          What We Offer
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {[
            "Premium Abayas",
            "Elegant Hijabs",
            "Luxury Naqabs",
            "Eid Collections",
            "Nikah & Walima Wear",
            "Daily Modest Fashion",
          ].map((item) => (
            <div
              key={item}
              className="bg-black/50 border border-yellow-700/20 rounded-2xl p-8 text-center hover:border-yellow-500 transition duration-300"
            >
              <h3 className="text-xl text-yellow-300 font-semibold">
                {item}
              </h3>
            </div>
          ))}
        </div>

      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-14">
          Why Choose HayaaWear
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {[
            "Premium Quality",
            "Trusted Sellers",
            "Secure Shopping",
            "Fast Delivery",
          ].map((item) => (
            <div
              key={item}
              className="bg-black/50 border border-yellow-700/20 rounded-2xl p-8 text-center"
            >
              <h3 className="text-yellow-300 font-semibold text-lg">
                {item}
              </h3>
            </div>
          ))}
        </div>

      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-6 pb-24">

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-black/50 border border-yellow-700/20 rounded-3xl p-10">
            <h3 className="text-3xl text-yellow-400 font-bold mb-6">
              Our Mission
            </h3>

            <p className="text-gray-300 leading-8">
              To become India's most trusted destination for modest
              fashion by offering elegant and faith-conscious clothing
              for every occasion.
            </p>
          </div>

          <div className="bg-black/50 border border-yellow-700/20 rounded-3xl p-10">
            <h3 className="text-3xl text-yellow-400 font-bold mb-6">
              Our Vision
            </h3>

            <p className="text-gray-300 leading-8">
              To empower women through fashion that reflects confidence,
              grace, and authenticity while supporting a growing seller
              community.
            </p>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-yellow-700/20 border-b border-yellow-700/20 py-24">

        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

            <div>
              <h3 className="text-5xl font-bold text-yellow-400">5000+</h3>
              <p className="text-gray-400 mt-2">Products</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-yellow-400">1000+</h3>
              <p className="text-gray-400 mt-2">Customers</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-yellow-400">100+</h3>
              <p className="text-gray-400 mt-2">Sellers</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold text-yellow-400">50+</h3>
              <p className="text-gray-400 mt-2">Cities</p>
            </div>

          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center">

        <h2 className="text-5xl font-bold text-yellow-400 mb-6">
          Join The HayaaWear Journey
        </h2>

        <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
          Discover modest fashion that blends luxury, comfort,
          and timeless elegance.
        </p>

        <button className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-10 py-4 rounded-xl transition">
          Explore Collection
        </button>

      </section>

    </div>
  );
};

export default About;