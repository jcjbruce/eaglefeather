import { useState } from "react";
import { useSearch } from "wouter";
import { MapPin, Globe, Building2, Mountain, ChevronRight, Search } from "lucide-react";
import { PageLayout } from "@/components/Layout";
import { ResourceCard } from "@/components/ResourceCard";
import { MOCK_CATEGORIES, getFilteredResources, getProvinceCounts } from "@/lib/mockData";

const JURISDICTIONS = [
  { code: "National", name: "National Resources", shortName: "National", type: "national", description: "Organizations that serve First Nations peoples across all of Canada." },
  { code: "AB", name: "Alberta", shortName: "Alberta", type: "province", description: "Health resources for First Nations peoples in Alberta, including Treaty 6, 7, and 8 territories." },
  { code: "BC", name: "British Columbia", shortName: "B.C.", type: "province", description: "Health resources for First Nations peoples in British Columbia, home to the First Nations Health Authority." },
  { code: "MB", name: "Manitoba", shortName: "Manitoba", type: "province", description: "Health resources for First Nations peoples in Manitoba, including Treaty 1, 2, 3, 4, and 5 territories." },
  { code: "NB", name: "New Brunswick", shortName: "N.B.", type: "province", description: "Health resources for First Nations peoples in New Brunswick, including Wolastoqiyik and Mi'kmaq communities." },
  { code: "NL", name: "Newfoundland & Labrador", shortName: "N.L.", type: "province", description: "Health resources for First Nations peoples in Newfoundland and Labrador." },
  { code: "NS", name: "Nova Scotia", shortName: "N.S.", type: "province", description: "Health resources for First Nations peoples in Nova Scotia, home to the Mi'kmaw Nation." },
  { code: "ON", name: "Ontario", shortName: "Ontario", type: "province", description: "Health resources for First Nations peoples in Ontario, including Anishinabek, Haudenosaunee, and Mushkegowuk territories." },
  { code: "PE", name: "Prince Edward Island", shortName: "P.E.I.", type: "province", description: "Health resources for First Nations peoples in Prince Edward Island, part of Mi'kma'ki." },
  { code: "QC", name: "Quebec", shortName: "Quebec", type: "province", description: "Health resources for First Nations peoples in Quebec, home to 11 First Nations." },
  { code: "SK", name: "Saskatchewan", shortName: "Sask.", type: "province", description: "Health resources for First Nations peoples in Saskatchewan, including Treaty 4, 5, 6, 8, and 10 territories." },
  { code: "NT", name: "Northwest Territories", shortName: "N.W.T.", type: "territory", description: "Health resources for First Nations peoples in the Northwest Territories, including Dene and Tlicho communities." },
  { code: "NU", name: "Nunavut", shortName: "Nunavut", type: "territory", description: "Health resources available in Nunavut." },
  { code: "YT", name: "Yukon", shortName: "Yukon", type: "territory", description: "Health resources for First Nations peoples in Yukon, home to 14 Yukon First Nations." },
];

