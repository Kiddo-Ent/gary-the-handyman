"use client";

import { useState } from "react";
import Link from "next/link";

export default function QuotePage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        window.location.href = "/quote/success";
      } else {
        alert("Sorry, something went wrong. Please try again.");
      }
    } catch {
      alert("Unable to send your request.");
    }

    setLoading(false);
  }

  return (
    <main className="bg-gray-50 min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-4xl font-bold text-center text-slate-800">
          Request Your Free Quote
        </h1>

        <p className="text-center text-gray-600 mt-4 mb-10">
          Tell Gary a little about your project and he'll get back to you with a
          free, no-obligation quote.
        </p>

        <form onSubmit={handleSubmit} className="space-y-8">

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Details</h2>

            <div className="grid md:grid-cols-2 gap-6">

              <input
                name="name"
                required
                placeholder="Full Name *"
                className="border rounded-lg p-3 w-full"
              />

              <input
                name="phone"
                required
                placeholder="Phone Number *"
                className="border rounded-lg p-3 w-full"
              />

              <input
                type="email"
                name="email"
                required
                placeholder="Email Address *"
                className="border rounded-lg p-3 w-full"
              />

              <input
                name="address"
                placeholder="Property Address (Optional)"
                className="border rounded-lg p-3 w-full"
              />

            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Service Required</h2>

            <select
              name="service"
              required
              className="border rounded-lg p-3 w-full"
            >
              <option value="">Select a service...</option>
              <option>Home Repairs</option>
              <option>Property Maintenance</option>
              <option>Fence Repairs</option>
              <option>Gate Repairs</option>
              <option>Security Camera Installation</option>
              <option>Smart Home Setup</option>
              <option>Computer Assistance</option>
              <option>Wi-Fi Troubleshooting</option>
              <option>Senior Assistance</option>
              <option>Home Safety Modifications</option>
              <option>Other</option>
            </select>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Describe Your Job</h2>

            <textarea
              name="message"
              required
              rows={6}
              placeholder="Describe the work required..."
              className="border rounded-lg p-3 w-full"
            />

            <p className="text-sm text-gray-500 mt-2">
              The more information you provide, the more accurate your quote
              will be.
            </p>
          </section>

          <section className="grid md:grid-cols-2 gap-6">

            <div>
              <h2 className="text-xl font-semibold mb-3">
                Preferred Contact
              </h2>

              <select
                name="contactMethod"
                className="border rounded-lg p-3 w-full"
              >
                <option>Phone Call</option>
                <option>SMS</option>
                <option>Email</option>
              </select>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">
                Preferred Inspection
              </h2>

              <select
                name="inspection"
                className="border rounded-lg p-3 w-full"
              >
                <option>Please contact me first</option>
                <option>Weekday Morning</option>
                <option>Weekday Afternoon</option>
                <option>Weekend</option>
              </select>
            </div>

          </section>

          <section>

            <h2 className="text-2xl font-semibold mb-4">
              Upload Photos (Optional)
            </h2>

            <input
              type="file"
              name="photos"
              multiple
              accept=".jpg,.jpeg,.png,.heic,.pdf"
              className="border rounded-lg p-3 w-full"
            />

            <p className="text-sm text-gray-500 mt-2">
              Upload up to 5 photos to help Gary prepare a more accurate quote.
            </p>

          </section>

          <section>

            <label className="flex gap-3 items-start">

              <input type="checkbox" required className="mt-1"/>

              <span className="text-sm text-gray-700">
                I have read and agree to the{" "}
                <Link
                  href="/privacy"
                  target="_blank"
                  className="text-blue-600 underline"
                >
                  Privacy Policy
                </Link>.
              </span>

            </label>

          </section>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-t pt-8">

            <p className="text-gray-600 text-sm">
              🔒 Your details are used only to prepare your quote and respond to
              your enquiry.
            </p>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition"
            >
              {loading ? "Sending..." : "Request My FREE Quote"}
            </button>

          </div>

        </form>

      </div>
    </main>
  );
}
