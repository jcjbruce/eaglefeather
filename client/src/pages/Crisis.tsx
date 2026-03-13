import { Phone, MessageCircle, Clock, Heart } from "lucide-react";
import { PageLayout } from "@/components/Layout";

const CRISIS_LINES = [
  {
    name: "988 Suicide Crisis Helpline",
    phone: "988",
    tel: "988",
    description: "Canada's national crisis line. Call or text 988 from anywhere in Canada, any time. A real person will answer.",
    availability: "24 hours a day, 7 days a week",
    languages: "English, French",
    serves: "All Canadians",
    color: "#0A6E60",
    primary: true,
  },
  {
    name: "Hope for Wellness Help Line",
    phone: "1-855-242-3310",
    tel: "18552423310",
    description: "Free, confidential mental health counselling and crisis support for all Indigenous peoples across Canada. Counsellors understand Indigenous experiences.",
    availability: "24 hours a day, 7 days a week",
    languages: "English, French, Cree, Ojibway, Inuktitut (on request)",
    serves: "All Indigenous peoples across Canada",
    color: "#7c3aed",
    primary: true,
  },
  {
    name: "KUU-US Crisis Line",
    phone: "1-800-588-8717",
    tel: "18005888717",
    description: "A crisis line staffed by Indigenous crisis workers who understand the local culture and context of BC and Yukon First Nations communities.",
    availability: "24 hours a day, 7 days a week",
    languages: "English",
    serves: "Indigenous peoples in British Columbia and Yukon",
    color: "#B8620A",
    primary: true,
  },
  {
    name: "National Centre for Truth and Reconciliation (NCTR) Support",
    phone: "1-866-925-4419",
    tel: "18669254419",
    description: "Support for residential school survivors and their families. Connects you with culturally safe support workers who understand the impacts of the residential school system.",
    availability: "Available during business hours — check nctr.ca for current hours",
    languages: "English, French",
    serves: "Residential school survivors and their families",
    color: "#2563eb",
    primary: false,
  },
];

export default function Crisis() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-[#0d2b26] text-white py-12">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-semibold uppercase tracking-widest text-white/60">Crisis Support</p>
          </div>
          <h1 className="font-serif text-4xl font-bold mb-4">
            You don't have to go through this alone.
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            These lines are staffed by real people — many of them Indigenous — who are ready to listen.
            There's no wrong reason to call. Whether you're in crisis, struggling, or just need to talk,
            they're here for you.
          </p>
        </div>
      </section>

      {/* Primary crisis lines */}
      <section className="container py-10 max-w-3xl">
        <div className="space-y-6">
          {CRISIS_LINES.filter(l => l.primary).map(line => (
            <article
              key={line.phone}
              className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
              aria-label={`Crisis line: ${line.name}`}
            >
              <div className="p-6 border-b border-border" style={{ borderLeftWidth: 4, borderLeftColor: line.color }}>
                <h2 className="font-serif text-xl font-bold text-foreground mb-1">{line.name}</h2>
                <p className="text-muted-foreground text-sm mb-4">{line.description}</p>

                {/* Large tappable phone number */}
                <a
                  href={`tel:${line.tel}`}
                  className="inline-flex items-center gap-3 bg-primary text-white font-bold text-2xl px-6 py-4 rounded-xl hover:opacity-90 transition-opacity no-underline w-full sm:w-auto justify-center sm:justify-start"
                  aria-label={`Call ${line.name}: ${line.phone}`}
                  style={{ backgroundColor: line.color }}
                >
                  <Phone className="w-6 h-6" />
                  {line.phone}
                </a>

                {line.phone === "988" && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    <span>You can also <strong>text 988</strong> if you prefer not to call.</span>
                  </div>
                )}
              </div>
              <div className="px-6 py-4 bg-muted/30 grid sm:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Available</div>
                  <div className="flex items-center gap-1 text-foreground">
                    <Clock className="w-3.5 h-3.5 text-green-600" />
                    {line.availability}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Languages</div>
                  <div className="text-foreground">{line.languages}</div>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">Who it serves</div>
                  <div className="text-foreground">{line.serves}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Secondary lines */}
        <h2 className="font-serif text-xl font-bold mt-10 mb-4">Additional supports</h2>
        <div className="space-y-4">
          {CRISIS_LINES.filter(l => !l.primary).map(line => (
            <article
              key={line.phone}
              className="bg-white rounded-xl border border-border p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              aria-label={`Support line: ${line.name}`}
            >
              <div className="flex-1">
                <h3 className="font-semibold text-base text-foreground mb-1">{line.name}</h3>
                <p className="text-sm text-muted-foreground">{line.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  <Clock className="w-3 h-3 inline mr-1" />{line.availability}
                </p>
              </div>
              <a
                href={`tel:${line.tel}`}
                className="inline-flex items-center gap-2 font-bold text-lg px-5 py-3 rounded-xl text-white no-underline hover:opacity-90 transition-opacity shrink-0"
                style={{ backgroundColor: line.color }}
                aria-label={`Call ${line.name}: ${line.phone}`}
              >
                <Phone className="w-5 h-5" />
                {line.phone}
              </a>
            </article>
          ))}
        </div>

        {/* Framing note */}
        <div className="mt-10 bg-[#0d2b26] text-white rounded-2xl p-6">
          <h2 className="font-serif text-lg font-bold mb-3">A note on reaching out</h2>
          <p className="text-white/80 leading-relaxed text-sm mb-3">
            Asking for help is an act of strength, not weakness. The people who answer these lines
            are trained to listen without judgment. You don't need to be in immediate danger to call —
            if something feels wrong, that's enough.
          </p>
          <p className="text-white/80 leading-relaxed text-sm">
            Many of these lines are staffed by Indigenous people who understand the specific experiences
            of First Nations communities, including intergenerational trauma, isolation, and the impacts
            of the residential school system.
          </p>
        </div>

        {/* Crosslinks */}
        <div className="mt-6 p-4 bg-muted rounded-xl text-sm text-muted-foreground">
          <p>
            <strong>Looking for Inuit or Métis-specific supports?</strong>{" "}
            <a href="https://www.itk.ca" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              Inuit Tapiriit Kanatami (itk.ca)
            </a>{" "}
            and{" "}
            <a href="https://www.metisnation.ca" target="_blank" rel="noopener noreferrer" className="text-primary underline">
              Métis National Council (metisnation.ca)
            </a>{" "}
            have dedicated resources for their communities.
          </p>
        </div>
      </section>
    </PageLayout>
  );
}
