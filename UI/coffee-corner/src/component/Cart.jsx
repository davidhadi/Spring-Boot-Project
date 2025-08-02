import React, { useContext, useEffect } from "react";
import { CartContext } from "./CartContext";
import { AuthContext } from "./AuthContext"; 
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart, fetchCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/orders/place",
        {}, // backend will fetch cart and create order
        {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
      alert("Order placed successfully!");
      navigate("/my-orders");
    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order.");
    }
  };

  if (!cart || cart.items.length === 0) {
    return <div className="p-4 text-center">Your cart is empty.</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <ul className="space-y-2">
        {cart.items.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center bg-white shadow p-3 rounded"
          >
            <div>
              <div className="font-medium">{item.product.name}</div>
              <div className="text-sm">Quantity: {item.quantity}</div>
            </div>
            <button
              onClick={() => removeFromCart(item.product.id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      {/* Place Order Button */}
      <div className="mt-6 text-right">
        <button
          onClick={handlePlaceOrder}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Cart;
