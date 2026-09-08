import { useEffect, useState } from "react";
import API from "../services/api";

const SellerProducts = () => {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products/seller");
      setProducts(res.data.content || res.data);
    } catch (err) {
      console.error("Seller products error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen pt-28 px-8 bg-black text-yellow-100">

      <h2 className="text-3xl mb-10 text-yellow-400">
        My Products
      </h2>

      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {products.map((p) => (
            <div
              key={p.id}
              className="bg-black/60 border border-yellow-600/30 rounded-2xl overflow-hidden shadow-lg hover:shadow-yellow-500/20 transition duration-300"
            >

              {/* Product Image */}
              <div className="h-64 bg-black/40 flex items-center justify-center">
                <img
  src={
    p.primaryImage
      ? `http://localhost:8080${p.primaryImage}`
      : "/no-image.png"
  }
  alt={p.name}
  className="h-full w-full object-cover"
/>
              </div>

              {/* Product Details */}
              <div className="p-5 space-y-3">

                <h3 className="text-xl font-semibold text-yellow-300">
                  {p.name}
                </h3>

                <p className="text-sm text-gray-400 line-clamp-2">
                  {p.description}
                </p>

                <div className="flex justify-between items-center">
                  <div>
                    {p.discountPrice ? (
                      <>
                        <span className="text-yellow-400 font-bold">
                          ₹ {p.discountPrice}
                        </span>
                        <span className="ml-2 line-through text-gray-500 text-sm">
                          ₹ {p.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-yellow-400 font-bold">
                        ₹ {p.price}
                      </span>
                    )}
                  </div>

                  <span className="text-sm text-gray-400">
                    Stock: {p.stock}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="flex justify-between items-center mt-3">

                  <span className={`px-4 py-1 rounded-full text-xs font-medium ${
                    p.status === "ACTIVE"
                      ? "bg-green-600/20 text-green-400"
                      : p.status === "PENDING"
                      ? "bg-yellow-600/20 text-yellow-400"
                      : "bg-red-600/20 text-red-400"
                  }`}>
                    {p.status}
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

export default SellerProducts;