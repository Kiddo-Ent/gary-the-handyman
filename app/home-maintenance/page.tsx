import Link from "next/link";
import Image from "next/image";

export default function HomeMaintenancePage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative h-[450px] md:h-[550px]">
        <Image
          src="/images/home-maintenance.jpg"
          alt="Home Maintenance"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55 flex items-center">
          <div className="max-w-6xl mx-auto px-6 text-white">

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Home Maintenance
            </h1>

            <p className="text-xl max-w-2xl">
              Reliable handyman services, property maintenance and home
              repairs throughout South Gippsland.
            </p>

          </div>
        </div>
      </section>

      {/* Introduction */}

      <section className="py-20 px-6">

        <div className="max-w-5xl mx-auto">

          <h2 className="text-4xl font-bold mb-8">
            Keeping Your Home Looking Its Best
          </h2>

          <p className="text-lg leading-8 text-gray-700 mb-6">
            Whether it's a small repair that's been on your to-do list or
            ongoing property maintenance, I provide reliable workmanship
            with attention to detail and friendly service.
          </p>

          <p className="text-lg leading-8 text-gray-700">
            No job is too small. I pride myself on turning up when I say I
            will, communicating clearly and completing work to a high
            standard.
          </p>

        </div>

      </section>

      {/* Services */}

      <section className="bg-gray-50 py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-12">
            Home Maintenance Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              "General Handyman Repairs",
              "Fence Repairs",
              "Gate Repairs",
              "Deck Repairs",
              "Pergola Repairs",
              "Painting & Touch Ups",
              "Pressure Washing",
              "Property Maintenance",
              "Flat Pack Assembly",
              "Door & Lock Repairs",
              "Minor Carpentry",
              "General Odd Jobs",
            ].map((service) => (

              <div
                key={service}
                className="bg-white rounded-xl shadow border p-6 hover:shadow-lg transition"
              >
                <div className="text-orange-500 text-3xl mb-4">
                  ✓
                </div>

                <h3 className="text-xl font-semibold">
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

          <h2 className="text-4xl font-bold mb-10">
            Why Choose Gary?
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="border rounded-xl shadow p-8">

              <h3 className="text-2xl font-bold mb-4">
                Reliable Service
              </h3>

              <p>
                Honest advice, quality workmanship and dependable service
                from someone who genuinely cares about doing the job
                properly.
              </p>

            </div>

            <div className="border rounded-xl shadow p-8">

              <h3 className="text-2xl font-bold mb-4">
                Local Knowledge
              </h3>

              <p>
                Proudly servicing homes throughout South Gippsland with
                practical solutions tailored to your property.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Future Gallery */}

      <section className="bg-gray-100 py-20 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-6">
            Recent Projects
          </h2>

          <p className="text-xl text-gray-600">
            Photos of recent home maintenance and repair projects will be
            added here soon.
          </p>

        </div>

      </section>

      {/* Call To Action */}

      <section className="py-20 px-6">

        <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl text-white text-center p-10">

          <h2 className="text-4xl font-bold mb-6">
            Need Something Fixed?
          </h2>

          <p className="text-xl mb-8">
            From small repairs to ongoing property maintenance, I'd be
            happy to provide a free, no-obligation quote.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <Link
              href="/quote?service=home-maintenance"
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg font-semibold"
            >
              Request a Home Maintenance Quote
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