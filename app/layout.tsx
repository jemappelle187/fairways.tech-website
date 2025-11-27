import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://fairways.tech"),
  title: {
    default: "Fairways.Tech – Digital infrastructure empowering farmers to scale",
    template: "%s | Fairways.Tech",
  },
  description:
    "Fairways.Tech is a community-driven agri-fintech ecosystem helping smallholder farmers and horticultural producers scale through trusted data, transparent value chains, and compliance-first finance.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    url: "https://fairways.tech",
    title: "Fairways.Tech – Digital infrastructure empowering farmers to scale",
    description:
      "Community-driven agri-fintech enabling farmers to grow through trusted data, transparent value chains, and compliant finance.",
    siteName: "Fairways.Tech",
    images: [
      {
        url: "/og-fairways-tech.png",
        width: 1200,
        height: 630,
        alt: "Fairways.Tech – digital infrastructure empowering farmers to scale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fairways.Tech – Digital infrastructure empowering farmers to scale",
    description:
      "Community-driven agri-fintech enabling farmers to scale responsibly with trusted data and compliant finance.",
    images: ["/og-fairways-tech.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-sand font-sans text-stone antialiased">
        {children}

        {/* Umami analytics */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="35737669-48d9-417b-84b8-219610fbff91"
          data-domains="fairways.tech"
          strategy="afterInteractive"
        />

        <Script id="umami-slack-forwarder" strategy="afterInteractive">
          {`
            document.addEventListener('umami:event', function (event) {
              const payload = event.detail?.payload || {};
              
              fetch('/api/umami-to-slack', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
            });
          `}
        </Script>
      </body>
    </html>
  );
}