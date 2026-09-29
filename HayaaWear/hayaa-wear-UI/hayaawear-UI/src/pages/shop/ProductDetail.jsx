import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Check,
  ShieldCheck,
  Truck,
} from "lucide-react";

import API from "../../services/api";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const {
    toggleWishlist,
    isWishlisted,
  } = useWishlist();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState(false);

  // ==========================================
  // FETCH PRODUCT
  // ==========================================

  const fetchProduct = async () => {
    try {
      setLoading(true);

      const response = await API.get(`/products/${id}`);

      const data = response.data;

      setProduct(data);

      if (data.images?.length > 0) {
        setSelectedImage(
          `${API_BASE}${data.images[0].imageUrl}`
        );
      } else if (data.primaryImage) {
        setSelectedImage(
          `${API_BASE}${data.primaryImage}`
        );
      }
    } catch (error) {
      console.error("Product Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      setCartLoading(true);

      await addToCart(product);
    } finally {
      setCartLoading(false);
    }
  };

  // ==========================================
  // WISHLIST
  // ==========================================

  const handleWishlist = async () => {
    if (!product || wishlistLoading) return;

    try {
      setWishlistLoading(true);

      const result = await toggleWishlist(product);

      if (result?.requiresLogin) {
        navigate("/login");
        return;
      }

      if (result?.success && result?.added) {
        alert("Added to wishlist ❤️");
      }

      if (result?.success && result?.added === false) {
        alert("Removed from wishlist");
      }
    } finally {
      setWishlistLoading(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          bg-[#0b1120]
          flex
          items-center
          justify-center
          text-[#d4af37]
        "
      >
        <div className="text-center">
          <div
            className="
              mx-auto
              h-10
              w-10
              animate-spin
              rounded-full
              border-2
              border-[#d4af37]/20
              border-t-[#d4af37]
            "
          />

          <p className="mt-4 text-sm text-gray-400">
            Loading product...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PRODUCT NOT FOUND
  // ==========================================

  if (!product) {
    return (
      <div
        className="
          min-h-screen
          bg-[#0b1120]
          flex
          items-center
          justify-center
          px-6
          text-white
        "
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Product not found
          </h2>

          <Link
            to="/shop"
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              rounded-xl
              bg-[#d4af37]
              px-5
              py-3
              font-semibold
              text-[#111827]
              hover:bg-[#e1c45b]
            "
          >
            <ArrowLeft size={18} />
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);

  const hasDiscount =
    product.discountPrice &&
    product.discountPrice < product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.price - product.discountPrice) /
          product.price) *
          100
      )
    : 0;

  const images = product.images || [];

  return (
    <div
      className="
        min-h-screen
        bg-[#0b1120]
        text-white
        pt-24
        pb-16
      "
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* ==========================================
            BACK TO SHOP
        ========================================== */}

        <Link
          to="/shop"
          className="
            inline-flex
            items-center
            gap-2
            mb-8
            text-sm
            text-gray-400
            transition-colors
            hover:text-[#d4af37]
          "
        >
          <ArrowLeft size={17} />
          Back to Shop
        </Link>

        {/* ==========================================
            PRODUCT SECTION
        ========================================== */}

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-10
            lg:gap-16
          "
        >

          {/* ========================================
              LEFT — IMAGES
          ======================================== */}

          <div>

            {/* Main Image */}

            <div
              className="
                relative
                overflow-hidden
                rounded-3xl
                bg-[#111827]
                border
                border-[#d4af37]/20
                shadow-2xl
              "
            >
              {selectedImage ? (
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="
                    h-[480px]
                    md:h-[600px]
                    w-full
                    object-cover
                  "
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder.jpg";
                  }}
                />
              ) : (
                <div
                  className="
                    h-[480px]
                    md:h-[600px]
                    flex
                    items-center
                    justify-center
                    bg-[#0f172a]
                    text-gray-500
                  "
                >
                  No image available
                </div>
              )}

              {/* SALE */}

              {hasDiscount && (
                <div
                  className="
                    absolute
                    top-5
                    left-5
                    rounded-full
                    bg-[#d4af37]
                    px-4
                    py-2
                    text-xs
                    font-bold
                    tracking-wider
                    text-[#111827]
                    shadow-lg
                  "
                >
                  {discountPercentage}% OFF
                </div>
              )}

              {/* Wishlist */}

              <button
                type="button"
                onClick={handleWishlist}
                disabled={wishlistLoading}
                className="
                  absolute
                  top-5
                  right-5
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  bg-[#111827]/90
                  backdrop-blur-md
                  border
                  border-white/10
                  shadow-xl
                  transition-all
                  duration-300
                  hover:scale-110
                  hover:border-[#d4af37]/60
                  disabled:opacity-60
                "
                aria-label="Wishlist"
              >
                <Heart
                  size={22}
                  className={
                    wishlisted
                      ? "fill-[#d4af37] text-[#d4af37]"
                      : "text-white"
                  }
                />
              </button>
            </div>

            {/* Thumbnail Images */}

            {images.length > 0 && (
              <div className="mt-5 flex gap-3 overflow-x-auto pb-2">

                {images.map((image) => {
                  const imageUrl =
                    `${API_BASE}${image.imageUrl}`;

                  const active =
                    selectedImage === imageUrl;

                  return (
                    <button
                      type="button"
                      key={image.id}
                      onClick={() =>
                        setSelectedImage(imageUrl)
                      }
                      className={`
                        shrink-0
                        overflow-hidden
                        rounded-xl
                        border-2
                        transition-all
                        duration-300
                        ${
                          active
                            ? "border-[#d4af37]"
                            : "border-white/10 hover:border-[#d4af37]/50"
                        }
                      `}
                    >
                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="
                          h-20
                          w-20
                          object-cover
                        "
                        onError={(e) => {
                          e.currentTarget.src =
                            "/placeholder.jpg";
                        }}
                      />
                    </button>
                  );
                })}

              </div>
            )}
          </div>

          {/* ========================================
              RIGHT — PRODUCT DETAILS
          ======================================== */}

          <div className="flex flex-col justify-center">

            {/* Category */}

            {product.category?.name && (
              <p
                className="
                  mb-3
                  text-sm
                  uppercase
                  tracking-[0.25em]
                  text-[#0faaa0]
                "
              >
                {product.category.name}
              </p>
            )}

            {/* Product Name */}

            <h1
              className="
                text-3xl
                md:text-5xl
                font-bold
                leading-tight
                text-white
              "
            >
              {product.name}
            </h1>

            {/* Price */}

            <div className="mt-6 flex items-center gap-4">

              {hasDiscount ? (
                <>
                  <span
                    className="
                      text-3xl
                      font-bold
                      text-[#d4af37]
                    "
                  >
                    ₹{product.discountPrice}
                  </span>

                  <span
                    className="
                      text-lg
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
                    text-3xl
                    font-bold
                    text-[#d4af37]
                  "
                >
                  ₹{product.price}
                </span>
              )}

            </div>

            {/* Description */}

            {product.description && (
              <p
                className="
                  mt-6
                  leading-7
                  text-gray-400
                "
              >
                {product.description}
              </p>
            )}

            {/* ======================================
                PRODUCT DETAILS
            ====================================== */}

            <div
              className="
                mt-8
                rounded-2xl
                border
                border-white/10
                bg-[#111827]/70
                p-5
              "
            >
              <h3
                className="
                  mb-4
                  text-lg
                  font-semibold
                  text-[#d4af37]
                "
              >
                Product Details
              </h3>

              <div className="grid grid-cols-2 gap-y-4 text-sm">

                <div>
                  <span className="text-gray-500">
                    Sleeve
                  </span>

                  <p className="mt-1 text-gray-200">
                    {product.sleeveType || "—"}
                  </p>
                </div>

                <div>
                  <span className="text-gray-500">
                    Length
                  </span>

                  <p className="mt-1 text-gray-200">
                    {product.dressLength || "—"}
                  </p>
                </div>

                <div>
                  <span className="text-gray-500">
                    Fit
                  </span>

                  <p className="mt-1 text-gray-200">
                    {product.fitType || "—"}
                  </p>
                </div>

                <div>
                  <span className="text-gray-500">
                    Hijab Compatible
                  </span>

                  <p className="mt-1 text-gray-200">
                    {product.hijabCompatible
                      ? "Yes"
                      : "No"}
                  </p>
                </div>

              </div>
            </div>

            {/* ======================================
                ACTION BUTTONS
            ====================================== */}

            <div className="mt-8 flex flex-col sm:flex-row gap-4">

              {/* ADD TO CART */}

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={cartLoading}
                className="
                  flex-1
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  bg-[#d4af37]
                  px-6
                  py-4
                  font-bold
                  text-[#111827]
                  shadow-lg
                  transition-all
                  duration-300
                  hover:scale-[1.02]
                  hover:bg-[#e1c45b]
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
              >
                <ShoppingBag size={20} />

                {cartLoading
                  ? "Adding..."
                  : "Add to Cart"}
              </button>

              {/* WISHLIST */}

              <button
                type="button"
                onClick={handleWishlist}
                disabled={wishlistLoading}
                className={`
                  flex-1
                  inline-flex
                  items-center
                  justify-center
                  gap-3
                  rounded-2xl
                  border
                  px-6
                  py-4
                  font-semibold
                  transition-all
                  duration-300
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  ${
                    wishlisted
                      ? "border-[#d4af37] bg-[#d4af37]/10 text-[#d4af37]"
                      : "border-white/15 bg-[#111827] text-white hover:border-[#d4af37]/60 hover:text-[#d4af37]"
                  }
                `}
              >
                <Heart
                  size={20}
                  className={
                    wishlisted
                      ? "fill-current"
                      : ""
                  }
                />

                {wishlistLoading
                  ? "Updating..."
                  : wishlisted
                  ? "Wishlisted"
                  : "Add to Wishlist"}
              </button>

            </div>

            {/* ======================================
                TRUST FEATURES
            ====================================== */}

            <div
              className="
                mt-8
                grid
                grid-cols-1
                sm:grid-cols-3
                gap-4
                border-t
                border-white/10
                pt-6
              "
            >

              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={21}
                  className="text-[#d4af37]"
                />

                <div>
                  <p className="text-sm font-semibold">
                    Secure
                  </p>

                  <p className="text-xs text-gray-500">
                    Safe shopping
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Truck
                  size={21}
                  className="text-[#d4af37]"
                />

                <div>
                  <p className="text-sm font-semibold">
                    Delivery
                  </p>

                  <p className="text-xs text-gray-500">
                    Fast & reliable
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Check
                  size={21}
                  className="text-[#d4af37]"
                />

                <div>
                  <p className="text-sm font-semibold">
                    Quality
                  </p>

                  <p className="text-xs text-gray-500">
                    Carefully selected
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;