import { useState } from "react";
import { useParams, Link } from "wouter";
import { Phone, Globe, Mail, ArrowLeft, Flag, CheckCircle, Clock, AlertCircle, ExternalLink, Users } from "lucide-react";
import { PageLayout } from "@/components/Layout";
import { toast } from "sonner";
import { getResourceById, MOCK_CATEGORIES } from "@/lib/mockData";

function ReportModal({ resourceName, onClose }: { resourceName: string; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    setIsPending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "f642c143-997e-4d9e-9be2-7b9917152700",
          subject: "[EagleFeather] Resource Report",
          resource_name: resourceName,
          email: email || "Not provided",
          issue: comment || "No details provided",
        }),
      });
      if (res.ok) {
        toast.success("Report submitted. Thank you for helping keep this directory accurate.");
        onClose();
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <h3 className="font-serif text-lg font-bold mb-2">Report an issue</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Help us keep this directory accurate. Your report goes to our review team — resources are not removed automatically.
        </p>
        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium block mb-1">Your email (optional)</label>
            <input
              type="email"
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1">What's the issue?</label>
            <textarea
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={3}
              placeholder="e.g. The website link is broken, the phone number is disconnected, or the information is out of date."
              value={comment}
              onChange={e => setComment(e.target.value)}
              maxLength={500}
            />
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="flex-1 bg-primary text-white font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
          >
            {isPending ? "Submitting..." : "Submit Report"}
          </button>
          <button onClick={onClose} className="flex-1 border border-border py-2 rounded-md text-sm hover:bg-muted">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ResourceDetail() {
  const { id } = useParams<{ id: string }>();
  const [showReport, setShowReport] = useState(false);

  const resource = getResourceById(parseInt(id ?? "0"));
  const categories = MOCK_CATEGORIES;
  const category = categories.find(c => c.id === resource?.categoryId);

  const provinces: string[] = (() => {
    try { return JSON.parse(resource?.provinces ?? '["National"]'); } catch { return ["National"]; }
  })();

  if (!resource) {
    return (
      <PageLayout>
        <div className="container py-12 text-center">
          <h1 className="font-serif text-2xl font-bold mb-2">Resource not found</h1>
          <p className="text-muted-foreground mb-4">This resource may have been removed or the link may be incorrect.</p>
          <Link href="/browse" className="text-primary underline">Browse all resources</Link>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container py-8 max-w-3xl">
        {/* Back */}
        <Link href="/browse" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary mb-6 no-underline transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to resources
        </Link>

        {/* Category badge */}
        {category && (
          <div className="flex items-center gap-2 mb-4">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full text-white"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </span>
            {resource.isCrisisLine && (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-red-100 text-red-700">
                24/7 Crisis Line
              </span>
            )}
          </div>
        )}

        {/* Title */}
        <h1 className="font-serif text-3xl font-bold text-foreground mb-1">{resource.name}</h1>
        {resource.organization && (
          <p className="text-muted-foreground text-base mb-6">{resource.organization}</p>
        )}

        {/* Link status warning */}
        {resource.linkStatus === "broken" && (
          <div className="flex items-center gap-2 text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-6">
            <AlertCircle className="w-4 h-4 shrink-0" />
            This resource has been flagged as potentially broken. Please verify contact details before relying on it.
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="md:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">About this resource</h2>
              <p className="text-base text-foreground leading-relaxed">{resource.description}</p>
            </div>

            {resource.whoItServes && (
              <div className="bg-white rounded-xl border border-border p-6">
                <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4" /> Who this serves
                </h2>
                <p className="text-base text-foreground">{resource.whoItServes}</p>
              </div>
            )}

            {/* Coverage */}
            <div className="bg-white rounded-xl border border-border p-6">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Coverage</h2>
              <div className="flex flex-wrap gap-2">
                {provinces.map(p => (
                  <span key={p} className="bg-muted text-foreground text-sm px-3 py-1 rounded-full">{p}</span>
                ))}
              </div>
            </div>

            {resource.notes && (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
                <strong>Note:</strong> {resource.notes}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Contact */}
            <div className="bg-white rounded-xl border border-border p-5">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">Contact</h2>
              <div className="space-y-3">
                {resource.phone && (
                  <a
                    href={`tel:${resource.phone.replace(/\D/g, "")}`}
                    className="flex items-center gap-3 text-primary font-semibold hover:underline no-underline group"
                    aria-label={`Call ${resource.name}: ${resource.phone}`}
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Phone</div>
                      <div className="font-bold text-lg leading-tight">{resource.phone}</div>
                    </div>
                  </a>
                )}
                {resource.url && (
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-primary hover:underline no-underline"
                    aria-label={`Visit ${resource.name} website`}
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Globe className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Website</div>
                      <div className="text-sm flex items-center gap-1">
                        Visit website <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </a>
                )}
                {resource.email && (
                  <a
                    href="/contact"
                    className="flex items-center gap-3 text-primary hover:underline no-underline"
                  >
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">Email</div>
                      <div className="text-sm">Contact Us</div>
                    </div>
                  </a>
                )}
              </div>
            </div>

            {/* Verification */}
            <div className="bg-white rounded-xl border border-border p-5">
              <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Verification</h2>
              {resource.lastVerified ? (
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <div>
                    <div className="text-sm font-medium">Verified</div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(resource.lastVerified).toLocaleDateString("en-CA", { month: "long", year: "numeric" })}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-amber-700">
                  <Clock className="w-4 h-4" />
                  <div className="text-sm">Needs review</div>
                </div>
              )}
            </div>

            {/* Report */}
            <button
              onClick={() => setShowReport(true)}
              className="w-full flex items-center justify-center gap-2 border border-border rounded-xl p-3 text-sm text-muted-foreground hover:text-destructive hover:border-destructive/30 transition-colors"
            >
              <Flag className="w-4 h-4" />
              Report an issue with this resource
            </button>
          </div>
        </div>
      </div>

      {showReport && <ReportModal resourceName={resource.name} onClose={() => setShowReport(false)} />}
    </PageLayout>
  );
}
