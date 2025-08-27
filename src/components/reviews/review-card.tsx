'use client';

import { useState } from 'react';
import { ReviewWithUser } from '@/lib/types/review.types';
import { User } from '@/lib/types/auth.types';
import { Button } from '@/components/ui/button';
import { TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/24/solid';

interface ReviewCardProps {
    review: ReviewWithUser;
    currentUser: User | null;
    onDelete: (reviewId: number) => Promise<void>;
}

export default function ReviewCard({ review, currentUser, onDelete }: ReviewCardProps) {
    const [isDeleting, setIsDeleting] = useState(false);

    const isOwner = currentUser && currentUser.id === review.user_id;

    const handleDelete = async () => {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        try {
            setIsDeleting(true);
            await onDelete(review.id);
        } catch (error) {
            console.error('Error deleting review:', error);
        } finally {
            setIsDeleting(false);
        }
    };

    const formatDate = (date: string | Date) => {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, index) => (
            <StarIcon
                key={index}
                className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            />
        ));
    };

    return (
        <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
            <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                        {review.book_title}
                    </h3>
                    <p className="text-sm text-gray-600">
                        by <span className="font-medium">{review.reviewer_name}</span>
                    </p>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                    {review.mood && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {review.mood}
                        </span>
                    )}

                    {isOwner && (
                        <Button
                            onClick={handleDelete}
                            isLoading={isDeleting}
                            variant="ghost"
                            size="sm"
                            title="Delete review"
                        >
                            {!isDeleting && <TrashIcon className="h-4 w-4" />}
                        </Button>
                    )}
                </div>
            </div>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap mb-3">
                {review.review}
            </p>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="flex">{renderStars(review.rating)}</div>
                    <span className="text-sm text-gray-500">({review.rating}/5)</span>
                </div>
                <time className="text-sm text-gray-500">{formatDate(review.created_at)}</time>
            </div>
        </div>
    );
}
