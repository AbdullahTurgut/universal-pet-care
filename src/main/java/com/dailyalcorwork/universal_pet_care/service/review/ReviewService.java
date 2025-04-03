package com.dailyalcorwork.universal_pet_care.service.review;

import com.dailyalcorwork.universal_pet_care.model.Review;
import org.springframework.data.domain.Page;

public class ReviewService implements IReviewService {
    @Override
    public void saveReview(Review review, Long reviewerId, Long veterinarianId) {
        
    }

    @Override
    public double getAverageRatingForVet(Long veterinarianId) {
        return 0;
    }

    @Override
    public void updateReview(Long reviewerId, Review review) {

    }

    @Override
    public Page<Review> findAllReviewsByUserId(Long userId, int page, int size) {
        return null;
    }
}
