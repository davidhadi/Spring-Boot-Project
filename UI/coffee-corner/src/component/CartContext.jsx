// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);

  // Fetch cart on login
  useEffect(() => {
    if (user?.jwt) {
      axios
        .get("http://localhost:8080/api/cart", {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        })
        .then((res) => setCart(res.data))
        .catch((err) => {
          if (err.response?.status === 404) {
            // Create cart if not found
            axios
              .post("http://localhost:8080/api/cart/create", {}, {
                headers: {
                  Authorization: `Bearer ${user.jwt}`,
                },
              })
              .then((res) => setCart(res.data));
          }
        });
    }
  }, [user]);

  const addToCart = async (productId, quantity = 1) => {
    if (!cart || !user?.jwt) return;
    try {
      const res = await axios.post(
        `http://localhost:8080/api/cart/${cart.id}/add`,
        null,
        {
          params: { productId, quantity },
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      setCart(res.data);
    } catch (err) {
      console.error("Error adding to cart:", err);
    }
  };

  const removeFromCart = async (productId) => {
    if (!cart || !user?.jwt) return;
    try {
      await axios.delete(`http://localhost:8080/api/cart/${cart.id}/remove`, {
        params: { productId },
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      // Refresh cart after removal
      const updatedCart = await axios.get("http://localhost:8080/api/cart", {
        headers: {
          Authorization: `Bearer ${user.jwt}`,
        },
      });
      setCart(updatedCart.data);
    } catch (err) {
      console.error("Error removing from cart:", err);
    }
  };

 return (
  <CartContext.Provider
    value={{
      cart,
      cartId: cart?.id,          // ✅ expose cartId
      addToCart,
      removeFromCart,
      fetchCart: async () => {   // ✅ expose fetchCart
        if (!user?.jwt) return;
        try {
          const res = await axios.get("http://localhost:8080/api/cart", {
            headers: {
              Authorization: `Bearer ${user.jwt}`,
            },
          });
          setCart(res.data);
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      },
    }}
  >
    {children}
  </CartContext.Provider>
);

};
