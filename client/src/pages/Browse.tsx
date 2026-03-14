import { useState, useMemo, useEffect } from "react";
import { useSearch, useLocation } from "wouter";
import {
  MapPin, Globe, Building2, Mountain, ChevronRight, Search, Feather,
  Brain, Stethoscope, HeartHandshake, Baby, Users, Star, Heart, LayoutGrid
} from "lucide-react";
import { PageLayout } from "@/components/Layout";
import { ResourceCard } from "@/components/ResourceCard";
import { MOCK_CATEGORIES, getFilteredResources, getCrossCountsByProvinceAndCategory } from "@/lib/mockData";

// Constants

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "mental-health":     <Brain className="w-4 h-4" />,
  "physical-health":   <Stethoscope className="w-4 h-4" />,
  "substance-use":     <HeartHandshake className="w-4 h-4" />,
  "maternal-child":    <Baby className="w-4 h-4" />,
  "elders":            <Users className="w-4 h-4" />,
  "cultural-wellness": <Feather className="w-4 h-4" />,
  "youth":             <Star className="w-4 h-4" />,
  "womens-health":     <Heart className="w-4 h-4" />,
};

const JURISDICTIONS = [
  { code: "National", name: "National Resources", shortName: "National", type: "national", description: "Organizations that serve First Nations peoples across all of Canada." },
  { code: "AB", name: "Alberta", shortName: "Alberta", type: "province" },
  { code: "BC", name: "British Columbia", shortName: "B.C.", type: "province" },
  { code: "MB", name: "Manitoba", shortName: "Manitoba", type: "province" },
  { code: "NB", name: "New Brunswick", shortName: "N.B.", type: "province" },
  { code: "NL", name: "Newfoundland & Labrador", shortName: "N.L.", type: "province" },
  { code: "NS", name: "Nova Scotia", shortName: "N.S.", type: "province" },
  { code: "ON", name: "Ontario", shortName: "Ontario", type: "province" },
  { code: "PE", name: "Prince Edward Island", shortName: "P.E.I.", type: "province" },
  { code: "QC", name: "Quebec", shortName: "Quebec", type: "province" },
  { code: "SK", name: "Saskatchewan", shortName: "Sask.", type: "province" },
  { code: "NT", name: "Northwest Territories", shortName: "N.W.T.", type: "territory" },
  { code: "NU", name: "Nunavut", shortName: "Nunavut", type: "territory" },
  { code: "YT", name: "Yukon", shortName: "Yukon", type: "territory" },
];

// Component

