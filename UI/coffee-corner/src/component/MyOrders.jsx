import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user?.jwt) {
      axios
        .get("http://localhost:8080/api/orders/user", {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        })
        .then((res) => setOrders(res.data))
        .catch((err) => console.error("Failed to fetch orders:", err));
    }
  }, [user]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => (
            <li key={order.id} className="border p-4 rounded shadow">
              <div><strong>Order ID:</strong> {order.id}</div>
              <div><strong>Status:</strong> {order.status}</div>
              <div><strong>Total:</strong> ₹{order.price}</div>
              <div><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</div>
              <div className="mt-2">
                <strong>Items:</strong>
                <ul className="ml-4 list-disc">
                  {order.items.map((item) => (
                    <li key={item}>
                        {item.productName} x {item.quantity} (₹{item.price})
                    </li>
                    // <li key={item.id}>
                    //   {item.product?.name || "Unknown Product"} x {item.quantity}
                    // </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
