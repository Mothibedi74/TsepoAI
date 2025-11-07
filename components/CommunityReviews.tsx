import React, { useState } from 'react';
import { Star, MessageSquarePlus, X } from 'lucide-react';
import type { Review } from '../types';

interface CommunityReviewsProps {
  reviews: Review[];
  onAddReview: (reviewData: Omit<Review, 'id' | 'avatarUrl'>) => void;
}

const StarRatingDisplay: React.FC<{ rating: number }> = ({ rating }) => {
    return (
        <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                />
            ))}
        </div>
    );
};

const CommunityReviews: React.FC<CommunityReviewsProps> = ({ reviews, onAddReview }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [author, setAuthor] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (author.trim() && comment.trim() && rating > 0) {
      onAddReview({ author, rating, comment });
      // Reset and close form
      setIsFormOpen(false);
      setAuthor('');
      setComment('');
      setRating(0);
      setHoverRating(0);
    }
  };

  return (
    <section id="reviews" className="my-16">
      <h2 className="text-4xl font-bold text-center mb-12">What Our Community Says</h2>
      
      <div className="max-w-3xl mx-auto mb-12">
        {!isFormOpen ? (
          <div className="text-center">
            <button
              onClick={() => setIsFormOpen(true)}
              className="inline-flex items-center justify-center bg-primary text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-dark transition-colors"
            >
              <MessageSquarePlus className="w-5 h-5 mr-2" />
              Write a Review
            </button>
          </div>
        ) : (
          <div className="bg-dark-card border border-dark-border rounded-lg p-8 shadow-lg relative transition-all duration-300 ease-in-out">
            <button onClick={() => setIsFormOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold mb-6 text-center text-white">Share Your Feedback</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-300 mb-1">Your Name</label>
                <input
                  type="text"
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g., Jane Doe"
                  className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => {
                    const starValue = i + 1;
                    return (
                      <Star
                        key={starValue}
                        size={28}
                        className={`cursor-pointer transition-all ${
                          starValue <= (hoverRating || rating)
                            ? 'text-yellow-400 fill-yellow-400 scale-110'
                            : 'text-gray-600 hover:scale-110'
                        }`}
                        onClick={() => setRating(starValue)}
                        onMouseEnter={() => setHoverRating(starValue)}
                        onMouseLeave={() => setHoverRating(0)}
                      />
                    );
                  })}
                </div>
              </div>
              <div>
                 <label htmlFor="comment" className="block text-sm font-medium text-gray-300 mb-1">Review</label>
                <textarea
                  id="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="What did you like or dislike?"
                  rows={4}
                  className="w-full bg-dark-bg border border-dark-border rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={!author.trim() || !comment.trim() || rating === 0}
                className="w-full bg-primary text-white font-bold py-3 px-6 rounded-lg disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((review) => (
          <div key={review.id} className="bg-dark-card border border-dark-border rounded-lg p-6 flex flex-col items-start shadow-lg">
            <div className="flex items-center w-full mb-4">
              <img src={review.avatarUrl} alt={review.author} className="w-14 h-14 rounded-full mr-4 border-2 border-primary" />
              <div className="flex-grow">
                <h3 className="font-bold text-lg text-white">{review.author}</h3>
                <StarRatingDisplay rating={review.rating} />
              </div>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">"{review.comment}"</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CommunityReviews;
