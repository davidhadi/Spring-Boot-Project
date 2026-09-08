import { useState, useEffect } from "react";
import API from "../services/api";

const SubCategory = () => {

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchSubCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await API.get("/admin/categories");
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchSubCategories = async () => {
    try {
      const res = await API.get("/admin/subcategories");
      setSubCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async () => {

    if (!name.trim() || !selectedCategoryId) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);

      await API.post(
        `/admin/subcategories/${selectedCategoryId}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setName("");
      setImage(null);
      fetchSubCategories();

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/admin/subcategories/${id}`);
      fetchSubCategories();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-10 py-12">

      <h2 className="text-3xl font-bold text-yellow-500 mb-10">
        SubCategory Management
      </h2>

      {/* ADD FORM */}
      <div className="mb-12 p-8 rounded-3xl bg-black/50 border border-yellow-600/40 shadow-lg">

        <div className="grid md:grid-cols-3 gap-6">

          <select
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
            className="p-3 rounded-xl bg-black/70 text-white border border-yellow-600/40"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="SubCategory Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 rounded-xl bg-black/70 text-white border border-yellow-600/40"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="text-sm"
          />

        </div>

        <button
          onClick={handleAdd}
          disabled={loading}
          className="mt-6 px-8 py-3 bg-yellow-600 text-black font-semibold rounded-xl hover:bg-yellow-500 transition disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add SubCategory"}
        </button>

      </div>

      {/* CARD GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

        {subCategories.map((sub) => (
          <div
            key={sub.id}
            className="group relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#111] to-[#1a1a1a] border border-yellow-600/30 shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:shadow-[0_0_60px_rgba(212,175,55,0.35)] transition-all duration-500 hover:-translate-y-2"
          >

            {/* IMAGE */}
            {sub.imageUrl && (
              <div className="relative aspect-[4/5] w-full overflow-hidden">

                <img
                  src={`http://localhost:8080${sub.imageUrl}`}
                  alt={sub.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <h3 className="absolute bottom-4 left-4 text-xl text-yellow-300 font-semibold">
                  {sub.name}
                </h3>

              </div>
            )}

            {/* FOOTER */}
            <div className="p-5 bg-black/60 backdrop-blur-xl flex justify-between items-center">

              <span className="text-sm text-yellow-200">
                {sub.category?.name}
              </span>

              <button
                onClick={() => handleDelete(sub.id)}
                className="px-4 py-1 bg-red-600 rounded-lg hover:bg-red-500 transition"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

      {subCategories.length === 0 && (
        <p className="text-gray-400 mt-8">No subcategories found.</p>
      )}

    </div>
  );
};

export default SubCategory;