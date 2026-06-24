"use client";

import { useState } from "react";

export default function QuotePage() {
const [status, setStatus] = useState("");

async function handleSubmit(
e: React.FormEvent<HTMLFormElement>
) {
e.preventDefault();

const form = e.currentTarget;
const formData = new FormData(form);

const response = await fetch("/api/contact", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    service: formData.get("service"),
    message: formData.get("message"),
  }),
});

const data = await response.json();

if (data.success) {
  window.location.href = "/quote-success";
} else {
  setStatus("Sorry, something went wrong. Please try again.");
}

}

return ( <main className="min-h-screen py-20 px-6"> <div className="max-w-4xl mx-auto">

    <h1 className="text-5xl font-bold mb-4">
      Request a Free Quote
    </h1>

    <p className="text-xl mb-10">
      Need help around the home? Tell me a little about your project and I'll get back to you as soon as possible with a free, no-obligation quote.
    </p>

    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      <input
        name="name"
        placeholder="Your Name"
        required
        className="w-full border p-4 rounded-lg"
      />

      <input
        name="phone"
        placeholder="Phone Number"
        required
        className="w-full border p-4 rounded-lg"
      />

      <input
        name="email"
        type="email"
        placeholder="Email Address"
        required
        className="w-full border p-4 rounded-lg"
      />

      <select
        name="service"
        required
        className="w-full border p-4 rounded-lg"
      >
        <option value="">Select a Service</option>
        <option>Home Repairs</option>
        <option>Property Maintenance</option>
        <option>Fence Repairs</option>
        <option>Gate Repairs</option>
        <option>Security Camera Installation</option>
        <option>Smart Home Setup</option>
        <option>Computer Assistance</option>
        <option>Wi-Fi Troubleshooting</option>
        <option>Flat-Pack Furniture Assembly</option>
        <option>Gutter Cleaning</option>
        <option>Pressure Washing</option>
        <option>Senior Assistance</option>
        <option>Home Safety Modifications</option>
        <option>Other</option>
      </select>

      <textarea
        name="message"
        placeholder="Tell Gary about your project..."
        rows={6}
        required
        className="w-full border p-4 rounded-lg"
      />

      <button
        type="submit"
        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold"
      >
        Request Quote
      </button>

    </form>

    {status && (
      <p className="mt-6 text-red-600 font-semibold">
        {status}
      </p>
    )}

  </div>
</main>
);
}