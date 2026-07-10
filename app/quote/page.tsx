"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import AddressAutocomplete from "@/components/forms/AddressAutocomplete";
export default function QuotePage() {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const [suburb, setSuburb] = useState("");
  const [state, setState] = useState("VIC");
  const [postcode, setPostcode] = useState("");
  const [addressSelected, setAddressSelected] = useState(false);
  const [addressError, setAddressError] = useState("");
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInput = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLDivElement>(null);
  async function handleSubmit(
  e: React.FormEvent<HTMLFormElement>
) {
  e.preventDefault();

  if (!addressSelected || !suburb || !postcode) {
    setAddressError(
      "Please select your address from the Google suggestions."
    );
    return;
  }

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

              <div ref={addressRef}>
  <label className="mb-2 block text-sm font-semibold text-slate-700">
    Property Address <span className="text-red-600">*</span>
  </label>

  <AddressAutocomplete
    value={address}
    onChange={(value) => {
      setAddress(value);
      setAddressSelected(false);
      setSuburb("");
      setState("VIC");
      setPostcode("");
      setAddressError("");
    }}
    onAddressSelected={(selected) => {
      setAddress(selected.formattedAddress);
      setSuburb(selected.suburb);
      setState(selected.state);
      setPostcode(selected.postcode);
      setAddressSelected(true);
      setAddressError("");
    }}
    placeholder="Property Address *"
  />
</div>

<input
  type="hidden"
  name="address"
  value={address}
/>

<input
  type="hidden"
  name="suburb"
  value={suburb}
/>

<input
  type="hidden"
  name="state"
  value={state}
/>

<input
  type="hidden"
  name="postcode"
  value={postcode}
/>
{addressError && (
  <p className="mt-2 text-sm font-medium text-red-600">
    ⚠ {addressError}
  </p>
)}
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
  ref={fileInput}
  type="file"
  name="photos"
  multiple
  accept=".jpg,.jpeg,.png,.heic,.pdf"
  className="hidden"
  onChange={(e) => {
    const files = Array.from(e.target.files ?? []);

    if (files.length > 5) {
      alert("Maximum 5 photos may be uploaded.");
      return;
    }

    setSelectedFiles(files);

    const previews = files
      .filter((file) => file.type.startsWith("image/"))
      .map((file) => URL.createObjectURL(file));

    setPhotoPreviews(previews);
  }}
/>

<button
  type="button"
  onClick={() => fileInput.current?.click()}
  className="w-full rounded-xl border-2 border-dashed border-blue-300 bg-blue-50 py-8 transition hover:border-blue-500 hover:bg-blue-100"
>

  <div className="text-5xl mb-3">
    📷
  </div>

  <div className="text-xl font-bold text-slate-700">
    Browse Photos
  </div>

  <p className="mt-2 text-sm text-slate-500">
    JPG • PNG • HEIC • PDF
  </p>

  <p className="text-sm text-slate-500">
    Maximum 5 photos
  </p>

</button>
{photoPreviews.length > 0 && (

  <div className="mt-6">

    <h3 className="mb-4 text-lg font-semibold">

      Selected Photos ({selectedFiles.length})

    </h3>

    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

      {photoPreviews.map((preview, index) => (

        <div
          key={index}
          className="overflow-hidden rounded-xl border bg-white shadow"
        >

          <img
            src={preview}
            alt={`Preview ${index + 1}`}
            className="aspect-square w-full object-cover"
          />

          <div className="border-t bg-slate-50 p-2 text-center">

            <p className="truncate text-xs">

              {selectedFiles[index].name}

            </p>

          </div>

        </div>

      ))}

    </div>

  </div>

)}

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
