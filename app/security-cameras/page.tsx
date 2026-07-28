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

      {/* Recent Projects */}

<section className="bg-gray-100 py-20 px-6">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-center mb-4">
      Recent Installations
    </h2>

    <p className="text-xl text-gray-600 text-center mb-12">
      A selection of recent security camera installations across South Gippsland.
    </p>

    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[
        {
          image: "/images/projects/Cam1.jpg",
          closeUp: "/images/projects/Cam1sm.jpg",
          title: "Security Camera Installation",
          description:
            "Full security camera system installation, including TP-Link bridges and Reolink cameras.",
        },
        {
          image: "/images/projects/Cam2.jpg",
          closeUp: "/images/projects/Cam2sm.jpg",
          title: "Camera and Bridge Setup",
          description:
            "A close look at the completed TP-Link bridge and Reolink camera setup.",
        },
        {
          image: "/images/projects/Cam3.jpg",
          closeUp: "/images/projects/Cam3sm.jpg",
          title: "Completed Installation",
          description:
            "Finished bridge and security camera installation.",
        },
      ].map((project) => (
        <article
          key={project.image}
          className="overflow-hidden rounded-xl bg-white shadow border"
        >
          <a
            href={project.closeUp}
            target="_blank"
            rel="noreferrer"
            className="group block"
            aria-label={`Open close-up of ${project.title}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
          </a>

          <div className="p-6">
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>

            <p className="text-gray-600 mb-4">{project.description}</p>

            <a
              href={project.closeUp}
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-orange-600 hover:text-orange-700"
            >
              View close-up →
            </a>
          </div>
        </article>
      ))}
    </div>
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