import { useState, useEffect } from "react";
import API from "../services/api";

const AddProduct = () => {

  const sleeveTypes = ["FULL", "THREE_QUARTER"];
  const dressLengths = ["FLOOR", "ANKLE"];
  const fitTypes = ["LOOSE", "REGULAR", "SLIM"];
  const occasionTypes = ["EID", "NIKAH", "MEHNDI", "WALIMA", "DAILY"];

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [images, setImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);

  const [form, setForm] = useState({
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
    occasions: []
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await API.get("/admin/categories");
    setCategories(res.data);
  };

  const fetchSubCategories = async (categoryId) => {
    try {
      const res = await API.get(`/admin/subcategories/category/${Number(categoryId)}`);
      setSubCategories(res.data);
    } catch (error) {
      console.error("Error fetching subcategories", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));

    if (name === "categoryId") {
      setForm(prev => ({
        ...prev,
        categoryId: value,
        subCategoryId: ""
      }));

      setSubCategories([]);

      if (value) {
        fetchSubCategories(value);
      }
    }
  };

  const handleOccasionChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setForm({
        ...form,
        occasions: [...form.occasions, value]
      });
    } else {
      setForm({
        ...form,
        occasions: form.occasions.filter(o => o !== value)
      });
    }
  };

  const handleImageChange = (e) => {

    const files = Array.from(e.target.files);

    setImages(files);

    const preview = files.map(file => URL.createObjectURL(file));
    setPreviewImages(preview);
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.post("/products", {
        ...form,
        price: Number(form.price),
        discountPrice: Number(form.discountPrice),
        stock: Number(form.stock),
        categoryId: Number(form.categoryId),
        subCategoryId: Number(form.subCategoryId)
      });

      const productId = res.data.id;

      // Upload Multiple Images
      if (images.length > 0) {

        const formData = new FormData();

        images.forEach(img => {
          formData.append("images", img);
        });

        await API.post(`/products/${productId}/images`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }

      alert("Product Created Successfully ✅");

      setForm({
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
        occasions: []
      });

      setImages([]);
      setPreviewImages([]);

    } catch (error) {

      console.error(error);
      alert("Error creating product ❌");

    }

  };

  return (
    <div className="min-h-screen pt-28 px-8 text-yellow-100 bg-black">

      <h2 className="text-3xl mb-8 text-yellow-400">
        Add Product
      </h2>

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
          value={form.price}
          onChange={handleChange}
          className="w-full p-3 bg-black/60 border border-yellow-600/40 rounded-xl"
          required
        />

        <input
          type="number"
          name="discountPrice"
          placeholder="Discount Price"
          value={form.discountPrice}
          onChange={handleChange}
          className="w-full p-3 bg-black/60 border border-yellow-600/40 rounded-xl"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
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
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
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
          {subCategories.map(sub => (
            <option key={sub.id} value={sub.id}>{sub.name}</option>
          ))}
        </select>

        {/* Image Upload */}
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          className="w-full p-3 bg-black/60 border border-yellow-600/40 rounded-xl"
        />

        {/* Image Preview */}
        {previewImages.length > 0 && (
          <div className="grid grid-cols-3 gap-4">
            {previewImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="preview"
                className="h-28 object-cover rounded-lg border border-yellow-600"
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