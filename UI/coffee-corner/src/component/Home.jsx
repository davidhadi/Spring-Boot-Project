import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import AboutOwner from "./AboutOwner";
import CommentSection from './CommentSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 text-brown-800 overflow-x-hidden">

      {/* Hero Section */}
      <section id="home" className="pt-20 flex flex-col md:flex-row items-center justify-between p-10 md:p-20">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Brewed Fresh <span className="text-orange-500">Everyday</span>
          </h2>
          <p className="text-lg text-gray-700">
            Discover the rich flavors of artisan coffee brewed to perfection. Come sip happiness at CoffeeCorner.
          </p>
          <Link
            to="/coffee-list"
            className="inline-block px-6 py-3 bg-orange-500 text-white rounded-full shadow hover:bg-orange-600 transition"
          >
            Explore Menu
          </Link>
        </motion.div>

        <motion.img
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          src="https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80"
          alt="coffee"
          className="md:w-1/2 rounded-3xl shadow-xl mt-10 md:mt-0"
        />
      </section>

      {/* SVG Divider */}
      <div className="-mt-2">
        <svg viewBox="0 0 1440 100" className="w-full h-auto">
          <path
            fill="#fff7ed"
            d="M0,0 C600,100 840,0 1440,100 L1440,0 L0,0 Z"
          ></path>
        </svg>
      </div>

      {/* About Owner Section */}
      <div className="-mt-1">
        <svg viewBox="0 0 1440 100" className="w-full">
          <path fill="#ffffff" d="M0,0 C480,100 960,0 1440,100 L1440,0 L0,0 Z"></path>
        </svg>
      </div>
      <AboutOwner />

      {/* Team Section */}
      <section id="team" className="py-20 bg-white text-gray-800">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-12">
            Meet Our <span className="text-orange-500">Team</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
            {/* Team Member 1 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-orange-50 p-6 rounded-2xl shadow-lg text-center"
            >
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Amit Sharma"
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">Amit Sharma</h3>
              <p className="text-sm text-orange-600 font-medium mb-2">Founder & Head Barista</p>
              <p className="text-gray-600 text-sm">
                With over 10 years of experience in crafting artisan coffee, Amit ensures every cup is a masterpiece.
              </p>
            </motion.div>

            {/* Team Member 2 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-orange-50 p-6 rounded-2xl shadow-lg text-center"
            >
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Sana Verma"
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">Sana Verma</h3>
              <p className="text-sm text-orange-600 font-medium mb-2">Coffee Art Expert</p>
              <p className="text-gray-600 text-sm">
                Sana blends creativity with skill, turning every latte into an Instagram-worthy piece of art.
              </p>
            </motion.div>

            {/* Team Member 3 */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-orange-50 p-6 rounded-2xl shadow-lg text-center"
            >
              <img
                src="https://randomuser.me/api/portraits/men/85.jpg"
                alt="Rahul Yadav"
                className="w-24 h-24 mx-auto rounded-full mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">Rahul Yadav</h3>
              <p className="text-sm text-orange-600 font-medium mb-2">Customer Experience Lead</p>
              <p className="text-gray-600 text-sm">
                Rahul ensures every guest enjoys warm service and the cozy vibe CoffeeCorner is known for.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comments Section */}
      <CommentSection />
    </div>
  );
}
