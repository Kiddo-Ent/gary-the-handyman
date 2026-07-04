"use client";

import { useState } from "react";

export default function QuotePage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    const formData = new FormData(e.currentTarget);

    const response = await fetch("/api/contact/quote-request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        first_name: formData.get("first_name"),
        last_name: formData.get("last_name"),
        company_name: formData.get("company_name"),
        mobile_phone: formData.get("mobile_phone"),
        email: formData.get("email"),
        address_line_1: formData.get("address_line_1"),
        address_line_2: formData.get("address_line_2"),
        suburb: formData.get("suburb"),
        state: formData.get("state"),
        postcode: formData.get("postcode"),
        service_required: formData.get("service_required"),
        description: formData.get("description"),
        preferred_date: formData.get("preferred_date"),
        estimated_budget: formData.get("estimated_budget")
      })
    });

    const result = await response.json();

    if (result.success) {
      window.location.href = "/quote-success";
      return;
    }

    setLoading(false);
    setStatus(result.message || "Unable to submit quote request.");
  }

  return (
    <main className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-10 shadow-xl">
        <h1 className="text-4xl font-bold">Request a Free Quote</h1>
        <p className="mt-3 text-slate-600">
          Complete the form below and Gary will contact you as soon as possible.
        </p>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          <input name="first_name" required placeholder="First Name" className="w-full rounded-xl border p-4" />
          <input name="last_name" required placeholder="Last Name" className="w-full rounded-xl border p-4" />
          <input name="company_name" placeholder="Company (Optional)" className="w-full rounded-xl border p-4" />
          <input name="mobile_phone" required placeholder="Mobile Phone" className="w-full rounded-xl border p-4" />
          <input name="email" type="email" required placeholder="Email" className="w-full rounded-xl border p-4" />
          <input name="address_line_1" required placeholder="Street Address" className="w-full rounded-xl border p-4" />
          <input name="address_line_2" placeholder="Address Line 2" className="w-full rounded-xl border p-4" />
          <input name="suburb" required placeholder="Suburb" className="w-full rounded-xl border p-4" />
          <select name="state" defaultValue="VIC" className="w-full rounded-xl border p-4">
            <option>VIC</option><option>NSW</option><option>QLD</option><option>SA</option>
            <option>WA</option><option>TAS</option><option>ACT</option><option>NT</option>
          </select>
          <input name="postcode" required placeholder="Postcode" className="w-full rounded-xl border p-4" />
          <select name="service_required" defaultValue="" className="w-full rounded-xl border p-4">
            <option value="">Select a Service</option>
            <option>Home Maintenance</option>
            <option>Technology & Digital Services</option>
            <option>Security Camera Installation</option>
            <option>Social Support</option>
            <option>Other</option>
          </select>
          <textarea name="description" rows={8} required placeholder="Describe your project..." className="w-full rounded-xl border p-4" />
          <input type="date" name="preferred_date" className="w-full rounded-xl border p-4" />
          <input type="number" name="estimated_budget" placeholder="Estimated Budget" className="w-full rounded-xl border p-4" />
          <label><input type="checkbox" required /> I agree to the Privacy Policy.</label>
          <button type="submit" disabled={loading} className="rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white">
            {loading ? "Submitting..." : "Request My Free Quote"}
          </button>
          {status && <p>{status}</p>}
        </form>
      </div>
    </main>
  );
}