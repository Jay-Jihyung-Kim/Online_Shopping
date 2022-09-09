import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Home from "./page/home";
import Login from "./page/login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/account-login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
