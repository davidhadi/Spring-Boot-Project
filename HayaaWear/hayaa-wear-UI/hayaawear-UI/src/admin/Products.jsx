import { useEffect, useState } from "react";
import API from "../services/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await API.get("/products"); // 🔥 correct admin endpoint

      console.log("PRODUCT RESPONSE:", res.data);

      // 🔥 Defensive handling (array or paginated response)
      const productList = Array.isArray(res.data)
        ? res.data
        : res.data?.content || [];

      setProducts(productList);

    } catch (err) {
      console.error("Fetch error:", err);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmDelete) return;

    try {
      await API.delete(`/admin/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-yellow-400">
        Product Management
      </h1>

      <div className="bg-black/60 p-8 rounded-2xl border border-yellow-600/20 overflow-x-auto">

        {loading ? (
          <p className="text-yellow-300">Loading products...</p>
        ) : (
          <table className="w-full text-left min-w-[800px]">
            <thead>
              <tr className="border-b border-yellow-600/30">
                <th className="py-3">ID</th>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr
                    key={product.id}
                    className="border-b border-yellow-600/10 hover:bg-yellow-600/10"
                  >
                    <td className="py-4">{product.id}</td>
                    <td>{product.name}</td>

                    <td>
                      {product.category?.name || "N/A"}
                    </td>

                    <td>₹ {product.price}</td>
                    <td>{product.stock}</td>

                    <td>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="px-4 py-1 bg-red-600 rounded-lg hover:bg-red-500 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-6 text-yellow-300">
                    No products found.
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

export default Products;
