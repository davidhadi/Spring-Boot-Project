import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import logo from "../assets/hayaawear_logo.png";
import heroModel from "../assets/hero.png";
import eidImg from "../assets/occassion/eid.png";
import nikahImg from "../assets/occassion/nikah.png";
import mehndiImg from "../assets/occassion/mehndi.png";
import walimaImg from "../assets/occassion/walima.png";
import dailyImg from "../assets/occassion/party.png";
import shopImg from "../assets/occassion/shopbyoccassion.png"


const API_BASE = import.meta.env.VITE_API_BASE_URL;

const occasions = [
  {
    value: "EID",
    label: "Eid",
    tagline: "Celebrate with Elegance",
    image: eidImg,
  },
  {
    value: "NIKAH",
    label: "Nikah",
    tagline: "A New Beginning",
    image: nikahImg,
  },
  {
    value: "MEHNDI",
    label: "Mehndi",
    tagline: "Traditions in Style",
    image: mehndiImg,
  },
  {
    value: "WALIMA",
    label: "Walima",
    tagline: "Graceful Receptions",
    image: walimaImg,
  },
  {
    value: "DAILY_WEAR",
    label: "Daily Wear",
    tagline: "Modest Elegance PartyWear",
    image: dailyImg,
  },
];

const Home = () => {
  const navigate = useNavigate();

  const [newArrivals, setNewArrivals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  const particlesInit = async (engine) => {
    await loadFull(engine);
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsRes, categoryRes] = await Promise.all([
          API.get("/products?page=0&size=4"),
          API.get("/admin/categories"),
        ]);

        setNewArrivals(productsRes.data.content || []);
        setCategories(categoryRes.data || []);
        console.log("First Category:", categoryRes.data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const openCategory = async (category) => {
    setSelectedCategory(category);

    try {
      const res = await API.get(`/subcategories/${category.id}`);
      setSubCategories(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-white">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2b2111_0%,#0A0A0A_70%)]" />

      {/* Particles */}
      <Particles
        init={particlesInit}
        className="absolute inset-0"
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          particles: {
            number: { value: 30 },
            color: { value: "#D4AF37" },
            size: { value: { min: 1, max: 3 } },
            move: { enable: true, speed: 0.4 },
            opacity: { value: 0.4 },
            links: { enable: false },
          },
        }}
      />

      {/* HERO */}
        {/* ================= HERO SECTION ================= */}
<section className="relative min-h-screen bg-[#0A0A0A] overflow-hidden flex items-center">

  {/* Background Glow */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(212,175,55,0.18),transparent_45%)]" />

  {/* Left Content */}
  <motion.div
    initial={{ opacity: 0, x: -40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
    className="relative z-10 w-full lg:w-[45%] px-8 md:px-16 lg:pl-24"
  >
    <img
      src={logo}
      alt="HayaaWear"
      className="h-16 md:h-20 mb-8"
    />

    <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold leading-tight">
      <span className="bg-gradient-to-r from-[#D4AF37] via-[#F4E2A1] to-[#D4AF37] bg-clip-text text-transparent">
        Luxury
      </span>
      <br />
      <span className="text-white">Modest</span>
      <br />
      <span className="text-white">Fashion</span>
    </h1>

    <p className="mt-6 text-lg leading-8 text-gray-300 max-w-md">
      Discover elegant abayas, hijabs and modest wear crafted for confidence,
      comfort and timeless beauty.
    </p>

    <div className="mt-10 flex flex-wrap gap-4">
      <button
        onClick={() => navigate("/shop")}
        className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E6C76A] text-black font-bold hover:scale-105 transition"
      >
        Shop Collection
      </button>

      <button
        onClick={() => navigate("/about")}
        className="px-8 py-4 rounded-xl border border-[#0EA5A4] text-[#0EA5A4] hover:bg-[#0EA5A4] hover:text-black transition"
      >
        Our Story
      </button>
    </div>

    <div className="mt-10 flex flex-wrap gap-3">
      {["🚚 Free Shipping", "💳 COD", "✨ Premium", "🇮🇳 Made for India"].map((item) => (
        <span
          key={item}
          className="px-4 py-2 rounded-full border border-[#D4AF37]/20 bg-[#141414]/80 text-sm text-gray-300"
        >
          {item}
        </span>
      ))}
    </div>
  </motion.div>

  {/* Right Image */}
  <motion.div
    initial={{ opacity: 0, x: 40 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.9 }}
    className="absolute right-0 bottom-0 w-[55%] h-full hidden lg:flex items-end justify-end"
  >
    <div className="absolute w-[700px] h-[700px] rounded-full bg-[#D4AF37]/20 blur-3xl" />

    <img
      src={heroModel}
      alt="HayaaWear Model"
      className="relative h-[92%] w-auto object-contain drop-shadow-[0_0_60px_rgba(212,175,55,0.35)]"
    />
  </motion.div>

  {/* Mobile Image */}
  <div className="absolute bottom-0 right-0 w-[75%] lg:hidden">
    <img src={heroModel} alt="HayaaWear Model" className="w-full object-contain" />
  </div>

  {/* Scroll */}
  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center text-[#D4AF37] animate-bounce">
    <span className="text-xs tracking-[0.3em] mb-2">SCROLL</span>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </div>

</section>

      {/* OCCASION */}

      {/* OCCASION */}
<section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-16">

  <div className="mb-12 text-center">

  {/* Luxury Banner */}
  <motion.img
    src={shopImg}
    alt="Shop by Occasion"
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.4 }}
    className="mx-auto w-full max-w-[1200px] rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.18)] cursor-pointer"
  />

  {/* SEO Heading */}
  <h2 className="sr-only">Shop by Occasion</h2>

</div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

    {occasions.map((occasion) => (
      <motion.div
        key={occasion.value}
        whileHover={{
          y: -8,
          scale: 1.03,
        }}
        transition={{ duration: 0.35 }}
        onClick={() => navigate(`/shop?occasion=${occasion.value}`)}
        className="group relative cursor-pointer overflow-hidden rounded-3xl border border-[#D4AF37]/30 bg-[#111] shadow-lg hover:shadow-[0_0_35px_rgba(212,175,55,0.35)]"
      >
        <img
          src={occasion.image}
          alt={occasion.label}
          className="aspect-[3/4] w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

        <div className="absolute bottom-6 left-0 right-0 px-4 text-center">
          <h3 className="text-xl font-bold text-white">
            {occasion.label}
          </h3>

          <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-gray-300">
            {occasion.tagline}
          </p>

          <div className="mt-5 flex justify-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37] bg-black/40 transition-all duration-300 group-hover:bg-[#D4AF37] group-hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 12h14M13 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </motion.div>
    ))}

  </div>

</section>

      {/* CATEGORIES */}
{/* CATEGORIES */}
<section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-16">

  {/* Premium Banner */}
  <div className="mb-12 text-center">
    <motion.img
      src="/shopbydress.png"
      alt="Shop by Dress Type"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
      className="mx-auto w-full max-w-[1200px] rounded-2xl shadow-[0_0_40px_rgba(212,175,55,0.18)]"
    />
    <h2 className="sr-only">Shop by Dress Type</h2>
  </div>

  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

    {categories.map((cat) => (
  <motion.div
    key={cat.id}
    whileHover={{ y: -8, scale: 1.03 }}
    transition={{ duration: 0.35 }}
    onClick={() => openCategory(cat)}
    className="group cursor-pointer overflow-hidden rounded-[28px] bg-[#111] border border-[#D4AF37]/20 hover:border-[#D4AF37] hover:shadow-[0_0_35px_rgba(212,175,55,0.30)] transition-all duration-500"
  >
    <div className="relative aspect-[3/4] overflow-hidden">

  <img
    src={`${API_BASE}${cat.imageUrl}`}
onError={(e) => {
  console.log("Failed Image:", `${API_BASE}${cat.imageUrl}`);
  e.target.src = "/placeholder.jpg";
}}
    alt={cat.name}
    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
  />

  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

  <div className="absolute bottom-5 left-0 right-0 px-4 text-center">
    <h3 className="text-2xl font-bold text-white">
      {cat.name}
    </h3>
  </div>

</div>
  </motion.div>
))}
  </div>
</section>

      {/* SUBCATEGORIES */}

      {selectedCategory && (
        <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-12">

          <h2 className="text-3xl text-[#D4AF37] font-bold mb-10">
            {selectedCategory.name} Collection
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

            {subCategories.map((sub) => (
              <motion.div
                key={sub.id}
                whileHover={{ y: -6 }}
                onClick={() => navigate(`/shop?subCategory=${sub.id}`)}
                className="cursor-pointer overflow-hidden rounded-3xl bg-[#141414] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition"
              >

                {sub.imageUrl && (
                  <div className="relative aspect-[4/5] overflow-hidden">

                    <img
                      src={`${API_BASE}${sub.imageUrl}`}
                      alt={sub.name}
                      className="w-full h-full object-cover hover:scale-110 transition duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

                    <h3 className="absolute bottom-4 left-4 text-lg font-semibold text-[#F4E2A1]">
                      {sub.name}
                    </h3>

                  </div>
                )}

              </motion.div>
            ))}

          </div>

        </section>
      )}

      {/* NEW ARRIVALS */}

      <section className="relative z-10 w-full px-6 md:px-12 lg:px-20 py-20">

        <div className="flex justify-between items-center mb-12">

          <h2 className="text-3xl md:text-4xl text-[#D4AF37] font-bold">
            New Arrivals
          </h2>

          <button
            onClick={() => navigate("/shop")}
            className="text-[#D4AF37] hover:text-[#F4E2A1]"
          >
            View All →
          </button>

        </div>

        {loading ? (

          <div className="grid md:grid-cols-4 gap-8">
            {[1,2,3,4].map((i)=>(
              <div key={i} className="rounded-3xl bg-[#141414] h-[340px] animate-pulse"/>
            ))}
          </div>

        ) : (

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {newArrivals.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -8 }}
                onClick={() => navigate(`/product/${product.id}`)}
                className="cursor-pointer rounded-3xl overflow-hidden bg-[#141414] border border-[#D4AF37]/20 hover:border-[#D4AF37]/60 transition"
              >

                <div className="aspect-[4/5] overflow-hidden">

                  <img
                    src={product.primaryImage || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-110 transition duration-700"
                  />

                </div>

                <div className="p-5">

                  <h3 className="text-lg font-semibold text-[#F4E2A1] line-clamp-1">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-[#D4AF37] font-bold">
                    ₹ {product.discountPrice || product.price}
                  </p>

                  <button className="mt-5 w-full py-3 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#E6C76A] text-black font-semibold hover:scale-[1.02] transition">
                    View Details
                  </button>

                </div>

              </motion.div>
            ))}

          </div>

        )}

      </section>

    </div>
  );
};

export default Home;