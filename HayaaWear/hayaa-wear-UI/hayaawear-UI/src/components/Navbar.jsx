import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { useCart } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useCart();


  const cartCount = cartItems.reduce(
  (total, item) => total + item.quantity,
  0
);

console.log("Cart Items:", cartItems);
console.log("Cart Count:", cartCount);

  const [shopOpen, setShopOpen] = useState(false);
  const [occasionOpen, setOccasionOpen] = useState(false);

  const isAdmin = user?.role === "ADMIN";
  const isSeller = user?.role === "SELLER";

  console.log("USER DATA:", user);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-yellow-600/30 text-yellow-100">

      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* LOGO IMAGE */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src="/hayaawear_logo.png"   // 👈 put your logo inside public folder
            alt="HayaaWear"
            className="h-10 object-contain"
          />
        </Link>

        {/* CENTER MENU */}
        <div className="hidden md:flex space-x-8 relative">

          {/* SHOP DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setShopOpen(true)}
            onMouseLeave={() => setShopOpen(false)}
          >
            <span className="cursor-pointer hover:text-yellow-400">
              Shop
            </span>

            {shopOpen && (
              <div className="absolute top-8 left-0 bg-black/90 backdrop-blur-xl border border-yellow-600/30 rounded-xl p-4 space-y-2 w-40">
                <Link to="#" className="block hover:text-yellow-400">Abaya</Link>
                <Link to="#" className="block hover:text-yellow-400">Hijab</Link>
                <Link to="#" className="block hover:text-yellow-400">Naqab</Link>
                <Link to="#" className="block hover:text-yellow-400">Wedding</Link>
              </div>
            )}
          </div>

          {/* OCCASION DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setOccasionOpen(true)}
            onMouseLeave={() => setOccasionOpen(false)}
          >
            <span className="cursor-pointer hover:text-yellow-400">
              Occasion
            </span>

            {occasionOpen && (
              <div className="absolute top-8 left-0 bg-black/90 backdrop-blur-xl border border-yellow-600/30 rounded-xl p-4 space-y-2 w-40">
                <Link to="#" className="block hover:text-yellow-400">Eid</Link>
                <Link to="#" className="block hover:text-yellow-400">Nikah</Link>
                <Link to="#" className="block hover:text-yellow-400">Mehndi</Link>
                <Link to="#" className="block hover:text-yellow-400">Walima</Link>
              </div>
            )}
          </div>

          <Link to="#" className="hover:text-yellow-400">
            New Arrivals
          </Link>

          <Link to="/about" className="hover:text-yellow-400">
            About
          </Link>

        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center space-x-6">

          {/* CART */}
          <Link
  to="/cart"
  className="relative hover:text-yellow-400 text-2xl"
>
  🛒

  {cartCount > 0 && (
    <span className="absolute -top-2 -right-3 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded-full">
      {cartCount}
    </span>
  )}
</Link>

          {!user ? (
            <Link to="/login" className="hover:text-yellow-400">
              Login
            </Link>
          ) : (
            <>
              {/* ADMIN DASHBOARD */}
              {isAdmin && (
                <Link to="/admin" className="hover:text-yellow-400">
                  Admin Dashboard
                </Link>
              )}

              {/* SELLER DASHBOARD */}
              {isSeller && (
                <Link to="/seller" className="hover:text-yellow-400">
                  Seller Dashboard
                </Link>
              )}

              {/* PROFILE */}
              <Link to="/profile" className="hover:text-yellow-400">
                {user.firstName}
              </Link>

              <button
                onClick={logout}
                className="hover:text-red-400"
              >
                Logout
              </button>
            </>
          )}

        </div>

      </div>
    </nav>
  );
};

export default Navbar;