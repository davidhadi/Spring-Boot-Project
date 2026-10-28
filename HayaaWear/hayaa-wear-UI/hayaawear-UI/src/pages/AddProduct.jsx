
import { useEffect, useMemo, useState } from "react";
import API from "../services/api";

const initialForm = {
  name: "",
  description: "",
  price: "",
  discountPrice: "",
  stock: "",
  categoryId: "",
  subCategoryId: "",
  sleeveType: "",
  dressLength: "",
  fitType: "",
  hijabCompatible: false,
  transparent: false,
  occasions: [],
};

const emptyAttribute = () => ({
  attributeName: "",
  attributeValue: "",
});

const emptyOption = () => ({
  optionName: "",
  optionValue: "",
});

const emptyVariant = () => ({
  price: "",
  discountPrice: "",
  stock: "",
  options: [emptyOption(), emptyOption()],
});

const inputClass =
  "w-full rounded-xl border border-yellow-600/40 bg-black/60 p-3 text-yellow-100";

const labelClass = "mb-2 block text-sm font-medium text-yellow-200";

const AddProduct = () => {
  const sleeveTypes = ["FULL", "THREE_FOURTH"];
  const dressLengths = ["FLOOR", "ANKLE"];
  const fitTypes = ["LOOSE", "REGULAR", "SLIM"];

  const occasionTypes = [
    "EID",
    "NIKAH",
    "MEHNDI",
    "WALIMA",
    "DAILY_WEAR",
  ];

  const [form, setForm] = useState(initialForm);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [variants, setVariants] = useState([]);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    return () => {
      previewImages.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [previewImages]);

  const selectedCategory = useMemo(
    () =>
      categories.find(
        (category) => String(category.id) === form.categoryId
      ),
    [categories, form.categoryId]
  );

  const selectedSubCategory = useMemo(
    () =>
      subCategories.find(
        (subcategory) =>
          String(subcategory.id) === form.subCategoryId
      ),
    [subCategories, form.subCategoryId]
  );

  // Temporary category detection based on category/subcategory names.
  // Prefer an explicit backend category schema in the future.
  const isClothing = useMemo(() => {
    const text = [
      selectedCategory?.name,
      selectedSubCategory?.name,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return /\b(clothing|clothes|apparel|abaya|abayas|hijab|hijabs|niqab|niqabs|dress|dresses|burqa|burqas|khimar|khimars)\b/.test(
      text
    );
  }, [selectedCategory, selectedSubCategory]);

  const fetchCategories = async () => {
    try {
      const response = await API.get("/admin/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      alert("Could not load categories.");
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const response = await API.get(
        `/admin/subcategories/category/${Number(categoryId)}`
      );
      setSubCategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
      alert("Could not load subcategories.");
    }
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (name === "categoryId") {
      setForm((previous) => ({
        ...previous,
        categoryId: value,
        subCategoryId: "",
        sleeveType: "",
        dressLength: "",
        fitType: "",
        hijabCompatible: false,
        transparent: false,
        occasions: [],
      }));

      setSubCategories([]);

      if (value) {
        fetchSubCategories(value);
      }

      return;
    }

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOccasionChange = (event) => {
    const { value, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      occasions: checked
        ? [...previous.occasions, value]
        : previous.occasions.filter((item) => item !== value),
    }));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []);

    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  // Dynamic product attributes
  const addAttribute = () => {
    setAttributes((previous) => [
      ...previous,
      emptyAttribute(),
    ]);
  };

  const updateAttribute = (index, field, value) => {
    setAttributes((previous) =>
      previous.map((attribute, currentIndex) =>
        currentIndex === index
          ? { ...attribute, [field]: value }
          : attribute
      )
    );
  };

  const removeAttribute = (index) => {
    setAttributes((previous) =>
      previous.filter((_, currentIndex) => currentIndex !== index)
    );
  };

  // Dynamic product variants
  const addVariant = () => {
    setVariants((previous) => [
      ...previous,
      emptyVariant(),
    ]);
  };

  const updateVariant = (index, field, value) => {
    setVariants((previous) =>
      previous.map((variant, currentIndex) =>
        currentIndex === index
          ? { ...variant, [field]: value }
          : variant
      )
    );
  };

  const removeVariant = (index) => {
    setVariants((previous) =>
      previous.filter((_, currentIndex) => currentIndex !== index)
    );
  };

  const addVariantOption = (variantIndex) => {
    setVariants((previous) =>
      previous.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              options: [...variant.options, emptyOption()],
            }
          : variant
      )
    );
  };

  const updateVariantOption = (
    variantIndex,
    optionIndex,
    field,
    value
  ) => {
    setVariants((previous) =>
      previous.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              options: variant.options.map((option, currentIndex) =>
                currentIndex === optionIndex
                  ? { ...option, [field]: value }
                  : option
              ),
            }
          : variant
      )
    );
  };

  const removeVariantOption = (variantIndex, optionIndex) => {
    setVariants((previous) =>
      previous.map((variant, index) =>
        index === variantIndex
          ? {
              ...variant,
              options: variant.options.filter(
                (_, currentIndex) => currentIndex !== optionIndex
              ),
            }
          : variant
      )
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.categoryId || !form.subCategoryId) {
      alert("Please select a category and subcategory.");
      return;
    }

    if (
      isClothing &&
      (!form.sleeveType || !form.dressLength || !form.fitType)
    ) {
      alert("Please complete the required clothing fields.");
      return;
    }

    const cleanedAttributes = attributes
      .filter(
        (attribute) =>
          attribute.attributeName.trim() &&
          attribute.attributeValue.trim()
      )
      .map((attribute) => ({
        attributeName: attribute.attributeName.trim(),
        attributeValue: attribute.attributeValue.trim(),
      }));

    const cleanedVariants = [];

    for (let index = 0; index < variants.length; index++) {
      const variant = variants[index];

      if (
        variant.price === "" ||
        variant.stock === "" ||
        Number(variant.price) < 0 ||
        Number(variant.stock) < 0
      ) {
        alert(`Please enter a valid price and stock for variant ${index + 1}.`);
        return;
      }

      if (
        variant.discountPrice !== "" &&
        (Number(variant.discountPrice) < 0 ||
          Number(variant.discountPrice) > Number(variant.price))
      ) {
        alert(
          `Please check the discount price for variant ${index + 1}.`
        );
        return;
      }

      const options = variant.options
        .filter(
          (option) =>
            option.optionName.trim() && option.optionValue.trim()
        )
        .map((option) => ({
          optionName: option.optionName.trim(),
          optionValue: option.optionValue.trim(),
        }));

      if (options.length === 0) {
        alert(`Add at least one option to variant ${index + 1}.`);
        return;
      }

      if (options.length !== variant.options.length) {
        alert(
          `Complete or remove empty options in variant ${index + 1}.`
        );
        return;
      }

      const optionNames = options.map((option) =>
        option.optionName.toLowerCase()
      );

      if (new Set(optionNames).size !== optionNames.length) {
        alert(`Duplicate option names in variant ${index + 1}.`);
        return;
      }

      cleanedVariants.push({
        price: Number(variant.price),
        discountPrice:
          variant.discountPrice === ""
            ? null
            : Number(variant.discountPrice),
        stock: Number(variant.stock),
        options,
      });
    }

    const payload = {
      ...form,
      price: Number(form.price),
      discountPrice:
        form.discountPrice === ""
          ? null
          : Number(form.discountPrice),
      stock: Number(form.stock),
      categoryId: Number(form.categoryId),
      subCategoryId: Number(form.subCategoryId),

      // Clothing enums are only populated for clothing products.
      sleeveType: isClothing ? form.sleeveType || null : null,
      dressLength: isClothing ? form.dressLength || null : null,
      fitType: isClothing ? form.fitType || null : null,
      hijabCompatible: isClothing && form.hijabCompatible,
      transparent: isClothing && form.transparent,
      occasions: isClothing ? form.occasions : [],

      attributes: cleanedAttributes,
      variants: cleanedVariants,
    };

    setLoading(true);

    try {
      const response = await API.post("/products", payload);
      const productId = response.data.id;

      if (!productId) {
        throw new Error(
          "Product was created, but the response did not contain its ID."
        );
      }

      if (images.length > 0) {
        const formData = new FormData();

        images.forEach((image) => {
          formData.append("file", image);
        });

        await API.post(
          `/products/${productId}/images`,
          formData
        );
      }

      alert("Product created successfully!");

      setForm({ ...initialForm });
      setAttributes([]);
      setVariants([]);
      setImages([]);
      setPreviewImages([]);
      setSubCategories([]);

      const fileInput = document.getElementById("product-images");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error("Error creating product:", error.response || error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Product creation failed. Check the backend console."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black px-4 pt-28 text-yellow-100 sm:px-8">
      <h2 className="mb-8 text-3xl font-bold text-yellow-400">
        Add Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-3xl space-y-6 pb-12"
      >
        {/* Common product information */}
        <section className="space-y-4 rounded-2xl border border-yellow-600/30 p-5">
          <h3 className="text-xl font-semibold text-yellow-400">
            Basic Information
          </h3>

          <div>
            <label className={labelClass}>Product Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className={inputClass}
              required
            />
          </div>

          <div>
            <label className={labelClass}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className={inputClass}
              rows={4}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <label className={labelClass}>Price (₹)</label>
              <input
                type="number"
                name="price"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Discount Price (₹)</label>
              <input
                type="number"
                name="discountPrice"
                min="0"
                step="0.01"
                value={form.discountPrice}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Stock</label>
              <input
                type="number"
                name="stock"
                min="0"
                value={form.stock}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Category</label>
            <select
              name="categoryId"
              value={form.categoryId}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Subcategory</label>
            <select
              name="subCategoryId"
              value={form.subCategoryId}
              onChange={handleChange}
              className={inputClass}
              disabled={!form.categoryId}
              required
            >
              <option value="">Select Subcategory</option>
              {subCategories.map((subcategory) => (
                <option key={subcategory.id} value={subcategory.id}>
                  {subcategory.name}
                </option>
              ))}
            </select>
          </div>
        </section>

        {/* Clothing-specific fields */}
        {isClothing && (
          <section className="space-y-4 rounded-2xl border border-yellow-600/30 p-5">
            <h3 className="text-xl font-semibold text-yellow-400">
              Clothing Details
            </h3>

            <div>
              <label className={labelClass}>Sleeve Type</label>
              <select
                name="sleeveType"
                value={form.sleeveType}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select Sleeve Type</option>
                {sleeveTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace("_", " ")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Dress Length</label>
              <select
                name="dressLength"
                value={form.dressLength}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select Dress Length</option>
                {dressLengths.map((length) => (
                  <option key={length} value={length}>
                    {length}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Fit Type</label>
              <select
                name="fitType"
                value={form.fitType}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="">Select Fit Type</option>
                {fitTypes.map((fit) => (
                  <option key={fit} value={fit}>
                    {fit}
                  </option>
                ))}
              </select>
            </div>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="hijabCompatible"
                checked={form.hijabCompatible}
                onChange={handleChange}
                className="accent-yellow-500"
              />
              Hijab Compatible
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="transparent"
                checked={form.transparent}
                onChange={handleChange}
                className="accent-yellow-500"
              />
              Transparent Fabric
            </label>

            <div>
              <p className="mb-3 font-medium">Suitable Occasions</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {occasionTypes.map((occasion) => (
                  <label
                    key={occasion}
                    className="flex items-center gap-2"
                  >
                    <input
                      type="checkbox"
                      value={occasion}
                      checked={form.occasions.includes(occasion)}
                      onChange={handleOccasionChange}
                      className="accent-yellow-500"
                    />
                    {occasion.replace("_", " ")}
                  </label>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Dynamic attributes */}
        <section className="space-y-4 rounded-2xl border border-yellow-600/30 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-yellow-400">
                Product Attributes
              </h3>
              <p className="mt-1 text-sm text-yellow-100/60">
                Examples: material, beadCount, thickness, soleType.
              </p>
            </div>

            <button
              type="button"
              onClick={addAttribute}
              className="rounded-lg border border-yellow-500 px-4 py-2 text-yellow-300 hover:bg-yellow-500/10"
            >
              + Add Attribute
            </button>
          </div>

          {attributes.map((attribute, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-xl bg-white/5 p-3 sm:grid-cols-[1fr_1fr_auto]"
            >
              <input
                placeholder="Attribute name"
                value={attribute.attributeName}
                onChange={(event) =>
                  updateAttribute(
                    index,
                    "attributeName",
                    event.target.value
                  )
                }
                className={inputClass}
              />

              <input
                placeholder="Attribute value"
                value={attribute.attributeValue}
                onChange={(event) =>
                  updateAttribute(
                    index,
                    "attributeValue",
                    event.target.value
                  )
                }
                className={inputClass}
              />

              <button
                type="button"
                onClick={() => removeAttribute(index)}
                className="rounded-lg px-3 py-2 text-red-400 hover:bg-red-500/10"
              >
                Remove
              </button>
            </div>
          ))}
        </section>

        {/* Optional variants */}
        <section className="space-y-4 rounded-2xl border border-yellow-600/30 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-xl font-semibold text-yellow-400">
                Product Variants
              </h3>
              <p className="mt-1 text-sm text-yellow-100/60">
                Each variant has its own price, stock and options.
              </p>
            </div>

            <button
              type="button"
              onClick={addVariant}
              className="rounded-lg border border-yellow-500 px-4 py-2 text-yellow-300 hover:bg-yellow-500/10"
            >
              + Add Variant
            </button>
          </div>

          {variants.map((variant, variantIndex) => (
            <div
              key={variantIndex}
              className="space-y-4 rounded-xl border border-yellow-600/20 p-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">
                  Variant {variantIndex + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => removeVariant(variantIndex)}
                  className="text-sm text-red-400"
                >
                  Remove Variant
                </button>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div>
                  <label className={labelClass}>Price (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={variant.price}
                    onChange={(event) =>
                      updateVariant(
                        variantIndex,
                        "price",
                        event.target.value
                      )
                    }
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className={labelClass}>Discount (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={variant.discountPrice}
                    onChange={(event) =>
                      updateVariant(
                        variantIndex,
                        "discountPrice",
                        event.target.value
                      )
                    }
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={labelClass}>Stock</label>
                  <input
                    type="number"
                    min="0"
                    value={variant.stock}
                    onChange={(event) =>
                      updateVariant(
                        variantIndex,
                        "stock",
                        event.target.value
                      )
                    }
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">Variant Options</p>

                  <button
                    type="button"
                    onClick={() => addVariantOption(variantIndex)}
                    className="text-sm text-yellow-300"
                  >
                    + Add Option
                  </button>
                </div>

                {variant.options.map((option, optionIndex) => (
                  <div
                    key={optionIndex}
                    className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
                  >
                    <input
                      placeholder="Option name (e.g. size)"
                      value={option.optionName}
                      onChange={(event) =>
                        updateVariantOption(
                          variantIndex,
                          optionIndex,
                          "optionName",
                          event.target.value
                        )
                      }
                      className={inputClass}
                    />

                    <input
                      placeholder="Option value (e.g. 8)"
                      value={option.optionValue}
                      onChange={(event) =>
                        updateVariantOption(
                          variantIndex,
                          optionIndex,
                          "optionValue",
                          event.target.value
                        )
                      }
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeVariantOption(variantIndex, optionIndex)
                      }
                      className="px-3 text-red-400"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Images */}
        <section className="space-y-4 rounded-2xl border border-yellow-600/30 p-5">
          <h3 className="text-xl font-semibold text-yellow-400">
            Product Images
          </h3>

          <input
            id="product-images"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImageChange}
            className={inputClass}
          />

          {previewImages.length > 0 && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {previewImages.map((image, index) => (
                <img
                  key={image}
                  src={image}
                  alt={`Product preview ${index + 1}`}
                  className="h-32 w-full rounded-lg border border-yellow-600 object-cover"
                />
              ))}
            </div>
          )}
        </section>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-yellow-600 px-6 py-3 font-semibold text-black hover:bg-yellow-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Saving Product..." : "Save Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
