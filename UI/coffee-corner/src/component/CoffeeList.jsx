import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CoffeeList() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    discountPrice: ""
  });

  // Get user from localStorage to check if logged in
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user?.jwt;
  const [cartId, setCartId] = useState(null);


  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
  const formattedProduct = {
    name: newProduct.name,
    price: parseFloat(newProduct.price),
    stock: parseInt(newProduct.stock),
    discountPrice: parseFloat(newProduct.discountPrice),
  };

  try {
    await axios.post("http://localhost:8080/api/products", formattedProduct, {
      headers: {
        Authorization: `Bearer ${user.jwt}`,
      },
    });

    setNewProduct({ name: "", price: "", stock: "", discountPrice: "" });
    fetchProducts(); // Refresh list after adding
  } catch (error) {
    console.error("Failed to add product:", error.response?.data || error.message);
  }
};


  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${user.jwt}`
        }
      });
      fetchProducts();
    } catch (error) {
      console.error("Failed to delete product:", error.response?.data || error.message);
    }
  };

  const handleAddToCart = async (productId) => {
  if (!user?.jwt) {
    alert("You must be logged in to add to cart.");
    return;
  }

  if (!cartId) {
    console.error("🛑 cartId is null");
    alert("Cart not found yet. Please wait a second and try again.");
    return;
  }

  console.log("🛒 Adding to cart:", { cartId, productId });
  console.log("🔐 Token:", user.jwt);

  try {
    await axios.post(
      `http://localhost:8080/api/cart/${cartId}/add`,
      null,
      {
        params: { productId, quantity: 1 },
        headers: {
          Authorization: `Bearer ${user.jwt}`, // ✅ must be present
        },
      }
    );
    alert("✅ Product added to cart!");
  } catch (error) {
    console.error("❌ Add to cart failed:", error.response?.data || error.message);
    alert("❌ Failed to add to cart. See console for details.");
  }
};



useEffect(() => {
  const fetchCart = async () => {
    if (user?.jwt) {
      try {
        const res = await axios.get("http://localhost:8080/api/cart", {
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        });
        setCartId(res.data.id);
      } catch (err) {
        console.error("Cart fetch failed:", err.response?.data || err.message);
      }
    }
  };

  fetchCart();
}, [user]);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 p-6">
      <h1 className="text-3xl font-bold text-center mb-6 text-brown-700">Coffee List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded-2xl shadow-md flex flex-col justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-600">Price: ₹{product.price}</p>
              <p className="text-gray-600">Stock: {product.stock}</p>
              <p className="text-gray-600">Discount: ₹{product.discountPrice}</p>
            </div>

            {isLoggedIn && (
              <button
                onClick={() => handleDelete(product.id)}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
              >
                Delete
              </button>

            
            )}
            <button
            onClick={() => handleAddToCart(product.id)}
            className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg">
            Add to Cart
            </button>

          </div>
        ))}
      </div>

      {isLoggedIn && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Product</h2>
          <div className="grid gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={newProduct.name}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg"
            />
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={newProduct.price}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock"
              value={newProduct.stock}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg"
            />
            <input
              type="number"
              name="discountPrice"
              placeholder="Discount Price"
              value={newProduct.discountPrice}
              onChange={handleChange}
              className="border border-gray-300 p-2 rounded-lg"
            />
            <button
              onClick={handleAddProduct}
              className="bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Add Product
            </button>
          </div>
        </div>
      )}

      {!isLoggedIn && (
        <p className="text-center text-red-500 font-semibold mt-10">
          Please log in to add or delete products.
        </p>
      )}
    </div>
  );
}

