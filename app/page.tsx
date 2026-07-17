import Link from "next/link";
import Image from "next/image";

const services = [
  {
    title: "Home Maintenance",
    icon: "🏠",
    description:
      "Repairs, fencing, decking, painting and general handyman services.",
    href: "/home-maintenance",
    quote: "/quote?service=home-maintenance",
  },
  {
    title: "Technology & Digital Services",
    icon: "💻",
    description:
      "Website development, IT support, Wi-Fi, computers and small business technology.",
    href: "/technology",
    quote: "/quote?service=technology",
  },
  {
    title: "Security Cameras",
    icon: "📷",
    description:
      "Supply, installation, setup and remote viewing solutions.",
    href: "/security-cameras",
    quote: "/quote?service=security-cameras",
  },
  {
    title: "Social Support",
    icon: "❤️",
    description:
      "Transport, shopping assistance, technology help and companionship.",
    href: "/social-support",
    quote: "/quote?service=social-support",
  },
];

const towns = [
  "Inverloch","Wonthaggi","San Remo","Venus Bay",
  "Leongatha","Korumburra","Cape Paterson","Foster","Fish Creek",
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">

      <section className="relative h-[560px] md:h-[720px]">
        <Image
          src="/images/hero.jpg"
          alt="Gary the Handyman"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center">
          <div className="max-w-6xl mx-auto px-6 w-full">
            <div className="max-w-2xl ml-auto text-right text-white">

              <p className="uppercase tracking-widest text-orange-300 font-semibold mb-3">
                Local • Reliable • Professional • NDIS Approved
              </p>

              <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
                Helping Homes & Small Businesses Across South Gippsland
              </h1>

              <p className="text-lg md:text-xl leading-relaxed mb-8">
                Home maintenance, website development, technology support,
                security camera installation and social support services.
              </p>

              <div className="flex flex-wrap justify-end gap-3 mb-8">
                {["Local Business","Free Quotes","Quality Work","NDIS Approved"].map((item)=>(
                  <span key={item} className="bg-white/15 backdrop-blur px-4 py-2 rounded-full text-sm">
                    ✓ {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <Link href="/quote"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-center">
                  Request a Free Quote
                </Link>

                <a href="tel:0409709234"
                  className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-center">
                  📞 Call Gary
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-4">
            Our Services
          </h2>

          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Professional, friendly service backed by honest advice and quality workmanship.
          </p>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service)=>(
              <div key={service.title}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-8 border">

                <div className="text-5xl mb-4">{service.icon}</div>

                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>

                <p className="text-gray-600 mb-8">
                  {service.description}
                </p>

                <div className="flex gap-3 flex-wrap">
                  <Link href={service.href}
                    className="bg-slate-900 text-white px-5 py-3 rounded-lg hover:bg-slate-800">
                    Learn More
                  </Link>

                  <Link href={service.quote}
                    className="bg-orange-500 text-white px-5 py-3 rounded-lg hover:bg-orange-600">
                    Request Quote
                  </Link>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-12">
            Why Choose Gary?
          </h2>

          <div className="grid md:grid-cols-5 gap-6">
            {[
              "Reliable",
              "Friendly Service",
              "Affordable Pricing",
              "Quality Workmanship",
              "NDIS Approved"
            ].map((item)=>(
              <div key={item}
                className="bg-white border rounded-xl shadow p-6 font-semibold">
                ✓<br />{item}
              </div>
            ))}
          </div>

        </div>
      </section>

      <section className="bg-gray-100 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Service Areas
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {towns.map((town)=>(
              <div key={town}
                className="bg-white rounded-lg shadow p-4 text-center">
                {town}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-slate-900 text-white rounded-2xl p-10 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>

          <p className="text-xl mb-8">
            Request your free, no-obligation quote today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/quote"
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg font-semibold">
              Request a Quote
            </Link>

            <a href="tel:0409709234"
              className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold">
              📞 0409 709 234
            </a>
          </div>
        </div>
      </section>

      
    </main>
  );
}