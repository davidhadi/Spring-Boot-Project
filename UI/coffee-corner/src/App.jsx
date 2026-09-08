
import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";
import Home from "./component/Home";
import {Signin} from "./component/Signin";
import {Signup} from "./component/Signup";
import CoffeeList from "./component/CoffeeList";
import About from "./component/About";
import Gallery from "./component/Gallery";
import Contact from "./component/Contact";
import { AuthContext } from './component/AuthContext';
import CommentSection from "./component/CommentSection";
import { CartProvider } from "./component/CartContext";
import Cart from "./component/Cart";
import ProfileDropdown from "./component/ProfileDropdown";
import Profile from "./component/Profile";
import MyOrders from "./component/MyOrders";


function App() {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
  logout();
  window.location.href = "/signin";
};


  return (
    <>
    <CartProvider>
    <Router>
      <nav className="flex justify-between items-center p-4 bg-white shadow-md fixed w-full z-10">
        <h1 className="text-2xl font-bold text-orange-600">CoffeeCorner</h1>
        <ul className="hidden md:flex gap-6 font-medium">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/coffee-list">CoffeeList</Link></li>
{user ? (
  <li>
    <ProfileDropdown />
  </li>
) : (
  <>
    <li><Link to="/signin">Sign In</Link></li>
    <li><Link to="/signup">Sign Up</Link></li>
  </>
)}

        </ul>
      </nav>

      <div className="pt-20">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/coffee-list" element={<CoffeeList />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/comments" element={<CommentSection />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />

        </Routes>
      </div>
    </Router>

    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Contact Form */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <form className="space-y-3">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            />
            <textarea
              rows="3"
              placeholder="Your Message"
              className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700"
            ></textarea>
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white font-medium"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Google Map */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Our Location</h3>
          <div className="w-full h-56 rounded overflow-hidden">
            <iframe
              title="CoffeeCorner Location"
              className="w-full h-full border-0"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902215633878!2d90.3912350743468!3d23.75086738851716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8582f80e31f%3A0x3a7b17ab6c54b13f!2sCoffee%20Shop!5e0!3m2!1sen!2sin!4v1612522323799!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
          <p className="text-gray-400 mb-4">Stay connected through our socials</p>
          <div className="flex space-x-4 text-2xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
              <FaFacebook />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-sky-400">
              <FaTwitter />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom note */}
      <div className="text-center mt-10 text-sm text-gray-400 border-t border-gray-800 pt-4">
        &copy; 2025 CoffeeCorner. All rights reserved.
      </div>
    </footer>
    </CartProvider>

    </>
  );
}

export default App;
