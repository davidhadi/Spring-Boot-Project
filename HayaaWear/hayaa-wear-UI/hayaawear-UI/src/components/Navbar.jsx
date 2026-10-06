import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import {
  ShoppingBag,
  Heart,
  User,
  ChevronDown,
  Menu,
  X,
  LogOut,
  LayoutDashboard,
  Store,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/hayaawear_logo.png";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();

  const navigate = useNavigate();

  const [shopOpen, setShopOpen] = useState(false);
  const [occasionOpen, setOccasionOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const shopRef = useRef(null);
  const occasionRef = useRef(null);
  const profileRef = useRef(null);

  const cartCount = cartItems.reduce(
    (total, item) => total + (item?.quantity || 0),
    0
  );

  const wishlistCount = wishlist?.length || 0;

  const isAdmin = user?.role === "ADMIN";
  const isSeller = user?.role === "SELLER";

  // CLOSE DROPDOWNS WHEN CLICKING OUTSIDE
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        shopRef.current &&
        !shopRef.current.contains(event.target)
      ) {
        setShopOpen(false);
      }

      if (
        occasionRef.current &&
        !occasionRef.current.contains(event.target)
      ) {
        setOccasionOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const closeMobile = () => {
    setMobileOpen(false);
    setShopOpen(false);
    setOccasionOpen(false);
  };

  const handleLogout = () => {
    setProfileOpen(false);
    setMobileOpen(false);
    logout();
    navigate("/");
  };

 const shopItems = [
  { label: "All Products", path: "/shop" },
  { label: "Abayas", path: "/shop?category=Abayas" },
  { label: "Hijabs", path: "/shop?category=Hijabs" },
  { label: "Niqabs", path: "/shop?category=Niqabs" },
  { label: "Wedding Wear", path: "/shop?category=Wedding" },

  // Coming Soon Categories
  { label: "Pashmina", path: "/shop?category=Pashmina" },
  { label: "Earrings", path: "/shop?category=Earrings" },
  { label: "Shoes", path: "/shop?category=Shoes" },
];

  const occasionItems = [
    { label: "Eid", path: "/shop?occasion=EID" },
    { label: "Nikah", path: "/shop?occasion=NIKAH" },
    { label: "Mehndi", path: "/shop?occasion=MEHNDI" },
    { label: "Walima", path: "/shop?occasion=WALIMA" },
    { label: "Daily Wear", path: "/shop?occasion=DAILY_WEAR" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full border-b border-[#d4af37]/20 bg-[#0b0f19]/90 text-white shadow-2xl backdrop-blur-xl">

      <div className="mx-auto flex h-[76px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ================= LOGO ================= */}
        <Link
          to="/"
          onClick={closeMobile}
          className="flex items-center"
        >
          <motion.img
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.25 }}
            src={logo}
            alt="HayaaWear"
            className="h-10 w-auto object-contain sm:h-11"
          />
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden items-center gap-8 md:flex">

          {/* SHOP */}
          <div
            ref={shopRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => {
                setShopOpen((prev) => !prev);
                setOccasionOpen(false);
              }}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-200 transition hover:text-[#d4af37]"
            >
              Shop
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${
                  shopOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {shopOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                 className="absolute left-1/2 top-10 z-50 w-56 -translate-x-1/2 overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-[#0b0f19] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)]"  >
                  {shopItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setShopOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-sm text-gray-300 transition hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* OCCASION */}
          <div
            ref={occasionRef}
            className="relative"
          >
            <button
              type="button"
              onClick={() => {
                setOccasionOpen((prev) => !prev);
                setShopOpen(false);
              }}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-200 transition hover:text-[#d4af37]"
            >
              Occasion
              <ChevronDown
                size={15}
                className={`transition-transform duration-300 ${
                  occasionOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {occasionOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 top-10 z-50 w-52 -translate-x-1/2 overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-[#0b0f19] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)]" >
                  {occasionItems.map((item) => (
                    <Link
                      key={item.label}
                      to={item.path}
                      onClick={() => setOccasionOpen(false)}
                      className="block rounded-xl px-4 py-2.5 text-sm text-gray-300 transition hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* NEW ARRIVALS */}
          <Link
            to="/shop"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-200 transition hover:text-[#d4af37]"
          >
            <Sparkles size={15} />
            New Arrivals
          </Link>

          {/* ABOUT */}
          <Link
            to="/about"
            className="text-sm font-medium text-gray-200 transition hover:text-[#d4af37]"
          >
            About
          </Link>
        </div>

        {/* ================= RIGHT SECTION ================= */}
        <div className="hidden items-center gap-5 md:flex">

          {/* WISHLIST */}
          <Link
            to={user ? "/wishlist" : "/login"}
            className="relative text-gray-200 transition hover:text-[#d4af37]"
            title="Wishlist"
          >
            <Heart
              size={21}
              strokeWidth={1.8}
            />

            {wishlistCount > 0 && (
              <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d4af37] px-1 text-[10px] font-bold text-[#0b0f19]">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="relative text-gray-200 transition hover:text-[#d4af37]"
            title="Shopping Cart"
          >
            <ShoppingBag
              size={22}
              strokeWidth={1.8}
            />

            {cartCount > 0 && (
              <span className="absolute -right-2.5 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#d4af37] px-1 text-[10px] font-bold text-[#0b0f19]">
                {cartCount}
              </span>
            )}
          </Link>

          {/* USER */}
          {!user ? (
            <Link
              to="/login"
              className="rounded-full border border-[#d4af37]/40 px-5 py-2 text-sm font-medium text-[#d4af37] transition hover:bg-[#d4af37] hover:text-[#0b0f19]"
            >
              Login
            </Link>
          ) : (
            <div
              ref={profileRef}
              className="relative"
            >
              <button
                type="button"
                onClick={() =>
                  setProfileOpen((prev) => !prev)
                }
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 transition hover:border-[#d4af37]/40 hover:bg-[#d4af37]/10"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4af37] text-sm font-bold text-[#0b0f19]">
                  {user.firstName?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <span className="max-w-[100px] truncate text-sm font-medium">
                  {user.firstName}
                </span>

                <ChevronDown
                  size={15}
                  className={`transition-transform ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.2 }}
                  className="absolute right-0 top-12 z-50 w-56 overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-[#0b0f19] p-2 shadow-[0_20px_50px_rgba(0,0,0,0.6)]" >
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
                    >
                      <User size={17} />
                      My Profile
                    </Link>

                    <Link
                      to="/wishlist"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
                    >
                      <Heart size={17} />
                      My Wishlist
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
                      >
                        <LayoutDashboard size={17} />
                        Admin Dashboard
                      </Link>
                    )}

                    {isSeller && (
                      <Link
                        to="/seller"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-300 transition hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
                      >
                        <Store size={17} />
                        Seller Dashboard
                      </Link>
                    )}

                    <div className="my-1 border-t border-white/10" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm text-red-400 transition hover:bg-red-500/10"
                    >
                      <LogOut size={17} />
                      Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          className="rounded-xl border border-white/10 p-2 text-gray-200 transition hover:border-[#d4af37]/40 hover:text-[#d4af37] md:hidden"
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#0b0f19]/98 md:hidden"
          >
            <div className="space-y-2 px-5 py-5">

              <Link
                to="/shop"
                onClick={closeMobile}
                className="block rounded-xl px-4 py-3 text-gray-200 hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
              >
                Shop
              </Link>

              <Link
                to="/shop"
                onClick={closeMobile}
                className="block rounded-xl px-4 py-3 text-gray-200 hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
              >
                New Arrivals
              </Link>

              <Link
                to="/about"
                onClick={closeMobile}
                className="block rounded-xl px-4 py-3 text-gray-200 hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
              >
                About
              </Link>

              <Link
                to={user ? "/wishlist" : "/login"}
                onClick={closeMobile}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-200 hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
              >
                <Heart size={18} />
                Wishlist
              </Link>

              <Link
                to="/cart"
                onClick={closeMobile}
                className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-200 hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
              >
                <ShoppingBag size={18} />
                Cart
                {cartCount > 0 && (
                  <span className="rounded-full bg-[#d4af37] px-2 py-0.5 text-xs font-bold text-[#0b0f19]">
                    {cartCount}
                  </span>
                )}
              </Link>

              {!user ? (
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className="mt-3 block rounded-xl bg-[#d4af37] px-4 py-3 text-center font-semibold text-[#0b0f19]"
                >
                  Login
                </Link>
              ) : (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMobile}
                    className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-200 hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
                  >
                    <User size={18} />
                    My Profile
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={closeMobile}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-200 hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
                    >
                      <LayoutDashboard size={18} />
                      Admin Dashboard
                    </Link>
                  )}

                  {isSeller && (
                    <Link
                      to="/seller"
                      onClick={closeMobile}
                      className="flex items-center gap-3 rounded-xl px-4 py-3 text-gray-200 hover:bg-[#d4af37]/10 hover:text-[#d4af37]"
                    >
                      <Store size={18} />
                      Seller Dashboard
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 hover:bg-red-500/10"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;