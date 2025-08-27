"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { loginSchema } from "@/core/validators/auth.schema";
import { LoginFormData } from "@/lib/types/auth.types";
import { useAuth } from "@/context/auth-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const LoginForm = () => {
    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await login(data.email, data.password);

            if (!result.success) {
                setError("root", {
                    message: result.message,
                });
            }
        } catch {
            setError("root", {
                message: "An unexpected error occurred. Please try again.",
            });
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow space-y-6"
            autoComplete="off"
        >
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Sign in</h2>
                <p className="text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/signup"
                        className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                        Sign up
                    </Link>
                </p>
            </div>

            {errors.root?.message && (
                <div
                    className="bg-red-100 text-red-700 text-sm p-3 rounded-md border border-red-200 text-center"
                    aria-live="polite"
                >
                    {errors.root.message}
                </div>
            )}

            <div className="space-y-4">
                <Input
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    error={errors.email?.message}
                    autoComplete="email"
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    error={errors.password?.message}
                    autoComplete="current-password"
                />
            </div>

            <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isSubmitting}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
        </form>
    );
};
