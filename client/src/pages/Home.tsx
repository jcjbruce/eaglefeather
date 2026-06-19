import { useState } from "react";
import { useLocation } from "wouter";
import { Search, Phone, MapPin, ChevronRight, Feather, Brain, Stethoscope, HeartHandshake, Baby, Users, Star, Heart, Building2, ShieldCheck, Scale, ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/Layout";
import { MOCK_CATEGORIES, MOCK_RESOURCES } from "@/lib/mockData";
import { EagleFeatherLogo } from "@/components/Logo";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "community-health": <Building2 className="w-6 h-6" />,
  "cultural-wellness":<Feather className="w-6 h-6" />,
  "maternal-child":   <Baby className="w-6 h-6" />,
  "mental-health":    <Brain className="w-6 h-6" />,
  "nihb-benefits":    <ShieldCheck className="w-6 h-6" />,
  "physical-health":  <Stethoscope className="w-6 h-6" />,
  "policy-advocacy":  <Scale className="w-6 h-6" />,
  "substance-use":    <HeartHandshake className="w-6 h-6" />,
  "womens-health":    <Heart className="w-6 h-6" />,
  "youth":            <Star className="w-6 h-6" />,
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

  const categories = [...MOCK_CATEGORIES].sort((a, b) => a.name.localeCompare(b.name));
  const totalResources = MOCK_RESOURCES.filter(r => r.isPublished).length;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/browse?search=${encodeURIComponent(searchQuery.trim())}`);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-white border-b border-border py-16 md:py-24">
        <div className="container">
          <div className="flex items-center gap-10 md:gap-16 lg:gap-24">
            <div className="flex-1 max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#D4A843] mb-3">
                First Nations Health Resources — Canada
              </p>
              <h1 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-4 text-[#0d2b26]">
                Find health support that{" "}
                <span className="italic text-primary">understands you</span>
              </h1>
              <p className="text-lg text-foreground/70 leading-relaxed mb-8">
                A free directory of {totalResources}+ health resources for First Nations peoples across all 13 provinces and territories.
                No advertising. No paid placements.
              </p>

              {/* Search bar */}
              <form onSubmit={handleSearch} className="flex gap-2 max-w-xl">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="Search for a resource, topic, or service..."
                    className="w-full border border-border rounded-lg pl-9 pr-4 py-3 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 text-sm"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    aria-label="Search health resources"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold px-5 py-3 rounded-lg transition-colors text-sm"
                >
                  Search
                </button>
              </form>

              <a href="/browse" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium mt-4 transition-colors no-underline">
                Or browse all resources <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Hero logo */}
            <div className="hidden md:flex items-center justify-center shrink-0">
              <EagleFeatherLogo className="w-64 h-64 lg:w-80 lg:h-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Crisis callout */}
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

      {/* Category cards */}
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

      {/* Province filter */}
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

      {/* About / trust */}
      <section className="py-14 container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-2">About EagleFeather</p>
            <h2 className="font-serif text-3xl font-bold mb-4">Built for community. Open to all.</h2>
            <p className="text-base text-foreground/80 leading-relaxed mb-4">
              EagleFeather.ca is a free, publicly accessible health resource directory for First Nations peoples across Canada.
              No advertising, no paid placements — just a curated collection of health supports.
            </p>
            <p className="text-base text-foreground/80 leading-relaxed mb-6">
              We focus specifically on First Nations peoples. We respectfully acknowledge that Inuit and Metis peoples
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
              { num: `${totalResources}+`, label: "Health resources" },
              { num: `${categories.length}`, label: "Health categories" },
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

      {/* Land Acknowledgement */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="max-w-4xl mx-auto relative rounded-2xl border border-border bg-white p-8 sm:p-12 lg:p-14 shadow-sm overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-[#0d2b26] to-primary" />
            <div className="text-center">
              <div className="flex items-center gap-3 mb-6 justify-center">
                <EagleFeatherLogo className="w-9 h-10 sm:w-11 sm:h-12" />
                <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-primary uppercase">Land Acknowledgement</span>
              </div>
              <p className="text-foreground/70 leading-[2] text-sm sm:text-base italic max-w-3xl mx-auto">
                This directory was created to serve First Nations peoples across the lands now called Canada —
                lands that have been home to Indigenous peoples since time immemorial.
                We acknowledge the sovereignty of all First Nations whose territories span this country,
                and we recognize that access to health and wellness is a right, not a privilege.
                This directory is offered in a spirit of respect, solidarity, and service.
              </p>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
