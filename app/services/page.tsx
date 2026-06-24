export default function ServicesPage() {
  const services = [
    "Home Repairs",
    "Property Maintenance",
    "Fence Repairs",
    "Gate Repairs",
    "Security Camera Installation",
    "Smart Home Setup",
    "Computer Assistance",
    "Wi-Fi Troubleshooting",
    "Flat-Pack Furniture Assembly",
    "Gutter Cleaning",
    "Pressure Washing",
    "Senior Assistance",
    "Home Safety Modifications",
  ];

  return (
    <main className="min-h-screen py-20 px-6">
       <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-10">
          Services
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service}
              className="border p-6 rounded-lg shadow hover:shadow-lg transition"
            >
              {service}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}