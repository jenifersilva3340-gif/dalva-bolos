// Direção: Acervo Botânico Contemporâneo — Home objetiva, texto pessoal e páginas internas simples.
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { galleryCategories, type GalleryCategory } from "../galleryData";

// Logo solicitada pelo cliente: página-fonte https://ibb.co/ZR77xTDb.
const logo = "https://i.ibb.co/zWDDZfvt/Dalva-Bolos-1-removebg-preview.png";
const fallbackHero = "/manus-storage/dalva-hero-editorial_f840738a.jpg";
const fallbackDetail = "/manus-storage/dalva-detail-editorial_9528fb03.jpg";
const bannerTexture = "/site/fundosite.png";
const homeMoodboard = "/site/moodboardlogo.png";
const infantCover = "https://i.ibb.co/CKrwfzmR/ifen5.jpg";
const hiddenInfantSlugs = new Set(["infantil-masculino", "infantil-feminino", "temas-diversos-infantil"]);
const homeCategories: GalleryCategory[] = [...galleryCategories.filter((item) => !hiddenInfantSlugs.has(item.slug)), { slug: "infantil", title: "Infantil", cover: infantCover, highlights: [], small: [] }];

const categoryIntros: Record<string, string> = {
  flores: "Um pouco do que já fiz com flores e acabamentos.", debutante: "Trabalhos recentes para festas de debutante.", baby: "Bolos para os primeiros aniversários.", feminino: "Um pouco do que já fiz para elas.", masculinos: "Trabalhos para aniversários e encontros.", esportes: "Trabalhos recentes com temas de esporte.", casamentos: "Bolos que já fiz para casamentos.", religiosos: "Um pouco do que já fiz para celebrações religiosas.", comemorações: "Trabalhos recentes para comemorações.", conquistas: "Bolos para conquistas e formaturas.", boteco: "Um pouco do que já fiz com tema boteco.", "temas-rurais": "Trabalhos com temas do campo.",
};

type InfantTab = "meninas" | "meninos" | "temas-diversos";
const infantSource: Record<InfantTab, string> = { meninas: "infantil-feminino", meninos: "infantil-masculino", "temas-diversos": "temas-diversos-infantil" };

function SmartImage({ src, alt, className, fallback = fallbackDetail }: { src: string; alt: string; className?: string; fallback?: string }) {
  const [imageSrc, setImageSrc] = useState(src);
  return <img className={className} src={imageSrc} alt={alt} loading="lazy" decoding="async" onError={() => setImageSrc(fallback)} />;
}
function Logo({ compact = false }: { compact?: boolean }) { return <Link href="/" className={compact ? "site-logo compact" : "site-logo"} aria-label="Dalva Bolos — voltar à Home"><SmartImage src={logo} fallback={fallbackDetail} alt="Dalva Bolos" /></Link>; }
function HomeHeader() { return <header className="home-header" style={{ backgroundImage: `linear-gradient(90deg, rgba(244,240,232,.34), rgba(244,240,232,.06) 50%, rgba(244,240,232,.34)), url(${homeMoodboard})` }}><Logo /><div className="home-wordmark">Dalva Bolos<small>confeiteira</small></div><span className="header-edition">acervo autoral <i>·</i> 2026</span></header>; }
function CoverTile({ category, index }: { category: GalleryCategory; index: number }) { return <Link href={`/${category.slug}`} className={`cover-tile cover-${index % 5}`}><SmartImage src={category.cover} alt={`Capa da categoria ${category.title}`} fallback={index % 2 ? fallbackDetail : fallbackHero} /><span className="cover-wash" /><span className="cover-info"><span className="cover-number">{String(index + 1).padStart(2, "0")}</span><strong>{category.title}</strong><ArrowUpRight size={17} /></span></Link>; }

