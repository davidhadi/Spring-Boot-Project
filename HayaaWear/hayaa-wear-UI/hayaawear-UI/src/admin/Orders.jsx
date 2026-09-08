import { useEffect, useState } from "react";
import API from "../services/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await API.get("/admin/orders/all");

      console.log("ORDER RESPONSE:", res.data);

      const orderList = Array.isArray(res.data)
        ? res.data
        : res.data?.content || [];

      setOrders(orderList);

    } catch (err) {
      console.error(err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await API.put(`/admin/orders/${orderId}/status`, {
        status: newStatus,
      });

      fetchOrders();

    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-yellow-400">
        Order Management
      </h1>

      <div className="bg-black/60 p-8 rounded-2xl border border-yellow-600/20 overflow-x-auto">

        {loading ? (
          <p className="text-yellow-300">Loading orders...</p>
        ) : (
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-yellow-600/30">
                <th className="py-3">Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-yellow-600/10 hover:bg-yellow-600/10"
                  >
                    <td className="py-4">#{order.id}</td>

                    <td>
                      {order.user?.firstName} {order.user?.lastName}
                    </td>

                    <td>₹ {order.totalAmount}</td>

                    <td>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className="bg-black/60 border border-yellow-600/30 p-2 rounded-lg text-yellow-300"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="SHIPPED">SHIPPED</option>
                        <option value="DELIVERED">DELIVERED</option>
                        <option value="CANCELLED">CANCELLED</option>
                      </select>
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-6 text-yellow-300">
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
};

export default Orders;
