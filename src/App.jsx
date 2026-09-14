import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomePage from "./HomePage.jsx";
import WorkPage from "./WorkPage.jsx";
import NotFoundPage from "./NotFoundPage.jsx";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace("#", ""));
      const go = () => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView();
        else window.scrollTo(0, 0);
      };
      const t1 = requestAnimationFrame(go);
      const t2 = setTimeout(go, 80);
      return () => {
        cancelAnimationFrame(t1);
        clearTimeout(t2);
      };
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <ScrollManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}
