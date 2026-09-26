import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import SellerDashboard from "./pages/SellerDashboard";
import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./admin/Dashboard";
import Categories from "./admin/Categories";
import Orders from "./admin/Orders";
import Products from "./admin/Products";
import Users from "./admin/Users";
import AddProduct from "./pages/AddProduct";
import SellerProducts from "./pages/SellerProducts";
import AdminProducts from "./admin/AdminProducts";
import SellerOrders from "./pages/SellerOrders";
import Shop from "./pages/shop/Shop";
import ProductDetail from "./pages/shop/ProductDetail";
import AdminAddCategory from "./admin/AdminAddCategory";
import AdminAddSubCategory from "./admin/AdminAddSubCategory";
import CartPage from "./pages/shop/CartPage";
import About from "./components/About";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/about" element={<About />} />
        <Route
  path="/profile"
  element={
    <ProtectedRoute allowedRoles={["CUSTOMER", "ADMIN", "SELLER"]}>
      <Profile />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminDashboard />
    </ProtectedRoute>
  }
>
  <Route index element={<Dashboard />} />
  <Route path="categories" element={<Categories />} />
  <Route path="add-category" element={<AdminAddCategory />} />
  <Route path="add-subcategory" element={<AdminAddSubCategory />} />
  <Route path="users" element={<Users />} />
  <Route path="products" element={<Products />} />
  <Route path="orders" element={<Orders />} />
</Route>

<Route path="/shop" element={<Shop />} />
<Route path="/product/:id" element={<ProductDetail />} />


<Route
  path="/seller"
  element={
    <ProtectedRoute allowedRoles={["SELLER"]}>
      <SellerDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/seller/orders"
  element={
    <ProtectedRoute allowedRoles={["SELLER"]}>
      <SellerOrders />
    </ProtectedRoute>
  }
/>

<Route
  path="/seller/products/add"
  element={
    <ProtectedRoute allowedRoles={["SELLER"]}>
      <AddProduct />
    </ProtectedRoute>
  }
/>

<Route
  path="/seller/products"
  element={
    <ProtectedRoute allowedRoles={["SELLER"]}>
      <SellerProducts />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/products"
  element={
    <ProtectedRoute allowedRoles={["ADMIN"]}>
      <AdminProducts />
    </ProtectedRoute>
  }
/>

<Route path="*" element={<NotFound />} />

      </Routes>
      <Footer />
    </Router>

  );
}

export default App;
