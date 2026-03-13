import { Feather, CheckCircle, ExternalLink, Shield, Users, BookOpen } from "lucide-react";
import { PageLayout } from "@/components/Layout";

export default function About() {
  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2b26] to-[#0A6E60] text-white py-14">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Feather className="w-6 h-6 text-[#f5c07a]" />
            <p className="text-sm font-semibold uppercase tracking-widest text-white/60">About EagleFeather.ca</p>
          </div>
          <h1 className="font-serif text-4xl font-bold mb-4">
            A directory built with care, for community.
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            EagleFeather.ca exists because finding culturally safe, verified health resources
            for First Nations peoples shouldn't be hard. Every listing is checked by a real person.
            No advertising. No paid placements. No automated scraping.
          </p>
        </div>
      </section>

      <div className="container max-w-3xl py-12 space-y-12">

        {/* Purpose */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-bold">Our purpose</h2>
          </div>
          <div className="prose prose-sm max-w-none text-foreground/80 leading-relaxed space-y-3">
            <p>
              EagleFeather.ca is a free, publicly accessible health resource directory for First Nations peoples
              across all 13 provinces and territories of Canada. It was created to address a simple but persistent
              problem: health resources for Indigenous peoples are scattered across dozens of government websites,
              community portals, and organizational pages — making it difficult for individuals and families to
              find what they need quickly, especially in moments of crisis.
            </p>
            <p>
              This site is not a health service provider. We do not offer medical advice, counselling, or
              clinical services. We are a directory — a curated, verified list of organizations and programs
              that do provide those services. Think of us as a trusted guide to the landscape of First Nations
              health supports in Canada.
            </p>
          </div>
        </section>

        {/* Scope note */}
        <section className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-amber-700 mt-0.5 shrink-0" />
            <div>
              <h2 className="font-semibold text-amber-900 mb-2">A note on scope</h2>
              <p className="text-amber-800 text-sm leading-relaxed mb-3">
                EagleFeather.ca is specifically scoped to <strong>First Nations</strong> peoples and organizations.
                We recognize that Indigenous peoples in Canada include First Nations, Inuit, and Métis communities,
                each with distinct histories, cultures, and health needs.
              </p>
              <p className="text-amber-800 text-sm leading-relaxed mb-3">
                We have made a deliberate choice to focus on First Nations in order to do that work well,
                rather than attempting to serve all Indigenous communities and doing none of them justice.
                We deeply respect Inuit and Métis communities and their dedicated organizations.
              </p>
              <p className="text-amber-800 text-sm leading-relaxed">
                If you are Inuit or Métis, we respectfully direct you to:
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  <a href="https://www.itk.ca" target="_blank" rel="noopener noreferrer" className="text-primary inline-flex items-center gap-1 text-sm font-medium underline">
                    Inuit Tapiriit Kanatami (itk.ca) <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://www.metisnation.ca" target="_blank" rel="noopener noreferrer" className="text-primary inline-flex items-center gap-1 text-sm font-medium underline">
                    Métis National Council (metisnation.ca) <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Editorial standards */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-bold">Editorial standards</h2>
          </div>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Every resource listed on EagleFeather.ca meets the following criteria before it is published:
          </p>
          <div className="space-y-3">
            {[
              { title: "Human verification", desc: "A real person has reviewed the resource, confirmed the contact details are accurate, and confirmed the organization is active." },
              { title: "First Nations relevance", desc: "The resource specifically serves First Nations peoples, or is a national resource that includes First Nations peoples in its mandate." },
              { title: "No paid placements", desc: "Resources are never listed in exchange for payment. We do not accept advertising, sponsorships, or affiliate arrangements." },
              { title: "Regular review", desc: "Resources are reviewed at least every six months. Resources that have not been reviewed recently are flagged with a 'Needs review' badge." },
              { title: "Community submissions reviewed", desc: "Community members can submit resources for consideration. All submissions are reviewed by our team before publishing — nothing goes live automatically." },
              { title: "Broken link monitoring", desc: "Our system automatically checks resource URLs weekly and flags broken links for human review." },
            ].map(item => (
              <div key={item.title} className="flex items-start gap-3 bg-white rounded-lg border border-border p-4">
                <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <div className="font-semibold text-sm text-foreground">{item.title}</div>
                  <div className="text-sm text-muted-foreground mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Verification methodology */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-4">Verification methodology</h2>
          <div className="text-foreground/80 leading-relaxed space-y-3 text-sm">
            <p>
              When a resource is submitted or added by our team, we follow this process:
            </p>
            <ol className="list-decimal list-inside space-y-2 pl-2">
              <li>Confirm the organization exists and is currently active (website, phone, or public records check).</li>
              <li>Confirm the resource is accessible to First Nations peoples (not restricted to staff, members, or specific communities without public access).</li>
              <li>Confirm contact details (phone, website, email) are accurate and functional.</li>
              <li>Record the verification date. Resources are flagged for re-review after six months.</li>
              <li>Automated link checking runs weekly to catch broken URLs between manual reviews.</li>
            </ol>
            <p>
              We acknowledge that we are not infallible. If you find an error, a broken link, or a resource that
              no longer exists, please use the "Report" button on any resource card to let us know.
              Your reports are reviewed by a human within a reasonable timeframe.
            </p>
          </div>
        </section>

        {/* Land Acknowledgement */}
        <section className="bg-[#0d2b26] text-white rounded-2xl p-8 text-center">
          <Feather className="w-8 h-8 text-[#f5c07a] mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-4">Land Acknowledgement</h2>
          <p className="text-white/80 leading-relaxed mb-4">
            EagleFeather.ca was created to serve First Nations peoples across the lands now called Canada —
            lands that have been home to Indigenous peoples since time immemorial.
            We acknowledge the sovereignty of all First Nations whose territories span this country,
            and we recognize that access to health and wellness is a right, not a privilege.
          </p>
          <p className="text-white/80 leading-relaxed mb-4">
            We acknowledge that the residential school system, the Sixties Scoop, and ongoing systemic
            inequities in health care have caused profound harm to First Nations communities.
            This directory is a small contribution toward addressing those inequities — by making it
            easier for First Nations peoples to find the supports they deserve.
          </p>
          <p className="text-white/50 text-sm italic">
            We are committed to working with First Nations advisors to refine this acknowledgement
            to reflect the national scope of this site and to ensure it is meaningful rather than performative.
          </p>
        </section>

        {/* Contact */}
        <section>
          <h2 className="font-serif text-2xl font-bold mb-3">Contact & contributions</h2>
          <p className="text-foreground/80 leading-relaxed text-sm mb-4">
            EagleFeather.ca is maintained by a small team. If you have a resource to suggest,
            a correction to report, or feedback on the site, please use the links below.
          </p>
          <div className="flex flex-wrap gap-3">
            <a href="/submit" className="bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity text-sm no-underline">
              Submit a resource
            </a>
            <a href="/categories" className="border border-primary text-primary font-semibold px-5 py-2.5 rounded-lg hover:bg-primary/5 transition-colors text-sm no-underline">
              Browse resources
            </a>
          </div>
        </section>
      </div>
    </PageLayout>
  );
}
