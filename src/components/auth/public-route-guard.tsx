'use client';

import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";

interface PublicRouteGuardProps {
    children: ReactNode;
    redirectTo?: string;
    showLoading?: boolean;
}

export default function PublicRouteGuard({
    children,
    redirectTo = '/reviews',
    showLoading = true
}: PublicRouteGuardProps) {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && isAuthenticated) {
            router.replace(redirectTo);
        }
    }, [isAuthenticated, isLoading, router, redirectTo]);

    if (isLoading && showLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center space-y-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-600"></div>
                    <p className="text-sm text-gray-600">Checking session...</p>
                </div>
            </div>
        );
    }

    if (isAuthenticated) {
        return null;
    }

    return <>{children}</>;
}
