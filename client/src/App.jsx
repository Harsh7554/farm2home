import { Routes, Route, useLocation } from "react-router-dom";
import {Toaster} from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import ProductDetails from "./pages/ProductDetails";
import Orders from "./pages/Orders";

// Farmer
import Dashboard from "./pages/farmer/Dashboard";
import AddProduct from "./pages/farmer/AddProduct";
import MyProducts from "./pages/farmer/MyProducts";

// Admin
import AdminDashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/users";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";

import ProtectedRoute from "./routes/ProtectedRoute";
import Checkout from "./pages/Checkout";
import ProfilePage from "./pages/ProfilePage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminCategories from "./pages/admin/Categories";
import AdminSettings from "./pages/admin/Settings";
import PrivacyPolicy from "./pages/privacy";
import TermsAndConditions from "./pages/terms";


function App() {
  const location = useLocation();

  const isDashboard =
    location.pathname.startsWith("/farmer") ||
    location.pathname.startsWith("/admin");

  return (
    <div>
        <Toaster position="top-right"/>
      {/* ✅ Navbar only for user pages */}
      {!isDashboard && <Navbar />}

      {/* ✅ Conditional padding */}
      <div className={isDashboard ? "" : "p-4"}>
        <Routes>
          
          {/* Public */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/privacy" element={<PrivacyPolicy/>} />
          <Route path="/terms" element={<TermsAndConditions/>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/checkout" element={<Checkout/>}/>
          <Route path="/profile" element={<ProfilePage/>}/>
          {/* Protected */}
          <Route
            path="/cart"
            element={
              <ProtectedRoute>
                <Cart />
              </ProtectedRoute>
            }
          />

          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Farmer */}
          <Route
  path="/farmer"
  element={
    <ProtectedRoute role="farmer">
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/farmer/add-product"
  element={
    <ProtectedRoute role="farmer">
      <AddProduct />
    </ProtectedRoute>
  }
/>

<Route
  path="/farmer/my-products"
  element={
    <ProtectedRoute role="farmer">
      <MyProducts />
    </ProtectedRoute>
  }
/>

          {/* Admin */}
          <Route
  path="/admin"
  element={
    <ProtectedRoute role="admin">
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route index element={<AdminDashboard />} />
  
  <Route
    path="users"
    element={
      <ProtectedRoute role="admin">
        <Users />
      </ProtectedRoute>
    }
  />

  <Route
    path="orders"
    element={
      <ProtectedRoute role="admin">
        <Orders />
      </ProtectedRoute>
    }
  />

  <Route
    path="products"
    element={
      <ProtectedRoute role="admin">
        <AdminProducts />
      </ProtectedRoute>
    }
  />

    <Route
    path="categories"
    element={
      <ProtectedRoute role="admin">
        <AdminCategories />
      </ProtectedRoute>
    }
  />

    <Route
    path="settings"
    element={
      <ProtectedRoute role="admin">
        <AdminSettings />
      </ProtectedRoute>
    }
  />
</Route>         

        </Routes>
      </div>

      {/* ✅ Footer only for user pages */}
      {!isDashboard && <Footer />}

    </div>
  );
}

export default App;