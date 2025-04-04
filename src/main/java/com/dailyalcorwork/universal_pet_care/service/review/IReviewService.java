package com.dailyalcorwork.universal_pet_care.service.review;

import com.dailyalcorwork.universal_pet_care.model.Review;
import com.dailyalcorwork.universal_pet_care.request.ReviewUpdateRequest;
import org.springframework.data.domain.Page;

public interface IReviewService {

    Review saveReview(Review review, Long reviewerId, Long veterinarianId);

    double getAverageRatingForVet(Long veterinarianId);

    Review updateReview(Long reviewerId, ReviewUpdateRequest review);

    Page<Review> findAllReviewsByUserId(Long userId, int page, int size);
}
