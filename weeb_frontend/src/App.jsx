// IMPORT ROUTER //
import { BrowserRouter, Routes, Route } from "react-router-dom";

// IMPORT COMPOSANTS LAYOUT //
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// IMPORT PAGES //
import Accueil from "./pages/Accueil";
import Blog from "./pages/Blog";
import Article from "./pages/Article";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Joinnow from "./pages/Joinnow";
import Login from "./pages/Login";
import Motdepasse from "./pages/Motdepasse";

export default function App() {
  return (
    <BrowserRouter>

      {/* NAVIGATION */}
      <Navigation />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/joinnow" element={<Joinnow />} />
        <Route path="/login" element={<Login />} />
        <Route path="/motdepasse" element={<Motdepasse />} />
      </Routes>

      {/* FOOTER */}
      <Footer />

    </BrowserRouter>
  );
}
