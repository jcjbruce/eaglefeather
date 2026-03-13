import { useState } from "react";
import { Link } from "wouter";
import { Phone, Globe, AlertCircle, CheckCircle, Clock, ExternalLink, Flag } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

type Resource = {
  id: number;
  name: string;
  organization?: string | null;
  description: string;
  url?: string | null;
  phone?: string | null;
  categoryId: number;
  provinces: string;
  whoItServes?: string | null;
  isCrisisLine: boolean;
  lastVerified?: Date | null;
  linkStatus: string;
  notes?: string | null;
};

// Category color map (matches CSS classes)
const CATEGORY_COLORS: Record<number, string> = {
  1: "#7c3aed", // mental health
  2: "#0A6E60", // physical health
  3: "#059669", // substance use
  4: "#d97706", // maternal/child
  5: "#92400e", // elders
  6: "#2563eb", // cultural wellness
  7: "#0891b2", // youth
  8: "#db2777", // women's health
};

function VerificationBadge({ lastVerified }: { lastVerified?: Date | null }) {
  if (!lastVerified) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
        <Clock className="w-3 h-3" /> Needs review
      </span>
    );
  }
  const date = new Date(lastVerified);
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  const needsReview = date < sixMonthsAgo;

  if (needsReview) {
    return (
      <span className="inline-flex items-center gap-1 text-xs text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">
        <Clock className="w-3 h-3" /> Needs review
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
      <CheckCircle className="w-3 h-3" />
      Last verified: {date.toLocaleDateString("en-CA", { month: "short", year: "numeric" })}
    </span>
  );
}

function ReportModal({ resourceId, onClose }: { resourceId: number; onClose: () => void }) {
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const report = trpc.resources.reportLink.useMutation({
    onSuccess: () => {
      toast.success("Report submitted. Thank you for helping keep this directory accurate.");
      onClose();
    },
    onError: () => toast.error("Could not submit report. Please try again."),
  });

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6" onClick={e => e.stopPropagation()}>
        <h3 className="font-serif text-lg font-bold mb-2">Report a broken link</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Thank you for helping keep this directory accurate. Your report will be reviewed by our team.
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
            <label className="text-sm font-medium block mb-1">What's wrong? (optional)</label>
            <textarea
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows={3}
              placeholder="e.g. The link goes to a 404 page, or the phone number is disconnected."
              value={comment}
              onChange={e => setComment(e.target.value)}
              maxLength={500}
            />
          </div>
        </div>
        <div className="flex gap-3 mt-4">
          <button
            onClick={() => report.mutate({ resourceId, reporterEmail: email || undefined, comment: comment || undefined })}
            disabled={report.isPending}
            className="flex-1 bg-primary text-white font-semibold py-2 rounded-md text-sm hover:opacity-90 disabled:opacity-50"
          >
            {report.isPending ? "Submitting..." : "Submit Report"}
          </button>
          <button onClick={onClose} className="flex-1 border border-border py-2 rounded-md text-sm hover:bg-muted">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function ResourceCard({ resource, showCategory = false }: { resource: Resource; showCategory?: boolean }) {
  const [showReport, setShowReport] = useState(false);
  const borderColor = CATEGORY_COLORS[resource.categoryId] ?? "#0A6E60";
  const provinces: string[] = (() => {
    try { return JSON.parse(resource.provinces); } catch { return ["National"]; }
  })();

  return (
    <>
      <article
        className="bg-white rounded-xl shadow-sm border border-border border-l-4 p-5 hover:shadow-md transition-shadow flex flex-col gap-3"
        style={{ borderLeftColor: borderColor }}
        aria-label={`Resource: ${resource.name}`}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Link href={`/resource/${resource.id}`} className="no-underline">
              <h3 className="font-serif font-bold text-base text-foreground hover:text-primary transition-colors leading-tight">
                {resource.name}
              </h3>
            </Link>
            {resource.organization && (
              <p className="text-xs text-muted-foreground mt-0.5">{resource.organization}</p>
            )}
          </div>
          {resource.isCrisisLine && (
            <span className="shrink-0 bg-red-100 text-red-700 text-xs font-bold px-2 py-0.5 rounded-full">
              24/7 Crisis
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-foreground/80 leading-relaxed line-clamp-3">{resource.description}</p>

        {/* Coverage */}
        <div className="flex flex-wrap gap-1">
          {provinces.map(p => (
            <span key={p} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">
              {p}
            </span>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-wrap gap-3 text-sm">
          {resource.phone && (
            <a
              href={`tel:${resource.phone.replace(/\D/g, "")}`}
              className="inline-flex items-center gap-1 text-primary font-semibold hover:underline"
              aria-label={`Call ${resource.name}: ${resource.phone}`}
            >
              <Phone className="w-3.5 h-3.5" />
              {resource.phone}
            </a>
          )}
          {resource.url && (
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-primary hover:underline"
              aria-label={`Visit ${resource.name} website`}
            >
              <Globe className="w-3.5 h-3.5" />
              Visit website
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-border/50">
          <VerificationBadge lastVerified={resource.lastVerified} />
          <button
            onClick={() => setShowReport(true)}
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
            aria-label="Report broken link"
          >
            <Flag className="w-3 h-3" />
            Report
          </button>
        </div>

        {resource.linkStatus === "broken" && (
          <div className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
            <AlertCircle className="w-3 h-3" />
            This link may be broken — please verify before using.
          </div>
        )}
      </article>

      {showReport && <ReportModal resourceId={resource.id} onClose={() => setShowReport(false)} />}
    </>
  );
}
