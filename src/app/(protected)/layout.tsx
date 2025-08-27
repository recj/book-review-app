import type { ReactNode } from "react";
import ProtectedRouteGuard from "@/components/auth/protected-route-guard";
import Header from "@/components/layout/header";

export default function ProtectedLayout({ children }: { children: ReactNode }) {
    return (
        <ProtectedRouteGuard >
            <div className="min-h-screen bg-gray-50">
                <Header />
                <main className="pt-16">
                    {children}
                </main>
            </div>
        </ProtectedRouteGuard>
    );
}
