import Link from "next/link";
import Image from "next/image";

export default function SocialSupportPage() {
  return (
    <main className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative h-[450px] md:h-[550px]">
        <Image
          src="/images/social-support.jpg"
          alt="Social Support Services"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55 flex items-center">
          <div className="max-w-6xl mx-auto px-6 text-white">

            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Social Support
            </h1>

            <p className="text-xl max-w-2xl">
              Friendly, reliable assistance to help you stay independent,
              connected and confident in your daily life.
            </p>

          </div>
        </div>
      </section>

      {/* Introduction */}

      <section className="py-20 px-6">

        <div className="max-w-5xl mx-auto">

          <h2 className="text-4xl font-bold mb-8">
            A Helping Hand When You Need It
          </h2>

          <p className="text-lg leading-8 text-gray-700 mb-6">
            Whether you need transport to appointments, assistance with
            shopping, help using technology or simply someone dependable
            to lend a hand, I'm here to help.
          </p>

          <p className="text-lg leading-8 text-gray-700">
            Every person is different, so support is tailored to your
            individual needs with a friendly and respectful approach.
          </p>

        </div>

      </section>

      {/* Services */}

      <section className="bg-gray-50 py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-12">
            Support Services
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            {[
              "Transport to Appointments",
              "Shopping Assistance",
              "Technology Assistance",
              "Computer & Phone Help",
              "Companionship",
              "Community Outings",
              "Light Household Assistance",
              "Meal Preparation",
              "General Daily Support",
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
                Friendly & Respectful
              </h3>

              <p>
                I believe in treating everyone with dignity, patience and
                respect while providing dependable support.
              </p>

            </div>

            <div className="border rounded-xl shadow p-8">

              <h3 className="text-2xl font-bold mb-4">
                Practical Experience
              </h3>

              <p>
                With experience supporting people in the local community,
                I understand that sometimes it's the little things that
                make the biggest difference.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* Coming Soon */}

      <section className="bg-gray-100 py-20 px-6">

        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-6">
            Community Focused
          </h2>

          <p className="text-xl text-gray-600">
            More information about available support services and local
            community assistance will be added here soon.
          </p>

        </div>

      </section>

      {/* Call To Action */}

      <section className="py-20 px-6">

        <div className="max-w-4xl mx-auto bg-slate-900 rounded-2xl text-white text-center p-10">

          <h2 className="text-4xl font-bold mb-6">
            Let's Talk About How I Can Help
          </h2>

          <p className="text-xl mb-8">
            If you or a family member could benefit from friendly,
            reliable support, I'd be happy to discuss your needs.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">

            <Link
              href="/quote?service=social-support"
              className="bg-orange-500 hover:bg-orange-600 px-8 py-4 rounded-lg font-semibold"
            >
              Request Social Support
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