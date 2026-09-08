import { useState, useEffect } from "react";
import API from "../services/api";

const AdminAddSubCategory = () => {

  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [subCategoryName, setSubCategoryName] = useState("");
  const [image, setImage] = useState(null);

  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const res = await API.get("/admin/subcategories");
      setSubCategories(res.data);
    } catch (error) {
      console.error("Error fetching subcategories", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await API.get("/admin/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!subCategoryName.trim() || !selectedCategoryId) {
      setMessage("Please select category and enter subcategory name ❌");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("name", subCategoryName);

      if (image) {
        formData.append("image", image);
      }

      await API.post(
        `/admin/subcategories/${selectedCategoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      fetchSubCategories();

      setMessage("SubCategory created successfully ✅");
      setSubCategoryName("");
      setImage(null);

    } catch (error) {
      console.error(error);
      setMessage("Error creating subcategory ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-10 px-8 bg-black text-yellow-100">

      <h2 className="text-3xl mb-8 text-yellow-400">
        Add SubCategory
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 max-w-xl bg-black/60 p-6 rounded-2xl border border-yellow-600/40"
      >

        {/* Category Dropdown */}
        <select
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
          className="w-full p-3 bg-black/70 border border-yellow-600/40 rounded-xl"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* SubCategory Name */}
        <input
          type="text"
          placeholder="SubCategory Name (e.g. Party Abaya)"
          value={subCategoryName}
          onChange={(e) => setSubCategoryName(e.target.value)}
          className="w-full p-3 bg-black/70 border border-yellow-600/40 rounded-xl"
        />

        {/* Image Upload */}
        <div>
          <label className="block mb-2 text-yellow-300">
            SubCategory Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-yellow-600 text-black rounded-xl hover:bg-yellow-500 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create SubCategory"}
        </button>

        {message && (
          <p className="text-sm mt-4">{message}</p>
        )}

      </form>

      {/* SubCategory List */}
      <div className="mt-12 max-w-4xl">
        <h3 className="text-2xl text-yellow-400 mb-6">
          SubCategory List
        </h3>

        {subCategories.length === 0 ? (
          <p className="text-gray-400">No subcategories found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {subCategories.map((sub) => (
              <div
                key={sub.id}
                className="p-4 bg-black/60 border border-yellow-600/40 rounded-2xl"
              >
                <h4 className="text-lg text-yellow-300 mb-2">
                  {sub.name}
                </h4>

                <p className="text-sm text-gray-400 mb-3">
                  Category: {sub.category?.name}
                </p>

                {sub.imageUrl && (
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl group">

  <img
    src={`http://localhost:8080${sub.imageUrl}`}
    alt={sub.name}
    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
  />

  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

  {/* Title Over Image */}
  <h4 className="absolute bottom-3 left-3 text-lg text-yellow-300 font-semibold">
    {sub.name}
  </h4>

</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminAddSubCategory;