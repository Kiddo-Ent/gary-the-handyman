import Link from "next/link";
import Image from "next/image";

export default function SecurityCamerasPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative h-[450px] md:h-[550px]">
        <Image
          src="/images/security.jpg"
          alt="Security Camera Installation"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55 flex items-center">
          <div className="max-w-6xl mx-auto px-6 text-white">

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Security Camera Installation
            </h1>

            <p className="text-xl max-w-2xl">
              Protect your home, family and business with professionally
              installed security camera systems.
            </p>

          </div>
        </div>
      </section>

      {/* Intro */}

      <section className="py-20 px-6">

        <div className="max-w-5xl mx-auto">

          <h2 className="text-4xl font-bold mb-8">
            Peace of Mind Starts Here
          </h2>

          <p className="text-lg leading-8 text-gray-700 mb-6">
            Modern security cameras allow you to check on your home,
            business or holiday property from anywhere using your
            smartphone.
          </p>

          <p className="text-lg leading-8 text-gray-700">
            Whether you need a single camera at your front door or a
            complete multi-camera system, I can help you choose the
            right solution and ensure everything is professionally
            installed and configured.
          </p>

        </div>

      </section>

      {/* Services */}

      <section className="bg-gray-50 py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-12">
            Services Available
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              "Security Camera Installation",
              "Camera System Upgrades",
              "Smartphone Setup",
              "Remote Viewing Configuration",
              "Holiday Home Monitoring",
              "Business Surveillance",
              "Existing Camera Repairs",
              "Wi-Fi Camera Setup",
              "Advice & System Recommendations",
            ].map((service) => (

              <div
                key={service}
                className="bg-white rounded-xl border shadow p-6 hover:shadow-lg transition"
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
                Professional Installation
              </h3>

              <p>
                Cameras are installed neatly and configured correctly,
                ensuring reliable operation and remote access.
              </p>

            </div>

            <div className="border rounded-xl shadow p-8">

              <h3 className="text-2xl font-bold mb-4">
                Easy To Use
              </h3>

              <p>
                I'll help connect your cameras to your phone or tablet
                and show you exactly how everything works.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Future Gallery */}

      <section className="bg-gray-100 py-20 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-6">
            Recent Installations
          </h2>

          <p className="text-xl text-gray-600">
            Photos of recent security camera installations will be
            added here soon.
          </p>

        </div>

      </section>

      {/* Call To Action */}

      <section className="py-20 px-6">

        <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl text-white text-center p-10">

          <h2 className="text-4xl font-bold mb-6">
            Protect What Matters Most
          </h2>

          <p className="text-xl mb-8">
            Get in touch today to discuss the right security camera
            solution for your home or business.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <Link
              href="/quote?service=security-cameras"
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg font-semibold"
            >
              Request a Security Camera Quote
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