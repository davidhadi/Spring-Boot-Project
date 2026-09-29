import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      setWishlist([]);
      setLoading(false);
      return;
    }

    try {
      const response = await API.get("/wishlist");

      setWishlist(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (error) {
      console.error("Wishlist Fetch Error:", error);
      setWishlist([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const toggleWishlist = async (product) => {
    const token = localStorage.getItem("jwt");

    // User logged out
    if (!token) {
      return {
        success: false,
        requiresLogin: true,
      };
    }

    try {
      const exists = wishlist.some(
        (item) => item.product?.id === product.id
      );

      // Already wishlisted → Remove
      if (exists) {
        await API.delete(`/wishlist/${product.id}`);

        setWishlist((prev) =>
          prev.filter(
            (item) => item.product?.id !== product.id
          )
        );

        return {
          success: true,
          added: false,
        };
      }

      // Not wishlisted → Add
      const response = await API.post(
        `/wishlist/${product.id}`
      );

      setWishlist((prev) => [
        ...prev,
        response.data,
      ]);

      return {
        success: true,
        added: true,
      };

    } catch (error) {
      console.error("Wishlist Error:", error);

      return {
        success: false,
        requiresLogin: false,
      };
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some(
      (item) => item.product?.id === productId
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        loading,
        toggleWishlist,
        isWishlisted,
        fetchWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () =>
  useContext(WishlistContext);