import PublicRouteGuard from "@/components/auth/public-route-guard";
import { BookOpenIcon } from "@heroicons/react/24/solid";
import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <PublicRouteGuard>
            <div className="min-h-[80vh] grid lg:grid-cols-2 bg-gray-50">
                <div className="hidden lg:block relative">
                    <div
                        className="h-full w-full bg-cover bg-center"
                        style={{
                            backgroundImage:
                                "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?auto=format&fit=crop&w=1600&q=80')",
                        }}
                    />
                    <div className="absolute inset-0 bg-black/30 backdrop-blur-md" />

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                        <BookOpenIcon className="h-12 w-12 text-indigo-600 mb-4" />

                        <h2 className="text-3xl font-bold text-white max-w-sm">
                            Book Review App
                        </h2>

                        <p className="mt-3 text-gray-200 text-base max-w-xs">
                            Discover books, share reviews, and connect with readers.
                        </p>

                        <div className="mt-4 h-1 w-30 bg-indigo-600 rounded-full" />
                    </div>

                </div>

                <main className="flex items-center justify-center p-6">
                    <div className="w-full max-w-md">{children}</div>
                </main>
            </div>
        </PublicRouteGuard>
    );
}
