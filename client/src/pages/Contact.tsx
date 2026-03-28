import { Feather, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { PageLayout } from "@/components/Layout";
import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setSending(true);
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: "f642c143-997e-4d9e-9be2-7b9917152700",
          subject: `[EagleFeather] ${formData.subject || "General Inquiry"} from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          organization: formData.organization || "N/A",
          topic: formData.subject || "N/A",
          message: formData.message,
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      }
    } catch {
      alert("Something went wrong. Please try again or email info@eaglefeather.ca directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <PageLayout>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0d2b26] to-[#0A6E60] text-white py-14">
        <div className="container max-w-3xl">
          <div className="flex items-center gap-2 mb-4">
            <Feather className="w-6 h-6 text-[#f5c07a]" />
            <p className="text-sm font-semibold uppercase tracking-widest text-white/60">Contact Us</p>
          </div>
          <h1 className="font-serif text-4xl font-bold mb-4">
            Get in touch.
          </h1>
          <p className="text-white/80 text-lg leading-relaxed">
            Have a question, suggestion, or want to submit a resource? We'd love to hear from you.
          </p>
        </div>
      </section>

      <div className="container max-w-4xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Mail className="w-4 h-4 text-[#0A6E60]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0A6E60]">Email</span>
              </div>
              <a href="mailto:info@eaglefeather.ca" className="text-sm text-gray-700 hover:text-[#0A6E60] transition-colors">
                info@eaglefeather.ca
              </a>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-[#0A6E60]" />
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0A6E60]">Response Time</span>
              </div>
              <p className="text-sm text-gray-600">We aim to respond within 3–5 business days.</p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-[#0A6E60]/10 border border-[#0A6E60]/30 rounded-lg p-10 text-center">
                <CheckCircle className="w-12 h-12 text-[#0A6E60] mx-auto mb-4" />
                <h3 className="font-serif text-2xl font-bold text-[#0d2b26] mb-3">Message received.</h3>
                <p className="text-gray-600 mb-6">Thank you for reaching out. We'll get back to you within 3–5 business days.</p>
                <button
                  onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", organization: "", subject: "", message: "" }); }}
                  className="text-sm text-[#0A6E60] underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A6E60] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your@email.com"
                      className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A6E60] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                    Organization / Community
                  </label>
                  <input
                    type="text"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    placeholder="Your organization (optional)"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A6E60] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                    Subject
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A6E60] transition-colors bg-white"
                  >
                    <option value="">Select a topic</option>
                    <option value="Resource Submission">Resource Submission</option>
                    <option value="Correction / Update">Correction / Update</option>
                    <option value="Partnership">Partnership</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1.5">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="How can we help?"
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-[#0A6E60] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-2 bg-[#0A6E60] text-white px-6 py-3 rounded-lg font-medium text-sm hover:bg-[#085c50] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? "Sending..." : "Send Message"} <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
