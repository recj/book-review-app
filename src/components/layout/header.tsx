"use client";

import { useState } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { BookOpenIcon, ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";

export default function Header() {
    const { user, logout } = useAuth();
    const router = useRouter();
    const pathname = usePathname();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        try {
            setIsLoggingOut(true);
            await logout();
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            setIsLoggingOut(false);
        }
    };

    const navigation = [
        { name: "Reviews", href: "/reviews", current: pathname === "/reviews" },
        { name: "Add Review", href: "/add-review", current: pathname === "/add-review" },
    ];

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <button
                        onClick={() => router.push("/reviews")}
                        className="flex items-center space-x-2 text-xl font-bold text-gray-900"
                    >
                        <BookOpenIcon className="w-7 h-7 text-indigo-600" />
                        <span>BookReviews</span>
                    </button>

                    <nav className="hidden md:flex space-x-8">
                        {navigation.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => router.push(item.href)}
                                className={`px-3 py-2 text-sm font-medium transition-colors ${item.current
                                    ? "text-indigo-600 border-b-2 border-indigo-600"
                                    : "text-gray-700 hover:text-indigo-600"
                                    }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        {user && (
                            <div className="hidden md:flex items-center space-x-2">
                                <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-medium">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm text-gray-700 font-medium">{user.name}</span>
                            </div>
                        )}
                        <Button
                            onClick={handleLogout}
                            isLoading={isLoggingOut}
                            variant="danger"
                            size="sm"
                        >
                            {!isLoggingOut && (
                                <ArrowRightStartOnRectangleIcon className="w-5 h-5 mr-1" />
                            )}
                            Logout
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}
