import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Medicamentos from "./pages/Medicamentos";
import Retirada from "./pages/Retirada";

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: "10px", backgroundColor: "#2563eb", color: "white" }}>
        <Link to="/" style={{ marginRight: 15, color: "white", textDecoration: "none" }}>Dashboard</Link>
        <Link to="/medicamentos" style={{ marginRight: 15, color: "white", textDecoration: "none" }}>Medicamentos</Link>
        <Link to="/retirada" style={{ color: "white", textDecoration: "none" }}>Retirada</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/medicamentos" element={<Medicamentos />} />
        <Route path="/retirada" element={<Retirada />} />
      </Routes>
    </BrowserRouter>
  );
}