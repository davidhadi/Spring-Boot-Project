import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Home = () => {
  const navigate = useNavigate();

  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Fetch New Arrivals
  const fetchNewArrivals = async () => {
    try {
      const res = await API.get("/products?page=0&size=4");
      setNewArrivals(res.data.content || []);
    } catch (err) {
      console.error("New arrivals fetch error:", err);
    }
  };

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await API.get("/admin/categories");
      setCategories(res.data || []);
    } catch (err) {
      console.error("Category fetch error:", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await Promise.all([fetchNewArrivals(), fetchCategories()]);
      setLoading(false);
    };
    loadData();
  }, []);

  const filterByOccasion = (occasion) => {
    navigate(`/shop?occasion=${occasion}`);
  };

  const filterByStyle = (style) => {
    navigate(`/shop?style=${style}`);
  };

  const filterByCategory = async (cat) => {
    setSelectedCategory(cat);
    try {
      const res = await API.get(`/admin/subcategories/${cat.id}`);
      setSubCategories(res.data);
    } catch (err) {
      console.error("SubCategory fetch error:", err);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2a1f1a] to-[#1a1a1a] text-yellow-100">

      {/* PARTICLES */}
      <Particles
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 25 },
            color: { value: "#D4AF37" },
            size: { value: 2 },
            move: { enable: true, speed: 0.3 },
            opacity: { value: 0.4 },
          },
        }}
        className="absolute inset-0"
      />

      {/* HERO */}
      <section className="relative z-10 pt-36 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-6xl md:text-7xl font-extrabold tracking-widest text-transparent bg-gradient-to-r from-[#c9a227] via-[#f4e2a1] to-[#c9a227] bg-clip-text"
        >
          HayaaWear
        </motion.h1>

        <p className="mt-6 text-xl text-yellow-200">
          Luxury Modest Fashion for Every Occasion
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="mt-10 px-10 py-4 rounded-xl font-semibold bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-black shadow-lg"
        >
          Shop Now
        </button>
      </section>

      {/* SHOP BY OCCASION */}
      <section className="relative z-10 mt-28 px-8">
        <h2 className="text-4xl text-center text-yellow-400 mb-12">
          Shop By Occasion
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {["EID", "NIKAH", "MEHNDI", "WALIMA", "RAMADAN"].map((item) => (
            <div
              key={item}
              onClick={() => filterByOccasion(item)}
              className="cursor-pointer bg-black/60 backdrop-blur-xl rounded-2xl p-10 text-center border border-yellow-600/30 hover:scale-105 transition"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* SHOP BY DRESS TYPE */}
      <section className="relative z-10 mt-32 px-8">
        <h2 className="text-4xl text-center text-yellow-400 mb-12">
          Shop By Dress Type
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => filterByCategory(cat)}
              className="cursor-pointer group relative rounded-3xl overflow-hidden border border-yellow-600/30 bg-gradient-to-br from-[#111] to-[#1a1a1a] shadow-lg hover:shadow-[0_0_60px_rgba(212,175,55,0.35)] transition-all duration-500 hover:-translate-y-2"
            >
              {cat.imageUrl && (
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={`http://localhost:8080${cat.imageUrl}`}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                  <h3 className="absolute bottom-4 left-4 text-xl text-yellow-300 font-semibold">
                    {cat.name}
                  </h3>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* SUBCATEGORY SECTION */}
      {selectedCategory && (
        <section className="relative z-10 mt-20 px-8">
          <h2 className="text-3xl text-yellow-400 mb-10">
            {selectedCategory.name} Collection
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {subCategories.map((sub) => (
              <div
                key={sub.id}
                onClick={() => navigate(`/shop?subCategory=${sub.id}`)}
                className="cursor-pointer group relative rounded-3xl overflow-hidden border border-yellow-600/30 bg-gradient-to-br from-[#111] to-[#1a1a1a] shadow-lg hover:shadow-[0_0_60px_rgba(212,175,55,0.35)] transition-all duration-500 hover:-translate-y-2"
              >
                {sub.imageUrl && (
                  <div className="relative aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={`http://localhost:8080${sub.imageUrl}`}
                      alt={sub.name}
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <h3 className="absolute bottom-4 left-4 text-xl text-yellow-300 font-semibold">
                      {sub.name}
                    </h3>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* NEW ARRIVALS */}
      <section className="relative z-10 mt-32 px-8 pb-20">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl text-yellow-400">New Arrivals</h2>
          <button
            onClick={() => navigate("/shop")}
            className="text-yellow-300 hover:text-yellow-400"
          >
            View All →
          </button>
        </div>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer bg-black/70 rounded-3xl overflow-hidden border border-yellow-600/30"
              >
                <img
                  src={product.primaryImage || "/placeholder.jpg"}
                  alt={product.name}
                  className="aspect-[4/5] w-full object-cover"
                />

                <div className="p-6 text-center">
                  <h3 className="text-xl text-yellow-300 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-yellow-200 mb-4">
                    ₹ {product.discountPrice || product.price}
                  </p>
                  <button className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-black font-semibold">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      <footer className="relative z-10 text-center pb-10 text-yellow-400 text-sm">
        © {new Date().getFullYear()} HayaaWear. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Home;