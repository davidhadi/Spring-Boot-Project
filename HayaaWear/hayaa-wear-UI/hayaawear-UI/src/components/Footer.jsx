import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative bg-black/90 backdrop-blur-xl border-t border-yellow-600/30 text-yellow-100 pt-24 pb-16 px-4 md:px-8">

      <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-extrabold tracking-widest text-transparent bg-gradient-to-r from-[#c9a227] via-[#f4e2a1] to-[#c9a227] bg-clip-text mb-4">
            HayaaWear
          </h2>
          <p className="text-sm text-yellow-200">
            Luxury modest fashion crafted with elegance and tradition.
            Elevate your wardrobe with timeless designs.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-lg text-yellow-400 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-yellow-300 cursor-pointer">Shop</li>
            <li className="hover:text-yellow-300 cursor-pointer">New Arrivals</li>
            <li className="hover:text-yellow-300 cursor-pointer">Wedding Collection</li>
            <li className="hover:text-yellow-300 cursor-pointer">Contact Us</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-lg text-yellow-400 mb-4">Contact Us</h3>
          <p className="text-sm mb-2">📍 Mumbai, Maharashtra, India</p>
          <p className="text-sm mb-2">📞 +91 98765 43210</p>
          <p className="text-sm mb-2">✉ support@hayaawear.com</p>

          <div className="flex space-x-4 mt-4 text-xl">
            <span className="hover:text-yellow-300 cursor-pointer">🌐</span>
            <span className="hover:text-yellow-300 cursor-pointer">📘</span>
            <span className="hover:text-yellow-300 cursor-pointer">📸</span>
          </div>
        </div>

        {/* MAP */}
        <div>
          <h3 className="text-lg text-yellow-400 mb-4">Our Location</h3>

          <div className="rounded-xl overflow-hidden border border-yellow-600/30">
            <iframe
              title="map"
              src="https://www.google.com/maps?q=Mumbai,India&output=embed"
              width="100%"
              height="200"
              loading="lazy"
              className="rounded-xl"
            />
          </div>
        </div>

      </div>

      {/* COPYRIGHT */}
      <div className="text-center text-sm text-yellow-400 mt-12 border-t border-yellow-600/30 pt-6">
        © {new Date().getFullYear()} HayaaWear. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
