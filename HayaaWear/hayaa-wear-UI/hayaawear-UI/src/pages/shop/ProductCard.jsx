import { Link, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart, ArrowUpRight } from "lucide-react";

import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  // =========================
  // CART
  // =========================
  const { addToCart } = useCart();

  // =========================
  // WISHLIST
  // =========================
  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const wishlisted = isWishlisted(product.id);

  const hasDiscount =
    product.discountPrice &&
    product.discountPrice < product.price;

  // =========================
  // ADD TO CART
  // =========================
  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("ADD TO CART:", product);

    await addToCart(product);
  };

  // =========================
  // WISHLIST
  // =========================
  const handleWishlist = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("WISHLIST CLICKED:", product.id);

    const result = await toggleWishlist(product);

    if (result?.requiresLogin) {
      navigate("/login");
    }
  };

  return (
    <div
      className="
        group relative
        overflow-hidden
        rounded-3xl
        bg-[#111827]
        border border-[#d4af37]/20
        shadow-xl
        transition-all duration-500
        hover:-translate-y-2
        hover:border-[#d4af37]/60
        hover:shadow-[0_15px_45px_rgba(212,175,55,0.15)]
      "
    >
      {/* =========================================
          PRODUCT IMAGE
      ========================================= */}
      <div
        className="
          relative
          aspect-[3/4]
          overflow-hidden
          bg-[#0f172a]
        "
      >
        <img
          src={
            product.primaryImage
              ? `${API_BASE}${product.primaryImage}`
              : "/placeholder.jpg"
          }
          alt={product.name}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
          onError={(e) => {
            e.currentTarget.src = "/placeholder.jpg";
          }}
        />

        {/* Image overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-[#0f172a]/80
            via-transparent
            to-transparent
            opacity-70
            pointer-events-none
          "
        />

        {/* =========================================
            SALE BADGE
        ========================================= */}
        {hasDiscount && (
          <div
            className="
              absolute
              top-4
              left-4
              z-20
              rounded-full
              bg-[#d4af37]
              px-3
              py-1
              text-xs
              font-bold
              text-[#111827]
              shadow-lg
            "
          >
            SALE
          </div>
        )}

        {/* =========================================
            WISHLIST HEART
        ========================================= */}
        <button
          type="button"
          onClick={handleWishlist}
          className="
            absolute
            top-4
            right-4
            z-30
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-[#111827]/90
            backdrop-blur-md
            border
            border-white/10
            shadow-lg
            transition-all
            duration-300
            hover:scale-110
            hover:border-[#d4af37]/60
          "
          aria-label={
            wishlisted
              ? "Remove from wishlist"
              : "Add to wishlist"
          }
        >
          <Heart
            size={21}
            strokeWidth={1.8}
            className={
              wishlisted
                ? "fill-[#d4af37] text-[#d4af37]"
                : "text-white"
            }
          />
        </button>

        {/* =========================================
            VIEW PRODUCT
        ========================================= */}
        <Link
          to={`/product/${product.id}`}
          className="
            absolute
            bottom-4
            right-4
            z-20
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            bg-[#d4af37]
            text-[#111827]
            shadow-lg
            transition-all
            duration-300
            hover:scale-110
            hover:rotate-6
          "
          aria-label="View product"
        >
          <ArrowUpRight
            size={21}
            strokeWidth={2.2}
          />
        </Link>
      </div>

      {/* =========================================
          PRODUCT INFORMATION
      ========================================= */}
      <div className="p-5">

        {/* Product name */}
        <Link to={`/product/${product.id}`}>
          <h2
            className="
              text-base
              md:text-lg
              font-semibold
              text-white
              line-clamp-1
              transition-colors
              duration-300
              group-hover:text-[#d4af37]
            "
          >
            {product.name}
          </h2>
        </Link>

        {/* Category */}
        {product.category?.name && (
          <p className="mt-1 text-sm text-gray-400">
            {product.category.name}
          </p>
        )}

        {/* =========================================
            PRICE
        ========================================= */}
        <div className="mt-3 flex items-center gap-2">

          {hasDiscount ? (
            <>
              <span
                className="
                  text-lg
                  font-bold
                  text-[#d4af37]
                "
              >
                ₹{product.discountPrice}
              </span>

              <span
                className="
                  text-sm
                  text-gray-500
                  line-through
                "
              >
                ₹{product.price}
              </span>
            </>
          ) : (
            <span
              className="
                text-lg
                font-bold
                text-[#d4af37]
              "
            >
              ₹{product.price}
            </span>
          )}

        </div>

        {/* =========================================
            ACTION BUTTONS
        ========================================= */}
        <div className="mt-5 grid grid-cols-2 gap-3">

          {/* ADD TO CART */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-[#d4af37]/30
              bg-[#0f172a]
              px-3
              py-3
              text-sm
              font-semibold
              text-white
              transition-all
              duration-300
              hover:border-[#d4af37]
              hover:bg-[#d4af37]/10
              hover:text-[#d4af37]
            "
          >
            <ShoppingCart size={17} />

            <span>
              Add to Cart
            </span>
          </button>

          {/* WISHLIST */}
          <button
            type="button"
            onClick={handleWishlist}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-2xl
              border
              border-[#0f766e]/40
              bg-[#0f766e]/10
              px-3
              py-3
              text-sm
              font-semibold
              text-[#5eead4]
              transition-all
              duration-300
              hover:border-[#0f766e]
              hover:bg-[#0f766e]/20
            "
          >
            <Heart
              size={17}
              className={
                wishlisted
                  ? "fill-[#5eead4]"
                  : ""
              }
            />

            <span>
              {wishlisted
                ? "Wishlisted"
                : "Wishlist"}
            </span>
          </button>

        </div>
      </div>
    </div>
  );
};

export default ProductCard;