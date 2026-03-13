import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { PageLayout } from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const PROVINCES = [
  "National", "AB", "BC", "MB", "NB", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"
];

export default function Submit() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    resourceName: "",
    url: "",
    phone: "",
    categorySlug: "",
    province: "",
    whoItServes: "",
    description: "",
    contactName: "",
    contactEmail: "",
    comment: "",
  });

  const { data: categories = [] } = trpc.categories.list.useQuery();

  const submit = trpc.resources.submit.useMutation({
    onSuccess: () => {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    onError: (err) => {
      toast.error("Could not submit. Please check the form and try again.");
      console.error(err);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.resourceName.trim()) {
      toast.error("Resource name is required.");
      return;
    }
    submit.mutate({
      ...form,
      url: form.url || undefined,
      phone: form.phone || undefined,
      categorySlug: form.categorySlug || undefined,
      province: form.province || undefined,
      whoItServes: form.whoItServes || undefined,
      description: form.description || undefined,
      contactName: form.contactName || undefined,
      contactEmail: form.contactEmail || undefined,
      comment: form.comment || undefined,
    });
  };

  if (submitted) {
    return (
      <PageLayout>
        <div className="container max-w-2xl py-20 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-serif text-3xl font-bold mb-3">Thank you for your submission!</h1>
          <p className="text-muted-foreground text-base leading-relaxed mb-6">
            Your resource has been received and will be reviewed by our team before being published.
            We check all submissions to ensure they meet our editorial standards and are relevant to
            First Nations health. This process typically takes a few days.
          </p>
          <p className="text-sm text-muted-foreground mb-8">
            If you provided your email, we'll reach out if we have questions.
          </p>
          <div className="flex gap-3 justify-center">
            <a href="/categories" className="bg-primary text-white font-semibold px-5 py-2.5 rounded-lg hover:opacity-90 text-sm no-underline">
              Browse resources
            </a>
            <button
              onClick={() => { setSubmitted(false); setForm({ resourceName: "", url: "", phone: "", categorySlug: "", province: "", whoItServes: "", description: "", contactName: "", contactEmail: "", comment: "" }); }}
              className="border border-border font-semibold px-5 py-2.5 rounded-lg hover:bg-muted text-sm"
            >
              Submit another
            </button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="bg-white border-b border-border py-8">
        <div className="container max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-secondary mb-1">Community</p>
          <h1 className="font-serif text-3xl font-bold text-foreground mb-2">Submit a Resource</h1>
          <p className="text-muted-foreground text-base">
            Know of a health resource for First Nations peoples that isn't listed here?
            Submit it below. All submissions are reviewed by our team before publishing —
            nothing goes live automatically.
          </p>
        </div>
      </div>

      <div className="container max-w-2xl py-10">
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          {/* Resource info */}
          <div className="bg-white rounded-xl border border-border p-6 space-y-4">
            <h2 className="font-semibold text-base">Resource information</h2>

            <div>
              <label htmlFor="resourceName" className="block text-sm font-medium mb-1">
                Resource name <span className="text-red-500">*</span>
              </label>
              <input
                id="resourceName"
                name="resourceName"
                type="text"
                required
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. Hope for Wellness Help Line"
                value={form.resourceName}
                onChange={handleChange}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="url" className="block text-sm font-medium mb-1">Website URL</label>
                <input
                  id="url"
                  name="url"
                  type="url"
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="https://example.ca"
                  value={form.url}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="1-800-123-4567"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="categorySlug" className="block text-sm font-medium mb-1">Health category</label>
                <select
                  id="categorySlug"
                  name="categorySlug"
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  value={form.categorySlug}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="province" className="block text-sm font-medium mb-1">Province / Territory</label>
                <select
                  id="province"
                  name="province"
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                  value={form.province}
                  onChange={handleChange}
                >
                  <option value="">Select a region</option>
                  {PROVINCES.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="whoItServes" className="block text-sm font-medium mb-1">Who does this serve?</label>
              <input
                id="whoItServes"
                name="whoItServes"
                type="text"
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="e.g. First Nations youth in Ontario"
                value={form.whoItServes}
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
              <textarea
                id="description"
                name="description"
                rows={4}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Briefly describe what this resource offers and who it's for."
                value={form.description}
                onChange={handleChange}
                maxLength={1000}
              />
              <p className="text-xs text-muted-foreground mt-1">{form.description.length}/1000</p>
            </div>
          </div>

          {/* Contact info */}
          <div className="bg-white rounded-xl border border-border p-6 space-y-4">
            <div>
              <h2 className="font-semibold text-base">Your contact information</h2>
              <p className="text-sm text-muted-foreground mt-0.5">Optional — only used if we have questions about your submission.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium mb-1">Your name</label>
                <input
                  id="contactName"
                  name="contactName"
                  type="text"
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                  value={form.contactName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">Your email</label>
                <input
                  id="contactEmail"
                  name="contactEmail"
                  type="email"
                  className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="you@example.com"
                  value={form.contactEmail}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="comment" className="block text-sm font-medium mb-1">Additional comments</label>
              <textarea
                id="comment"
                name="comment"
                rows={3}
                className="w-full border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Anything else you'd like us to know about this resource."
                value={form.comment}
                onChange={handleChange}
                maxLength={500}
              />
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-muted rounded-lg p-4 text-sm text-muted-foreground">
            <strong>Review process:</strong> All submissions are reviewed by a human before publishing.
            We check that the resource is active, relevant to First Nations health, and meets our editorial standards.
            Submissions that don't meet our criteria will not be published, but we appreciate every submission.
          </div>

          <button
            type="submit"
            disabled={submit.isPending}
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity disabled:opacity-50 text-base"
          >
            {submit.isPending ? (
              <span className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
            ) : (
              <Send className="w-4 h-4" />
            )}
            {submit.isPending ? "Submitting..." : "Submit for review"}
          </button>
        </form>
      </div>
    </PageLayout>
  );
}
