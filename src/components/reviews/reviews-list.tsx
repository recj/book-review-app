'use client';

import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { ReviewWithUser } from '@/lib/types/review.types';
import ReviewCard from './review-card';

interface ReviewsListProps {
    initialReviews: ReviewWithUser[];
}

export default function ReviewsList({ initialReviews }: ReviewsListProps) {
    const { user } = useAuth();
    const [reviews, setReviews] = useState(initialReviews);
    const [error, setError] = useState<string | null>(null);


    const handleDelete = async (id: number) => {
        try {
            const res = await fetch(`/api/reviews/${id}`, { method: 'DELETE', credentials: 'include' });
            const data = await res.json();
            if (data.success) {
                setReviews((prev) => prev.filter((r) => r.id !== id));
            } else {
                setError(data.message || 'Failed to delete review');
            }
        } catch {
            setError('Network error while deleting review');
        }
    };

    if (error) return <p className="text-center text-red-500">{error}</p>;
    if (reviews.length === 0) return <p className="text-center text-gray-500">No reviews yet.</p>;

    return (
        <div className="space-y-6">
            {reviews.map((review) => (
                <ReviewCard
                    key={review.id}
                    review={review}
                    currentUser={user}
                    onDelete={handleDelete}
                />
            ))}
        </div>
    );
}
