import Header from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="relative min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-white">
      <Header />

      <section className="relative flex flex-col items-center justify-center flex-1 px-4 py-32 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        <div className="relative z-10">
          <h1 className="text-5xl font-extrabold text-white tracking-tight mb-6">
            Book Review App
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto mb-8">
            Discover new books, rate your favorites, and share your thoughts with the world.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="px-8 font-semibold shadow-md">
                Sign Up
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="secondary" size="lg" className="px-8 font-semibold">
                Log In
              </Button>
            </Link>
          </div>
        </div>
      </section>


      <section className="px-6 py-16 bg-white border-t border-gray-100 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            Why use Book Review App?
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Share Reviews</h3>
              <p className="text-sm text-gray-600">
                Write and publish your honest thoughts about books you’ve read.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Discover Reads</h3>
              <p className="text-sm text-gray-600">
                Find inspiration from community ratings and book recommendations.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg shadow-sm">
              <h3 className="font-semibold text-lg mb-2">Connect</h3>
              <p className="text-sm text-gray-600">
                Engage with other passionate readers and exchange opinions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative px-6 py-24 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />

        <blockquote className="relative z-10 text-2xl italic text-white max-w-3xl mx-auto">
          “Reading is better when shared. Your voice can inspire someone’s next favorite book.”
        </blockquote>
      </section>


      <footer className="px-6 py-6 text-center text-sm text-gray-500 border-t border-gray-200 relative z-10">
        © 2025 Book Review App
      </footer>
    </main>
  );
}
