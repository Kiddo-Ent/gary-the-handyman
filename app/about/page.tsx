import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gray-50">

      <section className="bg-slate-800 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-6">
            About Gary
          </h1>

          <p className="text-xl">
            Local handyman, property maintenance specialist,
            security camera installer and technology support provider.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>
              <Image
                src="/images/gary.jpg"
                alt="Gary the Handyman"
                width={500}
                height={600}
                className="rounded-xl shadow-lg"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6">
                Friendly Local Service
              </h2>

              <p className="text-lg leading-8 mb-6">
                I provide reliable handyman services, property
                maintenance, security camera installation and
                computer assistance throughout Inverloch and
                South Gippsland.
              </p>

              <p className="text-lg leading-8">
                With experience supporting people in the
                community, I understand the importance of
                trust, communication and quality workmanship.
                My goal is to help clients maintain safe,
                comfortable and enjoyable homes.
              </p>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}