export default function Provinces() {
  const searchParams = useSearch();
  const params = new URLSearchParams(searchParams);
  const initialRegion = params.get("region") ?? "";
  const [selected, setSelected] = useState(initialRegion);
  const [categoryFilter, setCategoryFilter] = useState<string>("");

  const selectedJurisdiction = JURISDICTIONS.find(j => j.code === selected);

  const provinceCounts = getProvinceCounts();
  const allCategories = MOCK_CATEGORIES;

  const resources = selected
    ? getFilteredResources({
        province: selected || undefined,
        categoryId: categoryFilter ? Number(categoryFilter) : undefined,
      })
    : [];

  const getCount = (code: string) => provinceCounts[code] || 0;

  return (
    <PageLayout>
      <div className="bg-white border-b border-border py-8">
        <div className="container">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-1">Health Resources</p>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Browse by Region</h1>
          <p className="text-muted-foreground text-base max-w-2xl">
            Select a province or territory to find health resources specific to that region.
            Choose "National Resources" to see organizations that serve all of Canada.
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Jurisdiction sidebar */}
          <aside className="lg:w-80 shrink-0">
            <div className="bg-white rounded-xl border border-border overflow-hidden lg:sticky lg:top-24">
              {/* National */}
              <button
                onClick={() => { setSelected("National"); setCategoryFilter(""); }}
                className={`w-full text-left px-4 py-3.5 transition-colors flex items-center gap-3 border-b border-border ${
                  selected === "National" ? "bg-primary/10 text-primary" : "hover:bg-muted"
                }`}
              >
                <Globe className="w-5 h-5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-sm">National Resources</span>
                  <p className="text-xs text-muted-foreground">Available across Canada</p>
                </div>
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {getCount("National")}
                </span>
              </button>

              {/* Provinces */}
              <div className="px-4 py-2 bg-muted/30 border-b border-border">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Provinces
                </span>
              </div>
              {JURISDICTIONS.filter(j => j.type === "province").map(j => (
                <button
                  key={j.code}
                  onClick={() => { setSelected(j.code); setCategoryFilter(""); }}
                  className={`w-full text-left px-4 py-2.5 transition-colors flex items-center gap-2 border-b border-border/50 last:border-b-0 ${
                    selected === j.code ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <span className="text-sm flex-1">{j.name}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    getCount(j.code) > 0 ? "bg-muted text-foreground" : "bg-muted/50 text-muted-foreground"
                  }`}>
                    {getCount(j.code)}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              ))}

              {/* Territories */}
              <div className="px-4 py-2 bg-muted/30 border-b border-border">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                  <Mountain className="w-3.5 h-3.5" /> Territories
                </span>
              </div>
              {JURISDICTIONS.filter(j => j.type === "territory").map(j => (
                <button
                  key={j.code}
                  onClick={() => { setSelected(j.code); setCategoryFilter(""); }}
                  className={`w-full text-left px-4 py-2.5 transition-colors flex items-center gap-2 border-b border-border/50 last:border-b-0 ${
                    selected === j.code ? "bg-primary/10 text-primary" : "hover:bg-muted"
                  }`}
                >
                  <span className="text-sm flex-1">{j.name}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    getCount(j.code) > 0 ? "bg-muted text-foreground" : "bg-muted/50 text-muted-foreground"
                  }`}>
                    {getCount(j.code)}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </aside>

          {/* Resources panel */}
          <div className="flex-1 min-w-0">
            {!selected ? (
              <div className="text-center py-20 text-muted-foreground">
                <MapPin className="w-12 h-12 mx-auto mb-4 opacity-20" />
                <h2 className="font-serif text-xl font-bold text-foreground mb-2">Select a region</h2>
                <p className="text-sm max-w-md mx-auto">
                  Choose a province or territory from the list to see health resources in that area,
                  or select "National Resources" for organizations that serve all of Canada.
                </p>
              </div>
            ) : (
              <>
                {/* Region header */}
                <div className="mb-6">
                  <h2 className="font-serif text-2xl font-bold text-foreground">{selectedJurisdiction?.name}</h2>
                  <p className="text-muted-foreground text-sm mt-1">{selectedJurisdiction?.description}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {resources.length} resource{resources.length !== 1 ? "s" : ""} found
                  </p>
                </div>

                {/* Category filter pills */}
                {allCategories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    <button
                      onClick={() => setCategoryFilter("")}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                        !categoryFilter ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
                      }`}
                    >
                      All Topics
                    </button>
                    {allCategories.map(cat => (
                      <button
                        key={cat.id}
                        onClick={() => setCategoryFilter(String(cat.id))}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                          categoryFilter === String(cat.id) ? "bg-primary text-white" : "bg-muted text-foreground hover:bg-muted/80"
                        }`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                )}

                {resources.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground bg-white rounded-xl border border-border">
                    <Search className="w-10 h-10 mx-auto mb-3 opacity-20" />
                    <p className="font-medium">No resources found for this region{categoryFilter ? " and topic" : ""}.</p>
                    <p className="text-sm mt-1">Know of a resource? <a href="/submit" className="text-primary underline">Submit it here.</a></p>
                    {categoryFilter && (
                      <button onClick={() => setCategoryFilter("")} className="mt-3 text-sm text-primary underline">
                        Clear topic filter
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
              </>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
