import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Phone, ExternalLink, ArrowUp } from "lucide-react";
import { EagleFeatherLogo } from "./Logo";

// ── Crisis Banner ─────────────────────────────────────────────────────────────
export function CrisisBanner() {
  return (
    <div className="crisis-banner w-full py-2 px-4 text-center z-50" role="banner" aria-label="Crisis support">
      <p className="text-sm font-medium">
        <span className="font-bold mr-2">Need help right now?</span>
        <a href="tel:988" className="inline-flex items-center gap-1 underline font-bold mr-3 hover:opacity-80">
          <Phone className="w-3 h-3" /> 988
        </a>
        <a href="tel:18552423310" className="inline-flex items-center gap-1 underline font-bold mr-3 hover:opacity-80">
          <Phone className="w-3 h-3" /> Hope for Wellness: 1-855-242-3310
        </a>
        <Link href="/crisis" className="underline hover:opacity-80">All crisis supports →</Link>
      </p>
    </div>
  );
}

// ── Navbar ────────────────────────────────────────────────────────────────────
const navLinks = [
  { href: "/about", label: "About" },
  { href: "/browse", label: "Browse Resources" },
  { href: "/crisis", label: "Crisis Support" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();

  return (
    <nav className="bg-white border-b border-border sticky top-0 z-40 shadow-sm" role="navigation" aria-label="Main navigation">
      <div className="container flex items-center justify-between h-16 md:h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <EagleFeatherLogo className="w-11 h-11 md:w-12 md:h-12" />
          <span className="font-serif font-bold text-lg md:text-xl text-primary tracking-tight">EagleFeather</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors no-underline ${
                location === link.href
                  ? "text-primary border-b-2 border-primary pb-0.5"
                  : "text-foreground hover:text-primary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/submit"
            className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-md hover:opacity-90 transition-opacity no-underline"
          >
            Submit a Resource
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 rounded-md text-foreground hover:bg-muted"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-base font-medium py-1 no-underline ${
                location === link.href ? "text-primary" : "text-foreground"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/submit"
            className="bg-primary text-white text-sm font-semibold px-4 py-2 rounded-md text-center mt-2 no-underline"
            onClick={() => setOpen(false)}
          >
            Submit a Resource
          </Link>
        </div>
      )}
    </nav>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────
const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/browse", label: "Browse Resources" },
  { href: "/crisis", label: "Crisis Support" },
  { href: "/contact", label: "Contact" },
  { href: "/submit", label: "Submit a Resource" },
];

export function Footer() {
  return (
    <footer className="bg-[#0d2b26] text-white mt-16">
      <div className="container py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-3">
            <EagleFeatherLogo className="w-11 h-11" />
            <span className="font-serif font-bold text-lg">EagleFeather</span>
          </div>
          <p className="text-sm text-white/70 leading-relaxed">
            A health resource directory for First Nations peoples across Canada.
            Free, community-facing, and editorially independent.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-wider text-white/60 mb-3">Navigate</h3>
          <ul className="space-y-2 text-sm">
            {footerLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="text-white/80 hover:text-white no-underline transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Communities & Crisis */}
        <div>
          <h3 className="font-semibold text-sm uppercase tracking-wider text-white/60 mb-3">Other Communities</h3>
          <ul className="space-y-2 text-sm mb-4">
            <li>
              <a href="https://www.itk.ca" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white flex items-center gap-1 no-underline">
                <ExternalLink className="w-3 h-3" /> Inuit Tapiriit Kanatami (ITK)
              </a>
            </li>
            <li>
              <a href="https://www.metisnation.ca" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white flex items-center gap-1 no-underline">
                <ExternalLink className="w-3 h-3" /> Métis National Council
              </a>
            </li>
          </ul>
          <div className="crisis-banner rounded-md p-3 text-sm">
            <p className="font-semibold mb-1">Crisis support — 24/7</p>
            <a href="tel:988" className="flex items-center gap-1 text-white hover:opacity-80 font-bold">
              <Phone className="w-3 h-3" /> 988
            </a>
            <a href="tel:18552423310" className="flex items-center gap-1 text-white hover:opacity-80 text-xs mt-1">
              <Phone className="w-3 h-3" /> Hope for Wellness: 1-855-242-3310
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/40">
          <p>© {new Date().getFullYear()} EagleFeather.ca — A free health resource directory for First Nations peoples.</p>
          <p>No advertising. No affiliate links. No paid placements.</p>
        </div>
      </div>

      {/* Developed by Mentee */}
      <div className="py-4" style={{ backgroundColor: "oklch(0.95 0.012 178)" }}>
        <div className="container flex items-center justify-center gap-3">
          <span className="text-sm font-semibold" style={{ color: "oklch(0.30 0.04 178)" }}>Developed by</span>
          <a href="https://mentee.ca" target="_blank" rel="noopener noreferrer" className="no-underline">
            <img src="/mentee.png" alt="Mentee" className="h-7" />
          </a>
        </div>
      </div>
    </footer>
  );
}

// ── Scroll to Top ────────────────────────────────────────────────────────────
function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:opacity-90 transition-all ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

// ── Page Layout ───────────────────────────────────────────────────────────────
export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <CrisisBanner />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}
