import Link from "next/link";
import Image from "next/image";

export default function TechnologyPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative h-[450px] md:h-[550px]">
        <Image
          src="/images/technology.jpg"
          alt="Technology & Digital Services"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55 flex items-center">
          <div className="max-w-6xl mx-auto px-6 text-white">

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Technology & Digital Services
            </h1>

            <p className="text-xl max-w-2xl">
              Affordable technology solutions for homes and small
              businesses throughout South Gippsland.
            </p>

          </div>
        </div>
      </section>

      {/* Introduction */}

      <section className="py-20 px-6">

        <div className="max-w-5xl mx-auto">

          <h2 className="text-4xl font-bold mb-8">
            Technology Doesn't Need To Be Complicated
          </h2>

          <p className="text-lg text-gray-700 leading-8 mb-6">
            Whether you're setting up a new computer, creating a
            professional website, improving your Wi-Fi coverage or
            looking for custom business software, I can help.
          </p>

          <p className="text-lg text-gray-700 leading-8">
            My goal is to provide practical, affordable technology
            solutions without confusing technical jargon.
          </p>

        </div>

      </section>

      {/* Services */}

      <section className="bg-gray-50 py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-12">
            Technology Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              "Website Design",
              "Website Development",
              "Computer Setup",
              "Computer Repairs",
              "Wi-Fi Troubleshooting",
              "Printer Installation",
              "Email Assistance",
              "Google Business Profile Setup",
              "Business IT Support",
              "Security Camera Configuration",
              "Smart Home Setup",
              "Custom Business Software",
            ].map((service) => (

              <div
                key={service}
                className="bg-white rounded-xl shadow border p-6 hover:shadow-lg transition"
              >
                <div className="text-orange-500 text-3xl mb-4">
                  ✓
                </div>

                <h3 className="font-semibold text-xl">
                  {service}
                </h3>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Why Choose Gary */}

      <section className="py-20 px-6">

        <div className="max-w-5xl mx-auto">

          <h2 className="text-4xl font-bold mb-8">
            Why Choose Gary?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white shadow rounded-xl border p-8">

              <h3 className="font-bold text-2xl mb-4">
                Local Support
              </h3>

              <p>
                Friendly local service with the ability to explain
                technology in plain English.
              </p>

            </div>

            <div className="bg-white shadow rounded-xl border p-8">

              <h3 className="font-bold text-2xl mb-4">
                Practical Solutions
              </h3>

              <p>
                No unnecessary upselling — just solutions that suit
                your home or business.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Future Portfolio */}

      <section className="bg-gray-100 py-20 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-6">
            Recent Projects
          </h2>

          <p className="text-xl text-gray-600">
            This section will soon showcase websites,
            software and technology projects completed
            for local customers.
          </p>

        </div>

      </section>

      {/* Call To Action */}

      <section className="py-20 px-6">

        <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl text-white text-center p-10">

          <h2 className="text-4xl font-bold mb-6">
            Ready To Get Started?
          </h2>

          <p className="text-xl mb-8">
            Whether you need a new website, help with your
            computer or technology advice, I'd love to help.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <Link
              href="/quote?service=technology"
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg font-semibold"
            >
              Request a Technology Quote
            </Link>

            <a
              href="tel:0409709234"
              className="bg-white text-slate-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold"
            >
              📞 Call Gary
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}