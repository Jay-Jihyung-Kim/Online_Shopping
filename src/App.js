import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./page/home";
import Login from "./page/login";
import Products from "./page/products";
import NotFound from "./page/404";
import ProductDetail from "./page/productDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products" element={<Products />} />
        <Route path="/account-login" element={<Login />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
