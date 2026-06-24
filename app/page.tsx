import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[650px]">
  <Image
    src="/images/hero.jpg"
    alt="Gary the Handyman"
    fill
    className="object-cover"
    priority
  />

  <div className="absolute inset-0 bg-black/50 flex items-center">
    <div className="max-w-6xl mx-auto w-full px-6">

```
  <div className="max-w-2xl text-left text-white">

    <h1 className="text-4xl md:text-6xl font-bold mb-6">
      Trusted Handyman Services Across South Gippsland
    </h1>

    <p className="text-lg md:text-xl mb-8 leading-relaxed">
      Home repairs, property maintenance, security camera installation,
      technology support and senior assistance throughout Inverloch
      and surrounding areas.
    </p>

    <div className="flex flex-col sm:flex-row gap-4">

      <a
        href="tel:0409709234"
        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-center"
      >
        📞 Call Now
      </a>

      <a
        href="/quote"
        className="bg-white text-slate-900 px-8 py-4 rounded-lg font-semibold text-center hover:bg-gray-100"
      >
        Request a Free Quote
      </a>

    </div>

  </div>

</div>
```

  </div>
</section>


      {/* Services */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Services
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              "Home Repairs",
              "Property Maintenance",
              "Fence Repairs",
              "Gate Repairs",
              "Security Camera Installation",
              "Smart Home Setup",
              "Computer Assistance",
              "Wi-Fi Troubleshooting",
              "Pressure Washing",
              "Senior Assistance",
            ].map((service) => (
              <div
                key={service}
                className="border rounded-lg p-6 shadow-sm hover:shadow-md"
              >
                <h3 className="font-semibold text-lg">
                  {service}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Service Areas
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              "Inverloch",
              "Wonthaggi",
              "Venus Bay",
              "Leongatha",
              "Korumburra",
              "Cape Paterson",
              "Foster",
              "Fish Creek",
            ].map((town) => (
              <div
                key={town}
                className="bg-white p-4 rounded shadow"
              >
                {town}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Get In Touch
          </h2>

          <p className="text-xl mb-4">
            📞 0409 709 234
          </p>

          <p className="text-xl mb-8">
            ✉️ garythehandyman26@gmail.com
          </p>

          <a
            href="tel:0409709234"
            className="bg-orange-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600"
          >
            Call Gary Today
          </a>
        </div>
      </section>
    </main>
  );
}
