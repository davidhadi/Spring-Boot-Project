
import { useState, useEffect } from "react";
import API from "../services/api";

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

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

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

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/admin/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const res = await API.get(
        `/admin/subcategories/category/${Number(categoryId)}`
      );
      setSubCategories(res.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "categoryId") {
      setForm((prev) => ({
        ...prev,
        categoryId: value,
        subCategoryId: "",
      }));

      setSubCategories([]);

      if (value) {
        fetchSubCategories(value);
      }

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleOccasionChange = (e) => {
    const { value, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      occasions: checked
        ? [...prev.occasions, value]
        : prev.occasions.filter((occasion) => occasion !== value),
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);

    setImages(files);
    setPreviewImages(files.map((file) => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...form,
        price: Number(form.price),
        discountPrice:
          form.discountPrice === "" ? null : Number(form.discountPrice),
        stock: Number(form.stock),
        categoryId: Number(form.categoryId),
        subCategoryId: Number(form.subCategoryId),
      };

      const res = await API.post("/products", payload);
      const productId = res.data.id;

      // Upload images after product creation
      if (images.length > 0) {
        const formData = new FormData();

        images.forEach((img) => {
          formData.append("file", img);
        });

        await API.post(`/products/${productId}/images`, formData);
      }

      alert("Product Created Successfully ✅");

      setForm({ ...initialForm });
      setImages([]);
      setPreviewImages([]);
      setSubCategories([]);
    } catch (error) {
      console.error("Error creating product:", error.response || error);
      alert(
        error.response?.data?.message ||
          "Product creation failed. Check the backend console."
      );
    }
  };

  return (
    <div className="min-h-screen pt-28 px-8 text-yellow-100 bg-black">
      <h2 className="text-3xl mb-8 text-yellow-400">Add Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-3 bg-black/60 border border-yellow-600/40 rounded-xl"
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-3 bg-black/60 border border-yellow-600/40 rounded-xl"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          min="0"
          step="0.01"
          value={form.price}
          onChange={handleChange}
          className="w-full p-3 bg-black/60 border border-yellow-600/40 rounded-xl"
          required
        />

        <input
          type="number"
          name="discountPrice"
          placeholder="Discount Price (Optional)"
          min="0"
          step="0.01"
          value={form.discountPrice}
          onChange={handleChange}
          className="w-full p-3 bg-black/60 border border-yellow-600/40 rounded-xl"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          min="0"
          value={form.stock}
          onChange={handleChange}
          className="w-full p-3 bg-black/60 border border-yellow-600/40 rounded-xl"
          required
        />

        {/* Category */}
        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          className="w-full p-3 bg-black/60 border border-yellow-600/40 rounded-xl"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* SubCategory */}
        <select
          name="subCategoryId"
          value={form.subCategoryId}
          onChange={handleChange}
          disabled={!form.categoryId}
          className="w-full p-3 bg-black/60 border border-yellow-600/40 rounded-xl"
          required
        >
          <option value="">Select SubCategory</option>
          {subCategories.map((sub) => (
            <option key={sub.id} value={sub.id}>
              {sub.name}
            </option>
          ))}
        </select>

        {/* Sleeve Type */}
        <div>
          <label className="block mb-2">Sleeve Type</label>
          <select
            name="sleeveType"
            value={form.sleeveType}
            onChange={handleChange}
            className="w-full p-3 bg-black/60 border border-yellow-600/40 rounded-xl"
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

        {/* Dress Length */}
        <div>
          <label className="block mb-2">Dress Length</label>
          <select
            name="dressLength"
            value={form.dressLength}
            onChange={handleChange}
            className="w-full p-3 bg-black/60 border border-yellow-600/40 rounded-xl"
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

        {/* Fit Type */}
        <div>
          <label className="block mb-2">Fit Type</label>
          <select
            name="fitType"
            value={form.fitType}
            onChange={handleChange}
            className="w-full p-3 bg-black/60 border border-yellow-600/40 rounded-xl"
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

        {/* Boolean Attributes */}
        <div className="space-y-3">
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
        </div>

        {/* Occasions */}
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

        {/* Image Upload */}
        <div>
          <label className="block mb-2">Product Images</label>
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleImageChange}
            className="w-full p-3 bg-black/60 border border-yellow-600/40 rounded-xl"
          />
        </div>

        {/* Image Preview */}
        {previewImages.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {previewImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Product preview ${index + 1}`}
                className="h-28 w-full object-cover rounded-lg border border-yellow-600"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          className="px-6 py-3 bg-yellow-600 text-black rounded-xl hover:bg-yellow-500"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
