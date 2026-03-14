import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { PageLayout } from "@/components/Layout";

// Admin panel is disabled in static deployment mode.
// Authentication and server-side operations are not available.

export default function Admin() {
  return (
    <PageLayout>
      <div className="container py-20 text-center max-w-md">
        <h1 className="font-serif text-2xl font-bold mb-3">Admin Panel Unavailable</h1>
        <p className="text-muted-foreground mb-6">
          The admin panel is not available in static deployment mode.
          Administrative functions require a backend server.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 text-primary underline">
          <ArrowLeft className="w-4 h-4" /> Return home
        </Link>
      </div>
    </PageLayout>
  );
}
