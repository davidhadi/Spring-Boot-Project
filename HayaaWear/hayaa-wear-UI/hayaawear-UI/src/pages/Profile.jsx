import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Profile = () => {

  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    pincode: ""
  });

  useEffect(() => {
    if (!user) navigate("/login");
    else fetchAddresses();
  }, [user]);

  const fetchAddresses = async () => {
  try {
    const res = await API.get("/api/addresses/my");
    console.log("ADDRESS RESPONSE:", res.data);
    setAddresses(res.data);
  } catch (err) {
    console.error(err);
  }
};

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/addresses/${id}`);
      fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/api/addresses", formData);
      setFormData({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        pincode: ""
      });
      setShowForm(false);
      fetchAddresses();
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a1a] via-[#2a1f1a] to-[#1a1a1a] pt-28 px-6 text-yellow-100">

      <div className="max-w-4xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-black/70 backdrop-blur-2xl rounded-3xl p-10 border border-yellow-600/30 shadow-[0_0_50px_rgba(212,175,55,0.3)]"
        >

          <h2 className="text-3xl text-center font-bold mb-10 text-transparent bg-gradient-to-r from-[#c9a227] via-[#f4e2a1] to-[#c9a227] bg-clip-text">
            Your Profile
          </h2>

          {/* USER INFO */}
          <div className="space-y-6 mb-10">

            <div className="flex justify-between border-b border-yellow-600/20 pb-3">
              <span className="text-yellow-300">Full Name</span>
              <span>{user.firstName} {user.lastName}</span>
            </div>

            <div className="flex justify-between border-b border-yellow-600/20 pb-3">
              <span className="text-yellow-300">Email</span>
              <span>{user.email}</span>
            </div>

            <div className="flex justify-between border-b border-yellow-600/20 pb-3">
              <span className="text-yellow-300">Contact</span>
              <span>{user.mobile}</span>
            </div>

            <div className="flex justify-between pb-3">
              <span className="text-yellow-300">Role</span>
              <span className="px-4 py-1 rounded-full bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-black text-sm font-semibold">
                {user.role}
              </span>
            </div>

          </div>

          {/* ADDRESS SECTION */}
          <div className="mt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">My Addresses</h3>

              <button
                onClick={() => setShowForm(!showForm)}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-black text-sm font-semibold"
              >
                {showForm ? "Cancel" : "Add Address"}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 mb-6">
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
                  className="md:col-span-2 py-3 rounded-lg bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-black font-semibold"
                >
                  Save Address
                </button>
              </form>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {addresses.map(addr => (
                <div
                  key={addr.id}
                  className="p-4 bg-black/60 border border-yellow-600/30 rounded-xl"
                >
                  <p className="font-semibold">{addr.name}</p>
                  <p>{addr.phone}</p>
                  <p>{addr.street}</p>
                  <p>{addr.city}, {addr.state}</p>
                  <p>{addr.pincode}</p>

                  <button
                    onClick={() => handleDelete(addr.id)}
                    className="mt-3 text-red-400 hover:text-red-600 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* LOGOUT */}
          <div className="mt-12 text-center">
            <button
              onClick={() => {
                logout();
                navigate("/login");
              }}
              className="px-10 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-400 text-white font-semibold hover:scale-105 transition-all duration-300"
            >
              Logout
            </button>
          </div>

        </motion.div>

      </div>

    </div>
  );
};

export default Profile;