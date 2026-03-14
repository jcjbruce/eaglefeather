// Mock data for static deployment (replaces tRPC backend calls)

export type Category = {
  id: number;
  name: string;
  slug: string;
  color: string;
  description: string;
};

export type Resource = {
  id: number;
  name: string;
  organization?: string | null;
  description: string;
  url?: string | null;
  phone?: string | null;
  email?: string | null;
  categoryId: number;
  provinces: string;
  whoItServes?: string | null;
  isCrisisLine: boolean;
  isPublished: boolean;
  lastVerified?: Date | null;
  linkStatus: string;
  notes?: string | null;
};

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Mental Health", slug: "mental-health", color: "#7c3aed", description: "Counselling, therapy, and mental wellness support for First Nations peoples." },
  { id: 2, name: "Physical Health", slug: "physical-health", color: "#0A6E60", description: "Medical services, clinics, and physical wellness programs." },
  { id: 3, name: "Substance Use", slug: "substance-use", color: "#059669", description: "Addiction recovery, harm reduction, and substance use support." },
  { id: 4, name: "Maternal & Child Health", slug: "maternal-child", color: "#d97706", description: "Prenatal care, early childhood development, and family health." },
  { id: 5, name: "Elders", slug: "elders", color: "#92400e", description: "Health services and support programs for Indigenous Elders." },
  { id: 6, name: "Cultural Wellness", slug: "cultural-wellness", color: "#2563eb", description: "Traditional healing, ceremony, and cultural health programs." },
  { id: 7, name: "Youth", slug: "youth", color: "#0891b2", description: "Health and wellness programs for Indigenous youth." },
  { id: 8, name: "Women's Health", slug: "womens-health", color: "#db2777", description: "Health services and support for Indigenous women." },
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: 1,
    name: "Hope for Wellness Help Line",
    organization: "Government of Canada",
    description: "Immediate mental health counselling and crisis intervention for all Indigenous peoples across Canada. Available 24/7 by phone and online chat in English, French, Cree, Ojibway, and Inuktitut.",
    url: "https://www.hopeforwellness.ca",
    phone: "1-855-242-3310",
    categoryId: 1,
    provinces: '["National"]',
    whoItServes: "All Indigenous peoples across Canada",
    isCrisisLine: true,
    isPublished: true,
    lastVerified: new Date("2025-11-01"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 2,
    name: "Thunderbird Partnership Foundation",
    organization: "Thunderbird Partnership Foundation",
    description: "National organization dedicated to culturally based substance use and addiction services for First Nations peoples. Provides training, resources, and community support using the First Nations Mental Wellness Continuum Framework.",
    url: "https://thunderbirdpf.org",
    phone: null,
    categoryId: 3,
    provinces: '["National"]',
    whoItServes: "First Nations communities and service providers",
    isCrisisLine: false,
    isPublished: true,
    lastVerified: new Date("2025-10-15"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 3,
    name: "First Nations Health Authority",
    organization: "FNHA",
    description: "The only provincial-level First Nations health authority in Canada. Provides health programs and services to BC First Nations, including mental health, primary care, health benefits, and traditional wellness.",
    url: "https://www.fnha.ca",
    phone: "1-866-913-0033",
    categoryId: 2,
    provinces: '["BC"]',
    whoItServes: "First Nations peoples in British Columbia",
    isCrisisLine: false,
    isPublished: true,
    lastVerified: new Date("2025-09-20"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 4,
    name: "KUU-US Crisis Line Society",
    organization: "KUU-US Crisis Line Society",
    description: "Province-wide Indigenous-specific crisis line providing 24/7 culturally safe support. Staffed by trained Indigenous crisis counsellors who understand the unique experiences of First Nations peoples.",
    url: "https://www.kuu-uscrisisline.com",
    phone: "1-800-588-8717",
    categoryId: 1,
    provinces: '["BC", "YT"]',
    whoItServes: "Indigenous peoples in BC and Yukon",
    isCrisisLine: true,
    isPublished: true,
    lastVerified: new Date("2025-12-01"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 5,
    name: "Anishnawbe Health Toronto",
    organization: "Anishnawbe Health Toronto",
    description: "Provides traditional healing, primary care, mental health, and substance use services rooted in Indigenous culture. Services include Traditional Healing, counselling, medical clinics, and community programs.",
    url: "https://aht.ca",
    phone: "416-360-0486",
    categoryId: 6,
    provinces: '["ON"]',
    whoItServes: "Indigenous peoples in the Greater Toronto Area",
    isCrisisLine: false,
    isPublished: true,
    lastVerified: new Date("2025-08-15"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 6,
    name: "Native Mental Health Association of Canada",
    organization: "NMHAC",
    description: "Promotes mental wellness in First Nations communities through advocacy, education, and culturally relevant programming. Works to reduce stigma and increase access to mental health services.",
    url: "https://www.nmhac.ca",
    phone: null,
    categoryId: 1,
    provinces: '["National"]',
    whoItServes: "First Nations peoples across Canada",
    isCrisisLine: false,
    isPublished: true,
    lastVerified: new Date("2025-07-10"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 7,
    name: "Indigenous Midwifery Program",
    organization: "National Aboriginal Council of Midwives",
    description: "Supports the revitalization of Indigenous midwifery practices and advocates for culturally safe maternal care. Connects expecting mothers with Indigenous midwives across Canada.",
    url: "https://indigenousmidwifery.ca",
    phone: null,
    categoryId: 4,
    provinces: '["National"]',
    whoItServes: "Indigenous women and families",
    isCrisisLine: false,
    isPublished: true,
    lastVerified: new Date("2025-06-20"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 8,
    name: "Alberta First Nations Health Consortium",
    organization: "AFNHC",
    description: "Provides community-based health programs including diabetes prevention, maternal health, and mental wellness programming for Treaty 6, 7, and 8 First Nations in Alberta.",
    url: "https://www.afnhc.ca",
    phone: "780-459-1884",
    categoryId: 2,
    provinces: '["AB"]',
    whoItServes: "First Nations peoples in Alberta",
    isCrisisLine: false,
    isPublished: true,
    lastVerified: new Date("2025-10-01"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 9,
    name: "We Matter Campaign",
    organization: "We Matter",
    description: "National Indigenous youth-led organization creating messages of hope and life promotion for Indigenous youth. Provides crisis resources, toolkits for communities, and a platform for Indigenous youth voices.",
    url: "https://wemattercampaign.org",
    phone: null,
    categoryId: 7,
    provinces: '["National"]',
    whoItServes: "Indigenous youth across Canada",
    isCrisisLine: false,
    isPublished: true,
    lastVerified: new Date("2025-11-15"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 10,
    name: "Native Women's Association of Canada",
    organization: "NWAC",
    description: "Advocates for the health, wellbeing, and rights of Indigenous women, girls, and gender-diverse people. Programs include maternal health, MMIWG support, and health policy advocacy.",
    url: "https://nwac.ca",
    phone: "613-722-3033",
    categoryId: 8,
    provinces: '["National"]',
    whoItServes: "Indigenous women, girls, and gender-diverse people",
    isCrisisLine: false,
    isPublished: true,
    lastVerified: new Date("2025-09-30"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 11,
    name: "Manitoba Keewatinowi Okimakanak Health",
    organization: "MKO",
    description: "Provides health services and advocacy for northern Manitoba First Nations communities, including mental health, addictions, chronic disease prevention, and environmental health.",
    url: "https://mkonation.com",
    phone: "204-778-7245",
    categoryId: 2,
    provinces: '["MB"]',
    whoItServes: "First Nations peoples in northern Manitoba",
    isCrisisLine: false,
    isPublished: true,
    lastVerified: new Date("2025-08-01"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 12,
    name: "First Nations of Quebec and Labrador Health",
    organization: "FNQLHSSC",
    description: "Health and social services commission serving 43 First Nations communities in Quebec and Labrador. Programs include health planning, disease prevention, and cultural wellness.",
    url: "https://www.cssspnql.com",
    phone: "418-842-1540",
    categoryId: 2,
    provinces: '["QC"]',
    whoItServes: "First Nations peoples in Quebec and Labrador",
    isCrisisLine: false,
    isPublished: true,
    lastVerified: new Date("2025-07-25"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 13,
    name: "Saskatchewan First Nations Elders Program",
    organization: "Federation of Sovereign Indigenous Nations",
    description: "Supports Elders in Saskatchewan First Nations communities with health services, traditional knowledge preservation, and intergenerational wellness programs.",
    url: "https://www.fsin.com",
    phone: "306-665-1215",
    categoryId: 5,
    provinces: '["SK"]',
    whoItServes: "First Nations Elders in Saskatchewan",
    isCrisisLine: false,
    isPublished: true,
    lastVerified: new Date("2025-06-15"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 14,
    name: "Indian Residential School Survivors Society",
    organization: "IRSSS",
    description: "Provides emotional and crisis support services for Indian Residential School Survivors and their families. Offers culturally safe counselling, referrals, and community outreach across BC.",
    url: "https://www.irsss.ca",
    phone: "1-800-721-0066",
    categoryId: 1,
    provinces: '["BC"]',
    whoItServes: "Residential School Survivors and their families",
    isCrisisLine: true,
    isPublished: true,
    lastVerified: new Date("2025-11-20"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 15,
    name: "Council of Yukon First Nations Health",
    organization: "Council of Yukon First Nations",
    description: "Coordinates health programs and services for Yukon First Nations, including mental health, traditional wellness, and community health planning.",
    url: "https://cyfn.ca",
    phone: "867-393-9200",
    categoryId: 6,
    provinces: '["YT"]',
    whoItServes: "First Nations peoples in Yukon",
    isCrisisLine: false,
    isPublished: true,
    lastVerified: new Date("2025-05-10"),
    linkStatus: "ok",
    notes: null,
  },
  {
    id: 16,
    name: "Mi'kmaw Native Friendship Centre",
    organization: "Mi'kmaw Native Friendship Centre",
    description: "Provides health, cultural, and social services for Indigenous peoples in Nova Scotia. Programs include mental health counselling, youth programs, and cultural wellness activities.",
    url: "https://www.mymnfc.com",
    phone: "902-420-1576",
    categoryId: 6,
    provinces: '["NS"]',
    whoItServes: "Indigenous peoples in Nova Scotia",
    isCrisisLine: false,
    isPublished: true,
    lastVerified: new Date("2025-09-05"),
    linkStatus: "ok",
    notes: null,
  },
];

// Helper: get resources filtered by criteria
export function getFilteredResources(opts?: {
  categoryId?: number;
  province?: string;
  search?: string;
}): Resource[] {
  let results = MOCK_RESOURCES.filter(r => r.isPublished);

  if (opts?.categoryId) {
    results = results.filter(r => r.categoryId === opts.categoryId);
  }

  if (opts?.province) {
    results = results.filter(r => {
      try {
        const provinces: string[] = JSON.parse(r.provinces);
        return provinces.includes(opts.province!);
      } catch {
        return false;
      }
    });
  }

  if (opts?.search) {
    const q = opts.search.toLowerCase();
    results = results.filter(r =>
      r.name.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      (r.organization?.toLowerCase().includes(q) ?? false)
    );
  }

  return results;
}

// Helper: get province counts
export function getProvinceCounts(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const r of MOCK_RESOURCES.filter(r => r.isPublished)) {
    try {
      const provinces: string[] = JSON.parse(r.provinces);
      for (const p of provinces) {
        counts[p] = (counts[p] || 0) + 1;
      }
    } catch {
      // skip
    }
  }
  return counts;
}

// Helper: get cross counts (province x category)
export function getCrossCountsByProvinceAndCategory(): Array<{ province: string; categoryId: number; count: number }> {
  const map: Record<string, number> = {};
  for (const r of MOCK_RESOURCES.filter(r => r.isPublished)) {
    try {
      const provinces: string[] = JSON.parse(r.provinces);
      for (const p of provinces) {
        const key = `${p}:${r.categoryId}`;
        map[key] = (map[key] || 0) + 1;
      }
    } catch {
      // skip
    }
  }
  return Object.entries(map).map(([key, count]) => {
    const [province, catId] = key.split(":");
    return { province, categoryId: parseInt(catId), count };
  });
}

// Helper: get resource by ID
export function getResourceById(id: number): Resource | undefined {
  return MOCK_RESOURCES.find(r => r.id === id);
}
