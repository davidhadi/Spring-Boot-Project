import React, { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ProfileDropdown() {
  const { user, logout } = useContext(AuthContext);
  const { cartId } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const res = await axios.get("/api/cart");
      setCartItems(res.data.items || []);
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
  };

  useEffect(() => {
    if (dropdownOpen && cartId) fetchCart();
  }, [dropdownOpen, cartId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    logout();
    navigate("/signin");
  };

  if (!user) return null;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="text-orange-600 font-semibold focus:outline-none"
      >
        {user.fname} ▼
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg z-50 p-4">
          <h3 className="font-semibold mb-2 text-orange-500">Cart Items</h3>
          {cartItems.length === 0 ? (
            <p className="text-sm text-gray-500">Cart is empty.</p>
          ) : (
            <ul className="text-sm space-y-1 max-h-40 overflow-y-auto">
              {cartItems.map((item) => (
                <li key={item.id} className="border-b pb-1">
                  {item.product.name} x {item.quantity}
                </li>
              ))}
            </ul>
          )}
          <Link
            to="/cart"
            className="mt-2 block text-center text-white bg-orange-500 px-3 py-1 rounded hover:bg-orange-600"
          >
            View Cart
          </Link>

          <div className="border-t my-2 pt-2 text-sm text-gray-700">
            <Link
              to="/profile"
              className="block px-2 py-1 hover:bg-gray-100 rounded"
            >
              👤 View Profile
            </Link>
            <Link to="/my-orders" className="block px-4 py-2 hover:bg-gray-100">
                My Orders
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-2 py-1 text-red-600 hover:bg-gray-100 rounded"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
