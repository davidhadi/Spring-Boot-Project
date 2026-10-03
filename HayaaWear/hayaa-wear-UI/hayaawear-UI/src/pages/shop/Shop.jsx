
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, ChevronDown, X } from "lucide-react";
import ProductCard from "./ProductCard";
import API from "../../services/api";

const Shop = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOccasions, setSelectedOccasions] = useState([]);
  const [sortBy, setSortBy] = useState("featured");
  const [mobileFilter, setMobileFilter] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const [productsRes, allProductsRes] = await Promise.all([
          API.get("/products/all"),
          API.get("/products/all"),
        ]);

        const productData = productsRes.data || [];
        const allProducts = allProductsRes.data || [];

        setProducts(productData);

        const uniqueCategories = Array.from(
          new Map(
            allProducts
              .filter((p) => p.category)
              .map((p) => [p.category.id, p.category])
          ).values()
        );

        setCategories(uniqueCategories);
        const categoryFromUrl = searchParams.get("category");

        console.log("CATEGORY FROM URL:", categoryFromUrl);
        console.log("ALL CATEGORIES:", uniqueCategories);

if (categoryFromUrl) {
  const matchedCategory = uniqueCategories.find(
    (category) =>
      category.name.toLowerCase() === categoryFromUrl.toLowerCase()
  );

  if (matchedCategory) {
    console.log("MATCHED CATEGORY:", matchedCategory);
    setSelectedCategory(matchedCategory.id);
  }
}
      } catch (error) {
        console.error("Shop API Error:", error);
      }
    };

    loadProducts();
  }, [searchParams]);

  /* ---------------- FILTER ---------------- */


  const filteredProducts = products.filter((product) => {

  // Category filter
  const categoryMatch =
    selectedCategory === "All" ||
    product.category?.id === selectedCategory;

  // Occasion filter
  const occasionMatch =
    selectedOccasions.length === 0 ||
    selectedOccasions.some((occasion) =>
      product.occasions?.includes(occasion)
    );

    console.log("PRODUCTS:", products);
console.log("SELECTED OCCASIONS:", selectedOccasions);

  return categoryMatch && occasionMatch;
});

  /* ---------------- SORT ---------------- */

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") {
      return (
        (a.discountPrice || a.price) -
        (b.discountPrice || b.price)
      );
    }

    if (sortBy === "price-high") {
      return (
        (b.discountPrice || b.price) -
        (a.discountPrice || a.price)
      );
    }

    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    return 0;
  });

  return (
    <div className="min-h-screen bg-[#0f172a] text-white pt-24 pb-20">

      {/* ================= HERO ================= */}

      <section className="max-w-7xl mx-auto px-6 mb-14">

        <div
          className="
            relative overflow-hidden
            rounded-[2rem]
            border border-[#d4af37]/20
            bg-gradient-to-br
            from-[#111827]
            via-[#111827]
            to-[#0f766e]/20
            px-8 py-16 md:px-16
          "
        >

          {/* Decorative Glow */}
          <div
            className="
              absolute -top-24 -right-24
              w-72 h-72
              rounded-full
              bg-[#d4af37]/10
              blur-3xl
            "
          />

          <div
            className="
              absolute -bottom-32 -left-20
              w-72 h-72
              rounded-full
              bg-[#0f766e]/10
              blur-3xl
            "
          />

          <div className="relative max-w-2xl">

            <p
              className="
                text-[#d4af37]
                uppercase tracking-[0.35em]
                text-xs md:text-sm
                font-semibold
                mb-4
              "
            >
              HayaaWear Collection
            </p>

            <h1
              className="
                text-4xl md:text-6xl
                font-serif
                font-semibold
                leading-tight
              "
            >
              Discover Your
              <span className="block text-[#d4af37]">
                Elegance
              </span>
            </h1>

            <p className="mt-5 text-gray-300 max-w-xl leading-relaxed">
              Explore our carefully curated collection of
              modest fashion, designed to bring elegance,
              comfort and confidence to every occasion.
            </p>

          </div>
        </div>
      </section>

      {/* ================= SHOP HEADER ================= */}

      <section className="max-w-7xl mx-auto px-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <p className="text-sm text-gray-400">
              Showing {sortedProducts.length} products
            </p>

            <h2 className="text-2xl md:text-3xl font-semibold mt-1">
              All Collections
            </h2>
          </div>

          {/* Desktop Controls */}

          <div className="flex items-center gap-3">

            {/* Mobile Filter */}

            <button
              onClick={() => setMobileFilter(true)}
              className="
                md:hidden
                flex items-center gap-2
                px-4 py-3
                rounded-xl
                border border-[#d4af37]/30
                bg-[#111827]
                text-sm
              "
            >
              <SlidersHorizontal size={17} />
              Filters
            </button>

            {/* Sort */}

            <div className="relative">

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="
                  appearance-none
                  bg-[#111827]
                  border border-[#d4af37]/30
                  rounded-xl
                  px-5 py-3 pr-10
                  text-sm
                  text-gray-200
                  outline-none
                  focus:border-[#d4af37]
                "
              >
                <option value="featured">
                  Featured
                </option>

                <option value="price-low">
                  Price: Low to High
                </option>

                <option value="price-high">
                  Price: High to Low
                </option>

                <option value="name">
                  Name
                </option>
              </select>

              <ChevronDown
                size={16}
                className="
                  absolute right-3 top-1/2
                  -translate-y-1/2
                  pointer-events-none
                  text-[#d4af37]
                "
              />

            </div>
          </div>
        </div>

        {/* ================= MAIN CONTENT ================= */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* ================= SIDEBAR ================= */}

          <aside
            className="
              hidden md:block
              md:col-span-1
              h-fit
              sticky top-28
            "
          >

            <div
              className="
                rounded-3xl
                bg-[#111827]
                border border-[#d4af37]/20
                p-6
              "
            >

              <div className="flex items-center gap-2 mb-6">

                <SlidersHorizontal
                  size={19}
                  className="text-[#d4af37]"
                />

                <h3 className="text-lg font-semibold">
                  Filters
                </h3>

              </div>

              {/* Categories */}

              <div>

                <h4 className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-4">
                  Categories
                </h4>

                <div className="space-y-2">

                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`
                      w-full text-left
                      px-4 py-3
                      rounded-xl
                      text-sm
                      transition-all duration-300
                      ${
                        selectedCategory === "All"
                          ? "bg-[#d4af37] text-[#111827] font-semibold"
                          : "text-gray-300 hover:bg-white/5 hover:text-[#d4af37]"
                      }
                    `}
                  >
                    All Collections
                  </button>

                  {categories.map((category) => (

                    <button
                      key={category.id}
                      onClick={() =>
                        setSelectedCategory(category.id)
                      }
                      className={`
                        w-full text-left
                        px-4 py-3
                        rounded-xl
                        text-sm
                        transition-all duration-300
                        ${
                          selectedCategory === category.id
                            ? "bg-[#d4af37] text-[#111827] font-semibold"
                            : "text-gray-300 hover:bg-white/5 hover:text-[#d4af37]"
                        }
                      `}
                    >
                      {category.name}
                    </button>

                  ))}

                </div>

              </div>

              {/* Divider */}

              <div className="h-px bg-white/10 my-7" />

             {/* Occasions */}
<div>
  <h4 className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-4">
    Occasion
  </h4>

  <div className="space-y-3">
    {[
      { label: "Eid", value: "EID" },
      { label: "Nikah", value: "NIKAH" },
      { label: "Mehndi", value: "MEHNDI" },
      { label: "Walima", value: "WALIMA" },
      { label: "Daily Wear", value: "DAILY_WEAR" },
    ].map((occasion) => (
      <label
        key={occasion.value}
        className="
          flex items-center gap-3
          text-sm text-gray-300
          cursor-pointer
          hover:text-white
        "
      >

    
        <input
          type="checkbox"
          checked={selectedOccasions.includes(occasion.value)}
          onChange={() => {
            setSelectedOccasions((prev) =>
              prev.includes(occasion.value)
                ? prev.filter((item) => item !== occasion.value)
                : [...prev, occasion.value]
            );
          }}
          className="
            accent-[#d4af37]
            w-4 h-4
          "
        />

        <span>{occasion.label}</span>
      </label>
    ))}
  </div>
</div>

              {/* Divider */}

              <div className="h-px bg-white/10 my-7" />

              {/* Price */}

              <div>

                <h4 className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-4">
                  Price Range
                </h4>

                <input
                  type="range"
                  min="500"
                  max="10000"
                  className="
                    w-full
                    accent-[#d4af37]
                  "
                />

                <div className="flex justify-between mt-3 text-xs text-gray-400">
                  <span>₹500</span>
                  <span>₹10,000+</span>
                </div>

              </div>

            </div>
          </aside>

          {/* ================= PRODUCTS ================= */}

          <main className="md:col-span-3">

            {sortedProducts.length > 0 ? (

              <div
                className="
                  grid
                  grid-cols-2
                  lg:grid-cols-3
                  gap-5 md:gap-6
                "
              >

                {sortedProducts.map((product) => (

                  <ProductCard
                    key={product.id}
                    product={product}
                  />

                ))}

              </div>

            ) : (

              <div
                className="
                  min-h-[400px]
                  flex flex-col
                  items-center justify-center
                  rounded-3xl
                  border border-[#d4af37]/20
                  bg-[#111827]
                  text-center
                  px-6
                "
              >

                <div className="text-5xl mb-5">
                  ✦
                </div>

                <h3 className="text-xl font-semibold">
                  No Products Found
                </h3>

                <p className="text-gray-400 mt-2">
                  Try selecting another category.
                </p>

              </div>

            )}

          </main>

        </div>
      </section>

      {/* ================= MOBILE FILTER ================= */}

      {mobileFilter && (

        <div className="fixed inset-0 z-50 md:hidden">

          {/* Overlay */}

          <div
            onClick={() => setMobileFilter(false)}
            className="
              absolute inset-0
              bg-black/70
              backdrop-blur-sm
            "
          />

          {/* Drawer */}

          <div
            className="
              absolute
              right-0 top-0
              h-full
              w-[85%]
              max-w-sm
              bg-[#111827]
              border-l border-[#d4af37]/20
              p-6
              overflow-y-auto
            "
          >

            <div className="flex justify-between items-center mb-8">

              <h3 className="text-xl font-semibold">
                Filters
              </h3>

              <button
                onClick={() => setMobileFilter(false)}
                className="
                  w-9 h-9
                  rounded-full
                  bg-white/5
                  flex items-center justify-center
                "
              >
                <X size={18} />
              </button>

            </div>

            <h4 className="text-sm font-semibold text-[#d4af37] uppercase tracking-wider mb-4">
              Categories
            </h4>

            <div className="space-y-2">

              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setMobileFilter(false);
                }}
                className="
                  w-full text-left
                  px-4 py-3
                  rounded-xl
                  bg-white/5
                  text-sm
                "
              >
                All Collections
              </button>

              {categories.map((category) => (

                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setMobileFilter(false);
                  }}
                  className="
                    w-full text-left
                    px-4 py-3
                    rounded-xl
                    bg-white/5
                    text-gray-300
                    text-sm
                  "
                >
                  {category.name}
                </button>

              ))}

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Shop;