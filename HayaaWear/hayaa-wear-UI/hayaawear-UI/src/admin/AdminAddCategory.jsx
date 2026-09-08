import { useState, useEffect } from "react";
import API from "../services/api";

const AdminAddCategory = () => {

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [bannerImage, setBannerImage] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

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

    if (!name.trim()) {
      setMessage("Category name is required ❌");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const formData = new FormData();
      formData.append("name", name);

      if (image) {
        formData.append("image", image);
      }

      if (bannerImage) {
        formData.append("bannerImage", bannerImage);
      }

      await API.post("/admin/categories", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage("Category Created Successfully ✅");
      setName("");
      setImage(null);
      setBannerImage(null);

      fetchCategories();

    } catch (error) {
      console.error(error);
      setMessage("Error creating category ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-8 bg-black text-yellow-100">

      <h2 className="text-3xl mb-8 text-yellow-400">
        Add Category
      </h2>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-xl bg-black/60 p-6 rounded-2xl border border-yellow-600/40">

        {/* Category Name */}
        <input
          type="text"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 bg-black/70 border border-yellow-600/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        {/* Category Image */}
        <div>
          <label className="block mb-2 text-yellow-300">
            Category Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full text-sm"
          />
        </div>

        {/* Banner Image */}
        <div>
          <label className="block mb-2 text-yellow-300">
            Banner Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setBannerImage(e.target.files[0])}
            className="w-full text-sm"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 bg-yellow-600 text-black rounded-xl hover:bg-yellow-500 transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Category"}
        </button>

        {message && (
          <p className="text-sm mt-2">{message}</p>
        )}

      </form>

      {/* CATEGORY LIST */}
      <div className="mt-12 max-w-4xl">
        <h3 className="text-2xl text-yellow-400 mb-6">
          Category List
        </h3>

        {categories.length === 0 ? (
          <p className="text-gray-400">No categories found.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="p-4 bg-black/60 border border-yellow-600/40 rounded-2xl"
              >
                <h4 className="text-lg text-yellow-300 mb-3">
                  {cat.name}
                </h4>

               <div className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-yellow-600/30 shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:shadow-[0_0_60px_rgba(212,175,55,0.35)] transition-all duration-500 hover:-translate-y-2">

  {/* MAIN CATEGORY IMAGE */}
  {cat.imageUrl && (
    <div className="relative aspect-[4/5] w-full overflow-hidden">

      <img
        src={`http://localhost:8080${cat.imageUrl}`}
        alt={cat.name}
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Category name over image */}
      <h3 className="absolute bottom-4 left-4 text-xl text-yellow-300 font-semibold tracking-wide">
        {cat.name}
      </h3>

    </div>
  )}

  {/* FOOTER */}
  <div className="px-5 py-4 bg-black/60 backdrop-blur-xl flex justify-between items-center">
    <span className="text-sm text-yellow-200">
      ID: {cat.id}
    </span>

    <button
      onClick={() => handleDelete(cat.id)}
      className="px-4 py-1 bg-red-600 rounded-lg hover:bg-red-500 transition"
    >
      Delete
    </button>
  </div>

</div>

                <p className="text-sm text-gray-400 mt-2">
                  ID: {cat.id}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminAddCategory;