import { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

 const getToken = () => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) return jwt;

  try {
    return JSON.parse(localStorage.getItem("user") || "{}")?.token;
  } catch {
    return null;
  }
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

  // Guest user hai to cart API call hi mat karo
  if (!token) {
    setCartItems([]);
    return;
  }

  try {
    const res = await fetch("http://localhost:8080/cart", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 401/403 par JSON parse mat karo
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        setCartItems([]);
        return;
      }

      throw new Error(`Cart Error: ${res.status}`);
    }

    const data = await res.json();

    console.log("CART RESPONSE:", data);

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