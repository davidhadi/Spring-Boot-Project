import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const handleAddToCart = async () => {
  try {
    const token = localStorage.getItem("jwt");

    const res = await fetch("http://localhost:8080/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        productId: product.id,
        quantity: 1
      })
    });

    if (res.ok) {
      alert("Added to cart ✅");
    } else {
      alert("Failed ❌");
    }
  } catch (err) {
    console.error(err);
  }
};

const ProductDetail = () => {

    const { addToCart } = useCart();
const { toggleWishlist, isWishlisted } = useWishlist(); 

  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);

      if (res.data.images?.length > 0) {
  setSelectedImage(`http://localhost:8080${res.data.images[0].imageUrl}`);
}

    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen pt-28 text-yellow-100 bg-black flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-28 px-8 bg-black text-yellow-100">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        {/* LEFT - IMAGES */}
        <div>

          <img
            src={selectedImage}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-3xl border border-yellow-600/20"
          />

          <div className="flex gap-4 mt-6">

            {product.images?.map((img) => (
  <img
    key={img.id}
    src={`http://localhost:8080${img.imageUrl}`}
    alt="thumb"
    onClick={() => setSelectedImage(`http://localhost:8080${img.imageUrl}`)}
    className="h-20 w-20 object-cover rounded-xl cursor-pointer border border-yellow-600/20 hover:border-yellow-500"
  />
))}

          </div>

        </div>

        {/* RIGHT - DETAILS */}
        <div>

          <h2 className="text-3xl font-bold text-yellow-400">
            {product.name}
          </h2>

          <div className="mt-6">

            {product.discountPrice ? (
              <div className="flex items-center gap-4">
                <span className="text-2xl text-yellow-400 font-bold">
                  ₹ {product.discountPrice}
                </span>
                <span className="line-through text-gray-400">
                  ₹ {product.price}
                </span>
              </div>
            ) : (
              <span className="text-2xl text-yellow-400 font-bold">
                ₹ {product.price}
              </span>
            )}

          </div>

          <div className="mt-8 space-y-3 text-yellow-200">

            <p><strong>Sleeve:</strong> {product.sleeveType}</p>
            <p><strong>Length:</strong> {product.dressLength}</p>
            <p><strong>Fit:</strong> {product.fitType}</p>
            <p><strong>Hijab Compatible:</strong> {product.hijabCompatible ? "Yes" : "No"}</p>

          </div>

          <button
  onClick={() => addToCart(product)}
  className="mt-6 px-8 py-3 bg-yellow-600 rounded-xl"
>
  Add to Cart
</button>

<button
  onClick={() => toggleWishlist(product)}
  className="mt-4 px-6 py-2 border border-yellow-500 rounded-xl"
>
  {isWishlisted(product.id) ? "Remove Wishlist" : "Add to Wishlist"}
</button>


        </div>

      </div>

    </div>
  );
};

export default ProductDetail;
