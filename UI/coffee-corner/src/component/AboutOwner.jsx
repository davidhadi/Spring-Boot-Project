import React from "react";
import { motion } from "framer-motion";

export default function AboutOwner() {
  return (
    <div className="w-full bg-gradient-to-b from-orange-50 to-yellow-100 py-20 px-6 md:px-20">
      <motion.div
        className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {/* Profile Image */}
        <motion.div
          initial={{ scale: 0.9 }}
          whileInView={{ scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="https://i.pravatar.cc/400?img=12"
            alt="Shakil Ansari"
            className="w-[300px] h-[300px] rounded-full object-cover shadow-2xl border-[6px] border-orange-300"
          />
        </motion.div>

        {/* Text Content */}
        <div className="text-center lg:text-left">
          <h2 className="text-5xl font-extrabold text-orange-600 mb-4">
            Shakil Ansari <span className="text-orange-400 text-2xl">(David)</span>
          </h2>
          <p className="text-xl font-medium text-gray-700 mb-2">
            25 Years Old | Software Developer | Java & Spring Expert
          </p>

          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            Hello! I'm a passionate software developer who turned his love for tech and coffee
            into a meaningful experience. I built CoffeeCorner not just as a project, but as a
            **vision** – to mix **technology** with the comforting aroma of coffee.
          </p>

          <p className="text-gray-600 text-base leading-relaxed">
            My mission is to craft clean code, smooth experiences, and great coffee vibes.
            Whether you're here for espresso or exploring codebases, I hope you feel right at home.
          </p>

          <p className="text-orange-600 font-semibold mt-6 italic">
            “Every great idea starts with a cup of coffee — and a few lines of code.”
          </p>
        </div>
      </motion.div>
    </div>
  );
}
