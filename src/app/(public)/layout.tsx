import type { ReactNode } from "react";

export default function PublicLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen grid lg:grid-cols-2 bg-gray-50">
            <div className="hidden lg:block">
                <div
                    className="h-full w-full bg-cover bg-center"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?auto=format&fit=crop&w=1600&q=80')",
                    }}
                />
            </div>

            <main className="flex items-center justify-center p-6">
                <div className="w-full max-w-md">{children}</div>
            </main>
        </div>
    );
}