export default function Browse() {
  const searchParams = useSearch();
  const [, navigate] = useLocation();
  const params = new URLSearchParams(searchParams);

  // Read initial state from URL
  const initialTopic = params.get("topic") ?? "";
  const initialRegion = params.get("region") ?? "";
  const initialSearch = params.get("search") ?? "";

  const [selectedTopic, setSelectedTopic] = useState(initialTopic);
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [submittedSearch, setSubmittedSearch] = useState(initialSearch);

  // Static data
  const allCategories = MOCK_CATEGORIES;
  const crossCounts = useMemo(() => getCrossCountsByProvinceAndCategory(), []);

  // Find the category ID for the selected topic slug
  const selectedCategoryId = useMemo(() => {
    if (!selectedTopic) return undefined;
    const cat = allCategories.find(c => c.slug === selectedTopic);
    return cat?.id;
  }, [selectedTopic, allCategories]);

  // Fetch resources based on current filters
  const resources = useMemo(() => getFilteredResources({
    categoryId: selectedCategoryId,
    province: selectedRegion || undefined,
    search: submittedSearch || undefined,
  }), [selectedCategoryId, selectedRegion, submittedSearch]);

  // Compute dynamic province counts based on selected topic
  const provinceCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const entry of crossCounts) {
      if (!selectedCategoryId || entry.categoryId === selectedCategoryId) {
        counts[entry.province] = (counts[entry.province] || 0) + entry.count;
      }
    }
    return counts;
  }, [crossCounts, selectedCategoryId]);

  // Compute topic counts based on selected region
  const topicCounts = useMemo(() => {
    const counts: Record<number, number> = {};
    for (const entry of crossCounts) {
      if (!selectedRegion || entry.province === selectedRegion) {
        counts[entry.categoryId] = (counts[entry.categoryId] || 0) + entry.count;
      }
    }
    return counts;
  }, [crossCounts, selectedRegion]);

  // Total count for "All Topics"
  const totalForRegion = useMemo(() => {
    return Object.values(topicCounts).reduce((a, b) => a + b, 0);
  }, [topicCounts]);

  // Update URL when filters change
  useEffect(() => {
    const p = new URLSearchParams();
    if (selectedTopic) p.set("topic", selectedTopic);
    if (selectedRegion) p.set("region", selectedRegion);
    if (submittedSearch) p.set("search", submittedSearch);
    const qs = p.toString();
    navigate(`/browse${qs ? `?${qs}` : ""}`, { replace: true });
  }, [selectedTopic, selectedRegion, submittedSearch, navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedSearch(searchQuery.trim());
  };

  const clearFilters = () => {
    setSelectedTopic("");
    setSelectedRegion("");
    setSearchQuery("");
    setSubmittedSearch("");
  };

  const hasFilters = selectedTopic || selectedRegion || submittedSearch;

  const getCount = (code: string) => provinceCounts[code] || 0;

  return (
    <PageLayout>
      {/* Page header */}
      <div className="bg-white border-b border-border py-8">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-1">Health Resources</p>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Browse Resources</h1>
          <p className="text-muted-foreground text-base max-w-2xl">
            Filter by health topic and region to find the resources you need.
            Counts update as you filter so you always know what's available.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex gap-2 max-w-xl mt-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search by name, organization, or keyword..."
                className="w-full border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search resources"
              />
            </div>
            <button
              type="submit"
              className="bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left sidebar: Region filter */}
          <aside className="lg:w-72 shrink-0">
            <div className="bg-white rounded-xl border border-border overflow-hidden lg:sticky lg:top-24">
              <div className="px-4 py-3 bg-muted/30 border-b border-border">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Filter by Region</span>
              </div>

              {/* All regions */}
              <button
                onClick={() => setSelectedRegion("")}
                className={`w-full text-left px-4 py-2.5 transition-colors flex items-center gap-2 border-b border-border ${
                  !selectedRegion ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
                }`}
              >
                <LayoutGrid className="w-4 h-4 shrink-0" />
                <span className="text-sm flex-1">All Regions</span>
              </button>

              {/* National */}
              <button
                onClick={() => setSelectedRegion("National")}
                className={`w-full text-left px-4 py-2.5 transition-colors flex items-center gap-2 border-b border-border ${
                  selectedRegion === "National" ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
                }`}
              >
                <Globe className="w-4 h-4 shrink-0" />
                <span className="text-sm flex-1">National</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  getCount("National") > 0 ? "bg-primary/10 text-primary" : "bg-muted/50 text-muted-foreground"
                }`}>
                  {getCount("National")}
                </span>
              </button>

              {/* Provinces */}
              <div className="px-4 py-1.5 bg-muted/20 border-b border-border">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Building2 className="w-3 h-3" /> Provinces
                </span>
              </div>
              {JURISDICTIONS.filter(j => j.type === "province").map(j => (
                <button
                  key={j.code}
                  onClick={() => setSelectedRegion(j.code)}
                  className={`w-full text-left px-4 py-2 transition-colors flex items-center gap-2 border-b border-border/50 ${
                    selectedRegion === j.code ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
                  }`}
                >
                  <span className="text-sm flex-1">{j.name}</span>
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[24px] text-center ${
                    getCount(j.code) > 0 ? "bg-muted text-foreground" : "bg-muted/50 text-muted-foreground"
                  }`}>
                    {getCount(j.code)}
                  </span>
                </button>
              ))}

              {/* Territories */}
              <div className="px-4 py-1.5 bg-muted/20 border-b border-border">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1">
                  <Mountain className="w-3 h-3" /> Territories
                </span>
              </div>
              {JURISDICTIONS.filter(j => j.type === "territory").map(j => (
                <button
                  key={j.code}
                  onClick={() => setSelectedRegion(j.code)}
                  className={`w-full text-left px-4 py-2 transition-colors flex items-center gap-2 border-b border-border/50 last:border-b-0 ${
                    selectedRegion === j.code ? "bg-primary/10 text-primary font-semibold" : "hover:bg-muted"
                  }`}
                >
                  <span className="text-sm flex-1">{j.name}</span>
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[24px] text-center ${
                    getCount(j.code) > 0 ? "bg-muted text-foreground" : "bg-muted/50 text-muted-foreground"
                  }`}>
                    {getCount(j.code)}
                  </span>
                </button>
              ))}
            </div>
          </aside>

          {/* Main content area */}
          <div className="flex-1 min-w-0">

            {/* Topic pills */}
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setSelectedTopic("")}
                className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-colors ${
                  !selectedTopic ? "bg-primary text-white shadow-sm" : "bg-white border border-border text-foreground hover:bg-muted"
                }`}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                All Topics
                <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                  !selectedTopic ? "bg-white/20" : "bg-muted"
                }`}>
                  {totalForRegion}
                </span>
              </button>
              {allCategories.map(cat => {
                const count = topicCounts[cat.id] || 0;
                const isActive = selectedTopic === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedTopic(isActive ? "" : cat.slug)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-colors ${
                      isActive
                        ? "text-white shadow-sm"
                        : count > 0
                          ? "bg-white border border-border text-foreground hover:bg-muted"
                          : "bg-muted/50 border border-border/50 text-muted-foreground"
                    }`}
                    style={isActive ? { backgroundColor: cat.color } : undefined}
                  >
                    {CATEGORY_ICONS[cat.slug] ?? <Feather className="w-3.5 h-3.5" />}
                    {cat.name}
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? "bg-white/20" : "bg-muted"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active filters summary */}
            {hasFilters && (
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <span>Showing:</span>
                {selectedTopic && (
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                    {allCategories.find(c => c.slug === selectedTopic)?.name}
                  </span>
                )}
                {selectedRegion && (
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                    {JURISDICTIONS.find(j => j.code === selectedRegion)?.name ?? selectedRegion}
                  </span>
                )}
                {submittedSearch && (
                  <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs font-medium">
                    "{submittedSearch}"
                  </span>
                )}
                <button onClick={clearFilters} className="text-xs text-primary underline ml-2">
                  Clear all
                </button>
              </div>
            )}

            {/* Results count */}
            <p className="text-sm text-muted-foreground mb-4">
              {resources.length} resource{resources.length !== 1 ? "s" : ""} found
            </p>

            {/* Resource grid */}
            {resources.length === 0 ? (
              <div className="text-center py-16 text-muted-foreground bg-white rounded-xl border border-border">
                <Search className="w-10 h-10 mx-auto mb-3 opacity-20" />
                <p className="font-medium text-foreground">No resources found for these filters.</p>
                <p className="text-sm mt-1">
                  Try adjusting your topic or region, or{" "}
                  <a href="/submit" className="text-primary underline">submit a resource</a> you know about.
                </p>
                {hasFilters && (
                  <button onClick={clearFilters} className="mt-3 text-sm text-primary underline">
                    Clear all filters
                  </button>
                )}
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
