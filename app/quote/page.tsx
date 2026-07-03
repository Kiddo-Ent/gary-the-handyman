"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function QuotePage() {
  const [status, setStatus] = useState("");
  const searchParams = useSearchParams();
  const serviceKey = searchParams.get("service") || "";

  const services: Record<string,{title:string;intro:string;value:string;placeholder:string;}> = {
    "home-maintenance":{
      title:"Request a Home Maintenance Quote",
      intro:"Tell me about the repairs or maintenance you'd like completed.",
      value:"Home Maintenance",
      placeholder:"Describe the work you'd like completed. Include what needs repairing, approximate sizes, materials if known, and whether the work is urgent."
    },
    technology:{
      title:"Request a Technology Quote",
      intro:"Tell me about your website, computer, Wi-Fi or technology project.",
      value:"Technology & Digital Services",
      placeholder:"Tell me about your project. For example: a new website, computer issues, Wi-Fi problems, printer setup, email assistance or business technology requirements."
    },
    "security-cameras":{
      title:"Request a Security Camera Quote",
      intro:"Tell me about your property and the type of security camera system you're looking for.",
      value:"Security Camera Installation",
      placeholder:"Tell me about your property. How many cameras are you considering? Which areas would you like monitored? Do you already own cameras or would you like recommendations?"
    },
    "social-support":{
      title:"Request Social Support",
      intro:"Tell me how I can help you or your family.",
      value:"Social Support",
      placeholder:"Tell me a little about the support you're looking for. For example: transport, shopping assistance, technology help, companionship or general day-to-day support."
    }
  };

  const current = services[serviceKey] || {
    title:"Request a Free Quote",
    intro:"Tell me a little about your project and I'll get back to you as soon as possible with a free, no-obligation quote.",
    value:"",
    placeholder:"Please tell me about your project. The more information you provide, the easier it will be for me to prepare an accurate quote."
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form=e.currentTarget;
    const formData=new FormData(form);
    const response=await fetch("/api/contact",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        name:formData.get("name"),
        phone:formData.get("phone"),
        email:formData.get("email"),
        service:formData.get("service"),
        message:formData.get("message"),
      }),
    });
    const data=await response.json();
    if(data.success){window.location.href="/quote-success";}
    else{setStatus("Sorry, something went wrong. Please try again.");}
  }

  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-4">{current.title}</h1>
        <p className="text-xl mb-10">{current.intro}</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <input name="name" placeholder="Your Name" required className="w-full border p-4 rounded-lg"/>
          <input name="phone" placeholder="Phone Number" required className="w-full border p-4 rounded-lg"/>
          <input name="email" type="email" placeholder="Email Address" required className="w-full border p-4 rounded-lg"/>

          {current.value ? (
            <>
              <label className="block font-semibold text-gray-700">Service Requested</label>
              <input type="text" value={current.value} readOnly className="w-full border p-4 rounded-lg bg-gray-100"/>
              <input type="hidden" name="service" value={current.value}/>
            </>
          ) : (
            <select name="service" required className="w-full border p-4 rounded-lg">
              <option value="">Select a Service</option>
              <option>Home Maintenance</option>
              <option>Technology & Digital Services</option>
              <option>Security Camera Installation</option>
              <option>Social Support</option>
              <option>Other</option>
            </select>
          )}

          <textarea name="message" placeholder={current.placeholder} rows={8} required className="w-full border p-4 rounded-lg"/>

          <button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold">
            Request Quote
          </button>
        </form>

        {status && <p className="mt-6 text-red-600 font-semibold">{status}</p>}
      </div>
    </main>
  );
}
