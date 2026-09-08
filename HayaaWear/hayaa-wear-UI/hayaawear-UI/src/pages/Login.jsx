import { motion } from "framer-motion";
import { useState, useContext } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";


const Login = () => {

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // ✅ HANDLE LOGIN
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await API.post(
        "/auth/login",
        { email, password }
      );

      console.log("FULL RESPONSE:", response);
  console.log("RESPONSE.DATA:", response.data);
      // Save JWT + user in context + localStorage
      login(response.data);

      const role = response.data.role;
      console.log(role);
      

      if (role === "ADMIN") {
         navigate("/admin");
      } 
      else if(role === "SELLER"){
        navigate("/seller");
      }
      else {
         navigate("/profile");
      }


    } catch (err) {

      if (err.response && err.response.data) {
        setError(err.response.data.message);
      } else {
        setError("Invalid Credentials");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#2a1f1a] to-[#1a1a1a]">
 
      {/* GOLD PARTICLES */}
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

      <div className="absolute w-[600px] h-[600px] bg-yellow-500 blur-[150px] opacity-10 rounded-full top-[-200px] right-[-200px]"></div>
      <div className="absolute w-[500px] h-[500px] bg-amber-400 blur-[120px] opacity-10 rounded-full bottom-[-150px] left-[-150px]"></div>

      {/* ISLAMIC SUBTLE PATTERN OVERLAY */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "radial-gradient(#D4AF37 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* MAIN CARD */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex w-full max-w-5xl bg-black/70 backdrop-blur-2xl rounded-3xl shadow-[0_0_50px_rgba(212,175,55,0.3)] border border-yellow-600/30 overflow-hidden"
      >

        {/* LEFT SIDE */}
        <div className="hidden md:flex w-1/2 flex-col justify-center items-center p-16 text-yellow-400">

          <motion.h1
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="text-6xl font-bold tracking-widest"
          >
            HayaaWear
          </motion.h1>

          <p className="mt-6 text-yellow-200 text-center max-w-md">
            Luxury Modest Fashion Inspired by Elegance & Tradition
          </p>

          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
            className="mt-12 w-40 h-40 border-2 border-yellow-500 rounded-full border-dashed opacity-40"
          />
        </div>

        {/* RIGHT SIDE - FORM */}
        <div className="w-full md:w-1/2 p-16 text-yellow-100">

          <h2 className="text-4xl font-bold mb-10 text-center">
            Welcome Back
          </h2>

          {error && (
            <div className="text-red-400 text-center mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">

            <input
              type="email"
              placeholder="Email"
              className="w-full p-4 rounded-xl bg-black/50 border border-yellow-600/40 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full p-4 rounded-xl bg-black/50 border border-yellow-600/40 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-300"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-white tracking-wider hover:scale-105 hover:shadow-xl transition-all duration-300"
            >
              {loading ? "Signing In..." : "SIGN IN"}
            </button>

          </form>

  <div className="mt-10 text-center">

  <div className="border-t border-yellow-600/30 mb-6"></div>

  <p className="text-yellow-300 text-sm tracking-wide">
    New to HayaaWear?
  </p>

  <Link
    to="/register"
    className="inline-block mt-4 px-8 py-3 rounded-xl 
    border border-yellow-500 text-yellow-300 
    hover:bg-gradient-to-r hover:from-[#c9a227] hover:to-[#e6c76a] 
    hover:text-black transition-all duration-300"
  >
    Create Your Luxury Account
  </Link>

</div>



        </div>

      </motion.div>

    </div>
  );
};

export default Login;
