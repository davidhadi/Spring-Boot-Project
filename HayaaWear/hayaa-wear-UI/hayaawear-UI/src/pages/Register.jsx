import { motion } from "framer-motion";
import { useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import API from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await API.post("/auth/register", formData);

      console.log("Register Success:", response.data);

      navigate("/login");

    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Registration Failed");
      } else {
        setError("Registration Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2a1f1a] to-[#1a1a1a]">

      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 40 },
            color: { value: "#D4AF37" },
            size: { value: 2 },
            move: { enable: true, speed: 0.6 },
            opacity: { value: 0.5 },
          },
        }}
        className="absolute inset-0"
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-5xl bg-black/70 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.3)] border border-yellow-600/30 p-12"
      >

        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl font-extrabold tracking-widest text-transparent bg-gradient-to-r from-[#c9a227] via-[#f4e2a1] to-[#c9a227] bg-clip-text"
          >
            HayaaWear
          </motion.h1>

          <h2 className="text-2xl mt-6 text-yellow-300 tracking-wide">
            Create Your Luxury Account
          </h2>
        </div>

        {error && (
          <div className="text-red-400 text-center mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="p-4 rounded-xl bg-black/50 border border-yellow-600/40 text-white placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="p-4 rounded-xl bg-black/50 border border-yellow-600/40 text-white placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-4 rounded-xl bg-black/50 border border-yellow-600/40 text-white placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
          />

          <input
            type="tel"
            name="mobile"
            placeholder="Contact Number"
            value={formData.mobile}
            onChange={handleChange}
            pattern="[0-9]{10}"
            required
            className="p-4 rounded-xl bg-black/50 border border-yellow-600/40 text-white placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="md:col-span-2 p-4 rounded-xl bg-black/50 border border-yellow-600/40 text-white placeholder-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-all duration-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="md:col-span-2 py-4 rounded-xl font-semibold bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-white tracking-wider hover:scale-105 transition-all duration-300"
          >
            {loading ? "Creating Account..." : "REGISTER"}
          </button>

        </form>

        <div className="mt-10 text-center">
          <p className="text-yellow-300 text-sm tracking-wide">
            Already a valued member of HayaaWear?
          </p>

          <Link
            to="/login"
            className="inline-block mt-4 px-8 py-3 rounded-xl border border-yellow-500 text-yellow-300 hover:bg-gradient-to-r hover:from-[#c9a227] hover:to-[#e6c76a] hover:text-black transition-all duration-300"
          >
            Sign In to Your Account
          </Link>
        </div>

      </motion.div>
    </div>
  );
};

export default Register;