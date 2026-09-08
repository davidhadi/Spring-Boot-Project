import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const getToken = () => {
  return (
    localStorage.getItem("jwt") ||
    JSON.parse(localStorage.getItem("user"))?.token
  );
};

  // ✅ ADD TO CART
  const addToCart = async (product) => {
    const token = getToken();

    if (!token) {
      alert("Please login first");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: 1,
        }),
      });

      const text = await res.text();

      if (!res.ok) throw new Error(text);

      alert(text);
      fetchCart(); // refresh cart
    } catch (err) {
      alert(err.message);
    }
  };

  // ✅ GET CART
  const fetchCart = async () => {
    const token = getToken();
    

    try {
      const res = await fetch("http://localhost:8080/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      console.log("CART RESPONSE:", data);

      // 👇 adjust if structure different
      setCartItems(data.items || []);
    } catch (err) {
      console.error(err);
    }
  };


  // ✅ UPDATE QUANTITY
  const updateQuantity = async (itemId, quantity) => {
    const token = getToken();

    try {
      await fetch(
        `http://localhost:8080/cart/${itemId}?quantity=${quantity}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ REMOVE ITEM
  const removeItem = async (itemId) => {
    const token = getToken();

    try {
      await fetch(`http://localhost:8080/cart/${itemId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const total = cartItems.reduce((sum, item) => {
  return sum + ((item?.price || 0) * (item?.quantity || 0));
}, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, fetchCart, updateQuantity, removeItem, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);