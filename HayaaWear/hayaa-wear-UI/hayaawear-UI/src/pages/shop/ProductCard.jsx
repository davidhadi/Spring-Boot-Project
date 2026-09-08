import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

  return (
    <div className="bg-[#111827] rounded-xl overflow-hidden hover:scale-105 transition duration-300 shadow-lg">

      <img
        src={`http://localhost:8080${product.primaryImage}`}
        alt={product.name}
        className="w-full h-60 object-cover"
      />

      <div className="p-4">

        <h2 className="text-lg font-semibold">
          {product.name}
        </h2>

        <p className="text-[#d4af37] font-bold mt-1">
          ₹{product.price}
        </p>

        <Link to={`/product/${product.id}`}>

          <button className="mt-3 w-full bg-[#0f766e] hover:bg-[#115e59] py-2 rounded">
            View Product
          </button>

        </Link>

      </div>

    </div>
  );
};

export default ProductCard;