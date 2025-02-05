import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details.jsx";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";
import './App.css'

export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/details/:id" element={<Details />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}
