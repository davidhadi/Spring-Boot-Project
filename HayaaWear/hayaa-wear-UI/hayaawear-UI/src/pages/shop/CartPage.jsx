import { useCart } from "../../context/CartContext";

const CartPage = () => {
  const { cartItems, updateQuantity, removeItem, total } = useCart();

  return (
    <div className="min-h-screen pt-28 bg-black text-yellow-100 px-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-10 text-yellow-400">
          My Cart 🛒
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-[#111827] rounded-2xl p-8 text-center">
            <p className="text-xl text-gray-400">
              Your cart is empty
            </p>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div
                key={item.itemId}
                className="flex justify-between items-center bg-[#111827] p-6 rounded-2xl mb-6 border border-yellow-600/20"
              >
                {/* Product Details */}
                <div>
                  <h2 className="text-xl font-semibold text-yellow-300">
                    {item.productName}
                  </h2>

                  <p className="text-yellow-400 mt-2">
                    ₹ {item.price}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4">

                  <button
                    onClick={() => {
                      if (item.quantity > 1) {
                        updateQuantity(
                          item.itemId,
                          item.quantity - 1
                        );
                      }
                    }}
                    className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600"
                  >
                    -
                  </button>

                  <span className="text-lg font-bold">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(
                        item.itemId,
                        item.quantity + 1
                      )
                    }
                    className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-yellow-400 font-bold text-lg">
                  ₹ {item.price * item.quantity}
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item.itemId)}
                  className="text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
              </div>
            ))}

            {/* Total Section */}
            <div className="bg-[#111827] p-8 rounded-2xl border border-yellow-600/20 mt-8">
              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  Total
                </h2>

                <span className="text-3xl font-bold text-yellow-400">
                  ₹ {total}
                </span>
              </div>

              <button
                className="w-full mt-6 bg-yellow-600 hover:bg-yellow-500 text-black font-bold py-4 rounded-xl transition"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;