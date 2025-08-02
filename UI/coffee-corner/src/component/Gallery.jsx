import React from "react";
import { motion } from "framer-motion";

const images = [
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348",
  "https://images.unsplash.com/photo-1605478370153-4fcf89f2c7b6",
  "https://images.unsplash.com/photo-1509042239860-f550ce710b93",
  "https://images.unsplash.com/photo-1570872622027-df6c8e38886f"
];

export default function Gallery() {
  return (
    <div className="min-h-screen bg-amber-50 px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-12 text-orange-600">
        Our <span className="text-brown-700">Gallery</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-xl shadow-lg group"
          >
            <img
              src={`${src}?auto=format&fit=crop&w=800&q=80`}
              alt={`gallery-${index}`}
              className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
