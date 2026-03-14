import { useState } from "react";
import { useSearch } from "wouter";
import { Search, Filter, Feather, Brain, Stethoscope, HeartHandshake, Baby, Users, Star, Heart } from "lucide-react";
import { PageLayout } from "@/components/Layout";
import { ResourceCard } from "@/components/ResourceCard";
import { MOCK_CATEGORIES, getFilteredResources } from "@/lib/mockData";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "mental-health":    <Brain className="w-4 h-4" />,
  "physical-health":  <Stethoscope className="w-4 h-4" />,
  "substance-use":    <HeartHandshake className="w-4 h-4" />,
  "maternal-child":   <Baby className="w-4 h-4" />,
  "elders":           <Users className="w-4 h-4" />,
  "cultural-wellness":<Feather className="w-4 h-4" />,
  "youth":            <Star className="w-4 h-4" />,
  "womens-health":    <Heart className="w-4 h-4" />,
};

const PROVINCES = [
  { code: "", label: "All regions" },
  { code: "National", label: "National" },
  { code: "AB", label: "Alberta" },
  { code: "BC", label: "British Columbia" },
  { code: "MB", label: "Manitoba" },
  { code: "NB", label: "New Brunswick" },
  { code: "NL", label: "Newfoundland & Labrador" },
  { code: "NS", label: "Nova Scotia" },
  { code: "NT", label: "Northwest Territories" },
  { code: "NU", label: "Nunavut" },
  { code: "ON", label: "Ontario" },
  { code: "PE", label: "Prince Edward Island" },
  { code: "QC", label: "Quebec" },
  { code: "SK", label: "Saskatchewan" },
  { code: "YT", label: "Yukon" },
];

export default function Categories() {
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const initialCat = params.get("cat") ?? "";
  const initialSearch = params.get("search") ?? "";

  const [selectedCat, setSelectedCat] = useState(initialCat);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [inputValue, setInputValue] = useState(initialSearch);

  const categories = MOCK_CATEGORIES;
  const activeCatObj = categories.find(c => c.slug === selectedCat);

  const resources = getFilteredResources({
    categoryId: activeCatObj?.id,
    province: selectedProvince || undefined,
    search: searchQuery || undefined,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(inputValue);
  };

  return (
    <PageLayout>
      {/* Header */}
      <div className="bg-white border-b border-border py-8">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-1">Health Resources</p>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-4">Browse by Topic</h1>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-lg mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search resources..."
                className="w-full border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                aria-label="Search resources"
              />
            </div>
            <button type="submit" className="bg-primary text-white font-semibold px-4 py-2.5 rounded-lg text-sm hover:opacity-90">
              Search
            </button>
          </form>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by health category">
            <button
              onClick={() => setSelectedCat("")}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCat === ""
                  ? "bg-primary text-white"
                  : "bg-muted text-foreground hover:bg-muted/80"
              }`}
            >
              All topics
            </button>
            {categories.map(cat => (
              <button
                key={cat.slug}
                onClick={() => setSelectedCat(selectedCat === cat.slug ? "" : cat.slug)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedCat === cat.slug
                    ? "text-white"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
                style={selectedCat === cat.slug ? { backgroundColor: cat.color } : {}}
                aria-pressed={selectedCat === cat.slug}
              >
                {CATEGORY_ICONS[cat.slug]}
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters */}
          <aside className="lg:w-56 shrink-0">
            <div className="bg-white rounded-xl border border-border p-4 sticky top-24">
              <h2 className="font-semibold text-sm flex items-center gap-2 mb-3">
                <Filter className="w-4 h-4" /> Filter by region
              </h2>
              <div className="space-y-1">
                {PROVINCES.map(p => (
                  <button
                    key={p.code}
                    onClick={() => setSelectedProvince(p.code)}
                    className={`w-full text-left px-2 py-1.5 rounded text-sm transition-colors ${
                      selectedProvince === p.code
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Resource grid */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-muted-foreground">
                {`${resources.length} resource${resources.length !== 1 ? "s" : ""} found`}
                {activeCatObj ? ` in ${activeCatObj.name}` : ""}
                {selectedProvince ? ` · ${PROVINCES.find(p => p.code === selectedProvince)?.label}` : ""}
              </p>
            </div>

            {resources.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground">
                <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No resources found</p>
                <p className="text-sm mt-1">Try adjusting your filters or search terms.</p>
              </div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {resources.map(resource => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
