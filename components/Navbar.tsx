import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          href="/"
          className="text-2xl font-bold text-orange-400"
        >
          Gary the Handyman
        </Link>

        <div className="flex gap-6 text-sm md:text-base">
          <Link href="/" className="hover:text-orange-400">
            Home
          </Link>

          <Link href="/services" className="hover:text-orange-400">
            Services
          </Link>

          <Link href="/gallery" className="hover:text-orange-400">
            Gallery
          </Link>

          <Link href="/about" className="hover:text-orange-400">
            About
          </Link>

          <Link href="/contact" className="hover:text-orange-400">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}