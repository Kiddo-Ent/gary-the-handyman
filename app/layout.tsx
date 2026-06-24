import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer/Footer";

export const metadata: Metadata = {
  title: "Gary the Handyman",
  description:
    "Handyman services, property maintenance, security cameras and IT support throughout Inverloch and South Gippsland.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}