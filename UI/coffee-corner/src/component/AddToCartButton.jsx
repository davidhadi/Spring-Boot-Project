import React from "react";
import { useCart } from "../context/CartContext";
import { Button } from "@/components/ui/button";

export default function AddToCartButton({ productId, quantity = 1 }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(productId, quantity);
  };

  return (
    <Button onClick={handleAdd} className="mt-2">
      Add to Cart
    </Button>
  );
}