export default function Home() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return <div className="home-page"><HomeHeader /><main><section className="home-intro"><div className="home-intro-copy"><p className="eyebrow">Dalva Bolos · caderno de trabalhos</p><h1>Bem-vindo ao<br /><em>meu acervo.</em></h1><p className="home-description">Aqui eu reúno e guardo com carinho os trabalhos que marcaram a minha trajetória na confeitaria.</p><Link href="#colecoes" className="home-scroll"><ArrowDown size={15} /> ver as categorias</Link></div><div className="home-intro-note"><span className="hairline" /><p>Escolha uma capa<br />para entrar no acervo.</p></div></section><section id="colecoes" className="cover-index"><div className="index-heading"><div><p className="eyebrow">Índice visual <span className="hairline inline" /></p><h2>Escolha uma categoria</h2></div><p>As capas levam você para cada parte do meu trabalho.<br /><span className="index-count">{homeCategories.length} categorias no acervo</span></p></div><div className="cover-grid">{homeCategories.map((category, index) => <CoverTile key={category.slug} category={category} index={index} />)}</div></section></main><footer className="home-footer"><Logo compact /><p>Aqui estão alguns dos trabalhos que fiz.<br />Obrigada por olhar com calma.</p><span>Dalva Bolos · {new Date().getFullYear()}</span></footer></div>;
}

function GalleryPhoto({ src, label, featured, index, onOpen }: { src: string; label: string; featured: boolean; index: number; onOpen: () => void }) { return <figure className={`masonry-item ${featured ? "featured-item" : ""}`}><button className="photo-button" onClick={onOpen} aria-label={`Ampliar fotografia ${label}`}><SmartImage src={src} alt={`${label} — Dalva Bolos`} fallback={index % 3 === 0 ? fallbackHero : fallbackDetail} /><span className="photo-caption"><span>{String(index + 1).padStart(2, "0")}</span><span>{label}</span></span></button></figure>; }

