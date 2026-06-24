"use client";

import { useState } from "react";

export default function ContactPage() {
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
      setStatus("Quote request sent successfully!");
      form.reset();
    } else {
      setStatus("Sorry, something went wrong.");
    }
  }

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-bold mb-4">
          Request a Quote
        </h1>

        <p className="text-xl mb-10">
          Need help around the home? Fill out the form below and Gary will get back to you.
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

          <input
            name="service"
            placeholder="Service Required"
            className="w-full border p-4 rounded-lg"
          />

          <textarea
            name="message"
            placeholder="Tell Gary about your project..."
            rows={6}
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
          <p className="mt-6 font-semibold">
            {status}
          </p>
        )}

      </div>
    </main>
  );
}