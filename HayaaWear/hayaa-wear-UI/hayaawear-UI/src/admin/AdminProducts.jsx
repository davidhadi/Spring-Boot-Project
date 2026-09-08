import { useEffect, useState } from "react";
import API from "../services/api";

const AdminProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products/admin");
      setProducts(res.data.content || res.data);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const approveProduct = async (id) => {
    try {
      await API.put(`/products/${id}/approve`);
      fetchProducts();
    } catch (err) {
      console.error("Approve error:", err);
    }
  };

  const rejectProduct = async (id) => {
    try {
      await API.put(`/products/${id}/reject`);
      fetchProducts();
    } catch (err) {
      console.error("Reject error:", err);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-8 bg-black text-yellow-100">

      <h2 className="text-3xl mb-8 text-yellow-400">
        Product Approval Panel
      </h2>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <div className="space-y-4">

          {products.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-2xl bg-black/60 border border-yellow-600/20 flex justify-between items-center"
            >

              <div>
                <h3 className="text-lg font-semibold">
                  {p.name}
                </h3>
                <p className="text-yellow-300">
                  ₹ {p.price}
                </p>

                <span className={`px-3 py-1 rounded-full text-sm mt-2 inline-block ${
                  p.status === "ACTIVE"
                    ? "bg-green-600/20 text-green-400"
                    : p.status === "PENDING"
                    ? "bg-yellow-600/20 text-yellow-400"
                    : "bg-red-600/20 text-red-400"
                }`}>
                  {p.status}
                </span>
              </div>

              {/* ACTION BUTTONS */}
              <div className="space-x-4">

                {p.status === "PENDING" && (
                  <>
                    <button
                      onClick={() => approveProduct(p.id)}
                      className="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-500"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectProduct(p.id)}
                      className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500"
                    >
                      Reject
                    </button>
                  </>
                )}

                {p.status === "ACTIVE" && (
                  <button
                    onClick={() => rejectProduct(p.id)}
                    className="px-4 py-2 bg-red-600 rounded-lg hover:bg-red-500"
                  >
                    Disable
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  );
};

export default AdminProducts;
