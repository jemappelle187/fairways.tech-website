import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fairways.Tech | Community-Driven Agri-Fintech",
  description:
    "Fairways.Tech is a community-first agri-fintech ecosystem that digitizes trust for farmers, cooperatives, buyers, and institutions."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-sand font-sans text-stone antialiased">
        {children}
      </body>
    </html>
  );
}

