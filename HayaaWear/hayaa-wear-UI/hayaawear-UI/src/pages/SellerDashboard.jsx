import { motion } from "framer-motion";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen pt-28 px-8 bg-gradient-to-br from-[#1a1a1a] via-[#2a1f1a] to-[#1a1a1a] text-yellow-100">

      {/* SELLER PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-black/70 backdrop-blur-2xl p-10 rounded-3xl border border-yellow-600/30 shadow-[0_0_50px_rgba(212,175,55,0.3)]"
      >

        <div className="flex flex-col md:flex-row items-center gap-8">

          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-[#c9a227] to-[#e6c76a] flex items-center justify-center text-black text-4xl font-bold">
            {user?.firstName?.charAt(0)}
          </div>

          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-transparent bg-gradient-to-r from-[#c9a227] via-[#f4e2a1] to-[#c9a227] bg-clip-text">
              {user?.firstName} {user?.lastName}
            </h2>

            <p className="mt-3 text-yellow-300">
              {user?.email}
            </p>

            <span className="inline-block mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-black text-sm font-semibold">
              {user?.role}
            </span>
          </div>

        </div>
      </motion.div>

      {/* DASHBOARD CARDS */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-10"
      >

        {/* Add Product */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/seller/products/add")}
          className="cursor-pointer bg-black/60 p-10 rounded-3xl border border-yellow-600/20 text-center"
        >
          <div className="text-5xl mb-6">➕</div>
          <h3 className="text-xl text-yellow-300 font-semibold">
            Add Products
          </h3>
        </motion.div>

        {/* My Products */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/seller/products")}
          className="cursor-pointer bg-black/60 p-10 rounded-3xl border border-yellow-600/20 text-center"
        >
          <div className="text-5xl mb-6">📦</div>
          <h3 className="text-xl text-yellow-300 font-semibold">
            My Products
          </h3>
        </motion.div>

        {/* Orders */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/seller/orders")}
          className="cursor-pointer bg-black/60 p-10 rounded-3xl border border-yellow-600/20 text-center"
        >
          <div className="text-5xl mb-6">📊</div>
          <h3 className="text-xl text-yellow-300 font-semibold">
            View Orders
          </h3>
        </motion.div>

      </motion.div>

    </div>
  );
};

export default SellerDashboard;
