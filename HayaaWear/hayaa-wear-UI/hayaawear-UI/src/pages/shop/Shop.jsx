import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Shop = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {

  fetch("http://localhost:8080/products/all")
    .then((res) => {
      if (!res.ok) {
        throw new Error("API Error: " + res.status);
      }
      return res.json();
    })
    .then((data) => {
      console.log("PRODUCT DATA:", data);
      setProducts(data);
    })
    .catch((err) => console.error("Fetch Error:", err));

}, []);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-24">

      <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8">

        {/* Sidebar */}
        <div className="col-span-1 bg-[#111827] p-6 rounded-xl h-fit">

          <h2 className="text-lg font-semibold mb-4 text-[#d4af37]">
            Categories
          </h2>

          <div className="space-y-2">
            <label className="flex gap-2">
              <input type="checkbox" /> Abaya
            </label>

            <label className="flex gap-2">
              <input type="checkbox" /> Hijab
            </label>

            <label className="flex gap-2">
              <input type="checkbox" /> Naqab
            </label>
          </div>

          <h2 className="text-lg font-semibold mt-6 mb-4 text-[#d4af37]">
            Price
          </h2>

          <input
            type="range"
            className="w-full accent-[#0f766e]"
          />

        </div>

        {/* Products */}
        <div className="col-span-3 grid grid-cols-3 gap-6">

          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}

        </div>

      </div>

    </div>
  );
};

export default Shop;