// src/app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl text-center space-y-8">

        <h1 className="text-4xl font-bold text-gray-900">
          Book Review App
        </h1>

        <p className="text-gray-600 text-base">
          Discover new books and share your thoughts with others.
        </p>

        <div className="flex justify-center gap-4">
          <Link href="/signup">
            <Button size="lg" className="px-8 font-semibold">
              Sign Up
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="lg" className="px-8 font-semibold">
              Log In
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-400">
          Your personal space for honest book reviews.
        </p>
      </div>
    </main >
  );
}
