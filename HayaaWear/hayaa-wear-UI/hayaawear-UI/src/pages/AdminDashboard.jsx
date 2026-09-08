import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-[#1a1a1a] via-[#2a1f1a] to-[#1a1a1a] text-yellow-100 flex">

      {/* SIDEBAR */}
      <div className="w-64 bg-black/80 backdrop-blur-xl border-r border-yellow-600/30 p-6 fixed h-full">

        {/* Logo */}
        <h2 className="text-2xl font-bold mb-10 text-transparent bg-gradient-to-r from-[#c9a227] via-[#f4e2a1] to-[#c9a227] bg-clip-text">
          Admin Panel
        </h2>

        {/* Admin Info */}
        <div className="mb-10 text-center">
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#c9a227] to-[#e6c76a] flex items-center justify-center text-black text-xl font-bold mx-auto">
            {user?.firstName?.charAt(0)}
          </div>
          <p className="mt-4">{user?.firstName}</p>
          <p className="text-xs text-yellow-400">{user?.role}</p>
        </div>

        {/* Navigation */}
        <div className="space-y-4">

          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `block p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-black"
                  : "hover:bg-yellow-600/20"
              }`
            }
          >
            📊 Dashboard
          </NavLink>

          {/* CATEGORY SECTION */}
          <NavLink
            to="/admin/add-category"
            className={({ isActive }) =>
              `block p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-black"
                  : "hover:bg-yellow-600/20"
              }`
            }
          >
            ➕ Add Category
          </NavLink>

          <NavLink
            to="/admin/add-subcategory"
            className={({ isActive }) =>
              `block p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-black"
                  : "hover:bg-yellow-600/20"
              }`
            }
          >
            ➕ Add SubCategory
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-black"
                  : "hover:bg-yellow-600/20"
              }`
            }
          >
            👥 Users
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `block p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-black"
                  : "hover:bg-yellow-600/20"
              }`
            }
          >
            🛍 Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `block p-3 rounded-xl transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#c9a227] to-[#e6c76a] text-black"
                  : "hover:bg-yellow-600/20"
              }`
            }
          >
            📦 Orders
          </NavLink>

        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="ml-64 flex-1 p-12">
        <Outlet />
      </div>

    </div>
  );
};

export default AdminDashboard;