export function CategoryPage({ category, infantTab, onSelectInfantTab }: { category: GalleryCategory; infantTab?: InfantTab; onSelectInfantTab?: (tab: InfantTab) => void }) {
  useEffect(() => { window.scrollTo(0, 0); }, [category, infantTab]);
  const selectedCategory = infantTab ? galleryCategories.find((item) => item.slug === infantSource[infantTab]) ?? category : category;
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const photos = useMemo(() => [...selectedCategory.highlights.map((src) => ({ src, featured: true })), ...selectedCategory.small.map((src) => ({ src, featured: false }))], [selectedCategory]);
  const categoryIndex = galleryCategories.findIndex((item) => item.slug === selectedCategory.slug);
  const previous = galleryCategories[(categoryIndex - 1 + galleryCategories.length) % galleryCategories.length];
  const next = galleryCategories[(categoryIndex + 1) % galleryCategories.length];
  const pageTitle = infantTab ? "Infantil" : category.title;

  useEffect(() => { const onKey = (event: KeyboardEvent) => { if (lightboxIndex === null) return; if (event.key === "Escape") setLightboxIndex(null); if (event.key === "ArrowRight") setLightboxIndex((lightboxIndex + 1) % photos.length); if (event.key === "ArrowLeft") setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length); }; window.addEventListener("keydown", onKey); document.body.style.overflow = lightboxIndex === null ? "" : "hidden"; return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; }; }, [lightboxIndex, photos.length]);

  return <div className={`category-page category-theme-${Math.max(categoryIndex, 0) % 6}`}><header className="category-header"><Logo /><Link href="/" className="back-link"><ArrowLeft size={15} /> voltar ao acervo</Link></header><main><section className="category-hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(244,240,232,.98) 0%, rgba(244,240,232,.76) 45%, rgba(244,240,232,.16) 100%), url(${bannerTexture})` }}><div className="category-hero-copy"><p className="eyebrow">{infantTab ? "Infantil" : `Categoria ${String(categoryIndex + 1).padStart(2, "0")}`} <span className="hairline inline" /></p><h1>{pageTitle}</h1><p>{infantTab ? categoryIntros[infantSource[infantTab]] : categoryIntros[category.slug] ?? "Um pouco do que já fiz."}</p></div><span className="category-count">{photos.length} registros<br />{String(Math.max(categoryIndex + 1, 1)).padStart(2, "0")} / {String(galleryCategories.length).padStart(2, "0")}</span></section>
  {infantTab && (
  <div className="infant-tabs" role="tablist" aria-label="Categorias infantis">
    <button type="button" className={infantTab === "meninas" ? "active" : ""} onClick={() => onSelectInfantTab?.("meninas")}>Meninas</button>
    <button type="button" className={infantTab === "meninos" ? "active" : ""} onClick={() => onSelectInfantTab?.("meninos")}>Meninos</button>
    <button type="button" className={infantTab === "temas-diversos" ? "active" : ""} onClick={() => onSelectInfantTab?.("temas-diversos")}>Temas Diversos</button>
  </div>
)}
  <section className="category-gallery"><div className="gallery-heading"><div><p className="eyebrow">Trabalhos recentes <span className="hairline inline" /></p><h2>{infantTab ? `Infantil · ${infantTab === "temas-diversos" ? "Temas Diversos" : infantTab[0].toUpperCase() + infantTab.slice(1)}` : "Um pouco do que já fiz"}</h2></div><p>Detalhes que gosto de lembrar. <em>— {pageTitle}</em></p></div><div className="masonry-grid">{photos.map((photo, index) => <GalleryPhoto key={`${selectedCategory.slug}-${index}-${photo.src}`} {...photo} index={index} label={pageTitle} onOpen={() => setLightboxIndex(index)} />)}</div></section><nav className="category-pagination" aria-label="Navegação entre categorias"><Link href={`/${previous.slug}`}><ArrowLeft size={15} /><span>anterior<small>{previous.title}</small></span></Link><Link href="/" className="pagination-center">índice</Link><Link href={`/${next.slug}`}><span>próxima<small>{next.title}</small></span><ArrowRight size={15} /></Link></nav></main><footer className="category-footer"><Logo compact /><span>Dalva Bolos · acervo autoral</span><Link href="/">voltar ao acervo ↑</Link></footer>
  {lightboxIndex !== null && (
  <div 
    className="lightbox" 
    role="dialog" 
    aria-modal="true" 
    aria-label="Imagem ampliada" 
    onClick={() => setLightboxIndex(null)}
  >
    <button 
      className="lightbox-close" 
      onClick={() => setLightboxIndex(null)} 
      aria-label="Fechar ampliação"
    >
      <X size={22} />
    </button>
    
    <button 
  type="button"
  className="lightbox-arrow left" 
  onClick={(e) => { 
    e.preventDefault(); 
    e.stopPropagation(); 
    setLightboxIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : 0)); 
  }} 
  aria-label="Imagem anterior"
>
  <ArrowLeft size={22} />
</button>

   <div className="lightbox-inner" onClick={(e) => e.stopPropagation()}>
  <SmartImage key={photos[lightboxIndex].src} src={photos[lightboxIndex].src} fallback={fallbackDetail} alt={`${pageTitle} — imagem ampliada`} />
      <div className="lightbox-meta">
        <span>{String(lightboxIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}</span>
        <span>{pageTitle}</span>
      </div>
    </div>

    <button 
      type="button"
      className="lightbox-arrow right" 
      onClick={(e) => { 
        e.preventDefault(); 
        e.stopPropagation(); 
        setLightboxIndex((prev) => (prev !== null ? (prev + 1) % photos.length : 0)); 
      }} 
      aria-label="Próxima imagem"
    >
      <ArrowRight size={22} />
    </button>
  </div>
)}
</div>;
}

export function InfantilPage() {
  const [tab, setTab] = useState<InfantTab>("meninas");
  const base = galleryCategories.find((item) => item.slug === "infantil-feminino")!;
  
  return (
    <CategoryPage 
      category={base} 
      infantTab={tab} 
      onSelectInfantTab={(newTab) => {
        setTab(newTab);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }} 
    />
  );
}