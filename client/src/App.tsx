// Direção: Acervo Botânico Contemporâneo — a Home é a porta de entrada; categorias são páginas internas autônomas.
import { useLocation } from "wouter";
import Home, { CategoryPage, InfantilPage } from "./pages/Home";
import { galleryCategories } from "./galleryData";

export default function App() {
  const [location] = useLocation();
  const slug = location.replace(/^\/+/, "").split("?")[0];
  const category = galleryCategories.find((item) => item.slug === slug);
  if (slug === "infantil") return <InfantilPage />;
  return category ? <CategoryPage category={category} /> : <Home />;
}
