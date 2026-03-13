import { useState } from "react";
import { Link } from "wouter";
import {
  LayoutDashboard, FileText, Link2, Plus, Edit, Trash2, Check, X, RefreshCw,
  AlertCircle, CheckCircle, Clock, Eye, EyeOff, ArrowLeft, Flag, Loader2, Download
} from "lucide-react";
import { PageLayout } from "@/components/Layout";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { getLoginUrl } from "@/const";

// ── Types ─────────────────────────────────────────────────────────────────────
type AdminTab = "resources" | "submissions" | "link-health";

// ── Resource Form ─────────────────────────────────────────────────────────────
function ResourceForm({
  initial,
  categories,
  onSave,
  onCancel,
  isLoading,
}: {
  initial?: any;
  categories: any[];
  onSave: (data: any) => void;
  onCancel: () => void;
  isLoading: boolean;
}) {
  const [form, setForm] = useState({
    name: initial?.name ?? "",
    organization: initial?.organization ?? "",
    description: initial?.description ?? "",
    url: initial?.url ?? "",
    phone: initial?.phone ?? "",
    email: initial?.email ?? "",
    categoryId: initial?.categoryId ?? (categories[0]?.id ?? 1),
    provinces: initial?.provinces ?? '["National"]',
    whoItServes: initial?.whoItServes ?? "",
    isCrisisLine: initial?.isCrisisLine ?? false,
    isPublished: initial?.isPublished ?? false,
    notes: initial?.notes ?? "",
  });

  const set = (k: string, v: any) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="bg-white rounded-xl border border-border p-6 space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input className="input-field" value={form.name} onChange={e => set("name", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Organization</label>
          <input className="input-field" value={form.organization} onChange={e => set("organization", e.target.value)} />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description *</label>
        <textarea className="input-field resize-none" rows={3} value={form.description} onChange={e => set("description", e.target.value)} />
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">URL</label>
          <input className="input-field" type="url" value={form.url} onChange={e => set("url", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone</label>
          <input className="input-field" value={form.phone} onChange={e => set("phone", e.target.value)} />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input className="input-field" type="email" value={form.email} onChange={e => set("email", e.target.value)} />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Category</label>
          <select className="input-field bg-white" value={form.categoryId} onChange={e => set("categoryId", parseInt(e.target.value))}>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Provinces (JSON array)</label>
          <input className="input-field" value={form.provinces} onChange={e => set("provinces", e.target.value)} placeholder='["National"]' />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Who it serves</label>
        <input className="input-field" value={form.whoItServes} onChange={e => set("whoItServes", e.target.value)} />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Notes (internal)</label>
        <input className="input-field" value={form.notes} onChange={e => set("notes", e.target.value)} />
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.isCrisisLine} onChange={e => set("isCrisisLine", e.target.checked)} className="rounded" />
          Crisis line (24/7)
        </label>
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <input type="checkbox" checked={form.isPublished} onChange={e => set("isPublished", e.target.checked)} className="rounded" />
          Published (visible to public)
        </label>
      </div>
      <div className="flex gap-3 pt-2">
        <button
          onClick={() => onSave(form)}
          disabled={isLoading}
          className="bg-primary text-white font-semibold px-5 py-2 rounded-lg text-sm hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
        >
          {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
          {initial ? "Save changes" : "Create resource"}
        </button>
        <button onClick={onCancel} className="border border-border px-5 py-2 rounded-lg text-sm hover:bg-muted">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Resources Tab ─────────────────────────────────────────────────────────────
function ResourcesTab() {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const utils = trpc.useUtils();

  const { data: resources = [], isLoading } = trpc.admin.resources.list.useQuery();
  const { data: categories = [] } = trpc.categories.list.useQuery();

  const create = trpc.admin.resources.create.useMutation({
    onSuccess: () => { toast.success("Resource created"); setShowForm(false); utils.admin.resources.list.invalidate(); },
    onError: () => toast.error("Failed to create resource"),
  });
  const update = trpc.admin.resources.update.useMutation({
    onSuccess: () => { toast.success("Resource updated"); setEditing(null); utils.admin.resources.list.invalidate(); },
    onError: () => toast.error("Failed to update resource"),
  });
  const del = trpc.admin.resources.delete.useMutation({
    onSuccess: () => { toast.success("Resource deleted"); utils.admin.resources.list.invalidate(); },
    onError: () => toast.error("Failed to delete resource"),
  });
  const verify = trpc.admin.resources.verify.useMutation({
    onSuccess: () => { toast.success("Marked as verified"); utils.admin.resources.list.invalidate(); },
    onError: () => toast.error("Failed to verify"),
  });
  const togglePublish = trpc.admin.resources.update.useMutation({
    onSuccess: () => { utils.admin.resources.list.invalidate(); },
  });

  const catName = (id: number) => categories.find(c => c.id === id)?.name ?? "—";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h2 className="font-serif text-xl font-bold">Resources ({resources.length})</h2>
        <div className="flex gap-2">
          <button
            onClick={() => {
              const csvData = utils.client.admin.exportCsv.query();
              csvData.then(rows => {
                if (!rows.length) { toast.error("No data to export"); return; }
                const headers = Object.keys(rows[0]);
                const csvContent = [
                  headers.join(","),
                  ...rows.map(row =>
                    headers.map(h => {
                      const val = String((row as any)[h] ?? "");
                      return val.includes(",") || val.includes('"') || val.includes("\n")
                        ? `"${val.replace(/"/g, '""')}"`
                        : val;
                    }).join(",")
                  ),
                ].join("\n");
                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = `eaglefeather-resources-${new Date().toISOString().split("T")[0]}.csv`;
                a.click();
                URL.revokeObjectURL(url);
                toast.success("CSV exported");
              }).catch(() => toast.error("Export failed"));
            }}
            className="border border-border text-foreground font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-muted"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button
            onClick={() => { setShowForm(true); setEditing(null); }}
            className="bg-primary text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:opacity-90"
          >
            <Plus className="w-4 h-4" /> Add resource
          </button>
        </div>
      </div>

      {(showForm && !editing) && (
        <ResourceForm
          categories={categories}
          onSave={(data) => create.mutate(data)}
          onCancel={() => setShowForm(false)}
          isLoading={create.isPending}
        />
      )}

      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 border-b border-border">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Name</th>
                <th className="text-left px-4 py-3 font-semibold hidden md:table-cell">Category</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Status</th>
                <th className="text-left px-4 py-3 font-semibold hidden lg:table-cell">Link</th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {resources.map(r => (
                <tr key={r.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-foreground">{r.name}</div>
                    {r.organization && <div className="text-xs text-muted-foreground">{r.organization}</div>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">{catName(r.categoryId)}</td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                      r.isPublished ? "bg-green-100 text-green-700" : "bg-muted text-muted-foreground"
                    }`}>
                      {r.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      {r.isPublished ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full font-medium ${
                      r.linkStatus === "ok" ? "bg-green-100 text-green-700" :
                      r.linkStatus === "broken" ? "bg-red-100 text-red-700" :
                      "bg-amber-100 text-amber-700"
                    }`}>
                      {r.linkStatus === "ok" ? <CheckCircle className="w-3 h-3" /> :
                       r.linkStatus === "broken" ? <AlertCircle className="w-3 h-3" /> :
                       <Clock className="w-3 h-3" />}
                      {r.linkStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => togglePublish.mutate({ id: r.id, isPublished: !r.isPublished })}
                        className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground"
                        title={r.isPublished ? "Unpublish" : "Publish"}
                      >
                        {r.isPublished ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => verify.mutate({ id: r.id })}
                        className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-green-600"
                        title="Mark as verified"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setEditing(r)}
                        className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-primary"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => { if (confirm(`Delete "${r.name}"?`)) del.mutate({ id: r.id }); }}
                        className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-destructive"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {editing?.id === r.id && (
                      <div className="mt-2">
                        <ResourceForm
                          initial={editing}
                          categories={categories}
                          onSave={(data) => update.mutate({ id: r.id, ...data })}
                          onCancel={() => setEditing(null)}
                          isLoading={update.isPending}
                        />
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Submissions Tab ───────────────────────────────────────────────────────────
function SubmissionsTab() {
  const utils = trpc.useUtils();
  const { data: submissions = [], isLoading } = trpc.admin.submissions.list.useQuery();
  const updateStatus = trpc.admin.submissions.updateStatus.useMutation({
    onSuccess: () => { toast.success("Status updated"); utils.admin.submissions.list.invalidate(); },
    onError: () => toast.error("Failed to update status"),
  });

  const statusColor = (s: string) =>
    s === "pending" ? "bg-amber-100 text-amber-700" :
    s === "approved" ? "bg-green-100 text-green-700" :
    "bg-red-100 text-red-700";

  return (
    <div className="space-y-4">
      <h2 className="font-serif text-xl font-bold">Community Submissions ({submissions.length})</h2>
      {isLoading ? (
        <div className="text-center py-8 text-muted-foreground">Loading...</div>
      ) : submissions.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground bg-white rounded-xl border border-border">
          No submissions yet.
        </div>
      ) : (
        <div className="space-y-3">
          {submissions.map(s => (
            <div key={s.id} className="bg-white rounded-xl border border-border p-5">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <h3 className="font-semibold text-base">{s.resourceName}</h3>
                  {s.url && <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary underline">{s.url}</a>}
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${statusColor(s.status)}`}>
                  {s.status}
                </span>
              </div>
              <div className="grid sm:grid-cols-3 gap-2 text-sm text-muted-foreground mb-3">
                {s.phone && <div><strong>Phone:</strong> {s.phone}</div>}
                {s.categorySlug && <div><strong>Category:</strong> {s.categorySlug}</div>}
                {s.province && <div><strong>Region:</strong> {s.province}</div>}
                {s.contactName && <div><strong>Submitted by:</strong> {s.contactName}</div>}
                {s.contactEmail && <div><strong>Email:</strong> {s.contactEmail}</div>}
                <div><strong>Date:</strong> {new Date(s.createdAt).toLocaleDateString("en-CA")}</div>
              </div>
              {s.description && <p className="text-sm text-foreground/80 mb-3">{s.description}</p>}
              {s.comment && <p className="text-sm text-muted-foreground italic mb-3">"{s.comment}"</p>}
              {s.status === "pending" && (
                <div className="flex gap-2">
                  <button
                    onClick={() => updateStatus.mutate({ id: s.id, status: "approved" })}
                    className="flex items-center gap-1 bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90"
                  >
                    <Check className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button
                    onClick={() => updateStatus.mutate({ id: s.id, status: "rejected" })}
                    className="flex items-center gap-1 bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg hover:opacity-90"
                  >
                    <X className="w-3.5 h-3.5" /> Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Link Health Tab ───────────────────────────────────────────────────────────
function LinkHealthTab() {
  const utils = trpc.useUtils();
  const { data: stats } = trpc.admin.linkHealth.stats.useQuery();
  const { data: broken = [] } = trpc.admin.linkHealth.brokenList.useQuery();
  const { data: reports = [] } = trpc.admin.linkHealth.reports.useQuery();

  const runCheck = trpc.admin.runLinkCheck.useMutation({
    onSuccess: (data) => {
      toast.success(`Link check complete: ${data.checked} checked, ${data.broken} broken.`);
      utils.admin.linkHealth.stats.invalidate();
      utils.admin.linkHealth.brokenList.invalidate();
    },
    onError: () => toast.error("Link check failed"),
  });

  const resolveReport = trpc.admin.linkHealth.resolveReport.useMutation({
    onSuccess: () => { toast.success("Report updated"); utils.admin.linkHealth.reports.invalidate(); },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-xl font-bold">Link Health Dashboard</h2>
        <button
          onClick={() => runCheck.mutate()}
          disabled={runCheck.isPending}
          className="bg-primary text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 hover:opacity-90 disabled:opacity-50"
        >
          {runCheck.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
          {runCheck.isPending ? "Checking..." : "Run link check"}
        </button>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total resources", value: stats.total, color: "text-foreground" },
            { label: "Links OK", value: stats.ok, color: "text-green-600" },
            { label: "Broken links", value: stats.broken, color: "text-red-600" },
            { label: "Needs review", value: stats.needsReview, color: "text-amber-600" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-xl border border-border p-4 text-center">
              <div className={`text-3xl font-bold font-serif ${s.color}`}>{s.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Broken links */}
      {broken.length > 0 && (
        <div>
          <h3 className="font-semibold text-base mb-3 flex items-center gap-2 text-red-700">
            <AlertCircle className="w-4 h-4" /> Broken links ({broken.length})
          </h3>
          <div className="space-y-2">
            {broken.map(r => (
              <div key={r.id} className="bg-white rounded-lg border border-red-200 p-4 flex items-center justify-between gap-4">
                <div>
                  <div className="font-medium text-sm">{r.name}</div>
                  <a href={r.url ?? "#"} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground underline">{r.url}</a>
                  {r.httpStatus != null && <span className="ml-2 text-xs text-red-600">HTTP {r.httpStatus}</span>}
                </div>
                <Link href={`/resource/${r.id}`} className="text-xs text-primary underline no-underline hover:underline">
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User reports */}
      <div>
        <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
          <Flag className="w-4 h-4" /> User reports ({reports.length})
        </h3>
        {reports.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground bg-white rounded-xl border border-border text-sm">
            No reports yet.
          </div>
        ) : (
          <div className="space-y-2">
            {reports.map(rep => (
              <div key={rep.id} className="bg-white rounded-lg border border-border p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-medium">Resource #{rep.resourceId}</div>
                    {rep.reporterEmail && <div className="text-xs text-muted-foreground">From: {rep.reporterEmail}</div>}
                    {rep.comment && <p className="text-sm text-foreground/80 mt-1">"{rep.comment}"</p>}
                    <div className="text-xs text-muted-foreground mt-1">{new Date(rep.createdAt).toLocaleDateString("en-CA")}</div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      rep.status === "pending" ? "bg-amber-100 text-amber-700" :
                      rep.status === "reviewed" ? "bg-blue-100 text-blue-700" :
                      "bg-green-100 text-green-700"
                    }`}>{rep.status}</span>
                    {rep.status === "pending" && (
                      <button
                        onClick={() => resolveReport.mutate({ id: rep.id, status: "reviewed" })}
                        className="text-xs bg-primary text-white px-2 py-0.5 rounded font-medium hover:opacity-90"
                      >
                        Mark reviewed
                      </button>
                    )}
                    {rep.status === "reviewed" && (
                      <button
                        onClick={() => resolveReport.mutate({ id: rep.id, status: "resolved" })}
                        className="text-xs bg-green-600 text-white px-2 py-0.5 rounded font-medium hover:opacity-90"
                      >
                        Resolve
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Admin Page ───────────────────────────────────────────────────────────
export default function Admin() {
  const [tab, setTab] = useState<AdminTab>("resources");
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <PageLayout>
        <div className="container py-20 text-center text-muted-foreground">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" />
          Checking access...
        </div>
      </PageLayout>
    );
  }

  if (!user) {
    return (
      <PageLayout>
        <div className="container py-20 text-center max-w-md">
          <h1 className="font-serif text-2xl font-bold mb-3">Admin access required</h1>
          <p className="text-muted-foreground mb-6">Please sign in to access the admin panel.</p>
          <a href={getLoginUrl()} className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 no-underline">
            Sign in
          </a>
        </div>
      </PageLayout>
    );
  }

  if (user.role !== "admin") {
    return (
      <PageLayout>
        <div className="container py-20 text-center max-w-md">
          <h1 className="font-serif text-2xl font-bold mb-3">Access denied</h1>
          <p className="text-muted-foreground mb-6">You don't have admin access to this site.</p>
          <Link href="/" className="text-primary underline">Return home</Link>
        </div>
      </PageLayout>
    );
  }

  const tabs = [
    { id: "resources" as AdminTab, label: "Resources", icon: <FileText className="w-4 h-4" /> },
    { id: "submissions" as AdminTab, label: "Submissions", icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: "link-health" as AdminTab, label: "Link Health", icon: <Link2 className="w-4 h-4" /> },
  ];

  return (
    <PageLayout>
      <div className="bg-white border-b border-border py-6">
        <div className="container">
          <div className="flex items-center gap-3 mb-1">
            <Link href="/" className="text-muted-foreground hover:text-foreground no-underline">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <p className="text-sm font-semibold uppercase tracking-widest text-secondary">Admin</p>
          </div>
          <h1 className="font-serif text-2xl font-bold">EagleFeather Admin Panel</h1>
          <p className="text-sm text-muted-foreground mt-1">Signed in as {user.name ?? user.email} · {user.role}</p>
        </div>
      </div>

      <div className="container py-8">
        {/* Tabs */}
        <div className="flex gap-1 bg-muted rounded-lg p-1 mb-8 w-fit">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                tab === t.id ? "bg-white text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>

        {tab === "resources" && <ResourcesTab />}
        {tab === "submissions" && <SubmissionsTab />}
        {tab === "link-health" && <LinkHealthTab />}
      </div>
    </PageLayout>
  );
}
