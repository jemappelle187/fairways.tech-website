import Link from "next/link";
import { Header, Footer } from "./components/SiteChrome";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center bg-sand px-6">
        <div className="max-w-md text-center">
          <h1 className="mb-4 text-4xl font-semibold text-stone">404</h1>
          <h2 className="mb-4 text-2xl font-semibold text-stone">Page Not Found</h2>
          <p className="mb-6 text-slate-700">
            The page you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/"
            className="inline-block rounded-lg bg-forest px-6 py-3 text-sm font-semibold text-white transition hover:bg-forest/90 focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2"
          >
            Go back home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
