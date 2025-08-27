import { ReviewWithUser } from "@/lib/types/review.types";
import ReviewsList from "@/components/reviews/reviews-list";
import { cookies } from "next/headers";
import Link from "next/link";

async function fetchInitialReviews(): Promise<ReviewWithUser[]> {
    try {
        const cookieStore = await cookies();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reviews`, {
            headers: {
                Cookie: cookieStore.toString(),
            },
            cache: "no-store",
        });

        const data = await res.json();
        if (!data.success || !data.reviews) return [];
        return data.reviews;
    } catch (error) {
        console.error('Error fetching initial reviews:', error);
        return [];
    }
}

export default async function ReviewsPage() {
    const initialReviews = await fetchInitialReviews();

    return (
        <main className="max-w-4xl mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Book Reviews</h1>
                <Link
                    href="/add-review"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    Add Review
                </Link>
            </div>

            <ReviewsList initialReviews={initialReviews} />
        </main>
    );
}
