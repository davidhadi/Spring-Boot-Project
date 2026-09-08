import { useEffect, useState } from "react";
import API from "../services/api";

const SellerOrders = () => {

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await API.get("/seller/orders");
      setOrders(res.data || []);
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen pt-28 px-8 bg-black text-yellow-100">

      <h2 className="text-3xl mb-8 text-yellow-400">
        My Orders
      </h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-6">

          {orders.map((order) => (
            <div
              key={order.id}
              className="p-6 rounded-2xl bg-black/60 border border-yellow-600/20"
            >
              <div className="flex justify-between items-center">

                <div>
                  <h3 className="text-lg font-semibold">
                    Order #{order.id}
                  </h3>
                  <p className="text-sm text-yellow-300">
                    Customer: {order.customerName}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-bold">
                    ₹ {order.totalAmount}
                  </p>
                  <span className="text-sm px-4 py-1 rounded-full bg-yellow-600/20">
                    {order.status}
                  </span>
                </div>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default SellerOrders;
