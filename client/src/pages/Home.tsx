import { useState } from "react";
import { useLocation } from "wouter";
import { Search, Phone, MapPin, ChevronRight, Feather, Brain, Stethoscope, HeartHandshake, Baby, Users, Star, Heart } from "lucide-react";
import { PageLayout } from "@/components/Layout";
import { trpc } from "@/lib/trpc";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "mental-health":    <Brain className="w-6 h-6" />,
  "physical-health":  <Stethoscope className="w-6 h-6" />,
  "substance-use":    <HeartHandshake className="w-6 h-6" />,
  "maternal-child":   <Baby className="w-6 h-6" />,
  "elders":           <Users className="w-6 h-6" />,
  "cultural-wellness":<Feather className="w-6 h-6" />,
  "youth":            <Star className="w-6 h-6" />,
  "womens-health":    <Heart className="w-6 h-6" />,
};

const PROVINCES = [
  "National", "AB", "BC", "MB", "NB", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"
];
const PROVINCE_NAMES: Record<string, string> = {
  National: "All of Canada", AB: "Alberta", BC: "British Columbia", MB: "Manitoba",
  NB: "New Brunswick", NL: "Newfoundland & Labrador", NS: "Nova Scotia",
  NT: "Northwest Territories", NU: "Nunavut", ON: "Ontario",
  PE: "Prince Edward Island", QC: "Quebec", SK: "Saskatchewan", YT: "Yukon",
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [, navigate] = useLocation();

  const { data: categories = [] } = trpc.categories.list.useQuery();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <PageLayout>
      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-[#0d2b26] to-[#0A6E60] text-white py-16 md:py-24">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-3">
              First Nations Health Resources — Canada
            </p>
            <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4">
              Find health support that{" "}
              <span className="italic text-[#f5c07a]">understands you</span>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              A free, verified directory of health resources for First Nations peoples across all 13 provinces and territories.
              Every resource is checked by a real person before it's listed.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                <input
                  type="search"
                  placeholder="Search for a resource, topic, or service..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg pl-9 pr-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/40 text-sm"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  aria-label="Search health resources"
                />
              </div>
              <button
                type="submit"
                className="bg-[#B8620A] hover:bg-[#9a5009] text-white font-semibold px-5 py-3 rounded-lg transition-colors text-sm"
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ── Crisis callout ────────────────────────────────────────────────────── */}
      <section className="bg-red-900 text-white py-6">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="font-serif text-xl font-bold mb-1">Need to talk to someone right now?</h2>
              <p className="text-white/80 text-sm">Free, confidential, available 24 hours a day.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:988"
                className="flex items-center gap-2 bg-white text-red-900 font-bold px-5 py-3 rounded-lg text-lg hover:bg-red-50 transition-colors"
                aria-label="Call 988 crisis line"
              >
                <Phone className="w-5 h-5" /> 988
              </a>
              <a
                href="tel:18552423310"
                className="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-5 py-3 rounded-lg hover:bg-white/20 transition-colors text-sm"
                aria-label="Call Hope for Wellness Help Line"
              >
                <Phone className="w-4 h-4" /> Hope for Wellness: 1-855-242-3310
              </a>
              <a
                href="tel:18005888717"
                className="flex items-center gap-2 bg-white/10 border border-white/30 text-white font-semibold px-5 py-3 rounded-lg hover:bg-white/20 transition-colors text-sm"
                aria-label="Call KUU-US Crisis Line"
              >
                <Phone className="w-4 h-4" /> KUU-US (BC/YT): 1-800-588-8717
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Category cards ────────────────────────────────────────────────────── */}
      <section className="py-14 container">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2">Browse by Topic</p>
          <h2 className="font-serif text-3xl font-bold text-foreground">Find support by health area</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map(cat => (
            <a
              key={cat.id}
              href={`/browse?topic=${cat.slug}`}
              className="group bg-white rounded-xl border border-border p-5 hover:shadow-md transition-all hover:border-primary/30 no-underline flex flex-col gap-3"
              aria-label={`Browse ${cat.name} resources`}
            >
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                style={{ backgroundColor: cat.color }}
              >
                {CATEGORY_ICONS[cat.slug] ?? <Feather className="w-5 h-5" />}
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors leading-tight">
                  {cat.name}
                </h3>
                {cat.description && (
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{cat.description}</p>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-primary font-medium mt-auto">
                View resources <ChevronRight className="w-3 h-3" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ── Province filter ───────────────────────────────────────────────────── */}
      <section className="bg-muted py-12">
        <div className="container">
          <div className="mb-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2">Browse by Region</p>
            <h2 className="font-serif text-3xl font-bold text-foreground">Find resources near you</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2">
            {PROVINCES.map(code => (
              <a
                key={code}
                href={`/browse?region=${code}`}
                className="bg-white border border-border rounded-lg px-3 py-2.5 text-center hover:border-primary hover:bg-primary/5 transition-all no-underline group"
              >
                <div className="flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3 text-muted-foreground group-hover:text-primary" />
                  <span className="text-xs font-bold text-foreground group-hover:text-primary">{code}</span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5 leading-tight">{PROVINCE_NAMES[code]}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── About / trust ─────────────────────────────────────────────────────── */}
      <section className="py-14 container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2">About EagleFeather</p>
            <h2 className="font-serif text-3xl font-bold mb-4">Built for community. Verified by people.</h2>
            <p className="text-base text-foreground/80 leading-relaxed mb-4">
              EagleFeather.ca is a free, publicly accessible health resource directory for First Nations peoples across Canada.
              Every resource is verified by a real person before it's listed — no automated scraping, no paid placements.
            </p>
            <p className="text-base text-foreground/80 leading-relaxed mb-6">
              We focus specifically on First Nations peoples. We respectfully acknowledge that Inuit and Métis peoples
              have their own dedicated organizations — links to those communities are in our footer.
            </p>
            <div className="flex gap-4">
              <a href="/about" className="bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm no-underline">
                Learn more
              </a>
              <a href="/submit" className="border border-primary text-primary font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/5 transition-colors text-sm no-underline">
                Submit a resource
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "99+", label: "Verified resources" },
              { num: "8", label: "Health categories" },
              { num: "13", label: "Provinces & territories" },
              { num: "100%", label: "Free, no advertising" },
            ].map(stat => (
              <div key={stat.label} className="bg-white rounded-xl border border-border p-5 text-center">
                <div className="font-serif text-3xl font-bold text-primary mb-1">{stat.num}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Land Acknowledgement ──────────────────────────────────────────────── */}
      <section className="bg-[#0d2b26] text-white py-12">
        <div className="container max-w-3xl text-center">
          <Feather className="w-8 h-8 text-[#f5c07a] mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-4">Land Acknowledgement</h2>
          <p className="text-white/80 leading-relaxed text-base">
            EagleFeather.ca was created to serve First Nations peoples across the lands now called Canada —
            lands that have been home to Indigenous peoples since time immemorial.
            We acknowledge the sovereignty of all First Nations whose territories span this country,
            and we recognize that access to health and wellness is a right, not a privilege.
            This directory is offered in a spirit of respect, solidarity, and service.
          </p>
          <p className="text-white/50 text-sm mt-4 italic">
            We are committed to working with First Nations advisors to refine this acknowledgement
            to reflect the national scope of this site.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
