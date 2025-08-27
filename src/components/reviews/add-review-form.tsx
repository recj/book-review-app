"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { createReviewSchema } from "@/core/validators/review.schema";
import { CreateReviewData, AVAILABLE_MOODS } from "@/lib/types/review.types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AddReviewForm() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<CreateReviewData>({
        resolver: zodResolver(createReviewSchema),
    });

    const [serverError, setServerError] = useState<string | null>(null);

    const onSubmit = async (data: CreateReviewData) => {
        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(data),
            });

            const result = await res.json();

            if (result.success) {
                router.push("/reviews");
                router.refresh();
            } else {
                setServerError(result.message || "Failed to create review");
                if (result.errors) {
                    setError("root", { message: result.errors.join(", ") });
                }
            }
        } catch (err) {
            console.error("Error creating review:", err);
            setServerError("Unexpected error, please try again.");
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-md mx-auto bg-white p-8 rounded-lg shadow space-y-6"
        >
            <div className="space-y-2 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Add a Review</h2>
                <p className="text-sm text-gray-600">
                    Share your thoughts about the book
                </p>
            </div>

            {serverError && (
                <div className="bg-red-100 text-red-700 text-sm p-3 rounded-md border border-red-200 text-center">
                    {serverError}
                </div>
            )}

            <Input
                label="Book title"
                placeholder="Enter book title"
                {...register("book_title")}
                error={errors.book_title?.message}
            />

            <Input
                label="Rating (1-5)"
                type="number"
                min={1}
                max={5}
                {...register("rating", { valueAsNumber: true })}
                error={errors.rating?.message}
            />

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Review
                </label>
                <textarea
                    rows={4}
                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
                    placeholder="Write your review..."
                    {...register("review")}
                />
                {errors.review && (
                    <p className="text-sm text-red-600 mt-1">{errors.review.message}</p>
                )}
            </div>

            <div>
                <label className="block mb-1 text-sm font-medium text-gray-700">
                    Mood
                </label>
                <select
                    className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
                    {...register("mood")}
                >
                    <option value="">Select a mood</option>
                    {AVAILABLE_MOODS.map((mood) => (
                        <option key={mood} value={mood}>
                            {mood}
                        </option>
                    ))}
                </select>
                {errors.mood && (
                    <p className="text-sm text-red-600 mt-1">{errors.mood.message}</p>
                )}
            </div>

            <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isSubmitting}
                disabled={isSubmitting}
            >
                {isSubmitting ? "Saving..." : "Save Review"}
            </Button>
        </form>
    );
}
