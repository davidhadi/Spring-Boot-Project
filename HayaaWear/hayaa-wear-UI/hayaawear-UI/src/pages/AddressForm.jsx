import { useState } from "react";
import API from "../services/api";

const AddressForm = ({ onSuccess }) => {

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post("/addresses", formData);
      onSuccess();   // refresh list
      setFormData({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: ""
      });
    } catch (error) {
      console.error("Address save failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">

      {Object.keys(formData).map((field) => (
        <input
          key={field}
          type="text"
          name={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          required
          className="p-3 rounded-lg bg-black/50 border border-yellow-600/40 text-white focus:ring-2 focus:ring-yellow-500"
        />
      ))}

      <button
        type="submit"
        disabled={loading}
        className="md:col-span-2 py-3 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-black font-semibold"
      >
        {loading ? "Saving..." : "Add Address"}
      </button>

    </form>
  );
};

export default AddressForm;