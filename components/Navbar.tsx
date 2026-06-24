"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);

return ( <nav className="bg-slate-900 text-white shadow-lg"> <div className="max-w-6xl mx-auto px-6 py-4">

    <div className="flex justify-between items-center">

      <Link
        href="/"
        className="text-xl md:text-2xl font-bold text-orange-400"
      >
        Gary the Handyman
      </Link>

      <button
        className="md:hidden text-3xl"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div className="hidden md:flex gap-6">
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

    {menuOpen && (
      <div className="flex flex-col mt-4 gap-4 md:hidden">

        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>

        <Link
          href="/services"
          onClick={() => setMenuOpen(false)}
        >
          Services
        </Link>

        <Link
          href="/gallery"
          onClick={() => setMenuOpen(false)}
        >
          Gallery
        </Link>

        <Link
          href="/about"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>

        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>

      </div>
    )}

  </div>
</nav>

);
}
